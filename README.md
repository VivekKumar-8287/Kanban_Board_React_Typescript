
# React + TypeScript Kanban Board

A professional, responsive Kanban board built with **React**, **TypeScript**, and **Tailwind CSS**. This project features a custom drag-and-drop implementation, inline editing, and a mobile-first responsive design.

## 🚀 Features

-   **Full Drag & Drop**: Move cards smoothly within columns or between different columns.
-   **Inline Editing**: Click on any card title to edit text instantly without modals.
-   **Task Management**: Add new cards to specific columns and delete existing ones.
-   **Responsive UI**: Mobile-first design where columns stack vertically on small screens and align horizontally on desktop.
-   **Visual Polish**: Color-coded headers, "lifting" card animations on drag, and clean Tailwind styling.

## 🛠️ Tech Stack

-   **Framework**: React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Drag & Drop**: `@dnd-kit/core` & `@dnd-kit/sortable`
-   **Icons**: `@heroicons/react`

## 📂 Project Structure

```text
src/
├── components/
│   └── kanban/
│       ├── KanbanBoard.tsx      # Main logic, sensors, and DndContext
│       ├── Column.tsx           # Droppable container for tasks
│       └── TaskCard.tsx         # Draggable item with inline edit logic
├── types/
│   └── kanban.ts                # TypeScript interfaces (Task, ColumnId)
├── data/
│   └── mockData.ts              # Initial board state
└── App.tsx                      # Entry point

```

## 🧠 Technical Implementation

### 1. Drag & Drop Architecture

The board uses a "Controlled Component" pattern where the state resides in `KanbanBoard.tsx`. We use `closestCorners` collision detection and `PointerSensors` to ensure compatibility across mouse and touch devices.

### 2. Mobile Optimization

To prevent "accidental drags" while scrolling on mobile, I implemented an `activationConstraint` of 8 pixels. This ensures the browser distinguishes between a click/scroll and an intentional drag-and-drop action.

### 3. Component Hierarchy

## ⚡ Getting Started

1. **Install dependencies**:
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @heroicons/react

```


2. **Run the project**:
```bash
npm run dev

```



## 📝 Assignment Requirements Checklist

* [x] Add / Delete Cards
* [x] Move Cards Between Columns (Preserve order)
* [x] Editable Card Title (Inline)
* [x] Responsive Layout (Desktop + Mobile)
* [x] React + TypeScript + Clean State Management

