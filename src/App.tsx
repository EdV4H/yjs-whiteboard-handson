import { colors } from "@mui/material";

import "./App.css";
import { Whiteboard } from "./features/Whiteboard";

function App() {
  return (
    <div className="App" style={{ backgroundColor: colors.blueGrey[50] }}>
      <Whiteboard />
    </div>
  );
}

export default App;
