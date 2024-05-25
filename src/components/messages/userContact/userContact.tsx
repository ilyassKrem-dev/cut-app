import { getContacts } from "@/lib/actions/messages.action"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
export default function UserContact({userId}:{
    userId:string|null|undefined
}) {
    const [convos,setConvos] = useState<any |null>(null)
    useEffect(() => {
        const fetchCons = async() => {
            try {
                const res = await getContacts(userId as string)
                if(res) {
                    return setConvos(res)
                }
            } catch (error:any) {
                console.log(error.message)
            }
        }
        fetchCons()
    },[])
    if(!convos) {
        return (
            <>
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
        )
    }
    return (
        <div className="flex flex-col">
            {convos && convos.length >0 && convos.map((convo:any,index:number) => {
                return (
                    <Link key={convo.id+index} href={`/messages/${convo.id}`} className="flex gap-2 px-2 cursor-pointer hover:opacity-60 hover:bg-white/10 transition-all duration-300 py-4">
                        <Image 
                        src={convo.participants[0].barber.images[0]} 
                        alt={`${convo.participants[0].barber.salonName} image`}
                        width={500}
                        height={500}
                        className="rounded-full w-[40px] object-cover h-[40px]" />
                        <div className="flex flex-col">
                            <p className="font-semibold cursor-pointer">{convo.participants[0].barber.salonName}</p>
                        </div>
                    </Link>
                )
            })}
           
        </div>
    )
}