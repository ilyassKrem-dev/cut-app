"use client"

import { useState } from "react"
import UserCompletion from "./userCompeletion/userCompeletion";
import { useRouter } from "next/navigation";
import { SkipCompletion } from "@/lib/actions/user.action";

export default function CompleteProfile({image,isBarber,userId}:{
    image:string | null | undefined;
    isBarber:boolean;
    userId:string | null | undefined;
}) {
    const [progress,setProgress] = useState<number>(0)
    const [nextBarber,setNextBarber] = useState<boolean>(false) 
    const router = useRouter()
    const handleSkip = async() => {
        const res = await SkipCompletion(userId)
        if(res.succuss) {
            router.push('/')
        }
    }
    return (
        <div className=" md:justify-center  pb-24 custom-scrollbar">
            {!nextBarber?
            <div className="flex flex-col  md:bg-black  gap-5">
                <div className=" w-full text-center flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-t-xl  p-4 md:justify-between">
                        <p className="font-bold flex-1 md:flex ml-6">Complete profile</p>
                        <p className="text-base text-red-500 underline self-end cursor-pointer hover:opacity-60 transition-all duration-300" onClick={handleSkip}>Skip</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 z-40" style={{ width: `${progress}%` }} />     
                </div>
            
                <UserCompletion 
                setProgress={setProgress} 
                setNextBarber={setNextBarber}
                isBarber={isBarber}
                image={image}
                userId={userId}/>

            </div>
            :
            <div>
                
            </div>}
        </div>
    )
}