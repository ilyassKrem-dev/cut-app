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
            <div className="flex flex-col  p-3 border-b border-white/40 hover:bg-white/30 rounded-t-xl cursor-pointer group text-sm" onClick={() => setShowLogin(true)}>
                <p className="text-light cursor-pointer">Login</p>

            </div>
            {!showLogin&&
            <div className="fixed bottom-0 right-0 left-0 bg-black/40 h-[98.5%] rounded-t-3xl z-50 text-light md:top-0 md:h-full md:flex md:flex-col md:justify-center md:items-center  shadow-[0px_0px_6px_2px_rgba(255,255,255,0.2)] no-doc-scroll login-form">
                <CaptchaWrapper>
                    <div className="flex flex-col  md:bg-black md:w-[50%] md:h-[80%] md:rounded-xl gap-5 md:shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                        <div className=" w-full text-center p-3 flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-t-xl">
                            <p className="self- text-xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => setShow(false)}>x</p>
                            <h2 className="flex-1 font-bold  mr-14">Login</h2>
                        </div>
                        <div className="p-5 px-6 flex gap-6 flex-col">
                            <h3 className="text-lg">Welcome to BarberCut</h3>
                            <FormulaLogin/>
                        </div>
                    </div>
                </CaptchaWrapper>
            </div>}
        </>
    )
}