import { ChangeEvent, SetStateAction, useState } from "react";
import { z } from "zod";

interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    address:string;
    setLocationInfo:React.Dispatch<SetStateAction<locationInfo>>
}
const AddressSchema = z.string().min(10).max(60)
export default function AddressS({address,setLocationInfo}:Props) {
    const [addressErrorCss,setAddressErrorCss] = useState<boolean>(false)

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
        setLocationInfo((prev:locationInfo) => {
            return {...prev,address:e.target.value}
        })
        valdiateAddress(e.target.value)

    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center  w-full gap-5">
                <div className="flex gap-1 self-end mb-2">
                    <p className="">Address</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex  gap-2 flex-1 max-w-[350px]">
                    
                    
                    <input
                        
                        autoComplete="on"
                        name="name" 
                        value={address} 
                        onChange={handleChangeAddress} 
                        type="text"  
                        className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${addressErrorCss ?"border-accent border-2":""}`} 
                        placeholder="Address"/>
                    

                </div>
            </div>
            <div className="text-sm text-white/80 max-w-[400px] leading-6 md:w-[455px]">
                <p>Address of your salon</p>
            </div>
        </div>
    )
}

