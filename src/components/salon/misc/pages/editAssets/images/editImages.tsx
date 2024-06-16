
import { SetStateAction, useState } from "react"
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6"
import { motion } from "framer-motion"
import Image from "next/image"
import { shimmer, toBase64 } from "@/assets/other/shimmer"
import { Button } from "@/components/ui/button"
import { MdDeleteOutline } from "react-icons/md";
import DeleteImages from "./deleteImages"
import AddImages from "./addImages"
export default function EditImages({images,ids,setSalon}:{
    images:string[];
    ids:{
        userId:string;
        barberId:string
    };
    setSalon:React.Dispatch<SetStateAction<any>>
}) {
    const [show,setShow] = useState<boolean>(true)
    const [imagesIndex,setImagesIndex] = useState<number>(0)
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [showDelete,setShowDelete] = useState<boolean>(false)
    const [showAdd,setShowAdd] = useState<boolean>(false)
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
        <div className=" w-full  px-6 h-full">
            <div className="border border-white/10 rounded-xl w-full flex flex-col   items-center">
                <div className={`flex justify-center items-center w-full group hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-white/30 p-2   ${show?"border-b border-b-white/10   rounded-t-xl":"rounded-xl"}`} onClick={() => setShow(prev => !prev)}>
                    <p className="flex-1 text-center cursor-pointer">Images</p>
                    <motion.div
                    initial={{
                        rotate:"0deg"
                    }}
                    animate={{
                        rotate:show?"0deg":"-90deg"
                    }}
                    transition={{
                        duration:0.2,
                        ease:"linear"
                    }}
                    >
                        <FaArrowDown className="self-end text-xl mb-[0.15rem] lg:hidden"/>

                    </motion.div>
                </div>
                
                {show&&
                <>
                    <div className="py-6 flex gap-6 px-4 flex-col w-full 2xl:w-[582px]">
                        <div className="relative flex justify-center items-center group w-full">
                            <div className={`absolute left-0 ${imagesIndex === 0 ? "hidden":"hidden group-hover:flex"} z-30  bg-black/30 top-0 left-0 h-full rounded-l-lg  items-center justify-center p-2 px-4`}
                            onClick={() => changeImage("reduce")}>
                                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110"/>
                            </div>
                            <motion.div 
                                key={imagesIndex}
                                initial={direction === 'right' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={direction === 'right' ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }}
                                transition={{ duration: 0.2,ease:"linear" }}
                                className="w-full"
                            >
                                <div className="flex items-center justify-center">
                                    <Image 
                                        src={images[imagesIndex]} 
                                        alt={`${"salon image"}`}
                                        width={600}
                                        priority={true}
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 1280))}`}
                                        height={600}
                                        className="h-[310px] sm:h-[300px] rounded-lg opacity-80 max-[420px]:h-[200px]   w-full object-cover" 
                                        />
                                
                                </div>

                            </motion.div>
                            <div className={`absolute right-0 ${imagesIndex === images.length-1 ? "hidden":"hidden group-hover:flex"} bg-black/30 top-0  h-full rounded-r-lg  items-center justify-center p-2 px-4`} onClick={(e) => changeImage("add")}>
                                <FaArrowLeft className="text-black bg-white/80 rounded-full text-xl p-1 cursor-pointer hover:opacity-60 transition-all duration-300 hover:scale-110 rotate-180"/>
                            </div>
                            <div className="absolute bottom-4 flex items-center justify-center gap-1">
                            {[...Array(images.length > 5 ? 5: images.length)].map((_,indexD) => {
                                return (
                                    <div key={indexD} className={`rounded-full p-[0.2rem] ${indexD == imagesIndex ?"bg-white" : "bg-white/50"}`}>
                                                    
                                    </div>
                                            )
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-5 max-[397px]:gap-3 max-[310px]:flex-col">
                            <Button className="bg-green-1 hover:bg-green-1/60 transition-all duration-300 flex-1 flex items-center gap-1 max-[397px]:text-xs max-[397px]:p-1 max-[310px]:w-full" onClick={() => setShowAdd(true)}>
                            <span className="text-xl mt-[0.15rem]">+</span> Add images
                            </Button>
                            <Button className={` transition-all duration-300 ${images.length == 1 ?"bg-accent hover:bg-accent":"bg-accent/80 hover:bg-accent/40"} flex-1 flex items-center gap-1 max-[397px]:text-xs max-[397px]:p-1 max-[310px]:p-2 max-[310px]:w-full`}
                            onClick={() => setShowDelete(true)}
                            disabled={images.length==1}>
                                <MdDeleteOutline className="text-xl"/>
                                Delete images
                            </Button>
                        </div>
                    </div>
                    {showDelete&&
                    <DeleteImages 
                    images={images} 
                    setShowDelete={setShowDelete}
                    ids={ids}
                    setSalon={setSalon}
                    />}
                    {showAdd&&<AddImages 
                        setShowAdd={setShowAdd}
                        ids={ids}
                        setSalon={setSalon}
                    />}
                </>
                }
            </div>
        </div>
    )
}


