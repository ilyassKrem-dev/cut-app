import React, {  SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/assets/other/spinner";

import axios from "axios";
import VerificationInput from "@/assets/other/verify-Input";
import { useToast } from "@/components/ui/use-toast";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.action";

interface UserInfoProps {
    name:string;
    email:string;
    number:string;
    image:{
        file:File[];
        url:string
    }
}
interface Props {
    email:string;
    setShow?:React.Dispatch<SetStateAction<boolean>>;
    userInfo?:UserInfoProps;
    userDetails?:{
        id:string
        name:string,
        email:string,
        number:string,
        image:string
    };
    setNext?:(arg:number) => void
}
export default function EmailVerification(
    {
    email,
    setShow,
    userInfo,
    userDetails,
    setNext
    }
    :Props) {
        const [code,setCode] = useState<string>(() =>
        (Math.random() * (995489 - 100000) + 100000).toFixed().toString())
        const [verificationCode, setVerificationCode] = useState<string>('');
        const [sent,setSent] = useState<boolean>(false)
        const [resent,setResent] = useState<boolean>(false)
        const [verifyError,setVerifyError] = useState<string>("")
        const {toast} = useToast()
        const [time,setTime] = useState<string>("")
        const [loading,setLoading] = useState<boolean>(false)
        const {startUpload} =  useUploadThing("media")
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
        
        const handeResend = async() => {
            if(resent) return
            const newCode = (Math.random() * (995489 - 100000) + 100000).toFixed().toString();
            setCode(newCode);
            setSent(false);
            setResent(true)
        }
        const handleVerify = async() => {
            if(verificationCode == code && !setNext) {
                setLoading(true)
                if(loading) return
                let imgeUrl = ""
                const blob = isBase64Image((userInfo as any).image.url)
                if(blob) {
                    const imgFile = await startUpload((userInfo as any).image.file)
                    if(imgFile && imgFile[0].url) {
                        imgeUrl = imgFile[0].url
                    }
                }
                try {
                    const res = await updateUser(
                        {
                            userId:(userDetails as any).id,
                            name:(userInfo as any).name,
                            email:(userInfo as any).email,
                            image:imgeUrl,
                            number:(userInfo as any).number
                        }
                    )
                    if(res) {
                        toast({
                            title:"Updated",
                            description:`Your info has been updated`
                        })
                        if(setShow) {
                            setShow(false)
                            window.location.href = "/profile"

                        }
                    }
                } catch (error:any) {
                    setLoading(false)
                    if(setShow) {
                        setShow(false)
                        toast({
                            variant:"destructive",
                            title:"Error",
                            description:`${error.message}`
                        })
                    }
                }
            } else if(verificationCode == code && setNext) {
                setNext && setNext(2)
            }
            
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
                <p className="text-center text-white/60">A verification code has been sent to your email</p>
                <p className="h-1 text-accent text-sm">{verifyError}</p>
                <VerificationInput 
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}/>
                
                <p className={`underline  mt-4 cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-50 ${resent ?"text-gray-400" :""}`} onClick={handeResend}>Resend</p>
                {time&&<p>{time}</p>}
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleVerify}  disabled={loading || verificationCode.length !== 6}>
                {loading?<LoadingAnimation />:"Verify"}
            </Button>
        </div>
    )
}