import "./App.css";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import useCreateOrUpdateProfile from "./hooks/useCreateOrUpdateProfile";

function App() {
  useCreateOrUpdateProfile();
  return (
    <>
      <main className="column">
        <Header />
        <KanbanBoard />
      </main>
    </>
  );
}

export default App;
