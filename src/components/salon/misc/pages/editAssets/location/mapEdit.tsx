
import { SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    mapLocation:{
        longitude:number,
        latitude:number
    };
    setLocationInfo:React.Dispatch<SetStateAction<locationInfo>>;
    setMapChanged:React.Dispatch<SetStateAction<boolean>>
    mapChanged:boolean
}

export default function MapEdit({mapLocation,setLocationInfo,setMapChanged,mapChanged}:Props) {
    const [show,setShow] = useState<boolean>(false)
    const [errorMap,setErrorMap] = useState<boolean>(false)
    
    const onMarkerDragEnd = (e: any) => {
        const isInsideMorocco = (lat: number, lng: number) => {
            return lat >= 27.6664 && lat <= 35.9225 && lng >= -13.1693 && lng <= -0.9987;
            };
        const { lat, lng } = e.target.getLatLng()
        if(!isInsideMorocco(lat,lng)) {
            setLocationInfo(prev => {
                return {...prev,mapLocation:{
                    latitude:33.5731,
                    longitude:-7.5898
                }}
            })
            setMapChanged(false)
           return setErrorMap(true)
        }
        setErrorMap(false)
        setLocationInfo(prev => {
            return {...prev,mapLocation:{
                latitude:lat.toFixed(4),
                longitude:lng.toFixed(4)
            }}
        })
        setMapChanged(true)

        
    };
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".map-tab");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    
    return (
        <div className=" space-y-3 md:space-y-0  rounded-lg">
            <div className="flex items-center  w-full gap-5 flex-col">
                <div className="flex gap-1 self-start mb-2 flex-col">
                    <p className="">Map</p>
                    <p className="text-sm text-white/40 truncate max-[310px]:max-w-[150px]">Location of your salon in map</p>
                </div>
                <div className="flex  gap-2 flex-1 items-center">
                    <Button className={`active:opacity-60 hover:opacity-70 ${mapChanged?"bg-green-1":""}`} onClick={() => setShow(true)}>Show map</Button>
                    {mapChanged&&<FaCheck className="text-green-1 text-lg"/>}
                </div>
            </div>
            {show&&
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center z-50 flex-col gap-3">
                <p className=" text-accent text-lg font-bold text-center">{errorMap?"Must be inside morroco": ""}</p>
                <div className="w-full flex justify-center items-center border-2 border-white max-w-[800px] map-tab">
                    {typeof window !== "undefined" && (
                    <LeafletMap mapLocation={mapLocation} onMarkerDragEnd={onMarkerDragEnd} />
                    )}
                </div>
                
                <Button className=" w-full max-w-[200px] hover:opacity-60 active:opacity-50 transition-all duration-300" onClick={() => setShow(false)}>Close</Button>
            </div>}
        </div>
    )
}

interface LeafletMapProps {
    mapLocation: {
      longitude: number;
      latitude: number;
    };
    onMarkerDragEnd: (e: any) => void;
  }
function LeafletMap({ mapLocation, onMarkerDragEnd }: LeafletMapProps) {
    const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
    const L = require("leaflet");
    const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class=" bg-white border-2 border-blue-400 rounded-lg p-1 w-[100px] text-black font-semibold text-sm absolute bottom-2 -right-[3.05rem] text-center">Your Salon
            <div class="absolute h-0 w-0 border-x-8 border-x-transparent border-t-[10px] border-t-blue-400 -bottom-[0.65rem] right-[2.8rem]">
            </div>
        </div>`,
      });
    return (
      <MapContainer
        center={[mapLocation.latitude, mapLocation.longitude]}
        zoom={6}
        style={{ height: "400px", width: "100%"}}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <Marker
            position={[mapLocation.latitude, mapLocation.longitude]}
            draggable={true}
            eventHandlers={{ dragend: onMarkerDragEnd }}
            icon={customIcon}
            pane="overlayPane"
            >
                
            </Marker>
      </MapContainer>
    );
  }