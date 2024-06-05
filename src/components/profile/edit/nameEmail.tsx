import { Input } from "@/components/ui/input"
import { ChangeEvent, SetStateAction, useState } from "react"
import z from "zod"
interface Props {
    userName:string;
    userEmail:string;
    setUserInfo:React.Dispatch<SetStateAction<any>>;
    setErrorForm:React.Dispatch<SetStateAction<boolean>>
}

const EmailSchema = z.string().email().min(1);
const NameSchema = z.string().min(4).max(15)
export default function ProfileEditNameEmail({userName,userEmail,setUserInfo,setErrorForm}:Props) {

    const [emailErrorCss,setEmailErrorCss] = useState<boolean>(false)
    const [nameErrorCss,setNameErrorCss] = useState<boolean>(false)
    const [emailError,setEmailError] = useState<string>("")

   
    const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        if(emailError) setEmailError("")
        setUserInfo((prev:any) => {
        return {...prev,email:e.target.value}
            })
        validateEmail(e.target.value);
    }
    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        if(nameErrorCss) setNameErrorCss(false)
        setUserInfo((prev:any) => {
            return {...prev,name:e.target.value}
                })
        valdiateName(e.target.value)

    }
    const valdiateName = (value:string) => {
        if (value.trim().length === 0) {
            setNameErrorCss(false); 
            
        } else {
            try {
            
                NameSchema.parse(value);
                setErrorForm(false)
                setNameErrorCss(false);
            } catch (error) {
                setErrorForm(true)
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
                setErrorForm(false)
                setEmailErrorCss(false);
            } catch (error) {
                setErrorForm(true)
                setEmailErrorCss(true); 
            }
        }
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                <label htmlFor="name">Name</label>
                <Input 
                id="name"
                name={userName}
                value={userName}
                onChange={handleChangeName}
                type="text" 
                autoComplete="off"
                placeholder="Name"  className={`bg-black text-white focus-visible:ring-offset-white/20 border border-white/10  focus:bg-darker ${nameErrorCss?"border-accent":"border-white/10"}`}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="name">Email</label>
                <Input id="email"
                type="text"
                value={userEmail}
                onChange={handleChangeEmail}
                autoComplete="off"
                name={userEmail}  placeholder="Email"  
                className={`bg-black 
                text-white focus-visible:ring-offset-white/20 border   focus:bg-darker ${emailErrorCss?"border-accent":"border-white/10"}`}/>
            </div>
        </>
    )
}