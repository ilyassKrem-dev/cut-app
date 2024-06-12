"use client"
import { shimmer, toBase64 } from "@/assets/other/shimmer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function BarberImages({barberImages}:{barberImages:string[]| undefined;}) {
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".images-form");
          if (overlay && !overlay.contains(event.target)) {
        
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className="flex gap-2">
            {barberImages?.slice(0,3).map((img,index:number) => {
                
                return (
                    <div key={index} className={` h-[400px]  ${index==0?"flex-1 w-[300px] ":"w-[250px]"} hidden md:block`}>
                        <Image
                            src={img}
                            alt="image"
                            width={1280}
                            height={1280}
                            priority
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 1280))}`}
                            className={` object-cover w-full h-full ${index==0?"rounded-l-xl":""}
                            ${index==barberImages.length -1?"rounded-r-xl":""}
                        

                            `}
                                
                            />

                    </div>

                )
            })}
            <div className={` h-[400px] w-full  block md:hidden relative`} onClick={() => setShow(true)}>
                <Image
                    src={barberImages ?barberImages[0]:""}
                    alt="image"
                    width={1280}
                    height={1280}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 1280))}`}
                    className={` object-cover w-full h-full 
                    `}
                    />
                <div className="absolute bottom-3 right-3  bg-black/70 text-light rounded-md p-1 px-6 text-sm">
                    1/{barberImages?.length}
                </div>
            </div>

            {show&&
            <motion.div
            initial={{y:"100%"}}
            animate={{y:"0%"}}
            exit={{y:"100%"}}
            
            transition={{duration:0.3,ease:"linear"}}
            className="bg-black/50 fixed  w-full right-0 left-0 bottom-0 top-0 z-[999] no-doc-scroll  md:hidden pt-12">
                <div className="bg-black border-t border-white/10  w-full   flex flex-col p-2 rounded-t-3xl items-center py-10 md:hidden images-form h-full">
                    <div className="flex justify-center items-center w-full">
                        <div className="p-1 text-lg rounded-full px-3 ml-2 cursor-pointer hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20" onClick={() => setShow(false)}>
                            x
                        </div>
                        <h1 className="text-xl flex-1 text-center mr-10">Photos</h1>
                    </div>
                    <div className="mt-12">
                        <div className="flex gap-4 flex-wrap px-2 justify-center overflow-auto h-screen max-h-full custom-scrollbar pb-52 content-start">
                            {barberImages?.map((img,index) => {
                                return (
                                    <Image
                                    key={index}
                                    src={img}
                                    alt="image"
                                    width={1280}
                                    height={1280}
                                    priority
                                    placeholder="blur"
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 1280))}`}
                                    className={` object-cover w-[230px] h-[200px] rounded-lg max-[508px]:w-[200px]`} /> 
                                )
                            })}
                            
                            
                        </div>  
                    </div>

                </div>
            </motion.div>}
        </div>
    )
}