'use client'

import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
    children: React.ReactNode;
}
export default function ConditionalLayout({
    children,
}: ConditionalLayoutProps) {
    const pathname = usePathname();

    const hideSidebarRoutes = ['/auth/signin'];
    const shouldHideSidebar = hideSidebarRoutes.includes(pathname);
    if (shouldHideSidebar) {
        return <>{children}</>;
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="md:hidden absolute" />
            {children}
        </SidebarProvider>
    )


}