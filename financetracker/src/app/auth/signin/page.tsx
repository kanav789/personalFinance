'use server'
import { auth } from "@/auth";
import { SignInButton } from "@/components/loginButton";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { redirect } from 'next/navigation';
export default async function SignIn() {
    const session = await auth()
    if (session) {
        return redirect('/')

    }


    return (
        <section className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center w-80">
                <h2 className="text-2xl font-bold mb-6">Sign In</h2>
                <SignInButton />
                <Button
                    className="flex items-center w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                    <Chrome className="mr-2 text-blue-500" size={20} />
                    Sign In with Google
                </Button>
                <p className="mt-8 text-xs text-gray-400 text-center w-full">
                    &copy; {new Date().getFullYear()} Fin Tracker. All rights reserved.
                </p>
            </div>
        </section>
    );
}
