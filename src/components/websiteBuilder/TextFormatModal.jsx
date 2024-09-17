import React, { useState } from "react";

const TextFormatModal = ({ itemIndex, itemContent, onClose, onApply }) => {
  const [options, setOptions] = useState(itemContent.style || {});

  const handleApply = () => {
    onApply(itemIndex, options);
    onClose();
  };

  return (
    <div className="modal">
      <h3>Text Formatting</h3>
      <label>
        Font Size:
        <select
          value={options.fontSize || "16px"}
          onChange={(e) => setOptions({ ...options, fontSize: e.target.value })}
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
      </label>
      <label>
        Bold:
        <input
          type="checkbox"
          checked={options.isBold || false}
          onChange={(e) => setOptions({ ...options, isBold: e.target.checked })}
        />
      </label>
      <label>
        Italic:
        <input
          type="checkbox"
          checked={options.isItalic || false}
          onChange={(e) => setOptions({ ...options, isItalic: e.target.checked })}
        />
      </label>
      <button onClick={handleApply}>Apply</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TextFormatModal;
