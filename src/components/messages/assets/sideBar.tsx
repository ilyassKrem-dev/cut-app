"use client"
import { Contact, ScissorsLineDashed } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState,useMemo } from "react"
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
                const res = await getContacts(session?.user?.id as string)
                if(res) {
                
                    return setConvos(res)
                }
            } catch (error:any) {
                console.log(error.message)
            }
        }
        fetchCons()
    },[session])
    const handleNewMessage = useCallback((data: any) => {
        const newArray = {
            barbers:[],
            clients:[]
        } as any;
        const updateMessages = (array: any[], key: 'barbers' | 'clients') => {
            array.forEach((conv: any) => {
                if (conv.id === data.convoId) {
                    newArray[key].unshift({
                        ...conv,
                        messages: data,
                        unseen:[...conv.unseen,data]
                    });
                } else {
                    newArray[key].push(conv);
                }
            });
        };
        updateMessages(convos.barbers, 'barbers');
        updateMessages(convos.clients, 'clients');
        
        setConvos(newArray);
    }, [convos]);
    useEffect(() => {
        if(!convos || (convos.barbers.length === 0 && convos.clients.length === 0)) return
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
        //@ts-ignore
        const channels = new Map<string, Pusher.Channel>();
        const subscribeToChannel = (array: any[], handleNewMessage: any) => {
            array.forEach((convo: any) => {
                const channel = pusher.subscribe(`chat-${convo.id}`);
                channel.bind("message-bar", handleNewMessage);
                channels.set(convo.id, channel);
            });
        };
        subscribeToChannel(convos.barbers, handleNewMessage);
        subscribeToChannel(convos.clients, handleNewMessage);
        

        return () => {
            channels.forEach((channel, convoId) => {
                channel.unbind("message-bar", handleNewMessage);
                pusher.unsubscribe(`chat-${convoId}`);
            });
        };
        
    }, [convos, handleNewMessage]);
   
   
    

    const changeTab = (tabC:string) => {
        if(!convos || convos==undefined || tabC===tab || !session ) return
        setTab(tabC)
    } 
    const changeSeen= (splited:string) => {
        const findIdBarbers = convos.barbers.find((convo:any) => convo.id ==splited)
        const findIdClients = convos.clients.find((convo:any) => convo.id ==splited)
        if(findIdBarbers || findIdClients) {
          
            setConvos((prev:any) => {
                const newData = prev.barbers.map((convo:any) => {
                    const isReceiver = (session?.user as any).isBarber ? (session?.user as any).barberId : session?.user?.id
                    if(convo.id === splited && convo.messages.receiverId == isReceiver) {
                        return {...convo,unseen:[]}
                    } else {
                        return convo
                    }
                })
                const newData2 = prev.clients.map((convo:any) => {
                    const isReceiver = (session?.user as any).isBarber ? (session?.user as any).barberId : session?.user?.id
                    if(convo.id === splited && convo.messages.receiverId == isReceiver) {
                        return {...convo,unseen:[]}
                    } else {
                        return convo
                    }
                })
                if(newData === prev.barber && newData2 === prev.clients) return prev
                return {
                    barbers:newData,
                    clients:newData2
                }
            })
        }
    }
    useEffect(() => {
        if(!pathname.startsWith("/messages/") || !session || !convos) return
        const splited = pathname.split("/")[2]
        if(!splited) return
        changeSeen(splited)
    },[pathname])
    useEffect(() => {
        if(session || status=="loading") return
        router.push("/")
    },[session,status])

    const unseenClients = useMemo(() => {
        if(!session || !convos || convos.clients.length == 0) return

        return convos.clients
                .map((client:any) => client.unseen
                .reduce((t:number,msg:any) => t + (msg.senderId !== (session?.user as any).barberId ? 1: 0),0))[0]
    },[session,convos])
    const unseenBarbers = useMemo(() => {
        if(!session || !convos || convos.barbers.length == 0) return

        return convos.barbers
                .map((client:any) => client.unseen
                .reduce((t:number,msg:any) => t + (msg.senderId !== session?.user?.id ? 1: 0),0))[0]
    },[session,convos])
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
                    <div className={`px-10 py-3 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300 ${tab === "user"?"bg-black":"opacity-40 "} flex items-center`} onClick={() => changeTab("user")}>
                        <Contact className="text-center w-full"/>
                        {unseenBarbers>0 &&<span className="text-sm rounded-full text-white bg-accent  px-1">{unseenBarbers > 10 ?"10+" : unseenBarbers}</span>}
                    </div>
                    <div className={`px-10 py-2 flex-1 text-center cursor-pointer hover:opacity-60 hover:bg-black/80 transition-all duration-300  ${tab === "clients"?"bg-black":"opacity-40"} flex items-center`} onClick={() => changeTab("clients")}>
                        <ScissorsLineDashed className="text-center w-full"/>
                        {unseenClients>0 &&<span className="text-sm rounded-full text-white bg-accent  px-1">{unseenClients > 10 ?"10+" : unseenClients}</span>}
                    </div>
                </div>}
                
                <UserContact 
                unseenBarbers={unseenBarbers}
                unseenClients={unseenClients}
                convos={convos} tab={tab}/>
            </>
            :
            ""}
        </div>
        
    )
}