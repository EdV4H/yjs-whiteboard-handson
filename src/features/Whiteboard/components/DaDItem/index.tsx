import { WhiteboardItem } from "../../hooks/useWhiteboard/types.local";

type Props = {
  item: WhiteboardItem;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const DaDItem: React.FC<Props> = ({ item, onDragStart }) => {
  return (
    <div
      style={{ position: "absolute", top: item.y, left: item.x }}
      draggable
      onDragStart={onDragStart}
    >
      <p>{item.content}</p>
    </div>
  );
};
