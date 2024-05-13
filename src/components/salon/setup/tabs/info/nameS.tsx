
import { ChangeEvent, SetStateAction, useState } from "react";

import z from "zod"
interface Info {
    name:string;
    number:string,
    images:File[]
}
interface Props {
    name:string;
    setInfo:React.Dispatch<SetStateAction<Info>>
}
const NameSchema = z.string().min(4).max(15)
export default function NameS({name,setInfo}:Props) {
    const [nameErrorCss,setNameErrorCss] = useState<boolean>(false)

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
        setInfo((prev:Info) => {
            return {...prev,name:e.target.value}
        })
        valdiateName(e.target.value)

    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center  w-full gap-5">
                <div className="flex gap-1 self-end mb-2">
                    <p className="">Name</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex  gap-2 flex-1 max-w-[350px]">
                    
                    
                    <input
                        
                        autoComplete="on"
                        name="name" 
                        value={name} 
                        onChange={handleChangeName} 
                        type="text"  
                        className={`w-full h-10 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${nameErrorCss ?"border-accent":""}`} 
                        placeholder="Name"/>
                    

                </div>
            </div>
            <div className="text-sm text-white/80 max-w-[400px] leading-6 md:w-[455px]">
                <p>Name of your salon</p>
            </div>
        </div>
    )
}