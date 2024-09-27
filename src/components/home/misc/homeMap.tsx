import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import L from "leaflet";

interface LeafletMapProps {
    barbers: {
        Prices:number[]
        city:string
        id:string
        images:string[]
        latitude:number
        longitude:number
        ratings:number[]
        salonName:string
        time:string[]
    }[];
    
}

export default function Homemap({ barbers }: LeafletMapProps) {
    const [index, setIndex] = useState<{barber:string,index:number}>({
        barber:"",index:0
    });
    
    const customIcon = (nameS:string) =>L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-white border-2 border-blue-400 rounded-lg p-1 w-[100px] text-black font-semibold text-xs absolute bottom-2 -right-[3.05rem] text-center">
            <p clas="w-[100px] truncate cursor-pointer">${nameS}</p>
            <div class="absolute h-0 w-0 border-x-8 border-x-transparent border-t-[10px] border-t-blue-400 -bottom-[0.65rem] right-[2.8rem]">
            </div>
        </div>`,
    });

    const changeImage = (type: string,id:string) => {
        if(index.barber !== id) {
            setIndex(prev => ({...prev,barber:id,index:0}));
        }
        const findBarber = barbers.find(barber => barber.id === id) as any
        if (type === "add") {
            if (index.index == findBarber.images.length - 1) {
                return;
            }
            setIndex(prev => ({...prev,barber:id,index:prev.index+1}));
            
            
        } else {
            if (index.index > 0) {
                return setIndex(prev => ({...prev,barber:id,index:prev.index-1}));
            }
            
        }
    }

    return (
        <MapContainer
            center={[33.5333, -7.5833]}
            zoom={8}
            style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {barbers.length >0 &&barbers.map((barber,key) => {
                const checkId = barber.id === index.barber
               
                return (
                    <Marker
                        key={barber.id+barber.salonName+key}
                        position={[barber.latitude, barber.longitude]}
                        icon={customIcon(barber.salonName)}
                        pane="overlayPane"
                    >
                        <Popup closeButton={false}>
                            <div className="w-[200px] h-fit flex flex-col bg-light rounded-lg">
                                <div className="w-full relative flex items-center justify-center">
                                    <div className={`absolute left-1 ${checkId&&(index.index === 0) ? "hidden" : ""}`} onClick={() => changeImage("reduce",barber.id)}>
                                        <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110 " />
                                    </div>
                                    <Image
                                        src={checkId?barber.images[index.index]:barber.images[0]}
                                        alt="salon piv"
                                        width={1000}
                                        height={1000}
                                        className="w-[200px] rounded-t-lg h-[133px]"
                                    />
                                    <div className={`absolute right-1 ${checkId&&(index.index === barber.images.length - 1) ? "hidden" : ""}`} onClick={() => changeImage("add",barber.id)}>
                                        <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110 rotate-180" />
                                    </div>
                                    <div className="absolute bottom-2 flex items-center justify-center gap-1">
                                        {[...Array(3)].map((_, indexD) => (
                                            <div key={indexD} className={`rounded-full p-[0.2rem] ${indexD === index.index ? "bg-white" : "bg-white/50"}`}>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2 flex flex-col">
                                    <h4 className="font-semibold capitalize truncate max-w-[160px] text-base">{barber.salonName}</h4>
                                    <div>
                                        <p className="text-gray-400 text-xs">{barber.time[0].split(" ")[0]}AM - {barber.time[1].split(" ")[0]}PM</p>
                                        <p className="my-1 font-semibold">
                                            {barber.Prices[0]}Dh - {barber.Prices[1]}Dh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        
        </MapContainer>
    );
}
