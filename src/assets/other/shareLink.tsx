"use client"
import { FaExternalLinkAlt } from "react-icons/fa";
import SocialMedia from "./socialMedia";
import { SetStateAction, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
export default function ShareLink({barberImage,barberName,setShowShare,barberId}:{
    barberImage:string;
    barberName:string;
    setShowShare:React.Dispatch<SetStateAction<boolean>>;
    barberId?: string;
}) {
    const {toast} = useToast()
    const pathname = usePathname()
    const url = `${process.env.NEXT_PUBLIC_API_URL}${barberId||pathname}`
    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        toast({
            
            title:"Copied",
            action: <ToastAction altText="Close">Close</ToastAction>,
        })
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".share-overlay");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowShare(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
  
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/10  z-[9999] md:justify-center md:items-center flex justify-end items-end">
            <div className="flex bg-black rounded-t-lg  w-full border-t border-white/10  p-6 h-fit flex-col md:w-[50%] md:h-fit md:border md:rounded-lg justify-between share-overlay">
                <div className="flex items-center border-b border-white/10 pb-5">
                    <div className="  px-2 text-xl rounded-full border border-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-300 cursor-pointer" onClick={() => setShowShare(false)}>
                        x
                    </div>
                    <h1 className="flex-1 text-center mr-10 text-xl">Share</h1>
                </div>
                <div className="flex gap-2 mt-10 justify-start">
                    <Image 
                    src={barberImage} 
                    alt="Barber salon" 
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-lg"/>
                    <div className="flex gap-1 items-center flex-col">
                        <p className="font-semibold text-lg">{barberName}</p>
                        <div className="flex gap-2 items-center group hover:opacity-60 transition-all duration-300 cursor-pointer border border-white/10 rounded-full p-2 px-4 text-sm " onClick={handleCopy}>
                        <FaExternalLinkAlt  className="text-lg"/>
                        Copy link
                        </div>
                    </div>
                </div>
                <div className=" w-full h-full flex flex-col gap-5 items-center justify-end mt-10 md:mt-16">
                    
                    <SocialMedia url={url}/>
                </div>
            </div>
        </div>
    )
}