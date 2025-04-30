import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "../../Hooks/use-click-outside";
import { Sidebar } from "../../layouts/Sidebar";
import { Header } from "../../layouts/Header";
import { cn } from "../../utils/cn";
import { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useEffect(() => {
        // Check if user is admin
        const checkAdminStatus = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            fetchWithAuth('auth/user/')
            .then(response => {
                if (!response.ok) throw new Error('Not authorized');
                return response.json();
            })
            .then(data => {
                setIsAdmin(data.is_staff);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsAdmin(false);
                setLoading(false);
            });
        };

        checkAdminStatus();
    }, []);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-700 mb-6">
                        You do not have permission to access the admin dashboard.
                        Please contact an administrator if you believe this is an error.
                    </p>
                    <a 
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            />
            <Sidebar
                ref={sidebarRef}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div 
                className={cn(
                    "transition-[margin] duration-300", 
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
                )}
            >
                <Header 
                    collapsed={collapsed} 
                    setCollapsed={setCollapsed} 
                />
                <main className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
