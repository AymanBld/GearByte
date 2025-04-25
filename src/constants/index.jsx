import { Home, Package, PackagePlus, Users } from "lucide-react";
import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/profile-image.jpg";

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

