import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Restore session on reload
  useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      {user ? (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Please login to access the Resume Analyzer
        </div>
      )}
    </div>
  );
};

export default Dashboard;
