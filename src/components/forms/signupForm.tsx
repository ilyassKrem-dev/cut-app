"use client"

import { useState } from "react"
import SocialsLogin from "@/assets/socials/socialsLogin"

import { IoMdArrowRoundBack } from "react-icons/io";
import FirstForm from "@/assets/signup/firstForm"
import SecondForm from "@/assets/signup/secondForm";
import VerifyEmail from "@/assets/signup/verifyEmail";
export default function SignUpForm() {
    const [email,setEmail] = useState<string>("")
    const [name,setName] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [isBarber,setIsBarber] = useState<boolean>(false)
    const [next,setNext] = useState<boolean>(false)
    const [verifyStep,setVerifyStep] = useState<boolean>(false)
    return (
        <div className="md:py-36 md:flex md:justify-center  pb-24 custom-scrollbar">
           <div className="flex flex-col  md:bg-black md:w-[70%] md:h-[80%] lg:max-w-[700px] md:rounded-xl gap-5 md:shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
            <div className=" w-full text-center p-3 flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-t-xl">
                {next&&<IoMdArrowRoundBack className=" text-3xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => {
                    setPassword("")
                    setNext(false)}}/>}
                <h2 className="flex-1 font-bold">Signup</h2>
            </div>
            <div className="p-5 px-6 flex gap-6 flex-col">
                {!next&&<h3 className="text-lg">Welcome to BarberCut</h3>}
                {!next
                ?
                <div className="flex flex-col gap-10">
                    <FirstForm 
                    email={email} 
                    setEmail={setEmail} 
                    setNext={setNext}
                    name={name}
                    setName={setName}
                    isBarber={isBarber}
                    setIsBarber={setIsBarber}/>
                    <div className="flex justify-center relative">
                        <p className="relative text-gray-400 bg-black z-10">Or</p>
                        <div className="absolute left-0 right-0 top-3 w-full h-px bg-gray-400 z-0" />
                        
                    </div>
                    <SocialsLogin text="Sign"/>
                </div>
                :
                next && !verifyStep 
                ?
                <SecondForm
                    password={password}
                    setPassword={setPassword}
                    setVerifyStep={setVerifyStep}
                    />       
                :
                <VerifyEmail 
                password={password} 
                email={email}
                name={name}
                isBarber={isBarber}
                />}
            </div>
            </div>
        </div>
    )
}