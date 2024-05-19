import { SetStateAction } from "react"

import { useLoginContext } from "@/assets/wrappers/loginWrapper"
export default function Login({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {

    const {setShowLogin} = useLoginContext()
    
  
    return (
        <>
            <div className="p-3  hover:bg-white/30 rounded-t-xl cursor-pointer group text-sm" 
            onClick={() => {
                setShowLogin(true)}}>
                <p className="text-light cursor-pointer">Login</p>

            </div>
        
        </>
    )
}