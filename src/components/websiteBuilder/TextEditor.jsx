import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div style={{ color: "#fff" }}>
      <h2>Text Editor</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        placeholder="Write something..."
      />
    </div>
  );
};


TextEditor.modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ header: "1" }, { header: "2" }, "bold", "italic", "underline", "strike"], // headings and styles
    [{ color: [] }, { background: [] }], // text color and background
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ], // lists and indentation
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"], // remove formatting
  ],
};

// Supported formats in the editor
TextEditor.formats = [
  "font",
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "color",
  "background",
  "align",
];

export default TextEditor;
