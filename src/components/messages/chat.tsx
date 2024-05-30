"use client"

import { useCallback, useEffect, useState } from "react"
import { getConvo } from "@/lib/actions/messages.action"

import TopChat from "./chat-assets/topChat";

import ChatInput from "./chat-assets/inputs/chat-input";
import Pusher from "pusher-js";
import Messages from "./chat-assets/messages";
interface Barber {
    salonName:string;
    images:string[];
    time:string[];
    phoneNumber:string;
    id:string;
    holidays:boolean;
    openDays:string[]

}
interface Convo {
    id:string;
    messages:any[];
    createdAt:any;
    participants:{
        barber:Barber;
        user:any
    }
}
export default function Chat({convoId,userId,isBarber}:{
    convoId:string | undefined;
    userId:string|null|undefined;
    isBarber:boolean
}) {
    const [convo,setConvo] = useState<Convo|null>(null)
   
    useEffect(() => {
        const fetchConvo = async() => {
            try {
                const res = await getConvo(convoId as string,userId as string)
                if(res) setConvo(res as any)
            } catch (error) {
                console.log(error)
            }
        }
        fetchConvo()
    },[])
    console.log(convo)
    const handleNewMessage = useCallback((data: any) => {
        setConvo((prevConvo) => {
            if (!prevConvo) return prevConvo;
            return {
                ...prevConvo,
                messages: [...prevConvo.messages, data]
            };
        });
    }, []);
    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
       
        const channel = pusher.subscribe(`chat-${convoId}`);
        channel.bind("message", handleNewMessage);

        return () => {
            channel.unbind("message", handleNewMessage);
            pusher.unsubscribe(`chat-${convoId}`);
        };
        
    }, [convoId, handleNewMessage]);
    
    return (
        <div className="w-full h-full">
            {convo&&
            <div className="flex flex-col h-full"> 
                <TopChat barber={convo.participants.barber}/>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <Messages 
                    messages={convo.messages}
                    userImage={isBarber ? convo.participants.barber.images[0]:convo.participants.user.image}
                    otherUserImage={!isBarber ? convo.participants.barber.images[0]:convo.participants.user.image}
                    userId={isBarber ? convo.participants.barber.id:userId}/>
                </div>
                <ChatInput barberId={convo.participants.barber.id as string} userId={convo.participants.user.id as string} convoId={convoId as string} isBarber={isBarber}/>
            </div>}
        </div>
    )
}