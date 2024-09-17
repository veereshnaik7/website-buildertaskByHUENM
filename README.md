## Website Builder App
This project is a simple website builder built with React. It allows users to dynamically add, edit, and reorder different sections of a website. The sections can be customized, reordered through drag-and-drop, and saved locally to the browser. The project supports both desktop and mobile views.

## Table of Contents
-> Features
-> Technologies Used
-> Installation
-> Usage

##  Features
1. Dynamic Section Addition: Users can add predefined sections (e.g., 
   Header, Home, Contact, Services, etc.) to the website layout.
2.Drag-and-Drop Functionality: Sections can be reordered using drag-and-drop functionality.
3 .Edit Mode: Content within each section is editable, allowing users to customize the text and elements.
4. Mobile and Desktop Views: Switch between mobile and desktop previews with easy-to-use controls.
5. Save and Reset: Save the current state of the website to local storage, or reset the layout to its initial state.
6.Persistent Data: Website sections and their positions are saved in local storage, making the layout persistent even after refreshing the page.
7. WebsiteEditor: Main component that controls the addition, deletion, and editing of sections. It manages the layout and allows toggling between views (desktop or mobile).
8. WebsiteOverview: Renders the list of sections, managing their sorting and organization.
9. WebsiteSection: Responsible for rendering individual sections, enabling content editing and dragging functionality.

## Technologies Used
1. React.js: A JavaScript library for building user interfaces.
2. React Icons: Used for icons like arrows, desktop, and mobile icons.
3. @dnd-kit/core: For drag-and-drop functionality.
4. @dnd-kit/sortable: For reordering items using drag-and-drop.
5. uuid: Used to generate unique IDs for new sections.
6. React draggable


## Installation
1. git clone "https://github.com/veereshnaik7/website-buildertaskByHUENM.git"
2. cd website-builder
3. npm install
4. npm start

## Usage
1. Home Page: When you start the app, you will see the home page. Click on "Get Started" to go to the editor.
2. Website Editor :
   -> Add new components using the dropdown on the left.
   -> Drag and drop sections to reorder them.
   -> Edit section content by clicking on the section while in edit mode.
   -> Toggle between edit and preview modes using the buttons at the top.
   -> Save your changes to LocalStorage or reset the sections.

## Thank You
I developed this project as part of a task from Hunem during the hiring process. I explored various tools and techniques and put in a lot of effort to create a functional and creative solution. It was a fantastic learning experience, and I’m excited to share what I’ve built.

Thank you for taking the time to review my work. I hope it aligns with what you were looking for!
