import { BadgeDollarSign, Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "All Transactions",
        url: "#",
        icon: Calendar,
    },


]

export function AppSidebar() {
    return (
        <Sidebar className="h-screen w-64 bg-white border-r border-gray-200">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-center text-2xl text-[#6CC500] font-extrabold mt-3"><span><BadgeDollarSign /></span>FinTrack</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="font-medium mt-16">
                            <h3 className="ml-5 font-medium">General</h3>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}