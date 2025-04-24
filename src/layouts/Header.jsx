

import { Bell, ChevronsLeft, Mail, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const openGmail = () => {
        const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=your-email@example.com&su=Hello&body=I%20would%20like%20to%20contact%20you%20about...";
        window.open(gmailLink, "_blank"); 
    }

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180 "} />
                </button>
                <div className="relative flex items-center w-full max-w-md">
                     <Search
                         size={20}
                         className="absolute left-3 text-slate-400"
                     />
                     <input
                         type="text"
                         name="search"
                         id="search"
                         placeholder="Search..."
                         className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  dark:border-slate-600 dark:text-white dark:focus:ring-blue-400"
                     />
                </div>

            </div>
            <div className="flex items-center gap-x-3">
                
                <button onClick={openGmail} className="btn-ghost size-10">
                    <Mail size={20} />
                </button>
                <button className="size-10 overflow-hidden rounded-full">
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
