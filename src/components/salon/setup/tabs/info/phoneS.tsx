
import { ChangeEvent, SetStateAction, useState } from "react";

import z from "zod"
interface Info {
    name:string;
    number:string,
    images:File[]
}
interface Props {
    number:string;
    setInfo:React.Dispatch<SetStateAction<Info>>
}
const PhoneSchema = z.string().length(9)
export default function PhoneS({number,setInfo}:Props) {
    const [phoneErrorCss,setPhoneErrorCss] = useState<boolean>(false)

    const valdiatePhone = (value:string) => {
        if (value.trim().length === 0) {
            setPhoneErrorCss(false); 
        } else {
            try {
            
                PhoneSchema.parse(value);
                
                setPhoneErrorCss(false);
            } catch (error) {
                
                setPhoneErrorCss(true); 
            }
        }
    }
    const handleChangePhone = (e:ChangeEvent<HTMLInputElement>) => {

        if(phoneErrorCss) setPhoneErrorCss(false)
        const input = e.target.value
        if (/^[0-9]{0,9}$/.test(input)) {
            setInfo((prev:Info) => {
                return {...prev,number:input}
            })
            valdiatePhone(input)
        } 
        
        

    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center gap-5 w-full">
                <div className="flex gap-1 self-end mb-2">
                    <p className="">Phone</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex flex-col gap-2 relative flex-1 max-w-[350px]">
                    <input
                        autoComplete="on"
                        name="phone" 
                        value={number} 
                        onChange={handleChangePhone} 
                        type="text"  
                        className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${phoneErrorCss ?"border-accent":""} pl-12`} 
                        placeholder="Number"/>
                    <div className="absolute top-[0.55rem] left-2 text-white/30">
                        +212
                    </div>
                </div>
            </div>
            <div className="text-sm text-white/80 max-w-[400px] leading-6 md:w-[455px]">
                <p>Your phone number or the number you use in salon</p>
            </div>
        </div>
    )
}