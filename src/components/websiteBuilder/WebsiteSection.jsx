import React, { useState, useEffect } from "react";
import "./website.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Draggable from "react-draggable";

const WebsiteSection = ({
  id,
  type,
  content,
  onContentChange,
  isEditMode,
  isMobileView,
}) => {
  const [editableContent, setEditableContent] = useState(content);
  const [positions, setPositions] = useState(
    () =>
      JSON.parse(
        localStorage.getItem(
          `positions_${id}_${isMobileView ? "mobile" : "desktop"}`
        )
      ) || content.map(() => ({ x: 0, y: 0 }))
  );
  const [fontSize, setFontSize] = useState("16px"); // Default font size

  const {
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
    listeners,
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

  const handleContentChange = (index, newContent) => {
    const updatedContent = [...editableContent];
    updatedContent[index] = newContent;
    setEditableContent(updatedContent);
    if (onContentChange) {
      onContentChange(id, updatedContent);
    }
  };

  const handleDrag = (index, e, data) => {
    const updatedPositions = [...positions];
    updatedPositions[index] = { x: data.x, y: data.y };
    setPositions(updatedPositions);

    const scaleFactor = 0.01;
    const newFontSize =
      Math.max(16, 16 + Math.abs(data.y) * scaleFactor) + "px";
    setFontSize(newFontSize);

    localStorage.setItem(
      `positions_${id}_${isMobileView ? "mobile" : "desktop"}`,
      JSON.stringify(updatedPositions)
    );
  };

  useEffect(() => {
    setPositions(
      JSON.parse(
        localStorage.getItem(
          `positions_${id}_${isMobileView ? "mobile" : "desktop"}`
        )
      ) || content.map(() => ({ x: 0, y: 0 }))
    );
  }, [isMobileView, content, id]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: getBackgroundColorByType(type),
    height: getHeightByType(type),
    maxWidth: "90%",
    margin: "0 auto",
    border: isDragging ? "3px solid black" : "0px solid black",
    position: "relative",
    zIndex: isDragging ? 1000 : 1,
    cursor: "normal",
    marginTop: isEditMode ? "1rem" : "0",
    display: "flex",
  };

  const handleStyle = {
    cursor: "grab",
    color: "#fff",
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  const itemStyle = {
    padding: "10px",
    cursor: "move",
    display: "inline",
    fontSize: fontSize,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
        style={handleStyle}
      >
        {isEditMode ? "☰" : ""}
      </div>

      {editableContent.map((item, index) => (
        <div className="item" key={index} style={{ marginBottom: "10px" }}>
          <Draggable
            position={positions[index]}
            onDrag={(e, data) => handleDrag(index, e, data)}
          >
            <div style={itemStyle}>
              <div
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(index, e.target.innerText)}
                style={{
                  outline: "none",
                  border: isEditMode ? "1px dotted #000" : "none",
                  cursor: isEditMode ? "text" : "move",
                  padding: isEditMode ? "5px 10px" : "none",
                  position:'relative',
                  zIndex:123457890
                }}
              >
                {item}
              </div>
            </div>
          </Draggable>
        </div>
      ))}
    </div>
  );
};

export default WebsiteSection;

