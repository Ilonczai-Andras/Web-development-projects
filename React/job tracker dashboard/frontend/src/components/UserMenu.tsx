import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

const UserMenu = () => {
  const { user, isAuthenticated } = useAuth0();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
      >
        {isAuthenticated && user ? (
          <>
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span>👤</span>
            )}
            <span>{user.name}</span>
            <span>▼</span>
          </>
        ) : (
          <>
            <span>Guest</span>
            <span>▼</span>
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <div className="flex flex-col p-2 space-y-2">
            <LoginButton />
            <LogoutButton />
            {/* Place for future options */}
            {/* <button className="text-left hover:bg-gray-100 p-2 rounded">Settings</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
