"use client"
import { ChartColumnBig, ExternalLink, HandCoins, Home, } from "lucide-react"

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
import Link from "next/link"
import LogoutButton from "./logoutButton"
import { logout } from "@/helpers/serverfunction/action"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

// Menu items.
const Menuitems = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
    },
    {
        title: "Budget",
        url: "/budget",
        icon: HandCoins,
    },

    {
        title: "Statistics",
        url: "/statistics",
        icon: ChartColumnBig,
    },



]
const ManagementMenuItems = [

    {
        title: "Settings",
        url: "/setting",
        icon: ChartColumnBig,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    const userdata = useAppSelector((state): any => state?.auth?.user)
    console.log(userdata?.user, "userdata in sidebar");
    return (
        <Sidebar className=" h-screen w-64  border-r border-gray-200 bg-[#c2cac2]">
            <SidebarContent className="bg-gray-100">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-center text-2xl text-black mt-2 ">Finance Tracker</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="font-medium mt-16">
                            <h3 className="ml-5 font-nono text-[16px]">Main Menu</h3>
                            {Menuitems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={`flex text-lg font-medium   text-gray-900  pl-8   hover:bg-gray-400  ${pathname === item.url ? "bg-gray-200" : ""}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>


                        <SidebarMenu className="font-medium mt-8">
                            <h3 className="ml-5 font-nono text-[16px]">Management</h3>
                            {ManagementMenuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={`flex text-lg font-medium   text-gray-900  pl-8   hover:bg-gray-400  ${pathname === item.url ? "bg-gray-200" : ""}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>  

                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>

            <SidebarGroupLabel className="flex items-center justify-center text-2xl font-nono text-black  mb-4  p-4 gap-5 ">

                <div className="flex gap-1">
                    <div> <img src={userdata?.user?.image} alt="" className="w-9 h-9 rounded-full" /></div>

                    <div className="flex flex-col items-start">
                        <h2 className="text-[16px] text-nono text-gray-800">{userdata?.user?.name}</h2>
                        <p

                            className="text-[10px] text-gray-600 -mt-1 "
                        >
                            {userdata?.user?.email || "<Email>"}
                        </p>
                    </div>
                </div>

                <button className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-[10px] cursor-pointer -mt-[10px]" onClick={() => logout()}>
                    <ExternalLink />
                </button>


            </SidebarGroupLabel>

        </Sidebar>
    )
}