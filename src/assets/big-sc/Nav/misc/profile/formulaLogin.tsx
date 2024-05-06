"use client"
import EmailForm from "@/components/forms/emailForm"
import { SetStateAction, useState } from "react"
import SocialsLogin from "@/assets/socials/socialsLogin"
import PasswordForm from "@/components/forms/passwordForm"
import { IoMdArrowRoundBack } from "react-icons/io";

export default function FormulaLogin({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
   
    const [next,setNext] = useState<boolean>(false)

    return (
        
        <div className="flex flex-col  md:bg-black md:w-[50%] md:h-[80%] md:rounded-xl gap-5 md:shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
            <div className=" w-full text-center p-3 flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-t-xl">
                {!next?
                <p className="self- text-2xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => setShow(false)}>x</p>
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
                    <SocialsLogin text="Login"/>
                </div>
                :
                <PasswordForm 
                password={password} 
                setPassword={setPassword}
                email={email}
                setShow={setShow}
                />
                }
            </div>
        </div>
    )
}