import { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserEdit,FaKey  } from "react-icons/fa";
import { motion } from "framer-motion";
import { CiCreditCard1 } from "react-icons/ci";
import Link from "next/link";
export default function ProfileSettings() {
    const [windowWidth,setWindowWidth] = useState<any>(window.innerWidth)
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".setting-btn");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        const handleWidth = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleWidth)
        return () => window.removeEventListener("resize",handleWidth)
    },[windowWidth])

    return (
        <div>
            <div className="absolute right-0 top-0 border-b border-l md:static  p-1 rounded-l-lg group flex gap-1 transition-all duration-300 cursor-pointer border-white/20 items-center md:border-0" onClick={() => setShow(prev => !prev)}>
                <IoSettingsSharp  className="text-3xl cursor-pointer text-white/60 group-hover:opacity-60 transition-all duration-300"/>
                <p className=" group-hover:inline-block hidden transition-all duration-300 cursor-pointer group-hover:opacity-60 md:group-hover:hidden">Settings</p>
            </div>
            {show&&
            <>
            {windowWidth<767
            ?
            <div
            
            className="fixed md:absolute bottom-0 right-0 left-0 top-0 md:bottom-auto md:top-auto md:left-auto md:right-32 bg-black/60 flex items-end z-50 no-doc-scroll">
                <motion.div
                initial={{y:"100%"}}
                animate={{y:0}}
                transition={{duration:0.5,ease:"easeInOut"}} 
                className="bg-black rounded-t-2xl   border-t border-white/10 p-4 flex flex-col gap-12 h-[40%] flex-1 md:p-0 md:border md:rounded-2xl setting-btn">
                    <div className="flex items-center justify-between md:hidden">
                        <div className="border rounded-full border-white/5 px-2 text-xl hover:bg-white/30 cursor-pointer transition-all duration-300 active:opacity-50" onClick={() => setShow(false)}>
                            x
                        </div>
                        <p className="flex-1 text-center font-semibold text-lg">Settings</p>
                    </div>
                    <div className=" mx-2 flex flex-col gap-4 md:mx-0 md:gap-2">
                    <Link 
                        href={"/profile/edit"}
                        className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:rounded-t-2xl md:text-base md:rounded-b-none">
                            <FaUserEdit className="text-xl text-white/60 cursor-pointer"/>
                            Edit Profile
                        </Link>
                        <Link  href={"/profile/password"} className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:text-base md:rounded-none">
                            <FaKey className="text-xl text-white/60 cursor-pointer"/>
                            Change Passowrd
                        </Link>
                        <Link 
                        href={"/profile/payment"}
                        className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:rounded-b-2xl md:text-base md:rounded-t-none">
                            <CiCreditCard1 className="text-xl text-white/60 cursor-pointer"/>
                            Payment Method
                        </Link>
                        
                    </div>
                </motion.div>
               
            </div>
            :
            <motion.div
            initial={{scale:"0"}}
            animate={{scale:"100%"}}
            className="fixed md:absolute bottom-0 right-0 left-0 top-0 md:bottom-auto md:top-auto md:left-auto md:right-32 bg-black/60 flex items-end z-50">
                <div className="bg-black rounded-t-2xl   border-t border-white/10 p-4 flex flex-col gap-12 h-[40%] flex-1 md:p-0 md:border md:rounded-2xl setting-btn">
                    <div className="flex items-center justify-between md:hidden">
                        <div className="border rounded-full border-white/5 px-2 text-xl hover:bg-white/30 cursor-pointer transition-all duration-300 active:opacity-50" onClick={() => setShow(false)}>
                            x
                        </div>
                        <p className="flex-1 text-center font-semibold text-lg">Settings</p>
                    </div>
                    <div className=" mx-2 flex flex-col gap-4 md:mx-0 md:gap-2">
                        <Link 
                        href={"/profile/edit"}
                        className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:rounded-t-2xl md:text-base md:rounded-b-none">
                            <FaUserEdit className="text-xl text-white/60 cursor-pointer"/>
                            Edit Profile
                        </Link>
                        <Link  href={"/profile/password"} className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:text-base md:rounded-none">
                            <FaKey className="text-xl text-white/60 cursor-pointer"/>
                            Change Passowrd
                        </Link>
                        <Link 
                        href={"/profile/payment"}
                        className="flex gap-4 text-lg items-center hover:bg-white/10 rounded-lg p-1 px-2 transition-all duration-300 cursor-pointer md:p-3 md:rounded-b-2xl md:text-base md:rounded-t-none">
                            <CiCreditCard1 className="text-xl text-white/60 cursor-pointer"/>
                            Payment Method
                        </Link>
                        
                    </div>
                </div>
               
            </motion.div>}
            </>}
        </div>
    )
}