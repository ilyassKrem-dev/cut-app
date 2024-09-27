import Link from "next/link";
import { LuMessagesSquare } from "react-icons/lu";
import { getUnreedMessagesN } from "@/lib/actions/messages.action";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import Pusher from "pusher-js";

export default function MessagesIcon({userId}:{
    userId:string
}) {
    const [unseenNumber,setUnseenNumber] = useState<string[]>([])
    const {toast} = useToast()
    const pathname = usePathname()
    useEffect(() => {
        const getNumberUnseen = async() => {
            try {
                const res = await getUnreedMessagesN(userId)
                setUnseenNumber(res)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        getNumberUnseen()
    },[userId,pathname,toast]) 
    useEffect(() => {
        if(!pathname.startsWith("/messages/")) return
        const splited = pathname.split("/")[2];
        if(!unseenNumber.includes(splited)) return
        setUnseenNumber(prev => {
            return prev.filter(str => str !== splited)
        });
    },[pathname,unseenNumber])

    const handleNewMessage = useCallback( (data: any) => {
        if(pathname.includes(data.convoId)) return
        setUnseenNumber(prev => {
            return [...prev,data.convoId]
        })
    
        
    }, [pathname]);
   
    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
       
        const channel = pusher.subscribe(`messages`);
        channel.bind("navBar", handleNewMessage);

        return () => {
            channel.unbind("navBar", handleNewMessage);
            pusher.unsubscribe(`messages`);
        };
        
    }, [unseenNumber,handleNewMessage]);
    return (
        <Link href={"/messages"} className="group relative">
            <LuMessagesSquare className=" hover:opacity-60 transition-all duration-300 cursor-pointer"/>
            {unseenNumber.length > 0 && <div className={`absolute -right-3 -top-3 rounded-full  bg-accent ${unseenNumber.length>10?"p-[0.25rem] px-[0.3rem] text-xs":"p-[0.25rem] px-[0.5rem] text-xs"}`}>
                    {unseenNumber.length > 10 ? "10+":unseenNumber.length}
            </div>}
            <div className="absolute text-xs bg-dark rounded-lg -left-[25px] -bottom-8 p-1 hidden group-hover:block text-gray-300 px-2">
                <p>messages</p>
            </div>
        </Link>
    )
}