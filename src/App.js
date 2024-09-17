import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WebsiteEditor from "./components/websiteBuilder/WebsiteEditor";
import TextEditor from "./components/websiteBuilder/TextEditor";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<WebsiteEditor />} />
          <Route path="/textEditor" element={<TextEditor />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
