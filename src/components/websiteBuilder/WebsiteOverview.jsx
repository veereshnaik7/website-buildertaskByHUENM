import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import WebsiteSection from "./WebsiteSection";

const WebsiteOverview = ({ items, isEditMode, onContentChange }) => {
  return (
    <div>
      <SortableContext strategy={verticalListSortingStrategy} items={items}>
        {items.map((item) => (
          <WebsiteSection
            id={item.id}
            type={item.type}
            key={item.id}
            content={item.content}
            isEditMode={isEditMode}
            onContentChange={onContentChange}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default WebsiteOverview;