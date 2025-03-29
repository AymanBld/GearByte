// import { NavLink } from "react-router-dom";
// import { navbarLinks } from "../constants/index";
// import { cn } from "../utiles/cn";
// import PropTypes from "prop-types";
// import Logo from '../assets/logo.png'
// const Sidebar = ({ collapsed }) => {
//     return (
//         <aside
//             className={cn(
//                 "fixed z-[100] h-full border-r border-slate-300 bg-white transition-all",
//                 collapsed ? "w-[70px] items-center" : "w-[240px]",
//                 collapsed ? "max-md:-left-full" : "max-md:left-0"
//             )}
//         >
//             {/* Sidebar Header (Logo) */}
//             <div className="flex items-center gap-x-3 p-4">
//                 <img src={Logo} alt="Logo" className="h-6" />
//                 {!collapsed && <p className="text-xl font-bold text-slate-900"> <span className="text-[#EA3C3C]"> Gear</span>Byte</p>}
//             </div>

//             {/* Sidebar Links */}
//             <div className="flex w-full flex-col gap-y-4 overflow-y-auto  h-[calc(100vh-64px)] p-3 [scrollbar-width:_thin]">
//                 {navbarLinks.map((navbarLink) => (
//                     <nav
//                         key={navbarLink.title}
//                         className={cn("sidebar-group", collapsed && "md:items-center")}
//                     >
//                         <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p>
//                         {navbarLink.links.map((link) => (
//                             <NavLink
//                                 key={link.label}
//                                 to={link.path}
//                                 className={cn("sidebar-item", collapsed && "md:w-[45px]")}
//                             >
//                                 <link.icon
//                                     size={22}
//                                     className="flex-shrink-0"
//                                 />
//                                 {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
//                             </NavLink>
//                         ))}
//                     </nav>
//                 ))}
//             </div>
//         </aside>
//     );
// };

// Sidebar.propTypes = {
//     collapsed: PropTypes.bool,
// };

// export default Sidebar;






import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/index";
import { cn } from "../utiles/cn";
import PropTypes from "prop-types";
import Logo from '../assets/logo.png';
import { forwardRef } from "react";


export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white ",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <img
                    src={Logo}
                    alt="GearByte"
                    className="h-8"
                />
               
                {!collapsed && <p className="text-2xl  font-bold text-slate-900"><span className="text-[#EA3C3C]">Gear</span>Byte</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p>
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                className={cn("sidebar-item", collapsed && "md:w-[45px]",
                                    link.path === "/logout" &&"logout-link"
                                   

                                )}
                            >
                                <link.icon
                                    size={22}
                                    className="flex-shrink-0"
                                />
                                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});



