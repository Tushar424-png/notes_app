import { Routes, Route } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";

import { Home } from "./pages/Home";
import { Important } from "./pages/Important";
import { Archive } from "./pages/Archive";

function App() {
  return (
    <NotesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/important" element={<Important />} />
        <Route path="/Archive" element={<Archive />} />
      </Routes>
    </NotesProvider>
  );
}

export default App;
