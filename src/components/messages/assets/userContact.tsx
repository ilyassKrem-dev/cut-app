
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
export default function UserContact({convos,tab}:{
   convos:any;
   tab:string;
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
            {convos && convos.length >0 && convos.map((convo:any,index:number) => {
                return (
                    <Link key={convo.id+index} href={`/messages/${convo.id}`} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4">
                        <Image 
                        src={tab == "user"?convo.participants[0].barber.images[0]:convo.participants[0].user.image} 
                        alt={`${tab == "user"?convo.participants[0].barber.salonName:convo.participants[0].user.name} image`}
                        width={500}
                        height={500}
                        className="rounded-full w-[40px] object-cover h-[40px]" />
                        <div className="flex flex-col">
                            <p className="font-semibold cursor-pointer">{tab == "user"?convo.participants[0].barber.salonName:convo.participants[0].user.name}</p>
                            <p className="text-sm text-white/60">{convo.messages}</p>
                        </div>
                    </Link>
                )
            })}
           
        </div>
    )
}