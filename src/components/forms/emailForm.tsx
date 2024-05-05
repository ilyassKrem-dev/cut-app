
import { motion } from "framer-motion"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import z from "zod"
import LoadingAnimation from "@/assets/other/spinner";
import { Button } from "../ui/button";
import axios from "axios"
const EmailSchema = z.string().email().min(1);

export default function EmailForm({
    email,setEmail,setNext
}:{
    email:string;
    setEmail:React.Dispatch<SetStateAction<string>>;
    setNext:React.Dispatch<SetStateAction<boolean>>;
}) {
    const [clickedEmail,setClickedEmail] = useState<boolean>(false)
    const [emailErrorCss,setEmailErrorCss] = useState<boolean>(false)
    const [emailVerified,setEmailVerified] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".email-input");
          if (overlay && !overlay.contains(event.target)) {
            
            setClickedEmail(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value);
    }

    const validateEmail = (value: string) => {
        if (value.trim().length === 0) {
            setEmailErrorCss(false); 
        } else {
            try {
            
                EmailSchema.parse(value);
                
                setEmailErrorCss(false);
            } catch (error) {
                
                setEmailErrorCss(true); 
            }
        }
    };
    useEffect(() => {
        setEmailVerified(!emailErrorCss && email.trim().length > 0);
    }, [email, emailErrorCss]);
    const handleContinue = async() => {
        if(email.length ===0) return
        try {
            EmailSchema.parse(email);
        } catch (error) {
            return
        }
        try {
            console.log(email)
            
            const res = await axios.post('/api/login',{
                email
            })
            console.log(res)
            if(res) setNext(true)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <div className={`w-full rounded-lg ${emailErrorCss?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                <div className="relative email-input">
                    <motion.input
                    initial={{paddingTop:0}}
                    animate={{paddingTop:clickedEmail|| email.length !==0?"0.75rem":"0"}}
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    
                    type="email"  
                    className={`w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${emailErrorCss ?"border-accent":""}`} 
                    placeholder="E-mail" onClick={() => setClickedEmail(true)}/>
                    <motion.p
                    initial={{top:"1rem"}}
                    animate={
                        {top:clickedEmail || email.length !==0?"0.3rem":"1rem",
                        fontSize:clickedEmail || email.length !==0?"13px":"16px"}} 
                    className={`absolute  ${clickedEmail || email.length !==0?` ${emailErrorCss ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `}>E-mail</motion.p>
                </div>
                
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleContinue} disabled={!emailVerified}>
                    Continue
            </Button>
        </div>
    )
}