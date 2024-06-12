import LoadingAnimation from "@/assets/other/spinner";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { addImagesTobarber } from "@/lib/actions/barber.action.edit";
type Images ={
    files:File[],
    images:string[]

}
interface Props {
    setSalon:React.Dispatch<SetStateAction<any>>;
    setShowAdd:React.Dispatch<SetStateAction<boolean>>;
    ids:{
        userId:string;
        barberId:string
    }
}
export default function AddImages({setShowAdd,setSalon,ids}:Props) {
    const [loading,setLoading] = useState<boolean>(false)
    const [images,setImages] = useState<Images>(
        {
            images:[],
            files:[]
        }
    )
    const {startUpload} = useUploadThing("media")
    const {toast} = useToast()
    const handleFiles = (files:FileList|File[]) => {
            if(loading) return
            const newFiles = Array.from(files)
            const readNextFile = (files:File[]) => {
                if(files.length ===0) return
                const file = files.shift()
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    if(file) {
                        
            
                        if(!file.type.includes("image")) return
                        setImages(prev => {
                            return {...prev,images:[...prev.images,fileReader.result as string]}
                        })
                        setImages(prev => {
                            return {...prev,files:[...prev.files,file]}
                        })
                    }
                    readNextFile(files)
                }
                fileReader.readAsDataURL(file as File)
            }
            readNextFile(newFiles)
        }

    const handleChange =(e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files)
        }
    }
    const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        if(e.dataTransfer.files && e.dataTransfer.files.length>0) {
            handleFiles(e.dataTransfer.files)
        }
    }
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };
    const handleRemove = (indexG:number) => {
        if(loading) return
        setImages(prev => {
            return {
                ...prev,
                images:images.images.filter((img,index) => index !== indexG),
                files:images.files.filter((img,index) => index !== indexG)
            }
        })
    }

    const handleAdd = async() => {
        if(loading || images.images.length ==0)return
        try {
            setLoading(true)
            const imgUrls:string[] = [];
            const check = images.images.map((img) => isBase64Image(img))
            if(check) {
                await Promise.all(images.files.map(async (img, index) => {
                    const uploadedFile = await startUpload([img]);
                    if (uploadedFile && uploadedFile[0]?.url) {
                        
                        imgUrls[index] = uploadedFile[0].url;
                    }
                }));
            }
            if(imgUrls.length ==0) return
            const res = await addImagesTobarber(
                {
                    userId:ids.userId,
                    barberId:ids.barberId,
                    images:imgUrls
                }
            )
            if(res) {
                setSalon((prev:any) => {
                    return {
                        ...prev,images:res.images
                    }
                })
                setLoading(false)
                setImages({
                    files:[],
                    images:[]
                })
                
                setShowAdd(false)
                toast({
                    variant:"success",
                    title:"Success",
                    description:'Images have been Added'
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
                    <div className="text-xl border rounded-full p-1 px-3 border-white/10 cursor-pointer  hover:bg-white hover:text-black transition-all duration-300" onClick={() => setShowAdd(false)}>
                        x
                    </div>
                    <h1 className="flex-1 text-center font-semibold text-lg mr-7">Add</h1>
                </div>
                <div className="flex-1 flex flex-col w-full ">
                    {images.images.length>0&&
                    <div className="px-4 border-b border-white/10  flex gap-4 overflow-x-auto custom-scrollbar h-[120px]">
                        {images.images.map((img,index)=>{
                            return (
                                <div key={index} className="relative group cursor-pointer hover:bg-black h-[80px] w-[80px]">
                                    <div className="absolute top-0 right-0 left-0 bottom-0 group-hover:bg-black/70 z-10" />
                                    <div className="absolute top-1 right-1 bg-accent px-2 rounded-full text-base hidden group-hover:block group-hover:opacity-100 z-20 hover:opacity-50 hover:bg-accent/60 transition-all duration-300" onClick={() => handleRemove(index)}>
                                        x
                                    </div>
                                    <Image 
                                    src={img} 
                                    alt="added image"
                                    width={80}
                                    height={80}
                                    className="rounded-lg w-[80px] h-[80px] object-cover border border-white/20 group-hover:bg-black/50 min-w-[80px]" />
                                </div>
                            )
                        })}
                    </div>}
                    <label 
                    htmlFor="images" 
                    className="h-full cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrag}
                    >
                        <div className="flex justify-center items-center flex-col h-full" 
                       >
                            
                            <div className="p-2 rounded-full text-center flex flex-col items-center gap-2">
                                <IoCloudUploadSharp className="text-5xl"/>
                                <p className="text-white/80">Upload images</p>

                            </div>
                            
                        </div>

                    </label>
                    <input 
                        type="file" 
                        multiple 
                        name="images" 
                        id="images"
                        className=" appearance-none hidden opacity-0"
                        onChange={handleChange} />
                </div>
                <div className="border-t border-t-white/10 p-3 flex justify-between items-center px-5">
                    <div className="text-base">
                        {images.images.length !==0 ?`${images.images.length} Images`:""}
                    </div>
                    <Button className={` transition-all duration-300 bg-green-1  flex items-center gap-1  disabled:bg-green-1/50 hover:bg-green-1/70`}
                    disabled={loading || images.files.length ==0}
                    onClick={handleAdd}
                    >
                        {loading 
                        ?
                        <div className="w-[126px] flex gap-2 items-center">
                            Uploading <LoadingAnimation/>

                        </div> 
                        :
                        <>
                            <MdEdit className="text-xl"/>
                            Add images
                        </>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}