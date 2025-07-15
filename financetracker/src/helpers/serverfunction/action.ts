"use server"
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
export  async function login(){
 return await signIn("github",{redirectTo:"/"});
}

export async function logout() {
    const session = await signOut();
    if (session) {
        return redirect('/auth/signin');
    }
}