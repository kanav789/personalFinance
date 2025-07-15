"use server"
import { signIn, signOut } from "@/auth";
export  async function login(){
 return await signIn("github",{redirectTo:"/"});
}

export async function logout() {
    return await signOut( {redirectTo:"/auth/signin"});

}