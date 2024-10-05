import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AppBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/signin");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between px-10 py-2 border-b">
            <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            <div className="flex space-x-8 items-center">
                <Link to={"/publish"} className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write">
                        <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
                        <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
                    </svg>
                    Write
                </Link>

                <div className="relative">
                    <div
                        className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-8 h-8 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <span className="font-medium text-white">
                             {(() => {
                                 const username = localStorage.getItem("username");
                                 return username ? username[0].toUpperCase() : "Anonymous";
                             })()}
                        </span>
                    </div>

                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                        >
                            <button
                                onClick={handleSignOut}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
