import { ChangeEvent, SetStateAction, useState } from "react";
import citiesJs from "@/assets/other/ma.json"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import z from "zod"
import MapEdit from "./mapEdit";
import SaveLocation from "./saveLocation";
interface Props {
    location:{
            city:string;
            coord:{
                latitude:number,
                longitude:number
            },
            address:string
        } 
    ids:{
        userId:string;
        barberId:string;

    }
    setSalon:React.Dispatch<SetStateAction<any>>
}
type newLocationType = {
    city:string;
    mapLocation:{
        latitude:number,
        longitude:number
    },
    address:string
}
const AddressSchema = z.string().min(10).max(60)
export default function LocationEditTab({
    location,ids,setSalon
}:Props) {
    const [newLocation,setNewLocation] = useState<newLocationType>({
        city:location.city,mapLocation:location.coord,address:location.address
    })
    const [addressErrorCss,setAddressErrorCss] = useState<boolean>(false)
    const [mapChanged,setMapChanged] = useState<boolean>(false)
    const handleSelectChange = (value:string) => {
        const founded = citiesJs.find(city=>city.city==value)
        if(founded) {
            setNewLocation((prev:newLocationType) => {
                return {...prev,city:value,mapLocation:{...prev.mapLocation,latitude:Number(founded.lat),longitude:Number(founded.lng)}}
            })
            setMapChanged(false)
        }
    }

    const valdiateAddress = (value:string) => {
        if (value.trim().length === 0) {
            setAddressErrorCss(false); 
        } else {
            try {
            
                AddressSchema.parse(value);
                
                setAddressErrorCss(false);
            } catch (error) {
                
                setAddressErrorCss(true); 
            }
        }
    }
    const handleChangeAddress = (e:ChangeEvent<HTMLInputElement>) => {
        if(addressErrorCss) setAddressErrorCss(false)
        setNewLocation((prev:newLocationType) => {
            return {...prev,address:e.target.value}
        })
        valdiateAddress(e.target.value)

    }
    const check = newLocation.city !== location.city && !mapChanged || newLocation.city === location.city && newLocation.address === location.address && newLocation.mapLocation.latitude === location.coord.latitude && newLocation.mapLocation.longitude === location.coord.longitude && !mapChanged 
    return (
        <div className="flex-col flex gap-[2.8rem] w-full p-6 px-10 2xl:w-[582px]"> 
            <div className=" space-y-3 md:space-y-0 rounded-lg  w-full">
                <div className="flex items-start  w-full gap-3 flex-col">
                    <div className="flex gap-1  mb-2 flex-col">
                        <p className="">City</p>
                        <p className="text-xs text-white/40">select city where your salon at</p>
                    </div>
                    <div className="flex  gap-2 w-full">
                        <Select value={newLocation.city} onValueChange={handleSelectChange}>
                            <SelectTrigger className=" bg-black">
                                <SelectValue placeholder="Select a City" />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white">
                                <SelectGroup>
                                <SelectLabel className="border-b">City</SelectLabel>
                                    {citiesJs.sort((a,b) => a.city.localeCompare(b.city)).map((city,index) => {
                                        return (
                                            <SelectItem 
                                            
                                            key={city+"-"+index} 
                                            value={city.city}>
                                                {city.city}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                
            </div>
            <div className="md:flex items-center justify-between space-y-3 md:space-y-0  rounded-lg md:rounded-none">
                <div className="flex items-start  w-full gap-5 flex-col">
                    <div className="flex gap-1 flex-col mb-2">
                        <p className="">Address</p>
                        <p className="text-xs text-white/40">Salon address</p>
                    </div>
                    <div className="flex  gap-2  w-full">
                        <input
                            autoComplete="on"
                            name="name" 
                            value={newLocation.address} 
                            onChange={handleChangeAddress} 
                            type="text"  
                            className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${addressErrorCss ?"border-accent border-2":""}`} 
                            placeholder="Address"/>
                    </div>
                </div>
                
            </div>
            <MapEdit 
                mapLocation={newLocation.mapLocation}
                mapChanged={mapChanged}
                setMapChanged={setMapChanged}
                setLocationInfo={setNewLocation}/>
            <SaveLocation 
            newLocation={newLocation}
            ids={ids}
            setSalon={setSalon}
            check={check}
            />
        </div>
    )
}