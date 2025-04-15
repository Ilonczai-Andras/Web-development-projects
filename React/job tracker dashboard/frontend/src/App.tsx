import "./App.css";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import ReminderView from "./components/Reminder/ReminderView";
import { Spinner } from "./components/Spinner";
import useCreateOrUpdateProfile from "./hooks/Profile/useCreateOrUpdateProfile";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicHome from "./components/PublicHome"; // új
import { useEffect } from "react";

function App() {
  const mutation = useCreateOrUpdateProfile();
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && mutation.status === "idle") {
      mutation.mutate();
    }
  }, [isAuthLoading, isAuthenticated, mutation]);

  if (mutation.isPending || isAuthLoading) return <Spinner />;

  if (mutation.isError) {
    return (
      <div className="text-red-600 text-center mt-4">
        ⚠ Nem sikerült betölteni a profiladatokat.
      </div>
    );
  }

  const storedView = localStorage.getItem("view-mode");
  const defaultRoute = isAuthenticated ? `/${storedView || "board"}` : "/home";

  return (
    <>
      <main className="column">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={defaultRoute} replace />} />
          <Route path="/home" element={<PublicHome />} />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <KanbanBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reminders"
            element={
              <ProtectedRoute>
                <ReminderView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
