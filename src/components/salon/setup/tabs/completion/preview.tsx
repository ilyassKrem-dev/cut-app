import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaMapMarkerAlt,FaPhoneAlt,FaCalendar,FaCheck   } from "react-icons/fa";
import MapPreview from "./mapPreview";
import { useEffect, useState } from "react";
import { fetchUserNumber } from "@/lib/actions/user.action";

interface Prefernces {
    value:number[];
    time:{
        open:string;
        close:string;
    },
    dates:{
        week:string[];
        holidays:boolean
    }
}
interface Info {
    name:string;
    number:string,
    images:File[]
}
interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    prefernces:Prefernces
    info:Info;
    locationInfo:locationInfo
    images:string[];
    userInfo:{
        id:string;
        name:string;
        image:string;
    };
    userId:string
}


export default function Preview({prefernces,info,locationInfo,images,userInfo,userId}:Props) {
    const [userNumber,setuserNumber] = useState<string>()
    useEffect(() => {
        const numberPhone = async() =>  {
            const res = await fetchUserNumber(userId)
            if(res) {
                setuserNumber(res.phoneNumber as string)
            }
        }
        numberPhone()
    },[userId])
    const datesCheck = prefernces.dates.week.length === 7?"Entire week" :`${prefernces.dates.week.map((day) => day+"").join("-")}`
    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="">
                    <div className="flex gap-2">
                        {images.slice(0,3).map((img,index:number) => {
                            
                            return (
                                <div key={index} className={` h-[400px]  ${index==0?"flex-1 w-[300px] ":"w-[250px]"} hidden md:block`}>
                                    <Image
                                        src={img}
                                        alt="image"
                                        width={1280}
                                        height={1280}
                                        className={` object-cover w-full h-full ${index==0?"rounded-l-xl":""}
                                        ${index==images.length -1?"rounded-r-xl":""}
                                    

                                        `}
                                            
                                        />

                                </div>

                            )
                        })}
                        <div className={` h-[400px] w-full  block md:hidden relative`}>
                            <Image
                                src={images[0]}
                                alt="image"
                                width={1280}
                                height={1280}
                                className={` object-cover w-full h-full 
                                `}
                                />
                            <div className="absolute bottom-3 right-3  bg-black/70 text-light rounded-md p-1 px-6 text-sm">
                                1/{images.length}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between">
                    <div className="px-4 flex-1 max-w-[650px]">
                        <div>
                            <h1 className="font-bold text-2xl">{info.name}</h1>
                            <p className="max-w-[400px] text-gray-400 text-sm">{locationInfo.city}</p>
                        </div>
                        <div>
                            
                        </div>
                        <div className="border-y my-9 py-5 flex gap-4 items-center border-white/20">
                            <Image 
                            src={userInfo.image || "/profile.jpg"}
                            alt={`barber ${userInfo.name} pic`}
                            width={100}
                            height={100}
                            className="w-[40px] h-[40px] rounded-full"
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold capitalize">Barber : {userInfo.name}</p>
                                <p className="text-sm text-gray-400">{userNumber || ""}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-8 justify-center">
                            <div className="flex gap-2 items-center">
                                <FaMapMarkerAlt  className="text-2xl text-white/50"/>
                                <p>{locationInfo.address}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaPhoneAlt  className="text-2xl text-white/50"/>
                                <p>+212{info.number}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaCalendar  className="text-2xl text-white/50"/>
                                <div className="flex gap-1 flex-col">
                                    <p>{datesCheck}</p>
                                    <div className="flex gap-2 items-center">Holidays:{prefernces.dates.holidays?<FaCheck />:<span className="text-xl font-bold text-gray-400">x</span>}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="hidden sm:flex flex-1 max-w-[400px] h-fit">
                            <div className="bg-black border border-white/20 rounded-lg flex justify-center p-3 py-6 flex-col gap-8  items-center w-full shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                                <div className="text-center">
                                    <p className="font-bold text-xl">{prefernces.value[0]}DH - {prefernces.value[1]}DH</p>
                                    <p className="text-sm mt-1 text-gray-400">
                                        {prefernces.time.open}-{prefernces.time.close}
                                        
                                    </p>
                                </div>
                                <Button className="bg-green-1  hover:opacity-100 hover:bg-green-1 w-full">Reserve</Button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="border-y my-9 py-5 flex gap-4 items-center border-white/20 mx-4">
                <MapPreview 
                locationLat={locationInfo.mapLocation}
                info={info}
                images={images}
                time={prefernces.time}
                prices={prefernces.value}
                />     
            </div>
        </>
    )
}