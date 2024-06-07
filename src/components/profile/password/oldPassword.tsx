import { Input } from "@/components/ui/input";
import { ChangeEvent, SetStateAction, useState } from "react"
import { VscEye ,VscEyeClosed } from "react-icons/vsc";
import z from "zod"
const passwordSchema = z.string().min(6)

interface Props {
    setUserPassword:React.Dispatch<SetStateAction<{
        oldPass:string;
        newPass:string;
        confirmPass:string;
    }>>;
    userPassword:{
        oldPass:string;
        newPass:string;
        confirmPass:string;
    }
}

export default function OldPassword({userPassword,setUserPassword}:Props) {
    const [passwordError , setPasswordError] = useState<boolean>(false)
    const [showPassword,setShowPassword] = useState<boolean>(false)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUserPassword(prev => {
            return {...prev,oldPass:e.target.value}
        })
        verifyPassword(e.target.value)
    }
    const verifyPassword = (input:string) => {
        if(input.trim().length === 0) return setPasswordError(false)
        try {
            if(passwordSchema.parse(input)) {
                setPasswordError(false)
            }
        } catch (error) {
            setPasswordError(true)
        }
    }
    return (
        <div className="flex gap-4 flex-col  w-full px-10">
            <p>Old password:</p>
            <div className="relative">
                <Input 
                id="oldPass"
                name="oldPass"
                value={userPassword.oldPass}
                onChange={handleChange}
                type={showPassword?"text":"password"} 
                autoComplete="off"
                placeholder="Old password"  className={`bg-black text-white focus-visible:ring-offset-white/20 border border-white/10  focus:bg-darker ${passwordError?"border-accent":"border-white/10"}`}/> 
                <div className="absolute right-3 top-[0.30rem] text-3xl cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setShowPassword(prev => !prev)}>
                    {!showPassword?<VscEye />:<VscEyeClosed />}
                </div>
            </div>
        </div>
    )
}