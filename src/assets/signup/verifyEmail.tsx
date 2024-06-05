import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/assets/other/spinner";

import axios from "axios";
import { signIn } from "next-auth/react";
import VerificationInput from "../other/verify-Input";
import { useRouter } from "next/navigation";
export default function VerifyEmail(
    {
    password, 
    email,
    name,
    isBarber
    }
    :
    {
        password:string;
        email:string;
        name:string;
        isBarber:boolean
    }) {
        const [code,setCode] = useState<string>(() =>
        (Math.random() * (995489 - 100000) + 100000).toFixed().toString())
        const [verificationCode, setVerificationCode] = useState<string>('');
        const [sent,setSent] = useState<boolean>(false)
        const [resent,setResent] = useState<boolean>(false)
        const [verifyError,setVerifyError] = useState<string>("")
        const [time,setTime] = useState<string>("")
        const [loading,setLoading] = useState<boolean>(false)
        const router = useRouter()
        useEffect(() => {
            const id = setInterval(() => {
                setCode((Math.random()*(995489-100000)+100000).toFixed().toString())
            },300000)
            if(sent) return
            sendCode();
            setSent(true)
            return () => clearInterval(id)

        },[code,sent])
        const sendCode = async () => {
            try {
                await axios.post("/api/send", {
                    email: email,
                    code: code
                });
            } catch (error) {
                setVerifyError("Error, try again later");
            }
        };
        const handleLogin = async() => {
            
            setLoading(true)
            if(verificationCode !== code) {
                setLoading(false)
                return setVerifyError("Wrong code")
            }
            try {
                const res = await axios.post('/api/signup',{
                    email:email.toLowerCase(),
                    password:password,
                    name:name,
                    isBarber:isBarber
                })
                if(res.data.message) {
                    setLoading(false)
                    return setVerifyError(res.data.message)
                }
                if(res.data.success) {
                    const login=await signIn("credentials",{
                        redirect:false,
                        email
                    })
                    if(login) {
                        router.push('/')
                    }
                }
                setLoading(false)
            } catch (error:any) {
                setLoading(false)
                setVerifyError("Error,try again later")
            }
        }
        const handeResend = async() => {
            if(resent) return
            const newCode = (Math.random() * (995489 - 100000) + 100000).toFixed().toString();
            setCode(newCode);
            setSent(false);
            setResent(true)
        }
        useEffect(() => {
            
            

            
            if(!resent) return
            const id = setTimeout(() => {
                setResent(false)
            },300000) 

            return () => {
                clearTimeout(id)
                }
        },[resent])
       useEffect(() => {
        if(!resent) return
        let s = 0
        let m = 5
        const id = setInterval(() => {
            if(s==0) {
                m--;
                s=59  
            } else {
                s--
            }
            setTime(`${m}:${s>9?s:"0"+s}`) 
        },1000)
        return () => clearInterval(id)
       },[resent])
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center flex-col gap-4">
                <h3 className="font-bold">Verify email</h3>
                <p className="text-center">A verification code has been sent to your email</p>
                <p className="h-1 text-accent text-sm">{verifyError}</p>
                <VerificationInput 
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}/>
                
                <p className={`underline  mt-4 cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-50 ${resent ?"text-gray-400" :""}`} onClick={handeResend}>Resend</p>
                {time&&<p>{time}</p>}
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleLogin} disabled={loading || verificationCode.length !== 6}>
                {loading?<LoadingAnimation />:"Verify"}
            </Button>
        </div>
    )
}