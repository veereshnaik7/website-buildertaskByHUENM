import React, { useState } from "react";
import "./website.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const WebsiteSection = ({ id, type, content, onContentChange, isEditMode }) => {
  const [editableContent, setEditableContent] = useState(content);

  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const getHeightByType = (type) => {
    switch (type) {
      case "header":
        return "100px";
      case "home":
        return "400px";
      case "contact":
        return "250px";
      case "services":
        return "300px";
      case "about":
        return "350px";
      case "footer":
        return "150px";
      default:
        return "200px";
    }
  };

  const getBackgroundColorByType = (type) => {
    switch (type) {
      case "header":
        return "#ffcc00";
      case "home":
        return "#00ccff";
      case "contact":
        return "#ff6666";
      case "services":
        return "#66ff66";
      case "about":
        return "#cc66ff";
      case "footer":
        return "#999999";
      default:
        return "#cccccc";
    }
  };

  const handleClick = () => {
    if (isEditMode === true) {
      const newContent = prompt("modify contnet", editableContent);
      if (newContent !== null) {
        setEditableContent(newContent);
        if (onContentChange) {
          onContentChange(id, newContent);
        }
      }
    } else {
      alert("please enable the editor mode before going to edit");
    }
  };
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    height: getHeightByType(type),
    backgroundColor: getBackgroundColorByType(type),
    maxWidth: "90%",
    margin: "0 auto",
    border: isDragging ? "3px solid black" : "0px solid black",
    position: "relative",
    zIndex: isDragging ? 1000 : 1,
    cursor: isDragging ? "grab" : "normal",
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <div className="item" onClick={handleClick}>
        {editableContent}
      </div>
    </div>
  );
};

export default WebsiteSection;
