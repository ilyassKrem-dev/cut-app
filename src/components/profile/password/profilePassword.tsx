"use client"
import { useState } from "react"
import OldPassword from "./oldPassword"
import NewPassword from "../../shared/newPassowrd"
import Link from "next/link"
import LoadingAnimation from "@/assets/other/spinner"
import { useToast } from "@/components/ui/use-toast"
import { changeUserPassword } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"
interface UserPass {
    oldPass:string;
    newPass:string;
    confirmPass:string;
}

export default function ProfilePassword({userId}:{
    userId?:string,
}) {
    const [userPassword,setUserPassword] = useState<UserPass>({
        oldPass:"",newPass:"",confirmPass:""
    })
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {toast} = useToast()
    const checkPassowrd = userPassword.oldPass.length >=6 && userPassword.newPass.length>=6&& userPassword.confirmPass.length>=6 && userPassword.newPass == userPassword.confirmPass && userPassword.oldPass !== userPassword.newPass

    const handleSave = async() => {
        if(loading || !checkPassowrd) return
        setLoading(true)
        try {
            const res =  await changeUserPassword(
                    {
                        passwords:userPassword,
                        userId:userId
                    }
                )
            if(res) {
                setLoading(false)
                router.push("/profile")

            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:`${error.message}`
            })
        }
    }
    return (
        <div className="md:py-28 py-12 md:mx-auto md:w-[50%] pb-32">
            <div className=" flex justify-center flex-col items-center ">
                <h1 className="text-lg font-bold">
                    Change password
                </h1>
                <div className="mx-4 mt-16 flex flex-col items-center justify-center gap-10 w-full">
                    <OldPassword 
                    userPassword={userPassword}
                    setUserPassword={setUserPassword}
                    />
                    <NewPassword 
                    userPassword={userPassword}
                    setUserPassword={setUserPassword}
                    />
                    <div className="flex gap-2 px-10 w-full">
                    
                    <Link href={"/profile"} className="bg-black-1 rounded-2xl px-4 p-2 text-white flex-1 border border-white/10 hover:bg-white/20 hover:opacity-70 transition-all duration-300 active:opacity-50 active:bg-white/40 text-center">
                        Back
                    </Link>
                    <button className="bg-green-1 rounded-full px-4 p-2 text-white flex-1 hover:bg-green-1/20 hover:opacity-70 transition-all duration-300 active:opacity-50 active:bg-green-1/40 disabled:bg-green-1/10 disabled:cursor-default disabled:border disabled:border-white/10 " disabled={!checkPassowrd||loading} onClick={handleSave}>
                        {loading?<LoadingAnimation/>:"Change"}
                    </button>
                </div>
                </div>
            </div>

        </div>
    )
}