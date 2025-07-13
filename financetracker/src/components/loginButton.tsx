'use client'
import { Github } from "lucide-react"
import { Button } from "./ui/button"
import { login } from "@/helpers/serverfunction/action"

export const SignInButton = () => {

    return (
        <Button
            className="flex items-center w-full mb-3 bg-gray-900 text-white hover:bg-gray-800 cursor-pointer" onClick={() => login()}
        >
            <Github className="mr-2" size={20} />
            Sign In with GitHub
        </Button>
    )
}