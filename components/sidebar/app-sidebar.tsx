"use client";
import {
    GalleryVerticalEnd,
    Home,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingBag,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";

const routes = [
    {
        title: "Home",
        icon: Home,
        url: "/",
        pattern: /^\/$/,
    },
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/admin",
        pattern: /^\/admin$/,
    },
    {
        title: "Staffs",
        icon: Users,
        url: "/admin/staff",
        pattern: /^\/admin\/staff(?:\/.*)?$/, // Matches /admin/staff and any nested route
    },
    {
        title: "Customers",
        icon: Users,
        url: "/admin/customer",
        pattern: /^\/admin\/customer(?:\/.*)?$/,
    },
    {
        title: "Category",
        icon: ShoppingBag,
        url: "/admin/category",
        pattern: /^\/admin\/category(?:\/.*)?$/,
    },
    {
        title: "Products",
        icon: ShoppingBag,
        url: "/admin/products",
        pattern: /^\/admin\/products(?:\/.*)?$/,
    },
    {
        title: "Orders",
        icon: Package,
        url: "/admin/orders",
        pattern: /^\/admin\/orders(?:\/.*)?$/,
    },
    {
        title: "Settings",
        icon: Settings,
        url: "/admin/settings",
        pattern: /^\/admin\/settings/,
    },
];

export function AppSidebar() {
    const currentPath = usePathname();
    const isRouteActive = (pattern: RegExp) => pattern.test(currentPath);
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Print Club
                                    </span>
                                    <span>Dashboard</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {routes.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        className={`sidebar-item ${isRouteActive(item.pattern) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                                        asChild
                                    >
                                        <Link href={item?.url} className="">
                                            <item.icon />
                                            <span className="text-base font-semibold">
                                                {item?.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser
                    user={{
                        name: "Aditya",
                        email: "aditya@g.com",
                        avatar: "AK",
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
