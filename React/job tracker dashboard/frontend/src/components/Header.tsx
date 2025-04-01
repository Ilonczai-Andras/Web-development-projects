import useCreateOrUpdateProfile from '../hooks/useCreateOrUpdateProfile'; // Import the custom hook
import UserMenu from "./UserMenu";

export const Header = () => {
    
    // Use the custom hook for creating/updating profile
    useCreateOrUpdateProfile();

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
            <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>
            <UserMenu />
        </header>
    );
};
