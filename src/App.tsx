import "./styles/style.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Download from "./pages/Download";
import Header from "./components/Header";
import { setServerConfig } from "./utils/localStorage";
import { useEffect } from "react";
import Upload from "./pages/Upload";

function App() {
  // Если LocalStorage пустой -> скачать конфиг с сервера
  useEffect(() => {
    if (!localStorage.getItem("config")) {
      setServerConfig();
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </>
  );
}

export default App;
