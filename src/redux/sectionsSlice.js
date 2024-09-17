import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialSections = [
  {
    id: "1",
    type: "header",
    content: { title: "Header", items: [] },
  },
  {
    id: "2",
    type: "home",
    content: { title: "Home", items: [] },
  },
  // Other sections
];

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: initialSections,
  reducers: {
    addSection: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() });
    },
    updateSection: (state, action) => {
      const { id, newContent } = action.payload;
      const index = state.findIndex(section => section.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], content: newContent };
      }
    },
    moveSection: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.splice(oldIndex, 1);
      state.splice(newIndex, 0, removed);
    },
    resetSections: (state) => {
      return initialSections;
    }
  }
});

export const { addSection, updateSection, moveSection, resetSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;
