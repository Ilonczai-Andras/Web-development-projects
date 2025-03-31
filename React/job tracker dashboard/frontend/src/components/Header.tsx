import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
            <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>
            <div className="flex items-center gap-4">
                {isAuthenticated && user && <span>👤 {user.name}</span>}
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    );
}
