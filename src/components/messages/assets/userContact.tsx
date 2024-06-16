
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
export default function UserContact({convos,tab,unseenBarbers,unseenClients}:{
   convos:any;
   tab:string;
   unseenBarbers:number;
   unseenClients:number
}) {
    
    if(!convos) {
        return (
            <>
                {[...Array(2)].map((_,index) => {
                        return (
                            <div key={index} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4 md:w-[350px] w-full">
                                <Skeleton 
                                className="rounded-full w-[40px] h-[40px] bg-white/10" />
                                <div className="flex flex-col w-full mt-1 gap-1">
                                    <Skeleton className="w-20 h-3 bg-white/10"/>
                                    <Skeleton className="w-full h-3 bg-white/10"/>
                                </div>
                            </div>
                        )
                    })}
            </>
        )
    }
    return (
        <div className="flex flex-col overflow-y-auto custom-scrollbar md:w-[350px] w-full">
            {convos && tab =="user" ? convos.barbers.map((convo:any,index:number) => {
                return (
                    <Link key={convo.id+index} href={`/messages/${convo.id}`} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4">
                        <Image 
                        src={convo.participants[0].barber.images[0] || "profile.jpg"} 
                        alt={`${convo.participants[0].barber.salonName} image`}
                        width={500}
                        height={500}
                        className="rounded-full w-[40px] object-cover h-[40px]" />
                        <div className="flex flex-col w-full pr-2">
                            <p className="font-semibold cursor-pointer">{convo.participants[0].barber.salonName}</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-sm text-white/60">{convo.messages}</p>
                                {unseenBarbers>0 &&<span className="text-sm rounded-full text-white bg-accent  px-1">{unseenBarbers > 10 ?"10+" : unseenBarbers}</span>}
                            </div>
                        </div>
                    </Link>
                )
            })
            :
            convos.clients.map((convo:any,index:number) => {
                return (
                    <Link key={convo.id+index} href={`/messages/${convo.id}`} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4">
                        <Image 
                        src={convo.participants[0].user.image || "profile.jpg"} 
                        alt={`${convo.participants[0].user.name} image`}
                        width={500}
                        height={500}
                        className="rounded-full w-[40px] object-cover h-[40px]" />
                        <div className="flex flex-col w-full pr-2">
                            <p className="font-semibold cursor-pointer">{convo.participants[0].user.name}</p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-sm text-white/60">{convo.messages}</p>
                                {unseenClients>0 &&<span className="text-sm rounded-full text-white bg-accent  px-1">{unseenClients > 10 ?"10+" : unseenClients}</span>}
                            </div>
                        </div>
                    </Link>
                )
            })
        
        }
           
        </div>
    )
}