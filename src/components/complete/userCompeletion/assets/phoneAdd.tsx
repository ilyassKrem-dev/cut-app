
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import z from "zod"
import { motion } from "framer-motion";
const numberSchema = z.string().min(9).max(9)
export default function PhoneAdd({setPhoneNumber,phoneNumber}:{
    setPhoneNumber:React.Dispatch<SetStateAction<string>>;
    phoneNumber:string;
}) {
    const [numberErrorCss,setNumberErrorCss] = useState<boolean>(false) 
    const [clicked,setClicked] = useState<boolean>(false)
    const [phoneError,setPhoneError] = useState<string>("")
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        if (/^[0-9]{0,9}$/.test(input)) {
            setPhoneNumber(e.target.value)
            verifyNumber(input)
        } 
        
    }
    const verifyNumber = (value:string) => {
        
        try {
            numberSchema.parse(value)
            setNumberErrorCss(false)
        } catch (error) {
            if(value.length ==0) {
                setNumberErrorCss(false)
            }else {
                setNumberErrorCss(true)

            }
        }
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".phone-input");
          if (overlay && !overlay.contains(event.target)) {
            
            setClicked(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className="pt-24 flex flex-col items-center gap-10 md:pt-36">
            <h2 className="md:text-xl md:font-semibold">
                Add Phone number
            </h2>
            <div className="flex flex-col gap-10 w-full items-center">
                <div className="flex flex-col gap-2 w-[70%] max-w-[400px]">
                    <div className={`w-full rounded-lg ${numberErrorCss?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                        <div className="relative phone-input w-full">
                            <motion.input
                            initial={{paddingTop:0}}
                            
                            name="number" 
                            value={phoneNumber} 
                            onChange={handleChange} 
                            
                            type="text"  
                            className={`pl-20 w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${numberErrorCss ?"border-accent":""}`} 
                            placeholder="Phone" onClick={() => setClicked(true)}/>
                            <motion.p
                            initial={{top:"1rem"}}
                            animate={
                                {opacity:clicked || phoneNumber.length !==0?"0":"100%",
                                fontSize:clicked || phoneNumber.length !==0?"13px":"16px"}} 
                            className={`absolute  ${clicked || phoneNumber.length !==0?` ${numberErrorCss ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} pl-[4.21rem]`} onClick={() => setClicked(true)}>Phone</motion.p>
                            <div className="absolute left-0  top-0 bottom-0 flex items-center justify-center m-2 rounded-lg p-1 text-sm gap-1 text-white">
                                <div className="w-[25px] h-[25px] flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#c1272d" d="M900 0H0v600h900z"/><path d="M450 224.315l-44.467 136.87 116.401-84.559h-143.87l116.403 84.559z" fill="none" stroke="#006233" stroke-width="14.63"/></svg>

                                </div>
                                <p>+212</p>
                            </div>
                        </div>
                        
                    </div>
                    <p className="h-1 text-accent text-sm">{phoneError}</p>
                </div>
                
            </div>
        </div>
    )
}