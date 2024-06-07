import { Input } from "@/components/ui/input";
import { SetStateAction ,useState,ChangeEvent} from "react";

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

export default function NewPassword({userPassword,setUserPassword}:Props) {
    const [passwordError , setPasswordError] = useState<boolean>(false)
    const [confirmPasswordError , setConfirmPasswordError] = useState<boolean>(false)
    const handleNewPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUserPassword(prev => {
            return {...prev,newPass:e.target.value}
        })
        validatePassword(e.target.value)
    }
    const validatePassword = (input:string) => {
        if(input.trim().length==0) return setPasswordError(false)
        try {
            if(passwordSchema.parse(input)) {
                setPasswordError(false)
            }
        } catch (error) {
            setPasswordError(true)
        }
    }
    const handleConfirmChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(userPassword.newPass != e.target.value || e.target.value.length <6) {
            setConfirmPasswordError(true)
        }else {
            setConfirmPasswordError(false)
        }
        if(e.target.value.trim().length ===0) setConfirmPasswordError(false)
        setUserPassword(prev => {
            return {...prev,confirmPass:e.target.value}
        })
    }
    return (
        <>
            <div className="flex gap-4 flex-col  w-full px-10">
                <p>New password:</p>
                    <Input 
                    id="newPass"
                    name="newPass"
                    type="password"
                    onChange={handleNewPasswordChange}
                    value={userPassword.newPass}
                    autoComplete="off"
                    placeholder="New password"  className={`bg-black text-white focus-visible:ring-offset-white/20 border border-white/10  focus:bg-darker ${passwordError?"border-accent":"border-white/10"}`}/> 
                </div>
                <div className="flex gap-4 flex-col  w-full px-10">
                    <p>Confirm password:</p>
                    <Input 
                    id="confirmPass"
                    type="password"
                    value={userPassword.confirmPass}
                    onChange={handleConfirmChange}
                    name="confirmPass"
                    autoComplete="off"
                    placeholder="Confirm password"  className={`bg-black text-white focus-visible:ring-offset-white/20 border border-white/10  focus:bg-darker ${confirmPasswordError?"border-accent":"border-white/10"}`}/> 
            </div>
        </>
    )
}