import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import L from "leaflet";

interface LeafletMapProps {
    mapLocation: {
        longitude: number;
        latitude: number;
    };
    nameS: string;
    images: string[];
    time: {
        open: string;
        close: string;
    };
    prices: number[];
}

export default function LeafletMap({ mapLocation, time, nameS, images, prices }: LeafletMapProps) {
    const [index, setIndex] = useState<number>(0);

    const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-white border-2 border-blue-400 rounded-lg p-1 w-[100px] text-black font-semibold text-sm absolute bottom-2 -right-[3.05rem] text-center">${nameS}
            <div class="absolute h-0 w-0 border-x-8 border-x-transparent border-t-[10px] border-t-blue-400 -bottom-[0.65rem] right-[2.8rem]">
            </div>
        </div>`,
    });

    const changeImage = (type: string) => {
        if (type === "add") {
            if (index == images.length - 1) {
                return;
            }
            setIndex(prev => prev + 1);
        } else {
            if (index == 0) {
                return;
            }
            setIndex(prev => prev - 1);
        }
    }

    return (
        <MapContainer
            center={[mapLocation.latitude, mapLocation.longitude]}
            zoom={8}
            style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[mapLocation.latitude, mapLocation.longitude]}
                icon={customIcon}
                pane="overlayPane"
            >
                <Popup closeButton={false}>
                    <div className="w-[200px] h-fit flex flex-col bg-light rounded-lg">
                        <div className="w-full relative flex items-center justify-center">
                            <div className={`absolute left-1 ${index === 0 ? "hidden" : ""}`} onClick={() => changeImage("reduce")}>
                                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110" />
                            </div>
                            <Image
                                src={images[index]}
                                alt="salon piv"
                                width={1000}
                                height={1000}
                                className="w-full rounded-t-lg h-full"
                            />
                            <div className={`absolute right-1 ${index === images.length - 1 ? "hidden" : ""}`} onClick={() => changeImage("add")}>
                                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110 rotate-180" />
                            </div>
                            <div className="absolute bottom-2 flex items-center justify-center gap-1">
                                {[...Array(3)].map((_, indexD) => (
                                    <div key={indexD} className={`rounded-full p-[0.2rem] ${indexD === index ? "bg-white" : "bg-white/50"}`}>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-2 flex flex-col">
                            <h4 className="font-semibold capitalize truncate max-w-[160px] text-lg">{nameS}</h4>
                            <div>
                                <p className="text-gray-400">{time.open.split(" ")[0]}AM - {time.close.split(" ")[0]}PM</p>
                                <p className="my-1 font-semibold">
                                    {prices[0]}Dh - {prices[1]}Dh
                                </p>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
