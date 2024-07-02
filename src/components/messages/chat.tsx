"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { getConvo,getMoreMessages } from "@/lib/actions/messages.action"
import { usePathname } from "next/navigation";
import TopChat from "./chat-assets/topChat";
import { useToast } from "../ui/use-toast";
import ChatInput from "./chat-assets/inputs/chat-input";
import Pusher from "pusher-js";
import Messages from "./chat-assets/messages";
import LoadingAnimation from "@/assets/other/spinner";
import axios from "axios";
import { Button } from "../ui/button";

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
    const [loadingMore, setLoadingMore] = useState(false);
    const [scrolledToBottom,setScrolledToBottom] = useState<boolean>(false)
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {toast} = useToast()
    const pathname = usePathname()
    const handelSeenMsg = async() => {
        
        try {
            const seenMsgs = await axios.post("/api/messages/seen",{
                userId: isBarber ? barberId : userId,
                isBarber:isBarber,
                convoId:convoId
            })
            
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
                    await handelSeenMsg()
                    
                } 
            } catch (error:any) {
                
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })

            }
        }
        fetchConvo()
    },[])
    const handleSeenMessages = useCallback( (data: any) => {
    
        if (data.length > 0) {
            setConvo((prev:any) => {
                const newData = prev.messages.map((msg:any) => {
                    const findMsg = data.find((data:any) => msg.id == data.id)
                    if(findMsg) {
                        
                        return findMsg
                    } else {
                        return msg
                    }
                    
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
        setScrolledToBottom(false)
        setConvo((prevConvo) => {
            if (!prevConvo) return prevConvo;
            return {
                ...prevConvo,
                messages: [...prevConvo.messages, data]
            };
        });
        if(pathname === `/messages/${convoId}` ) {
            
            handelSeenMsg()
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
        if(scrolledToBottom) return
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        setScrolledToBottom(true)
        
    }, [convo?.messages]);
    const loadMoreMessages = async () => {
        if (loadingMore || !convo) return;
        setLoadingMore(true);
        try {
            const moreMessages = await getMoreMessages(convoId as string,convo.messages[0].id);
            setConvo(prevConvo => ({
                ...prevConvo!,
                messages: [...moreMessages, ...prevConvo!.messages]
            }));
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load more messages"
            });
        } finally {
            setLoadingMore(false);
        }
    };
    const handleScroll = () => {
        if (messagesContainerRef.current && messagesContainerRef.current.scrollTop ==0) {
            
            loadMoreMessages();
            messagesContainerRef.current.scrollTo(0,10)
          
        }
    };

    if(convo == null) {
        return (
            <div className="py-36 flex justify-center items-center flex-col gap-2">
                <LoadingAnimation containerClassName="!h-[300px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button   onClick={() => window.location.href = `/messages/${convoId}`}>
                            reload
                    </Button>

                </div>
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
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto custom-scrollbar relative" onScroll={handleScroll}>
                    {loadingMore&&<div className="absolute top-0 right-0 left-0 mt-5">
                        <LoadingAnimation />
                    </div>}
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