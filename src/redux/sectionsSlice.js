// features/sections/sectionsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [
      { id: '1', type: 'header', content: 'Header' },
      { id: '2', type: 'home', content: 'Home' },
      { id: '3', type: 'contact', content: 'Contact' },
      { id: '4', type: 'services', content: 'Services' },
      { id: '5', type: 'about', content: 'About' },
      { id: '6', type: 'footer', content: 'Footer' },
    ],
    clickedSectionId: null,
  },
  reducers: {
    addSection: (state, action) => {
      state.sections.push({ id: uuidv4(), ...action.payload });
    },
    removeSection: (state, action) => {
      state.sections = state.sections.filter(section => section.id !== action.payload);
    },
    reorderSections: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.sections.splice(oldIndex, 1);
      state.sections.splice(newIndex, 0, removed);
    },
    setClickedSectionId: (state, action) => {
      state.clickedSectionId = action.payload;
    },
  },
});

export const { addSection, removeSection, reorderSections, setClickedSectionId } = sectionsSlice.actions;
export default sectionsSlice.reducer;
