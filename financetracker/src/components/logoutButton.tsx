'use client'
import { logout } from "@/helpers/serverfunction/action";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/redux/feature/authSlice";
export default function LogoutButton() {
    const dispatch = useAppDispatch()
    const handleLogout = () => {

        logout();
        // dispatch(setUser(null))
    };

    return (
        <Button onClick={() => handleLogout()} className="w- cursor-pointer">
            Logout
        </Button>
    );
}
