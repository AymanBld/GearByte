import { Home, Package, PackagePlus, Users, Monitor, MonitorUp, FolderTree, ClipboardList } from "lucide-react";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/dashboard",
            },
        ],
    },
    {
        title: "Orders",
        links: [
            {
                label: "Orders",
                icon: Users,
                path: "/dashboard/orders",
            },
            {
                label: "Rental Requests",
                icon: ClipboardList,
                path: "/dashboard/rental-requests",
            },
        ],
    },
    {
        title: "Products",
        links: [
            {
                label: "New product",
                icon: PackagePlus,
                path: "/dashboard/new-product",
            },
            {
                label: "Products",
                icon: Package,
                path: "/dashboard/products",
            },
            {
                label: "Categories",
                icon: FolderTree,
                path: "/dashboard/categories",
            },
        ],
    },
    {
        title: "Rental PCs",
        links: [
            {
                label: "Add PC",
                icon: MonitorUp,
                path: "/dashboard/add-pc",
            },
            {
                label: "All PCs",
                icon: Monitor,
                path: "/dashboard/rental-pcs",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

