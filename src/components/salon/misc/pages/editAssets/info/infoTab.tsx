import { ChangeEvent, SetStateAction, useState } from "react";
import SaveInfo from "@/components/salon/misc/pages/editAssets/info/saveInfo";
import z from "zod"

type salonInfo = {
    salonName:string;
    number:string
}

const NameSchema = z.string().min(6).max(15)
const PhoneSchema = z.string().length(9)
export default function InfoTab(
    {
        info,
        ids,
        setSalon
    }:{
        info:{
            salonName:string;
            phoneNumber:string;
        };
        ids:{
            userId:string;
            barberId:string
        };
        setSalon:React.Dispatch<SetStateAction<any>>
    }
) {
    const [salonInfo,setSalonInfo] = useState<salonInfo>({
        salonName:info.salonName,number:info.phoneNumber.split("212")[1]
    })

    const [nameErrorCss,setNameErrorCss] = useState<boolean>(false)
    const [phoneErrorCss,setPhoneErrorCss] = useState<boolean>(false)
    const checkChange = nameErrorCss || phoneErrorCss || salonInfo.salonName === info.salonName && salonInfo.number===info.phoneNumber.split('212')[1]
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
            setSalonInfo((prev) => {
                return {...prev,number:e.target.value}
            })
            valdiatePhone(input)
        } 
        
        

    }
    const valdiateName = (value:string) => {
        if (value.trim().length === 0) {
            setNameErrorCss(false); 
        } else {
            try {
            
                NameSchema.parse(value);
                
                setNameErrorCss(false);
            } catch (error) {
                
                setNameErrorCss(true); 
            }
        }
    }
    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        if(nameErrorCss) setNameErrorCss(false)
        setSalonInfo((prev) => {
            return {...prev,salonName:e.target.value}
        })
        valdiateName(e.target.value)

    }


    return (
        <div className="flex flex-col gap-10 mt-4 w-full px-10 py-4 2xl:w-[582px]">
            
            <div className="flex items-start  w-full flex-col gap-2 ">
                <div className="flex gap-1 mb-2 flex-col">
                    <p className="">Name</p>
                    <p className="text-xs text-white/40">Salon name</p>
                </div>
                <div className="flex  gap-2 flex-1 max-w-[600px] w-full">
    
                    <input
                        autoComplete="on"
                        name="name" 
                        value={salonInfo.salonName} 
                        onChange={handleChangeName} 
                        type="text"  
                        className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${nameErrorCss ?"border-accent":""} focus:bg-white/10`} 
                        placeholder="Name"/>
                </div>
            </div>
            
            <div className="flex items-start gap-3 w-full flex-col">
                <div className="flex gap-1  mb-2 flex-col">
                    <p className="">Phone</p>
                    <p className="text-xs text-white/40">Salon phone number</p>
                </div>
                <div className="flex flex-col gap-2 relative flex-1 max-w-[600px] w-full">
                    <input
                        autoComplete="on"
                        name="phone" 
                        value={salonInfo.number} 
                        onChange={handleChangePhone} 
                        type="text"  
                        className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${phoneErrorCss ?"border-accent":""} pl-12`} 
                        placeholder="Number"/>
                    <div className="absolute top-[0.55rem] left-2 text-white/30">
                        +212
                    </div>
                </div>
            </div>
            <SaveInfo 
                ids={ids}
                setSalon={setSalon}
                salonInfo={salonInfo}
                check={checkChange}
            />
        </div>
    )
}