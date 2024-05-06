
import { motion } from "framer-motion"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import z from "zod"
import LoadingAnimation from "@/assets/other/spinner";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
const EmailSchema = z.string().email().min(1);
const NameSchema = z.string().min(4).max(15)
export default function FirstForm({
    email,setEmail,setNext,name,setName,isBarber,setIsBarber
}:{
    email:string;
    setEmail:React.Dispatch<SetStateAction<string>>;
    setNext:React.Dispatch<SetStateAction<boolean>>;
    name:string;
    setName:React.Dispatch<SetStateAction<string>>;
    isBarber:boolean
    setIsBarber:React.Dispatch<SetStateAction<boolean>>;
}) {
    const [clickedEmail,setClickedEmail] = useState<boolean>(false)
    const [clickedName,setClickedName] = useState<boolean>(false)
    const [emailErrorCss,setEmailErrorCss] = useState<boolean>(false)
    const [emailVerified,setEmailVerified] = useState<boolean>(false)
    const [nameErrorCss,setNameErrorCss] = useState<boolean>(false)
    const [emailError,setEmailError] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const {executeRecaptcha} = useGoogleReCaptcha()
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
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".name-input");
          if (overlay && !overlay.contains(event.target)) {
            
            setClickedName(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        if(emailError) setEmailError("")
        setEmail(e.target.value)
        validateEmail(e.target.value);
    }
    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        if(nameErrorCss) setEmailError("")
        setName(e.target.value)
        valdiateName(e.target.value)

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
    const handleChangeRadio = (e:ChangeEvent<HTMLInputElement>) => {
        const selectedId = e.target.id;
        setIsBarber(selectedId === "barber");
        
    }
    const handleContinue = async() => {
        if(email.length ===0) return
        if(name.length < 3) return
        if(loading) return
        setLoading(true)
        try {
            EmailSchema.parse(email);
            NameSchema.parse(name)
        } catch (error) {
            return setLoading(false)
        }
        try {
            if(!executeRecaptcha) {
                setLoading(false)
                throw {
                  title:"reCaptcha not available at the moment",
                  decription:"Please try again",
                }
            
            }

            const reCaptchaToken = await executeRecaptcha("login")
            
            const res = await axios.post('/api/signup',{
                email:email.toLowerCase(),
                token:reCaptchaToken
            })
            if(res.data.message) {
                setLoading(false)
                setEmailErrorCss(true)
                return setEmailError(res.data.message)
            }
            setLoading(false)
            setNext(true)
        } catch (error) {
            setLoading(false)
            setEmailError("Failed to continue")
        }
    }
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className={`w-full rounded-lg ${nameErrorCss?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                    <div className="relative name-input">
                        <motion.input
                        initial={{paddingTop:0}}
                        animate={{paddingTop:clickedName|| name.length !==0?"0.75rem":"0"}}
                        name="name" 
                        value={name} 
                        onChange={handleChangeName} 
                        type="text"  
                        className={`w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${nameErrorCss ?"border-accent":""}`} 
                        placeholder="Name" onClick={() => setClickedName(true)}/>
                        <motion.p
                        initial={{top:"1rem"}}
                        animate={
                            {top:clickedName || name.length !==0?"0.3rem":"1rem",
                            fontSize:clickedName || name.length !==0?"13px":"16px"}} 
                        className={`absolute  ${clickedName || name.length !==0?` ${nameErrorCss ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `} onClick={() => setClickedName(true)}>Name</motion.p>
                    </div>
                    
                </div>
                
            </div>
            <div className="flex flex-col gap-2">
                <div className={`w-full rounded-lg ${emailErrorCss?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                    <div className="relative email-input">
                        <motion.input
                        initial={{paddingTop:0}}
                        animate={{paddingTop:clickedEmail|| email.length !==0?"0.75rem":"0"}}
                        name="email" 
                        value={email} 
                        onChange={handleChangeEmail} 
                        
                        type="email"  
                        className={`w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${emailErrorCss ?"border-accent":""}`} 
                        placeholder="E-mail" onClick={() => setClickedEmail(true)}/>
                        <motion.p
                        initial={{top:"1rem"}}
                        animate={
                            {top:clickedEmail || email.length !==0?"0.3rem":"1rem",
                            fontSize:clickedEmail || email.length !==0?"13px":"16px"}} 
                        className={`absolute  ${clickedEmail || email.length !==0?` ${emailErrorCss ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `} onClick={() => setClickedEmail(true)}>E-mail</motion.p>
                    </div>
                    
                </div>
                <p className="h-1 text-accent text-sm">{emailError}</p>
            </div>
            <div className="flex flex-col gap-5">
                <p className="font-bold">Account Type:</p>
                <div className="flex  gap-10 items-center">
                    <div className="flex gap-2 items-center">
                        <input type="radio" name="barber" id="user" className=" accent-black bg-light/30" checked={!isBarber}  onChange={handleChangeRadio}/>
                        <label htmlFor="user" className="">User</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        
                        <input type="radio" name="barber" id="barber" className=" accent-black" onChange={handleChangeRadio}/>
                        <label htmlFor="barber">Barber</label>
                    </div>

                </div>
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleContinue} disabled={!emailVerified || loading || name.length < 4}>
                {loading?<LoadingAnimation />:"Continue"}
            </Button>
        </div>
    )
}