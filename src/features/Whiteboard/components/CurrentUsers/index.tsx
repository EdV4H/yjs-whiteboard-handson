import { Card, CardContent, Stack, Avatar } from "@mui/material";

export const CurrentUsers: React.FC = () => {
  return (
    <Card
      variant="elevation"
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar />
        </Stack>
      </CardContent>
    </Card>
  );
};
