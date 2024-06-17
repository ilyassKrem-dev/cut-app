"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { getConvo } from "@/lib/actions/messages.action"
import { usePathname } from "next/navigation";
import TopChat from "./chat-assets/topChat";
import { useToast } from "../ui/use-toast";
import ChatInput from "./chat-assets/inputs/chat-input";
import Pusher from "pusher-js";
import Messages from "./chat-assets/messages";
import LoadingAnimation from "@/assets/other/spinner";
import axios from "axios";
interface Barber {
    salonName:string;
    images:string[];
    time:string[];
    phoneNumber:string;
    id:string;
    holidays:boolean;
    openDays:string[];
    userId:string

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
export default function Chat({convoId,userId,isBarber,barberId}:{
    convoId:string | undefined;
    userId:string|null|undefined;
    isBarber:boolean;
    barberId:string
}) {
    const [convo,setConvo] = useState<Convo|null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {toast} = useToast()
    const pathname = usePathname()
    const handelSeenMsg = async(res?:any) => {
        
        try {
            let seenMsgs;
            if(res !=="One") {
                seenMsgs = await axios.post("/api/messages/seen",{
                    userId: isBarber ? res.participants.barber.id : userId,
                    isBarber:isBarber,
                    convoId:res.id
                })
            } else {
                
                seenMsgs = await axios.post("/api/messages/seen",{
                    userId: isBarber ? barberId : userId,
                    isBarber:isBarber,
                    convoId:convo?.id,
                    type:"One"
                })
            }
            return seenMsgs
        } catch (error) {
            throw new Error(`Internal server error`)
        }
    }
    useEffect(() => {
        const fetchConvo = async() => {
            try {
                const res = await getConvo(convoId as string,userId as string)
                if(res) {
                    
                    setConvo(res as any)
                    await handelSeenMsg(res)
                    
                } 
            } catch (error:any) {
                
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.response.data.error
                })

            }
        }
        fetchConvo()
    },[])
    const handleSeenMessages = useCallback( (data: any) => {
        if(typeof data == "object") {
            
            setConvo((prev:any) => {
                const newData = prev.messages.map((msg:any) => {
                    if(msg.id === data.id) {
            
                        return data
                    }
                    return msg
                })
                return {...prev,messages:newData}
            })
        }else {
            
            setConvo((prev:any) => {
                const newData = prev.messages.map((msg:any) => {
                    if(!msg.isSeen) {
                        
                        return {...msg,isSeen:true}
                    }
                    return msg
                })
                return {...prev,messages:newData}
            })

        }
    
        
    }, [convo]);
    useEffect(() => {
        if(!convo) return
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
        
        const channel = pusher.subscribe(`chat-${convoId}`);
        channel.bind("seen", handleSeenMessages);

        return () => {
            channel.unbind("seen", handleSeenMessages);
            pusher.unsubscribe(`chat-${convoId}`);
        };
        
    },[convoId,handleSeenMessages])
    const handleNewMessage = useCallback( (data: any) => {
        setConvo((prevConvo) => {
            if (!prevConvo) return prevConvo;
            return {
                ...prevConvo,
                messages: [...prevConvo.messages, data]
            };
        });
        if(pathname === `/messages/${convoId}` ) {
            
            handelSeenMsg("One")
        }
    
        
    }, [convo, convoId, isBarber, pathname, userId]);
   
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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [convo?.messages]);

    if(convo == null) {
        return (
            <div className=" justify-center items-center w-full flex-col h-screen" >
                <LoadingAnimation />
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            {convo&&
            <div className="flex flex-col h-full"> 
                <TopChat 
                barber={convo.participants.barber.userId === userId ?null :convo.participants.barber}
                user={convo.participants.barber.userId === userId ?convo.participants.user :null}
                />
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <Messages 
                    messages={convo.messages}
                    userImage={isBarber ? convo.participants.barber.images[0]:convo.participants.user.image}
                    otherUserImage={!isBarber ? convo.participants.barber.images[0]:convo.participants.user.image}
                    userId={isBarber ? convo.participants.barber.id:userId}/>
                    <div ref={messagesEndRef} />
                </div>
                <ChatInput barberId={convo.participants.barber.id as string} userId={convo.participants.user.id as string} convoId={convoId as string} isBarber={isBarber}/>
            </div>}
        </div>
    )
}