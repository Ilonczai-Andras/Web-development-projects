import "./App.css";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import useCreateOrUpdateProfile from "./hooks/useCreateOrUpdateProfile";
import { Toaster } from "react-hot-toast";

function App() {
  useCreateOrUpdateProfile();
  return (
    <>
      <main className="column">
        <Header />
        <KanbanBoard />
      </main>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
