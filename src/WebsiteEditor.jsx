import React, { useState } from "react";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import WebsiteOverview from "./WebsiteOverview";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

const WebsiteEditor = () => {
  const initialSections = JSON.parse(localStorage.getItem("sections")) || [
    {
      id: "1",
      type: "header",
      content: ["Website Title", "Home", "Services", "About", "Contact"], // Title on the left, navigation links on the right
    },
    {
      id: "2",
      type: "home",
      content: ["please enter your information", "path/to/image.jpg"], // Name and an image path for the home section
    },
    {
      id: "3",
      type: "contact",
      content:
        "You can contact us at: contact@website.com or call us at (123) 456-7890", // Contact details
    },
    {
      id: "4",
      type: "services",
      content: [
        "Web Development",
        "SEO",
        "Digital Marketing",
        "Graphic Design",
      ], 
    },
    {
      id: "5",
      type: "about",
      content:
        "We are a team of professionals dedicated to delivering high-quality digital solutions to help businesses grow.", // About the company or individual
    },
    {
      id: "6",
      type: "footer",
      content: "© 2024 Your Company Name. All rights reserved.", 
    },
  ];

  const [sections, setSections] = useState(initialSections);
  const [newComponent, setNewComponent] = useState("header");
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const getpos = (id) => sections.findIndex((section) => section.id === id);

  const handledragend = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setSections((sections) => {
      const originalPos = getpos(active.id);
      const newPos = getpos(over.id);
      return arrayMove(sections, originalPos, newPos);
    });
  };

  const handleAddComponent = () => {
    const newSection = {
      id: uuidv4(),
      type: newComponent,
      content: newComponent.charAt(0).toUpperCase() + newComponent.slice(1),
    };

    setSections([...sections, newSection]);
  };

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEdit = () => {
    setIsEditMode(true);
    setIsLeftSectionVisible(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    setIsLeftSectionVisible(false);
    localStorage.setItem("sections", JSON.stringify(sections));
  };

  const handleReset = () => {
    localStorage.removeItem("sections");
    setSections(initialSections);
    window.location.reload();
  };

  const handleContentChange = (id, newContent) => {
    setSections((sections) =>
      sections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  return (
    <div className="editorsec">
      <div className="top">
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>reset</button>
        </div>
        <div>
          <FaDesktop
            className="previewicon"
            onClick={() => setIsMobileView(false)}
          />
          <FaMobileAlt
            className="previewicon"
            onClick={() => setIsMobileView(true)}
          />
        </div>
      </div>

      <div className="tools-view">
        {isLeftSectionVisible && (
          <div className="left">
            <h3>Components</h3>
            <ul>
              <li>TextBox</li>
              <li>Image</li>
              <li>Button</li>
              <li>Carousel</li>
              <li>Products Section</li>
            </ul>

            <h3>Pages</h3>
            <ul>
              <li className="pages">Header</li>
              <li className="pages">Home</li>
              <li className="pages">Contact</li>
              <li className="pages">Services</li>
              <li className="pages">About</li>
              <li className="pages">Footer</li>
            </ul>

            <h3>Add Component</h3>
            <select
              value={newComponent}
              onChange={(e) => setNewComponent(e.target.value)}
            >
              <option value="header">Header</option>
              <option value="home">Home</option>
              <option value="contact">Contact</option>
              <option value="services">Services</option>
              <option value="about">About</option>
              <option value="footer">Footer</option>
            </select>
            <button onClick={handleAddComponent}>Add Component</button>
          </div>
        )}
        <div
          className="right"
          style={{
            width: isLeftSectionVisible ? "85%" : "100%",
            maxWidth: isMobileView ? "600px" : "100%",
            transition: "width 0.3s ease",
            margin: "0 auto",
            touchAction: isEditMode ? "none" : "auto",
          }}
        >
          {isEditMode ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handledragend}
            >
              <WebsiteOverview
                items={sections}
                isEditMode={isEditMode}
                onContentChange={handleContentChange}
              />
            </DndContext>
          ) : (
            <WebsiteOverview
              items={sections}
              isEditMode={isEditMode}
              onContentChange={handleContentChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
