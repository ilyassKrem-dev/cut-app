import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import LoadingAnimation from "@/assets/other/spinner";
import { motion } from "framer-motion";
import { VscEye ,VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { signIn } from "next-auth/react";
export default function PasswordForm(
    {
    password, 
    setPassword,
    email,
    }
    :
    {
        password:string;
        setPassword:React.Dispatch<SetStateAction<string>>
        email:string;
    }) {
        const [passwordError , setPasswordError] = useState<string>("")
        const [clickedPassword,setClickedpassword] = useState<boolean>(false)
        const [loading,setLoading] = useState<boolean>(false)
        const [showPassword,setShowPassword] = useState<boolean>(false)
        const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
            if(passwordError) setPasswordError("")
            setPassword(e.target.value)
        }
        const handleLogin = async() => {
            if(loading) return
            setLoading(true)
            try {
                const res = await axios.post('/api/login',{
                    email:email.toLowerCase(),
                    password:password
                })
                if(res.data.message) {
                    setLoading(false)
                    return setPasswordError(res.data.message)
                }
            
                if(res.data.success) {
                    await signIn('credentials',{
                        email
                    })
                    return setLoading(false)
                    
                }
            } catch (error:any) {
                setLoading(false)
                setPasswordError("Error,try again later")
            }
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
                        className={`absolute  ${clickedPassword || password.length !==0?` ${passwordError ?"text-accent":"text-gray-400"}  left-[0.9rem]`:"left-3"} `}>Passsword</motion.p>
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
                <p className="underline text-sm cursor-pointer hover:opacity-50 transition-all duration-300 w-fit mt-3">Forgot password</p>
            </div>
            <Button className=" bg-green-1 text-black hover:bg-green-1 hover:opacity-60 transition-all duration-300" onClick={handleLogin} disabled={password.length ===0 || loading}>
                {loading?<LoadingAnimation />:"Login"}
            </Button>
        </div>
    )
}