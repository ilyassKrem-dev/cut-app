"use client"
import { Contact, ScissorsLineDashed } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import UserContact from "./userContact"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter,usePathname } from "next/navigation"
import { getContacts } from "@/lib/actions/messages.action"
import Pusher from "pusher-js";

export default function SideBar() {
    const {data:session,status} = useSession()
    const [tab,setTab] = useState<string>("user")
    const router = useRouter()
    const pathname = usePathname()
    const [convos,setConvos] = useState<any |null | boolean>(null)
    useEffect(() => {
        if(!session) return
        const fetchCons = async() => {
            try {
                const res = await getContacts(session?.user?.id as string,tab)
                if(res) {
                
                    return setConvos(res)
                }
            } catch (error:any) {
                console.log(error.message)
            }
        }
        fetchCons()
    },[session,tab])
    const handleNewMessage = useCallback((data: any) => {
        const newArray = [] as any;
        convos.map((conv:any) => {
            if(conv.id === data.convoId) {
                return newArray.unshift({
                    ...conv,
                    messages: data.content
                });
            } else {
                return newArray.push(conv)
            }
        })
        setConvos(newArray);
    }, [convos]);
    useEffect(() => {
        if(!convos || convos.length==0) return
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
        let channel:any;
        convos.forEach((convo:any) => {
            channel = pusher.subscribe(`chat-${convo.id}`);
            channel.bind("message", handleNewMessage);
            
        })

        return () => {
            convos.forEach((convo:any) => {
                channel.unbind("message", handleNewMessage);
                pusher.unsubscribe(`chat-${convo.id}`);
            })
        };
        
    }, [convos, handleNewMessage]);
    const changeTab = (tabC:string) => {
        if(!convos || convos==undefined || tabC===tab) return
        setConvos(false)
        setTab(tabC)
    }
    useEffect(() => {
        if(session || status=="loading") return
        router.push("/")
    },[session,status])
    return (
        <div className={`flex-col border-r border-white/10   py-6 w-full md:w-[350px]   ${pathname !== "/messages"? "hidden md:flex":"flex"}`}>
            <h1 className=" px-4 text-lg border-b border-white/10 pb-4 text-center md:text-start">Messages</h1>
            {status=="loading"?
            <>
                
                <Skeleton className="h-[48px] rounded-none bg-white/20"/>
                {[...Array(2)].map((_,index) => {
                    return (
                        <div key={index} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4 w-full md:w-[350px]">
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
            session && convos !==null?
            <>
                {(session.user as  any).isBarber&&<div className="flex items-center border-y border-white/10 justify-center bg-darker/80">
                    <div className={`px-10 py-3 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300 ${tab === "user"?"bg-black":"opacity-40"}`} onClick={() => changeTab("user")}>
                        <Contact className="text-center w-full"/>
                    </div>
                    <div className={`px-10 py-2 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300  ${tab === "clients"?"bg-black":"opacity-40"}`} onClick={() => changeTab("clients")}>
                        <ScissorsLineDashed className="text-center w-full"/>
                    </div>
                </div>}
            
                <UserContact convos={convos} tab={tab}/>
            </>
            :
            ""}
        </div>
        
    )
}