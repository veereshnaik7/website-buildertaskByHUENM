import React from 'react';

const Tooltip = ({ section, onEdit, onDelete }) => {
  return (
    <div className="tooltip">
      <button onClick={() => onEdit(section.id)}>Edit</button>
      <button onClick={() => onDelete(section.id)}>Delete</button>
    </div>
  );
};

export default Tooltip;
