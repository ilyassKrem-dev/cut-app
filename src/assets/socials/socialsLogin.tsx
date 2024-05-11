
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function SocialsLogin({text}:{
    text:string
}) {
    
    const pathname = usePathname()
    console.log(pathname)
    const handleSocialsLogin = async() => {
        await signIn("google",{ callbackUrl: pathname === "/signup"?"/":pathname })
    }
    return (
        <div className="flex bg-gray-500/20 p-2 rounded-full text-white items-center justify-center hover:bg-white/30 hover:oapcity-60 transition-all duration-300 active:opacity-50 cursor-pointer" onClick={handleSocialsLogin}>
            <FcGoogle className="text-3xl self-start"/>
            <p className="cursor-pointer flex-1 text-center mr-4">{text} with google</p>
        </div>
    )
}