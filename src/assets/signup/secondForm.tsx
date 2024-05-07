import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { VscEye ,VscEyeClosed } from "react-icons/vsc";

import z from "zod"

const passwordSchema = z.string().min(6)

export default function SecondForm(
    {
    password, 
    setPassword,
    setVerifyStep
    }
    :
    {
        password:string;
        setPassword:React.Dispatch<SetStateAction<string>>
        setVerifyStep:React.Dispatch<SetStateAction<boolean>>
    }) {
        const [passwordError , setPasswordError] = useState<string>("")
        const [passwordConfiramtion,setPasswordConfiramtion]= useState<string>("")
        const [clickedPassword,setClickedpassword] = useState<boolean>(false)
        const [passwordConError,setPaswordConError] = useState<string>("")
        const [clickedPasswordCon,setClickedpasswordCon] = useState<boolean>(false)
        const [showPassword,setShowPassword] = useState<boolean>(false)
        const [showPasswordCon,setShowPasswordCon] = useState<boolean>(false)
        const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
            if(passwordError) setPasswordError("")
            setPassword(e.target.value)
            validatePassword(e.target.value)
        }
        const handleChangePC = (e:ChangeEvent<HTMLInputElement>) => {
            if(passwordConError) setPaswordConError("")
            setPasswordConfiramtion(e.target.value)
            
        }
        const validatePassword = (value:string) => {
            if (value.trim().length === 0) {
                setPasswordError(''); 
            } else {
                try {
                
                    passwordSchema.parse(value);
                    
                    setPasswordError("");
                } catch (error) {
                    
                    setPasswordError(' '); 
                }
            }
        }
        const handleLogin = async() => {
            if(password.length ===0) return
            if(passwordConfiramtion.length ===0) return
            if(password !== passwordConfiramtion) return setPaswordConError("Passwords don't match")
            setVerifyStep(true)
        }
        
       

        useEffect(() => {
            function handleOutsideClick(event: any) {
              const overlay = document.querySelector(".password-input");
              if (overlay && !overlay.contains(event.target)) {
                
                setClickedpassword(false);
              }
            }
        
            document.body.addEventListener("click", handleOutsideClick);
        
            return () => {
              document.body.removeEventListener("click", handleOutsideClick);
            };
        }, []);
        useEffect(() => {
            function handleOutsideClick(event: any) {
              const overlay = document.querySelector(".conPassw-input");
              if (overlay && !overlay.contains(event.target)) {
                
                setClickedpasswordCon(false);
              }
            }
        
            document.body.addEventListener("click", handleOutsideClick);
        
            return () => {
              document.body.removeEventListener("click", handleOutsideClick);
            };
        }, []);
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className={`w-full rounded-lg
                 ${passwordError?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                    <div className="relative password-input">
                        <motion.input
                        initial={{paddingTop:0}}
                        animate={{paddingTop:clickedPassword|| password.length !==0?"0.75rem":"0"}}
                        name="password"
                        type={showPassword?"text":"password"} 
                        value={password} 
                        onChange={handleChange}  
                        className={`w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${passwordError ?"border-accent":""}`} 
                        placeholder="Passsword" onClick={() => setClickedpassword(true)}/>
                        <motion.p
                        initial={{top:"1rem"}}
                        animate={
                            {top:clickedPassword || password.length !==0?"0.3rem":"1rem",
                            fontSize:clickedPassword || password.length !==0?"13px":"16px"}} 
                        className={`absolute  ${clickedPassword || password.length !==0?` ${passwordError ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `} onClick={() => setClickedpasswordCon(true)}>Passsword</motion.p>
                        <div className="absolute right-4 top-4 text-2xl cursor-pointer hover:opacity-50 transition-all duration-300" onClick={() => setShowPassword(prev => !prev)}>
                            {!showPassword
                            ?
                            <VscEye />
                            :
                            <VscEyeClosed />}
                        </div>
                    </div>
                    
                </div>
                <p className="h-1 text-accent text-sm">{passwordError}</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className={`w-full rounded-lg
                 ${passwordConError?"border-accent border":"shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.8)]"}`}>
                    <div className="relative conPassw-input">
                        <motion.input
                        initial={{paddingTop:0}}
                        animate={{paddingTop:clickedPasswordCon|| passwordConfiramtion.length !==0?"0.75rem":"0"}}
                        name="password"
                        type={showPasswordCon?"text":"password"} 
                        value={passwordConfiramtion} 
                        onChange={handleChangePC}  
                        className={`w-full h-14 text-white rounded-lg focus:outline-none px-3 bg-darker focus:border-2 focus:bg-darker  ${passwordConError ?"border-accent":""}`} 
                        placeholder="Confirm password" onClick={() => setClickedpasswordCon(true)}/>
                        <motion.p
                        initial={{top:"1rem"}}
                        animate={
                            {top:clickedPasswordCon || passwordConfiramtion.length !==0?"0.3rem":"1rem",
                            fontSize:clickedPasswordCon || passwordConfiramtion.length !==0?"13px":"16px"}} 
                        className={`absolute  ${clickedPasswordCon || passwordConfiramtion.length !==0?` ${passwordConError ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `} onClick={() => setClickedpasswordCon(true)}>Confirm password</motion.p>
                        <div className="absolute right-4 top-4 text-2xl cursor-pointer hover:opacity-50 transition-all duration-300" onClick={() => setShowPasswordCon(prev => !prev)}>
                            {!showPasswordCon
                            ?
                            <VscEye />
                            :
                            <VscEyeClosed />}
                        </div>
                    </div>
                    
                </div>
                <p className="h-1 text-accent text-sm">{passwordConError}</p>
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleLogin} disabled={password.length <6  || passwordConfiramtion.length ===0}>
                Sign up
            </Button>
        </div>
    )
}