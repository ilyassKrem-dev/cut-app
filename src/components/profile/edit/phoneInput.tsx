import { ChangeEvent, SetStateAction, useState } from "react";

import z from "zod"

const PhoneSchema = z.string().length(9)

export default function ProfileNumber(
    {userNumber,setUserInfo,setErrorForm}:{
        userNumber:string;
        setUserInfo:React.Dispatch<SetStateAction<any>>
        setErrorForm:React.Dispatch<SetStateAction<boolean>>
    }
) {
    const [phoneErrorCss,setPhoneErrorCss] = useState<boolean>(false)

    const valdiatePhone = (value:string) => {
        if (value.trim().length === 0) {
            setPhoneErrorCss(false); 
        } else {
            try {
            
                PhoneSchema.parse(value);
                setErrorForm(false)
                setPhoneErrorCss(false);
            } catch (error) {
                setErrorForm(true)
                setPhoneErrorCss(true); 
            }
        }
    }
    const handleChangePhone = (e:ChangeEvent<HTMLInputElement>) => {

        if(phoneErrorCss) setPhoneErrorCss(false)
        const input = e.target.value
        if (/^[1-9]{0,9}$/.test(input)) {
            setUserInfo((prev:any) => {
                return {...prev,number:input}
            })
            valdiatePhone(input)
        } 
        
        

    }
    return (
        <div className="flex flex-col gap-2  flex-1 w-full">
            <label htmlFor="phone">
                Phone number
            </label>
            <div className="relative">
                <input
                    autoComplete="on"
                    name={userNumber}
                    id="phone"
                    value={userNumber}
                    onChange={handleChangePhone} 
                    type="text"  
                    className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-black focus:border-2 focus:bg-darker  ${phoneErrorCss ?"border-accent":" border-white/10"} pl-12  border`} 
                    placeholder="Number"/>
                <div className="absolute top-[0.55rem] left-2 text-white/30">
                    +212
                </div>

            </div>
        </div>
    )
}