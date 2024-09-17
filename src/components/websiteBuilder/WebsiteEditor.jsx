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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WebsiteEditor = () => {
  const initialSections = JSON.parse(localStorage.getItem("sections")) || [
    {
      id: "1",
      type: "header",
      content: ["Title", "Home", "About", "Contact", "Services"],
    },
    {
      id: "2",
      type: "home",
      content: ["Welcome Message", "Intro Text", "Main Image", "CTA Button"],
    },
    {
      id: "3",
      type: "contact",
      content: [
        "Contact Form",
        "Phone Number",
        "Email Address",
        "Map Location",
      ],
    },
    {
      id: "4",
      type: "services",
      content: ["Service 1", "Service 2", "Service 3", "Service 4"],
    },
    {
      id: "5",
      type: "about",
      content: ["About Us Text", "Team Info", "Our Mission", "Our Vision"],
    },
    {
      id: "6",
      type: "footer",
      content: [
        "Copyright Info",
        "Privacy Policy",
        "Terms of Service",
        "Social Links",
      ],
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

    toast.success(`${newSection.content} section added! at The Bottom`);
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
    localStorage.clear();
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
      <ToastContainer />
      <div className="top">
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
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
            <h3>Add sections</h3>
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
            <button onClick={handleAddComponent}>Add</button>
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
