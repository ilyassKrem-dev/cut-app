"use client"
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import EmailVerification from "@/components/shared/emailVerification";
import { FaArrowLeft } from "react-icons/fa6";
import NewPassword from "@/components/shared/newPassowrd";
import { changeUserPassword } from "@/lib/actions/user.action";
import { useToast } from "@/components/ui/use-toast";
interface UserPass {
    oldPass:string;
    newPass:string;
    confirmPass:string;
}
export default function ForgetTemplate() {
    const searchParams = useSearchParams()
    const [email,setEmail] = useState(searchParams.get("em") ||"")
    const [loading,setLoading] = useState<boolean>(false)
    const [userPassword,setUserPassword] = useState<UserPass>({
        oldPass:"",newPass:"",confirmPass:""
    })
    const [next,setNext] = useState<number>(0)
    const router = useRouter()
    const {toast} = useToast()
    const handleNext = (nber:number) => {
        if(email.length == 0) return
        setNext(nber)
    }

    const checkPassowrd = userPassword.newPass.length >=6 && userPassword.confirmPass.length>=6 && userPassword.confirmPass == userPassword.newPass
    const handleSave = async() => {
        if(loading || !checkPassowrd) return
        setLoading(true)
        try {
           
            const res = await changeUserPassword(
                    {
                        passwords:userPassword,
                        email:email
                    }
                )
            if(res) {
                setLoading(false)
                toast({
                    title:"Error",
                    description:`Password changed`
                })
                router.push("/login")
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:`${error.message}`
            })
        }
    }

    return (
        <div className="md:py-24 flex justify-center items-center   h-full mx-6">
            <div className="flex flex-col w-full max-w-[680px] gap-10 border border-white/10 p-6 rounded-lg  h-[475px]">
                <div className="flex flex-col gap-1 items-center text-center">
                    <div className="flex justify-between w-full items-center border-b border-b-white/10 pb-5">
                        {next!==0&&<FaArrowLeft className="text-xl hover:opacity-70 transition-all duration-300 cursor-pointer active:opacity-50" onClick={() => setNext(prev => prev-1)}/>}
                        <h1 className="text-xl font-semibold flex-1 text-center">Forget Password</h1>

                    </div>

                </div>
                {next==0
                ?
                <div className="flex gap-7 flex-col ">
                    <div className="flex gap-1 mt-12 items-center text-center flex-col">
                        <h1 className="text-xl">Email</h1>
                        <p className="self-center  text-center text-sm text-white/60 ">Type your account email</p>
                    </div>
                    <div className="flex gap-3 flex-col  mx-10">
                        <p className="text-sm">Email</p>

                        <Input 
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        placeholder="Email" 
                        value={email}
                        className={`bg-black text-white focus-visible:ring-offset-white/20 border border-white/10  focus:bg-darker`}/>

                    </div>
                    <button className="bg-green-1 rounded-lg p-2 text-light hover:opacity-60 transition-all duration-300 hover:bg-green-1/60 hover:animate-pulse cursor-pointer disabled:bg-green-1/20 disabled:text-opacity-50 mx-10" onClick={() => handleNext(1)} disabled={email.length ===0}>
                        Continue
                    </button>
                </div>
                :
                next == 1
                ?
                <EmailVerification 
                email={email}
                setNext={handleNext}
                />
                :
                <>
                    <NewPassword 
                        userPassword={userPassword}
                        setUserPassword={setUserPassword}
                    />
                    <button className="bg-green-1 rounded-lg p-2 text-light hover:opacity-60 transition-all duration-300 hover:bg-green-1/60 hover:animate-pulse cursor-pointer disabled:bg-green-1/20 disabled:text-opacity-50 mx-10" onClick={handleSave} disabled={!checkPassowrd}>
                        Continue
                    </button>
                </>
                }
                
            </div>
        </div>
    )
}