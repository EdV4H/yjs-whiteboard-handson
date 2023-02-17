import { CurrentUsers, DaDItem, TopMenu } from "../components";
import { useWhiteboard } from "../hooks";

export const Template: React.FC = () => {
  const {
    users,
    items,
    draggedItem,
    addItem,
    updateItem,
    deleteItem,
    deleteAll,
    setDraggedItem,
  } = useWhiteboard();

  console.log(users);

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
      <TopMenu
        onAdd={() =>
          addItem({
            id: Math.random().toString(36).substr(2, 9),
            content: "New item added at " + new Date().toLocaleTimeString(),
            x: Math.random() * 500,
            y: Math.random() * 500,
          })
        }
        onDeleteAll={deleteAll}
      />
      <CurrentUsers />
      {items?.map((item) => (
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
          onDelete={() => deleteItem(item.id)}
        />
      ))}
    </div>
  );
};
