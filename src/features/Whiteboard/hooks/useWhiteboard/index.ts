import { useState } from "react";
import { WhiteboardItem } from "./types.local";

const initItems: WhiteboardItem[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i.toString(),
  content: `Item ${i}`,
  x: Math.random() * 500,
  y: Math.random() * 500,
}));

export const useWhiteboard = () => {
  const [items, setItems] = useState<WhiteboardItem[]>(initItems);
  const [draggedItem, setDraggedItem] = useState<WhiteboardItem | null>(null);

  const updateItem = (id: string, item: Partial<WhiteboardItem>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...item } : i)));
  };

  return {
    items,
    draggedItem,
    updateItem,
    setDraggedItem,
  };
};
