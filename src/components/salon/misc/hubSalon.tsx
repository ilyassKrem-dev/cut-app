

import { SetStateAction, useState } from "react";

import SalonTabs from "./tabs/salonTabs";
import SalonId from "@/components/salonsById/salonId";
import SalonEdit from "./pages/salonEdit";
interface Props {
    salon:{
        id:string;
        Prices:number[];
        city:string;
        comments:number;
        holidays:boolean;
        images:string[];
        address:string;
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
    };
    userId:string;
    setSalon:React.Dispatch<SetStateAction<any>>
}



export default function HubSalon({salon,userId,setSalon}:Props) {
    
    const [tab,setTab] = useState<string>("overview")
    return (
        <div className="flex items-center md:pt-24 h-full flex-col min-[1001px]:flex-row">
            <SalonTabs 
                tab={tab}
                setTab={setTab}
            />
            <div className="overflow-y-auto h-full flex-1 custom-scrollbar w-full pb-32">
                {
                    tab=="overview"
                    ?
                    <div>
                        <SalonId 
                            barber={salon as any}
                            userId={null}
                            pathname="salon"
                        />

                    </div>
                    :
                    tab=="edit"
                    ?
                    <div>
                        <SalonEdit 
                        salon={salon}
                        userId={userId}
                        setSalon={setSalon}
                        />
                    </div>
                    :
                    ""
                }

            </div>
        </div>
    )
}