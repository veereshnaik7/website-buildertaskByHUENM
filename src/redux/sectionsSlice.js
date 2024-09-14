import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('sections')) || [
  { id: "1", type: "header", content: "Header" },
  { id: "2", type: "home", content: "Home" },
  { id: "3", type: "contact", content: "Contact" },
  { id: "4", type: "services", content: "Services" },
  { id: "5", type: "about", content: "About" },
  { id: "6", type: "footer", content: "Footer" },
];

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('sections', JSON.stringify(state));
    },
    removeSection: (state, action) => {
      const updatedSections = state.filter(section => section.id !== action.payload);
      localStorage.setItem('sections', JSON.stringify(updatedSections));
      return updatedSections;
    },
    updateSection: (state, action) => {
      const { id, content } = action.payload;
      const section = state.find(section => section.id === id);
      if (section) {
        section.content = content;
        localStorage.setItem('sections', JSON.stringify(state));
      }
    },
    setSections: (state, action) => {
      localStorage.setItem('sections', JSON.stringify(action.payload));
      return action.payload;
    }
  },
});

export const { addSection, removeSection, updateSection, setSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;
