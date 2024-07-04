import Image from "next/image"
import { useSize } from "@/lib/hooks"
import { PiOfficeChairBold } from "react-icons/pi";
import { TbPlaceholder } from "react-icons/tb";
import CancelReserv from "./buttons/cancel";
import {ReservesType} from "./reservesType"
import ShowOnMap from "./buttons/showOnMap";
import { SetStateAction, useState } from "react";
interface Props {
    reserves:ReservesType[];
    setReserves:React.Dispatch<SetStateAction<ReservesType[] | null>>
}
export default function Reserves({reserves,setReserves}:Props) {
    const size = useSize()
    const [tab,setTab] = useState<string>("booking")
    return (
        <div className="py-12 pb-32 mx-4 md:pt-24 md:pb-0 md:flex md:flex-row md:mx-0 h-screen  md:gap-4">
            {size > 767&&
            <div className="h-full xl:w-[217px]">
                <div className="border-r border-white/10 flex justify-center items-center flex-col  gap-10 px-2 group w-fit h-full">
                    <div className={`flex gap-4 items-center text-lg cursor-pointer hover:bg-white/20 rounded-xl p-2 px-6 justify-between hover:opacity-80 transition-all duration-300  group w-fit xl:group-hover:w-[200px] text-white/90 ${tab == "booking" ? "bg-white/20":""}`} onClick={() => setTab("booking")}>
                        <PiOfficeChairBold className="text-xl"/>
                        <p className=" cursor-pointer hidden xl:group-hover:block text-base">Booking</p>
                    </div> 
                    <div className={`flex gap-4 items-center text-lg cursor-pointer hover:bg-white/20 rounded-xl p-2 px-6 justify-between hover:opacity-80 transition-all duration-300  group w-fit xl:group-hover:w-[200px] text-white/70 ${tab == "old" ? "bg-white/20":""}`} onClick={() => setTab("old")}>
                        <TbPlaceholder className="text-xl"/>
                        <p className=" cursor-pointer hidden  xl:group-hover:block text-base">Old reserves</p>
                    </div>
                </div>
            </div>
            }
            {tab === "booking"&&<div className="flex flex-col gap-6 flex-1 md:mx-auto  md:rounded-lg  md:max-w-[1200px]  md:py-10 overflow-auto h-full custom-scrollbar  max-w-[500px]">
                <h1 className="text-center text-lg">Reservations</h1>
                {reserves.length > 0 ?
                <div className="flex flex-col gap-4">
                    {reserves.map((reservation,index) => {
                        const {barber} = reservation
                        return (
                            <div key={reservation.id + index} className="w-full gap-4 md:gap-0 flex flex-col border-2 border-white/10 rounded-xl md:flex-row">
                                <div className="md:max-w-[200px] lg:max-w-[300px]">
                                    <Image 
                                    src={barber.images} 
                                    alt={barber.salonName}
                                    width={1000}
                                    height={1000}
                                    className=" w-full h-full rounded-t-xl  md:rounded-tr-none md:rounded-l-xl opacity-80" />
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="flex flex-col gap-4 ml-6 md:ml-0 md:flex-1 md:flex-row md:justify-between md:pt-4  md:pl-4">
                                        <div className="flex gap-1 flex-col items-start"> 
                                            <h1 className="text-white/90  tracking-wide text-base font-semibold md:text-base"> {barber.salonName},</h1>
                                            <p className=" font-medium leading-tight text-sm break-words text-white/70 md:text-sm md:max-w-[230px] lg:max-w-full"> {barber.address}, {barber.city}</p>
                                            
                                        </div>
                                        <div className="flex flex-col md:flex-1 md:items-end md:pr-4">
                                            <div className="w-fit flex flex-col gap-1">
                                                <div className="flex flex-col gap-1 md:flex-row md:gap-0" >
                                                    <p className="text-sm text-white/90 md:text-sm"><span className="text-sm text-white/70 md:hidden">Date:</span> {reservation.date}</p>
                                                    <span className="hidden md:block">,</span>
                                                    <p className="text-sm text-white/90 md:text-sm"><span className="text-sm text-white/70 md:hidden">Time:</span> {reservation.time}</p>

                                                </div>
                                                <p className="text-sm text-white/90 md:text-sm"><span className="text-sm text-white/70 ">Price:</span> {reservation.price} DH</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row text-sm">
                                        <ShowOnMap 
                                        coordinates={
                                                {
                                                lat:barber.latitude,
                                                long:barber.longitude
                                            }       
                                            }
                                        salonName={barber.salonName}
                                        />
                                        <CancelReserv 
                                        userId={reservation.userId}
                                        resId={reservation.id}
                                        setReserves={setReserves}/>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })}  
                </div>
                :
                <h1 className=" break-words font-medium text-lg text-center">You have no reservations at the moment.</h1>
                }

            </div>}
        </div>
    )
}