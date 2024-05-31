"use client"
import EmailForm from "@/components/forms/emailForm"
import {  Suspense, useState } from "react"
import SocialsLogin from "@/assets/socials/socialsLogin"
import PasswordForm from "@/components/forms/passwordForm"
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname } from "next/navigation"
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link"
export default function FormulaLogin({setShowLogin}:{

    setShowLogin?:(prevState: boolean) => void
}) {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
   
    const [next,setNext] = useState<boolean>(false)
    const pathname = usePathname()
    return (
        
        <div className={`flex flex-col  md:bg-black md:w-[50%] md:h-[80%] md:rounded-xl gap-5 md:shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)] overflow-auto login-form bg-black rounded-t-xl border-t border-white/20 h-full ${pathname == "/login"?"md:mx-auto md:mt-24 pb-36 md:pb-0":""}`}>
            <div className=" w-full text-center p-3 flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-t-xl">
                {!next?
                <>
                    {pathname !== "/login"&&<p className="self- text-2xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => {
                        //@ts-ignore
                        setShowLogin(false)}}>x
                    </p>}
                </>
                :
                <IoMdArrowRoundBack className="self- text-3xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => {
                    setPassword("")
                    setNext(false)}}/>}
                <h2 className="flex-1 font-bold  mr-14">Login</h2>
            </div>
            <div className="p-5 px-6 flex gap-6 flex-col">
                {!next&&<h3 className="text-lg">Welcome to BarberCut</h3>}
                {!next
                ?
                <div className="flex flex-col gap-10">
                    <EmailForm email={email} setEmail={setEmail} setNext={setNext}/>
                    <div className="flex justify-center relative">
                        <p className="relative text-gray-400 bg-black z-10">Or</p>
                        <div className="absolute left-0 right-0 top-3 w-full h-px bg-gray-400 z-0" />
                        
                    </div>
                    <Link href={"/signup"} className="flex bg-gray-500/20 p-2 rounded-full text-white items-center justify-center hover:bg-white/30 hover:oapcity-60 transition-all duration-300 active:opacity-50 cursor-pointer" >
                        <RiLoginCircleLine className="text-3xl self-start"/>
                        <p className="cursor-pointer flex-1 text-center mr-4">Sign up</p>
                    </Link>
                    <SocialsLogin text="Login"/>
                </div>
                :
                <Suspense>
                    <PasswordForm 
                    password={password} 
                    setPassword={setPassword}
                    email={email}
                    
                    />
                </Suspense>
                }
            </div>
        </div>
    )
}