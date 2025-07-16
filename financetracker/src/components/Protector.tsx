"use client";

import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/redux/feature/authSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Protector({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === "unauthenticated") {
            dispatch(setUser(null));
            router.push("/auth/signin");
        } else {
            dispatch(setUser(session))
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen mx-auto">
            <ClipLoader size={50} />
        </div>;
    }


    return <>{children}</>;
}
