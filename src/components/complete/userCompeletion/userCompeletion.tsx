import { SetStateAction, useState } from "react"
import ImageAdd from "./assets/imageAdd";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import PhoneAdd from "./assets/phoneAdd";
import { useRouter } from "next/navigation";
import { completeProfileInfo } from "@/lib/actions/user.action";
import { useUploadThing } from "@/lib/uploadthing";
import LoadingAnimation from "@/assets/other/spinner";
import { isBase64Image } from "@/lib/utils";

export default function UserCompletion({setProgress,isBarber,setNextBarber,image,userId}:{
    setProgress:React.Dispatch<SetStateAction<number>>;
    isBarber:boolean;
    setNextBarber:React.Dispatch<SetStateAction<boolean>>;
    image:string | null | undefined;
    userId:string | null | undefined;
}) {
    const [imageChange,setImageChange] = useState<string>("")
    const [imageFile,setImageFile] =useState<File[]>([])
    const [phoneNumber,setPhoneNumber] = useState<string>("")
    const [nextPage,setNextPage] = useState(0)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {startUpload} = useUploadThing("media")
    const handleNext = (diff:string) => {
        if(diff === "next") {
            setNextPage(nextPage < 2 ? nextPage+1 : nextPage)
            setProgress(prev => nextPage<2 ?Math.min(prev+50,100):prev)
        } else {
            setNextPage(nextPage > 0 ? nextPage-1 : nextPage)
            setProgress(prev => nextPage>0 ?Math.max(prev-50,0):prev)
        }
        
        
    }
    
    const handleComplete = async() => {
        if(phoneNumber.length>0 && phoneNumber.length !== 9) return
        setLoading(true)
        let imageUrl = image;
        const blob = imageChange
        const imgChecl = isBase64Image(blob)
        if(imgChecl) {
            const imgRes = await startUpload(imageFile)
            if(imgRes && imgRes[0].url) {
                imageUrl=imgRes[0].url
            } 
        } else {
            setLoading(false)
        }
        const res = await completeProfileInfo({
            id:userId,
            phone:`${phoneNumber.length===9?`+212${phoneNumber}`:""}`,
            imageUrl:imageUrl
        })
        if(res.success) {
            if(isBarber) {
                return setNextBarber(true)
            }else{
                router.push("/")
            }
        } else {
            setLoading(false)
        }
    }
    return (
        <div className="py-8 md:py-0">
            <div className="h-full flex flex-col md:px-16">

                {nextPage === 0?<div className="flex flex-col gap-4 justify-center items-center mt-36  md:text-lg md:gap-8">
                
                    <p>Your account has been created</p>
                    <p>To finish setting up your profile,</p>
                    <p>Click next</p>
                    
                </div>
                :
                nextPage === 1
                ?
                <ImageAdd 
                setImageChange={setImageChange} 
                imageChange={imageChange}
                image={image}
                setProgress={setProgress}
                setImageFile={setImageFile}/>
                :
                
                <PhoneAdd 
                phoneNumber={phoneNumber} 
                setPhoneNumber={setPhoneNumber}/>
                }
                {nextPage!==2?
                <div className="fixed bottom-0 right-0 left-0 p-4 border-t border-white/20 md:border-0 bg-black z-20">
                    <div className={`w-full flex  items-center ${nextPage==0?"justify-end":"justify-between"}`}>
                        {nextPage > 0&&<Button className="px-6 bg-red-500 hover:bg-accent hover:opacity-60 transition-all duration-300 md:text-lg md:bg-transparent md:hover:bg-transparent md:text-accent" onClick={() => handleNext("back")}>Back</Button>}
                        <Button className={`px-12 bg-green-1 hover:bg-green-1 hover:opacity-60 transition-all duration-300 self-end  ${nextPage ==0 ? "w-full md:w-fit":""} flex gap-2 md:text-lg md:bg-transparent md:hover:bg-transparent md:text-green-1  `} onClick={() => handleNext("next")}>
                            Next
                            <FaArrowRight className="text-xl md:text-2xl"/>
                        </Button>
                    </div>
                </div>
                :
                <div className="fixed bottom-0 right-0 left-0 p-4 border-t border-white/20 md:border-0 bg-black z-20">
                    <div className={`w-full flex  items-center justify-between`}>
                        <Button className="px-6 bg-red-500 hover:bg-accent hover:opacity-60 transition-all duration-300 md:text-lg md:bg-transparent md:hover:bg-transparent md:text-accent" onClick={() => handleNext("back")}>Back</Button>
                        <Button className={`px-12 bg-green-1 hover:bg-green-1 hover:opacity-60 transition-all duration-300 self-end  flex gap-2 md:text-lg md:bg-transparent md:hover:bg-transparent md:text-green-1  `} disabled={phoneNumber.length>0 && phoneNumber.length !== 9} onClick={handleComplete}>
                            {loading?<LoadingAnimation/>:'Complete'}
                        </Button>
                    </div>
            </div>}
            </div>
            
        </div>
    )
}