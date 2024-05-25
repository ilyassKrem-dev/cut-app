"use client"
import { Contact, ScissorsLineDashed } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import UserContact from "../userContact/userContact"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
export default function SideBar() {
    const {data:session,status} = useSession()
    const [tab,setTab] = useState<string>("user")
    const router = useRouter()
    const handleClick = (tab:string) => {
        setTab(tab)
    }
    useEffect(() => {
        if(session || status=="loading") return
        router.push("/")
    },[session,status])
    return (
        <>
            <div className="flex-col border-r border-white/10   py-6 w-[350px] hidden md:flex">
                <h1 className=" px-4 text-lg border-b border-white/10 pb-4">Messages</h1>
                {status=="loading"?
                <>
                    
                    <Skeleton className="h-[48px] rounded-none bg-white/20"/>
                    {[...Array(2)].map((_,index) => {
                        return (
                            <div key={index} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4">
                                <Skeleton 
                                className="rounded-full w-[40px] h-[40px] bg-white/10" />
                                <div className="flex flex-col w-full mt-1">
                                    <Skeleton className="w-full h-3 bg-white/10"/>
                                </div>
                            </div>
                        )
                    })}
                </>
                :
                session?
                <>
                    {(session.user as  any).isBarber&&<div className="flex items-center border-y border-white/10 justify-center bg-darker/80">
                        <div className={`px-10 py-3 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300 ${tab === "user"?"bg-black":"opacity-40"}`} onClick={() => handleClick("user")}>
                            <Contact className="text-center w-full"/>
                        </div>
                        <div className={`px-10 py-2 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300  ${tab === "clients"?"bg-black":"opacity-40"}`} onClick={() => handleClick("clients")}>
                            <ScissorsLineDashed className="text-center w-full"/>
                        </div>
                    </div>}
                    {tab=="user"?
                    <UserContact userId={session.user?.id}/>
                    :
                    ""}
                </>
                :
                ""}
            </div>
        </>
    )
}