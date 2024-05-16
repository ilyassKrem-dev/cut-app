
import { Button } from "@/components/ui/button";
import Preview from "./completion/preview";
import {  useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { addBarber } from "@/lib/actions/barber.action";
import LoadingAnimation from "@/assets/other/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Prefernces {
    value:number[];
    time:{
        open:string;
        close:string;
    },
    dates:{
        week:string[];
        holidays:boolean
    }
}
interface Info {
    name:string;
    number:string,
    images:File[]
}
interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    prefernces:Prefernces
    info:Info;
    locationInfo:locationInfo
    images:string[];
    userInfo:{
        id:string;
        name:string;
        image:string;
    };
    userId:string
}

export default function Completion({prefernces,info,locationInfo,images,userInfo,userId}:Props) {
    const {startUpload} = useUploadThing("media")
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleComplete = async() => {
        if(loading) return
        setLoading(true)
        const imagesUploaded:string[] = []
        const check = images.map((img) => isBase64Image(img))
        if(check[0] && check[1] && check[2]) {
           await Promise.all(images.map(async(img,index) => {
            const uploadedFile = await startUpload([info.images[index]])
            if(uploadedFile && uploadedFile[0].url) {
                imagesUploaded.push(uploadedFile[0].url)
            }
           }))
        }
        
        if(imagesUploaded.length == 3) {
            try {
                const res = await addBarber({
                    userId,
                    info:{
                        name:info.name,
                        images:imagesUploaded,
                        phone:info.number
                    },
                    locationInfo,
                    prefernces
                    
                })
                if(res.succuss) {
                    router.push("/salon")
                }
                
            } catch (error) {
                setLoading(false)
                console.error(error)
            }   
        }
       
    }
    return (
        <div className="flex items-center flex-col gap-5 pb-12">
            <div className="flex items-center justify-center flex-col gap-2  py-6 text-light w-full">
                <h1 className="text-xl font-semibold">Your salon</h1>
                <p className="text-sm">Preview of your salon</p>
            </div>
            <div className="w-full  flex flex-col gap-10 items-center">
                <div className="w-full rounded-lg flex flex-col gap-8 md:p-6 max-w-[1300px]">
                    <Preview 
                        prefernces={prefernces}
                        info={info}
                        locationInfo={locationInfo}
                        images={images}
                        userInfo={userInfo}
                        userId={userId}
                    />   
                </div>
                <Button
                onClick={handleComplete} disabled={loading}
                className="w-full md:max-w-[500px] bg-green-1/80 hover:bg-green-1/20 transition-all duration-300" 
                >
                    {loading ? <LoadingAnimation /> : "Complete"}</Button>
            </div>
        </div>
    )
}