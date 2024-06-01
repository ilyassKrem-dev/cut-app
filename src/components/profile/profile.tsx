"use client"

import { fetchUser } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import ProfileTop from "./assets/profileTop"
interface Profile {
    id:string;
    image:string;
    name:string;
    isBarber:boolean;
    completed:boolean;
    createdAt:any;
    email:string;
    phoneNumber:string|null;
    comments:any[];
    barberId:string|null
}
export default function Profile({userId}:{
    userId:string
}) {
    const [profile,setProfile] = useState<Profile>()
    const [tab,setTab] = useState<string>("about")
    const {toast} = useToast()
    useEffect(() => {
        const getuser = async() => {
            try {
                const res = await fetchUser(userId)
                console.log(res)
                //@ts-ignore
                if(res) {
                    setProfile(res as any)
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
    
    return (
        <> 
            {profile&&
            <div className="flex flex-col pt-24 lg:p-32 md:p-12 md:pt-32 justify-center items-center md:items-start gap-10 py-36 h-full">
                <ProfileTop
                    profileImage={profile.image}
                    profileName={profile.name}
                    profileCompelted={profile.completed}
                    profileBarber={
                        {isBarber:profile.isBarber,
                        barberId:profile.barberId}
                    }
                    setTab={setTab}
                    tab={tab}
                />
                {tab=="about"
                ?
                <div className="flex justify-between w-full flex-col md:flex-row gap-5 md:gap-0 mt-10">
                    <div className="flex flex-col flex-1 gap-12 md:order-1 order-2">
                        <h4 className="text-white/60 font-bold border-b border-white/20  md:w-fit pl-4 md:pl-0 text-lg">Commentes</h4>
                        <div>
                            {profile.comments.length > 0 
                            ?
                            ""
                            :
                            <div>
                                <h2 className="text-sm text-center">You dont have any comments</h2>    
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 md:order-2  order-1 gap-6">
                        <h4 className="text-white/60 font-bold border-b border-white/20 md:w-fit pl-4 md:pl-0 text-lg">Info</h4>
                        <div className="flex flex-col gap-4 px-10">
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2">
                                <p className="font-bold w-[100px]">Phone:</p>
                                <p className="text-white/60">{profile.phoneNumber?profile.phoneNumber:"Add a number"}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2 ">
                                <p className="font-bold w-[100px]">Email:</p>
                                <p className="text-white/60">{profile.email}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2 ">
                                <p className="font-bold w-[100px]">Password:</p>
                                <p className="text-white/60">••••••••</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-between w-full flex-col md:flex-row gap-5 md:gap-0">
                    
                </div>}
            </div>}
        </>
    )
}