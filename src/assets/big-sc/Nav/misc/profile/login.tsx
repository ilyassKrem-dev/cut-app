import { SetStateAction, useEffect, useState } from "react"

import CaptchaWrapper from "@/assets/wrappers/CaptchaWrapper"
import FormulaLogin from "./formulaLogin"
export default function Login({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {

    const [showLogin,setShowLogin] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".login-form");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowLogin(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    
    return (
        <>
            <div className="p-3  hover:bg-white/30 rounded-t-xl cursor-pointer group text-sm" 
            onClick={() => {
                setShowLogin(true)}}>
                <p className="text-light cursor-pointer">Login</p>

            </div>
            {showLogin&&
            <div className="fixed bottom-0 right-0 left-0 bg-black/40 h-[98.5%]  z-50 text-light md:top-0 md:h-full md:flex md:flex-col md:justify-center md:items-center  shadow-[0px_0px_6px_2px_rgba(255,255,255,0.2)] no-doc-scroll login-form">
                <CaptchaWrapper>
                    <FormulaLogin setShow={setShow}/>    
                </CaptchaWrapper>
            </div>}
        </>
    )
}