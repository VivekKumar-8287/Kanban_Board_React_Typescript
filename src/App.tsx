import { KanbanBoard } from "./components/kandban/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Project Kanban</h1>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;