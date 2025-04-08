import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import ReminderView from "./components/Reminder/ReminderView";
import { Spinner } from "./components/Spinner";
import useCreateOrUpdateProfile from "./hooks/Profile/useCreateOrUpdateProfile";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const mutation = useCreateOrUpdateProfile();

  const { isLoading: isAuthLoading } = useAuth0();

  if (mutation.isPending || isAuthLoading) return <Spinner />;

  if (mutation.isError) {
    return (
      <div className="text-red-600 text-center mt-4">
        ⚠ Failed to load profile information.
      </div>
    );
  }

  const defaultRoute = localStorage.getItem("view-mode") || "board";

  return (
    <>
      <main className="column">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={`/${defaultRoute}`} replace />} />
          <Route path="/board" element={<KanbanBoard />} />
          <Route path="/reminders" element={<ReminderView />} />
        </Routes>
      </main>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
