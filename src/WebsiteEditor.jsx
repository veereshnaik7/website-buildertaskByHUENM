import React from "react";
import { FaDesktop } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";


const WebsiteEditor = () => {
  return (
    <div className="editorsec">
      <div className="top">
        <div>
          <button>edit</button>
          <button>save</button>
        </div>
        <div>
          <FaDesktop className="previewicon" />

          <FaMobileAlt className="previewicon" />
        </div>
      </div>

      <div className="tools-view">
        <div className="left">
          <h3>components</h3>
          <li>TextBox</li>
          <li>Image</li>
          <li>Button</li>
          <li>caorosel</li>
          <li>Products Section</li>
          <h3>Pages</h3>
          <li className="pages">header</li>
          <li className="pages">Home</li>
          <li className="pages">Contact</li>
          <li className="pages">services</li>
          <li className="pages">about</li>
          <li className="pages">footer</li>
        </div>
        <div className="right">123</div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
