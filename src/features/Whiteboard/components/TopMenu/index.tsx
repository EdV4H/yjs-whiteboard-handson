import { AddCircleOutline, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  onAdd: () => void;
  onDeleteAll: () => void;
};

export const TopMenu: React.FC<Props> = ({ onAdd, onDeleteAll }) => {
  return (
    <Card
      variant="elevation"
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" component="div">
            Yjs DnD Handson
          </Typography>
          <Stack direction="row">
            <IconButton size="small" onClick={onAdd}>
              <AddCircleOutline />
            </IconButton>
            <IconButton size="small" onClick={onDeleteAll}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
