import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useRef, useState } from "react";
import { WhiteboardItem } from "./types.local";

export const useWhiteboard = () => {
  const YdocRef = useRef<Y.Doc | null>(null);
  const YWebSocketProviderRef = useRef<WebsocketProvider | null>(null);
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
      console.log(event.status);
    });
  }, []);

  useEffect(() => {
    const yItems = YdocRef.current?.getArray("items");
    if (yItems) {
      yItems.observe((event: any) => {
        const items = yItems.toArray() as WhiteboardItem[];
        setItems(items);
      });
    }
  }, [YdocRef.current]);

  const addItem = (item: WhiteboardItem) => {
    const yItems = YdocRef.current?.getArray("items");
    yItems?.push([item]);
  };

  const updateItem = (id: string, item: Partial<WhiteboardItem>) => {
    const newItems = items?.map((i) => (i.id === id ? { ...i, ...item } : i));
    if (!newItems) return;
    YdocRef.current?.transact(() => {
      const yItems = YdocRef.current?.getArray("items");
      yItems?.delete(0, yItems.length);
      yItems?.push(newItems);
    });
  };

  return {
    items,
    draggedItem,
    addItem,
    updateItem,
    setDraggedItem,
  };
};
