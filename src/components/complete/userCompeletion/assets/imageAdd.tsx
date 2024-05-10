import { ChangeEvent, SetStateAction } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
export default function ImageAdd({
    setImageChange,
    imageChange,
    image,
    setProgress,
    setImageFile
}:{
    setImageChange:React.Dispatch<SetStateAction<string>>;
    imageChange:string,
    image:string |null |undefined,
    setProgress:React.Dispatch<SetStateAction<number>>;
    setImageFile:React.Dispatch<SetStateAction<File[]>>
})  {

    const handleFile = (e:ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if(e.target.files && e.target.files.length >0) {
            const file = e.target.files[0]
            
            if(!file.type.includes("image")) return
            setImageFile(Array.from(e.target.files))
            fileReader.onload = async(e) => {
                const imgUrl = e.target?.result?.toString()
                setImageChange(imgUrl as string)
            }
            fileReader.readAsDataURL(file)
        }
    }
    const handleButtonClick = () => {
        const input = document.getElementById('image-file');
        if (input) {
            input.click();
        }
    }
    return (
        <div className="pt-24 flex flex-col items-center gap-10">
            <h2 className="md:text-xl md:font-semibold">Add profile image</h2>
            <div className="flex flex-col gap-10">
                <div className="relative rounded-full group cursor-pointer  transition-all duration-300">
                    <label htmlFor="image-file" className="cursor-pointer">
                        <Image 
                        src={image || imageChange || "/profile.jpg"} alt="account-image"
                        width={100}
                        height={100}
                        className="rounded-full w-[150px] h-[150px] group-hover:opacity-60  transition-all duration-300 object-cover md:w-[200px] md:h-[200px]" />
                    </label>
                    <Input type="file" name="image-file" id="image-file" onChange={handleFile} accept="image/*" className=" hidden cursor-pointer"/>
                    <div className="absolute top-[3.8rem] right-[4.35rem] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 md:top-[5.8rem] md:right-[5.3rem]">
                        <RiUploadCloud2Line className="text-3xl"/>
                    </div>
                </div>
                <Button
                onClick={handleButtonClick} 
                className="flex gap-2 items-center bg-blue-400 hover:bg-blue-300 hover:opacity-55 transition-all duration-300">Upload image <RiUploadCloud2Line className="text-xl"/></Button>  
            </div>
        </div>
    )
}