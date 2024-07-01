
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";

interface MapLocation {
    coordinates:{
        lat:number;
        long:number
    };
    salonName:string
}

export default function MapLocation({coordinates,salonName }: MapLocation) {
    const {lat,long} = coordinates
    const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-white border-2 border-blue-400 rounded-lg p-1 w-[100px] text-black font-semibold text-sm absolute bottom-2 -right-[3.05rem] text-center">${salonName}
            <div class="absolute h-0 w-0 border-x-8 border-x-transparent border-t-[10px] border-t-blue-400 -bottom-[0.65rem] right-[2.8rem]">
            </div>
        </div>`,
    });


    return (
        <MapContainer
            center={[lat, long]}
            zoom={20}
            style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="map-tab"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[lat, long]}
                icon={customIcon}
                pane="overlayPane"
            >
            </Marker>
        </MapContainer>
    );
}
