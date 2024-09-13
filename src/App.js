import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WebsiteEditor from "./WebsiteEditor";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<WebsiteEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
