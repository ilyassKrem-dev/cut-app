import { SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import LoadingAnimation from "@/assets/other/spinner";
import { deleteBarberImages } from "@/lib/actions/barber.action.edit";
import { useToast } from "@/components/ui/use-toast";
export default function DeleteImages(
    {
        images,
        setShowDelete,
        ids,
        setSalon
    }:{
    images:string[];
    setShowDelete:React.Dispatch<SetStateAction<boolean>>;
    ids:{
        userId:string;
        barberId:string
    };
    setSalon:React.Dispatch<SetStateAction<any>>
    }) {
    const [selected,setSelected] = useState<string[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".delete-image-overlay");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowDelete(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [setShowDelete]);
    const handleSelectImage = (img:string) => {
        
        
        if(selected.includes(img)) {
            return setSelected(prev => {
                return prev.filter(imgSelect => imgSelect !== img)
            })
        }
        if(selected.length >= images.length-3) return
        setSelected(prev => {
            return [...prev,img]
        })
    }

    const handleDelete = async() => {
        if(loading) return
        try {
            setLoading(true)
            const res = await deleteBarberImages(
                {
                    userId:ids.userId,
                    images:selected,
                    barberId:ids.barberId
                }
            )
            if(res) {
                setLoading(false)
                setShowDelete(false)
                setSelected([])
                setSalon((prev:any) => {
                    return {...prev,images:res}
                })
                
                toast({
                    variant:"success",
                    title:"Success",
                    description:'Images have been deleted'
                })

            }

        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:'Error',
                description:`${error.message}`
            })
        }
    }
    return (
        <div  className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/40 flex items-end md:flex md:justify-center md:items-center">
            <div className="bg-black rounded-t-xl h-[80%] w-full border-t border-t-white/10  flex flex-col delete-image-overlay  md:border md:border-white/20 md:rounded-xl md:h-[60%] md:w-[50%]">
                <div className="flex justify-center items-center p-3">
                    <div className="text-xl border rounded-full p-1 px-3 border-white/10 cursor-pointer  hover:bg-white hover:text-black transition-all duration-300" onClick={() => setShowDelete(false)}>
                        x
                    </div>
                    <h1 className="flex-1 text-center font-semibold text-lg mr-8">Delete</h1>
                </div>
                <div className=" h-full flex-1 overflow-y-auto p-3 custom-scrollbar">
                    <div className={` overflow-y-auto custom-scrollbar p-2 flex flex-wrap gap-5  pb-8 ${images.length %3==0 ? " justify-center":""}`}>
                        {images.map((img,index) => {
                            return (
                                <div 
                                key={index} className="relative hover:opacity-80 transition-all duration-300 cursor-pointer hover:bg-black rounded-lg"
                                onClick={() => handleSelectImage(img)}>
                                    {selected.includes(img)&&<div className="absolute right-1 top-1 text-lg text-green-1">
                                        <FaCheckCircle />
                                    </div>}
                                    <Image 
                                    
                                    src={img} 
                                    alt="salon image"
                                    width={300}
                                    height={300}
                                    className="w-[120px] h-[120px] rounded-lg object-cover" />
                                </div>
                            )
                        })}
                       
                    </div>
                </div>
                <div className="border-t border-t-white/10 p-3 flex justify-between items-center px-5">
                    <div className="">
                        <p className="text-base">{selected.length >0 ?`${selected.length} Selected` : ""}</p>
                    </div>
                    <Button className={` transition-all duration-300 ${selected.length == 0 ?"bg-accent hover:bg-accent/30":"bg-accent/80 hover:bg-accent/40"}  flex items-center gap-1 self-end disabled:bg-accent/20`}
                    disabled={selected.length==0 || loading}
                    onClick={handleDelete}
                    >
                        {loading 
                        ?
                        <div className="w-[126px]">
                            <LoadingAnimation />

                        </div> 
                        :
                        <>
                            <MdDeleteOutline className="text-xl"/>
                            Delete images
                        </>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}