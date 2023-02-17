import { useCallback, useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import { WhiteboardItem } from "./types.local";

const userId = Math.random().toString(36).substring(7);

export const useWhiteboard = () => {
  const YdocRef = useRef<Y.Doc | null>(null);
  const YWebSocketProviderRef = useRef<WebsocketProvider | null>(null);
  const [users, setUsers] = useState<string[] | null>(null);
  const [items, setItems] = useState<WhiteboardItem[] | null>(null);
  const [draggedItem, setDraggedItem] = useState<WhiteboardItem | null>(null);

  useEffect(() => {
    YdocRef.current = new Y.Doc();

    YWebSocketProviderRef.current = new WebsocketProvider(
      "ws://localhost:1234",
      "whiteboard",
      YdocRef.current
    );

    YWebSocketProviderRef.current.on("status", (event: any) => {
      if (event.status === "connected") {
        const yUsers = YdocRef.current?.getArray("users");
        if (yUsers) {
          yUsers.push([userId]);
          yUsers.observe((event: any) => {
            const users = yUsers.toArray() as string[];
            setUsers(users);
          });
        }
      }
      if (event.status === "disconnected") {
        const deletedMe = users?.filter((u) => u !== userId);
        const yUsers = YdocRef.current?.getArray("users");
        if (!deletedMe) return;
        if (yUsers) {
          yUsers?.delete(0, yUsers.length);
          yUsers?.push(deletedMe);
        }
      }
    });

    const yItems = YdocRef.current?.getArray("items");
    if (yItems) {
      yItems.observe((event: any) => {
        const items = yItems.toArray() as WhiteboardItem[];
        setItems(items);
      });
    }
  }, []);

  const addItem = useCallback((item: WhiteboardItem) => {
    const yItems = YdocRef.current?.getArray("items");
    yItems?.push([item]);
  }, []);

  const updateItem = useCallback(
    (id: string, item: Partial<WhiteboardItem>) => {
      const newItems = items?.map((i) => (i.id === id ? { ...i, ...item } : i));
      if (!newItems) return;
      YdocRef.current?.transact(() => {
        const yItems = YdocRef.current?.getArray("items");
        yItems?.delete(0, yItems.length);
        yItems?.push(newItems);
      });
    },
    [items]
  );

  const deleteItem = useCallback(
    (id: string) => {
      const newItems = items?.filter((i) => i.id !== id);
      if (!newItems) return;
      YdocRef.current?.transact(() => {
        const yItems = YdocRef.current?.getArray("items");
        yItems?.delete(0, yItems.length);
        yItems?.push(newItems);
      });
    },
    [items]
  );

  const deleteAll = useCallback(() => {
    const yItems = YdocRef.current?.getArray("items");
    yItems?.delete(0, yItems.length);
  }, []);

  return {
    users,
    items,
    draggedItem,
    addItem,
    updateItem,
    deleteItem,
    deleteAll,
    setDraggedItem,
  };
};
