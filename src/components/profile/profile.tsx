
"use client"

import { fetchUser } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"

import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
export default function Profile({userId}:{
    userId:string
}) {
    const [profile,setProfile] = useState<any>()
    const {toast} = useToast()
    useEffect(() => {
        const getuser = async() => {
            try {
                const res = await fetchUser(userId)
                //@ts-ignore
                if(res) {
                    setProfile(res)
                }else {
                    toast({
                        variant:"destructive",
                        title:"Error",
                        //@ts-ignore
                        description:res.message,
                        action:<ToastAction altText="Close">Close</ToastAction>
                    })
                }
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message,
                    action:<ToastAction altText="Close">Close</ToastAction>
                })
            }
            
        }
        getuser()
    },[userId])
    console.log(profile)
    return (
        <> 
            <div>
                
            </div>
        </>
    )
}