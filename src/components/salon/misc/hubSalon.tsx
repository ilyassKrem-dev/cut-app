import { MdPreview,MdEdit  } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";
import SalonTabs from "./tabs/salonTabs";
import SalonId from "@/components/salonsById/salonId";
interface Props {
    salon:{
        id:string;
        prices:string[];
        city:string;
        comments:number;
        holidays:boolean;
        images:string[];
        latitude:number;
        longitude:number;
        openDays:string[];
        phoneNumber:string;
        ratings: { 
            people: number, 
            rating: number }
        salonName:string;
        time:string[];
        userId:string;
        user:{
            id:string;
            phoneNumber:string;
            image:string|null;
            name:string
        }
    } | null |boolean
}


const tabs = [
    {
        tab:"overview",
        text:"Overview",
        icon:<MdPreview className="text-xl"/>

    },
    {
        tab:"edit",
        text:"Edit",
        icon:<MdEdit className="text-xl"/>

    }
]

export default function HubSalon({salon}:Props) {
    
    const [tab,setTab] = useState<string>("overview")
    return (
        <div className="flex items-center md:pt-24 h-full flex-col min-[1001px]:flex-row">
            <SalonTabs 
                tab={tab}
                setTab={setTab}
            />
            <div className="overflow-y-auto h-full flex-1 custom-scrollbar">
                {
                    tab=="overview"
                    ?
                    <div className=" ">
                        <SalonId 
                            barber={salon as any}
                            userId={null}
                            pathname="salon"
                        />

                    </div>
                    :
                    ""
                }

            </div>
        </div>
    )
}