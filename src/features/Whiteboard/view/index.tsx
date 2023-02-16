import { useState } from "react";
import { DaDItem } from "../components";
import { useWhiteboard } from "../hooks";

export const Template: React.FC = () => {
  const { items, draggedItem, updateItem, setDraggedItem } = useWhiteboard();
  return (
    <div
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      onDrop={(e) => {
        if (!draggedItem) return;
        updateItem(draggedItem.id, {
          x: e.clientX - draggedItem.x,
          y: e.clientY - draggedItem.y,
        });
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {items.map((item) => (
        <DaDItem
          key={item.id}
          item={item}
          onDragStart={(e) =>
            setDraggedItem({
              id: item.id,
              content: item.content,
              x: e.clientX - item.x,
              y: e.clientY - item.y,
            })
          }
        />
      ))}
    </div>
  );
};
