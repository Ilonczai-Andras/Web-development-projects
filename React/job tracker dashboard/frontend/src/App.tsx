import "./App.css";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import { Spinner } from "./components/Spinner";
import useCreateOrUpdateProfile from "./hooks/Profile/useCreateOrUpdateProfile";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const mutation = useCreateOrUpdateProfile();

  if (mutation.isPending) return <Spinner />;

  if (mutation.isError) {
    return (
      <div className="text-red-600 text-center mt-4">
        ⚠ Nem sikerült betölteni a profiladatokat.
      </div>
    );
  }

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
