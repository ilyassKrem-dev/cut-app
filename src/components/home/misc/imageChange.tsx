"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { shimmer, toBase64 } from "@/assets/other/shimmer";
export default function ImageChange({images,barberId}:{
    images:string[];
    barberId:string
}) {
    
    const [imagesIndex,setImagesIndex] = useState<number>(0)
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const changeImage = (type:string) => {
        if(type === "add") {
            if(imagesIndex == images.length) {
                return
            }
            setImagesIndex(prev => prev + 1)
            setDirection('right');
        } else {
            if(imagesIndex == 0) {
                return
            }
            setImagesIndex(prev => prev - 1)
            setDirection('left');
        }
    
    }
    return (
        <div className="relative flex justify-center items-center h-[310px] sm:h-[200px] group">
            <div className={`absolute left-1 ${imagesIndex === 0 ? "hidden":"hidden group-hover:block"} z-30 `}
            onClick={() => changeImage("reduce")}>
                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110"/>
            </div>
            <motion.div 
                key={imagesIndex}
                initial={direction === 'right' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={direction === 'right' ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
            >
                <Link href={`/salons/${barberId}`} >
                    <Image 
                        src={images[imagesIndex]} 
                        alt={`${"salon image"}`}
                        width={600}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 1280))}`}
                        height={600}
                        className="h-[310px] sm:h-[200px] rounded-lg opacity-80" 
                        />
                
                </Link>

            </motion.div>
            <div className={`absolute right-1 ${imagesIndex === images.length-1 ? "hidden":"hidden group-hover:block"}`} onClick={(e) => changeImage("add")}>
                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110 rotate-180"/>
            </div>
            <div className="absolute bottom-4 flex items-center justify-center gap-1">
            {[...Array(3)].map((_,indexD) => {
                return (
                    <div key={indexD} className={`rounded-full p-[0.2rem] ${indexD == imagesIndex ?"bg-white" : "bg-white/50"}`}>
                                    
                    </div>
                            )
                        })}
                </div>
        </div>

    )
}