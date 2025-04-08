import { useAuth0 } from "@auth0/auth0-react";
import ApplicationModal from "./Modal/Application/ApplicationModal";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

export const Header = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    getAccessTokenSilently()
      .then((token) => console.log("Token: ", token))
      .catch((err) => console.error("Token hiba:", err));
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
      <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <button
            onClick={() => setModalOpen(true)}
            className="h-10 px-4 rounded-lg bg-white text-gray-800 shadow flex items-center hover:bg-gray-100 transition-colors"
          >
            + New Application
          </button>
        )}

        <UserMenu />
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </header>
  );
};
