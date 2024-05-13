
import { ChangeEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import { IoIosCloudUpload } from "react-icons/io";

interface Info {
    name:string;
    number:string,
    images:File[]
}
interface Props {
    setInfo:React.Dispatch<SetStateAction<Info>>;
    images:string[];
    setImages:React.Dispatch<SetStateAction<string[]>>
}

export default function ImagesS({setInfo,images,setImages}:Props) {
    
    const handleImagesChange = (e:ChangeEvent<HTMLInputElement>,num:string) => {
        if(e.target.files && e.target.files.length > 0) {
            if(images.length < 2)  {
                const newFiles = Array.from(e.target.files)
                const remainingFiles = newFiles.slice(0,3)
                const readNextFile = (files:File[]) => {
                    if(files.length === 0 ) return
                    const file = files.shift()
                    const fileReader = new FileReader()
                    fileReader.onload = (e) => {
                        if(file) {
                            if(!file.type.includes("image")) return
                            if(images.length > 2) return
                            setImages(prev => {
                                return [...prev,fileReader.result as string]
                            })
                            setInfo((prev:Info) => {
                                return {...prev,images:[...prev.images,file]}
                            })
                            
                        }
                        readNextFile(files)
                        
                    }
                    fileReader.readAsDataURL(file as File)
                }
                readNextFile(remainingFiles)
                
            } else {
                if(num) {
                    
                    const numNumber = Number(num)
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onload = (e) => {
                        const imgData = e?.target?.result?.toString() as string;
                        setImages((prev) => {
                            const updatedFiles = [...prev];
                            updatedFiles[numNumber] = imgData;
                            return updatedFiles;
                        });
                        setInfo((prev) => {
                            return { ...prev, images: [...prev.images.slice(0, numNumber), file, ...prev.images.slice(numNumber + 1)] };
                        });
                    };
                
                    fileReader.readAsDataURL(file);
                    
                }
            }

        }
        
    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex   w-full gap-5 flex-col md:flex-row items-center">
                <div className="flex gap-1  mb-2">
                    <p className="">Images</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="h-[250px] w-[250px] border border-white/20 rounded-xl relative flex justify-center items-center group hover:bg-white/10 hover:opacity-70 transition-all duration-300">
                        {images[0]&&<Image
                        src={images[0] ||""}
                        alt="mainImage"
                        width={250}
                        height={250}
                        className="w-full h-full text-center rounded-xl"
                        />}
                        <label htmlFor="imageMain" className={` flex-col cursor-pointer flex-1 h-full justify-center items-center ${images[0] ?"hidden" : "flex"} group-hover:absolute   z-30 group-hover:w-full group-hover:flex`}>
                            <IoIosCloudUpload className="text-3xl w-full"/>
                            <p className={`text-xs  cursor-pointer  ${images[0] ?"group-hover:text-black" : "text-white/30"}`}>Upload</p>
                        </label>
                        <input onChange={(e) => handleImagesChange(e,"0")} type="file" id="imageMain" multiple accept="image/*" className=" hidden" />

                        <div className={`absolute  top-0 right-0 left-0 rounded-t-xl text-center z-20 py-1 font-bold  ${images[0] ?"bg-white/60 text-black" : "bg-white/20 text-white/80"}`}>
                            Main
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center md:flex-col">
                        <div className="h-[100px] w-[100px] border border-white/20 rounded-xl relative flex justify-center items-center group hover:bg-white/10 hover:opacity-70 transition-all duration-300">
                            {images[1]&&<Image
                            src={images[1] ||""}
                            alt="mainImage"
                            width={100}
                            height={100}
                            className="w-full h-full text-center rounded-xl"
                            />}
                            <label htmlFor="imageSide1" className={` flex-col cursor-pointer flex-1 h-full justify-center items-center ${images[1] ?"hidden" : "flex"} group-hover:absolute   z-30 group-hover:w-full group-hover:flex `}>
                                <IoIosCloudUpload className="text-3xl w-full"/>
                                <p className={`text-xs  cursor-pointer  ${images[1] ?"group-hover:text-black" : "text-white/30"}`}>Upload</p>
                            </label>
                            <input onChange={(e) => handleImagesChange(e,"1")} type="file" id="imageSide1" multiple accept="image/*" className=" hidden" />
                        </div>
                        <div className="h-[100px] w-[100px] border border-white/20 rounded-xl relative flex justify-center items-center group hover:bg-white/10 hover:opacity-70 transition-all duration-300">
                        {images[2]&&<Image
                            src={images[2] ||""}
                            alt="mainImage"
                            width={100}
                            height={100}
                            className="w-full h-full text-center rounded-xl"
                            />}
                            <label htmlFor="imageSide2" className={` flex-col cursor-pointer flex-1 h-full justify-center items-center ${images[2] ?"hidden" : "flex"} group-hover:absolute   z-30 group-hover:w-full group-hover:flex`}>
                                <IoIosCloudUpload className="text-3xl w-full"/>
                                <p className={`text-xs  cursor-pointer  ${images[2] ?"group-hover:text-black" : "text-white/30"}`}>Upload</p>
                            </label>
                            <input onChange={(e) => handleImagesChange(e,"2")} type="file" id="imageSide2" multiple accept="image/*" className=" hidden" />
                        </div>  
                    </div>
                </div>
            </div>
            <div className="text-sm text-white/80 max-w-[400px] leading-6 md:w-[455px] text-center">
                <p>Imagas of your salon</p>
            </div>
        </div>
    )
}