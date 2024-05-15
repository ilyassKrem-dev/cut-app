
import { SetStateAction } from "react";
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
interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    city:string;
    setLocationInfo:React.Dispatch<SetStateAction<locationInfo>>
}

export default function CityS({city,setLocationInfo}:Props) {

    
    const handleChange = (value:string) => {
        const selectedCity = citiesJs.find((c:any) => c.city === value);
        if(selectedCity) {
            setLocationInfo((prev:any) => {
                return {...prev,city:value,mapLocation:{
                    latitude:selectedCity.lat,
                    longitude:selectedCity.lng
                }}
            })

        }
    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center  w-full gap-5">
                <div className="flex gap-1 self-end mb-2">
                    <p className="">City</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex  gap-2 flex-1 ]">
                    <Select onValueChange={handleChange}>
                        <SelectTrigger className="max-w-[350px] bg-black">
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
            <div className="text-sm text-white/80 max-w-[400px] leading-6 md:w-[455px]">
                <p>Select city your salon is in</p>
            </div>
        </div>
    )
}