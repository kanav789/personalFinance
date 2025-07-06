"use client"
import { BadgeDollarSign, ChartColumnBig, ExternalLink, Home, Wallet, } from "lucide-react"

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
import { usePathname } from "next/navigation"

// Menu items.
const Menuitems = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "Transactions",
        url: "/alltransactions",
        icon: Wallet,
    },
    {
        title: "Statistics",
        url: "/alltransactions",
        icon: ChartColumnBig,
    },



]
const ManagementMenuItems = [

    {
        title: "Settings",
        url: "/settings",
        icon: ChartColumnBig,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar className=" h-screen w-64  border-r border-gray-200 bg-[#c2cac2]">
            <SidebarContent className="bg-[#F6F7F6]">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-center text-2xl font-nono text-black mt-2">FINFLOW</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="font-medium mt-16">
                            <h3 className="ml-5 font-nono text-[16px]">Main Menu</h3>
                            {Menuitems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={`flex text-[20px] text-gray-700 pl-8 font-medium font-serif hover:bg-gray-400  ${pathname === item.url ? "bg-gray-200" : ""}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>


                        <SidebarMenu className="font-medium mt-8">
                            <h3 className="ml-5 font-nono text-[16px]">Management</h3>
                            {ManagementMenuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={`flex text-[20px] text-gray-700 pl-8 font-medium font-serif hover:bg-gray-400  ${pathname === item.url ? "bg-gray-200" : ""}`}>
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

            <SidebarGroupLabel className="flex items-center justify-center text-2xl font-nono text-black  mb-4  p-4 gap-5">
                <div className="flex gap-1">
                    <div> <img src="https://avatars.githubusercontent.com/u/106293653?v=4" alt="" className="w-9 h-9 rounded-full" /></div>

                    <div className="flex flex-col items-start">
                        <h2 className="text-[16px] text-nono text-gray-800">Admin</h2>
                        <a className="text-[10px] text-gray-600 -mt-1">kanavcontact@gmail.com</a>
                    </div>
                </div>

                <div className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-[10px] cursor-pointer -mt-[10px]">
                    <ExternalLink />
                </div>


            </SidebarGroupLabel>

        </Sidebar>
    )
}