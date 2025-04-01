import ApplicationModal from "./Modal/ApplicationModal";
import { useState } from "react";
import UserMenu from "./UserMenu";

export const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
            <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setModalOpen(true)}
                    className="h-10 px-4 rounded-lg bg-white text-gray-800 shadow flex items-center hover:bg-gray-100 transition-colors"
                >
                    + New Application
                </button>

                <UserMenu />
            </div>

            <ApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </header>
    );
};
