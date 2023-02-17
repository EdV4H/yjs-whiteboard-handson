import { Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { WhiteboardItem } from "../../hooks/useWhiteboard/types.local";

type Props = {
  item: WhiteboardItem;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDelete: () => void;
};

export const DaDItem: React.FC<Props> = ({ item, onDragStart, onDelete }) => {
  return (
    <div
      style={{ position: "absolute", top: item.y, left: item.x }}
      draggable
      onDragStart={onDragStart}
    >
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" color="textSecondary">
                Draggable Card
              </Typography>
              <IconButton size="small" onClick={onDelete}>
                <Close />
              </IconButton>
            </Stack>
            <Typography variant="h6" component="div">
              {item.content}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};
