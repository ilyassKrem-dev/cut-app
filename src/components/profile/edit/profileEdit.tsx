"use client"

import Image from "next/image"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import ProfileEditNameEmail from "./nameEmail";
import ProfileNumber from "./phoneInput";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";

import { isBase64Image } from "@/lib/utils";
import LoadingAnimation from "@/assets/other/spinner";
import { updateUser } from "@/lib/actions/user.action";

import EmailVerification from "../../shared/emailVerification";
interface UserProps {
    id:string
    name:string,
    email:string,
    number:string,
    image:string

}
interface UserInfo {
    name:string;
    email:string;
    number:string;
    image:{
        file:File[];
        url:string
    }
}
export default function ProfileEdit({userDetails}:{
    userDetails:UserProps
}) {
    const [userInfo,setUserInfo] = useState<UserInfo>({
        name:userDetails.name,email:userDetails.email,number:userDetails.number,image:{
            file:[],
            url:userDetails.image
        }
    })
    const [loading,setLoading] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const {startUpload} = useUploadThing("media")
    const [errorForm,setErrorForm] = useState<boolean>(false)
    const {toast} =  useToast()
    const checkChange = userDetails.image == userInfo.image.url && userDetails.name == userInfo.name && userDetails.email == userInfo.email && userDetails.number == userInfo.number
    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if(e.target.files && e.target.files.length>0) {
            const file = e.target.files[0]
            setUserInfo(prev => {
                return {...prev,image:{...prev.image,file:Array.from(e.target.files as any)}}
            })
            if(!file.type.includes("image")) return
            fileReader.onload = (e) => {
                const img = e.target?.result?.toString() as string
                setUserInfo(prev => {
                    return {...prev,image:{...prev.image,url:img}}
                })
                
            }
            fileReader.readAsDataURL(file)
            
        }
    }
    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if(checkChange || errorForm || loading) return
        if(userDetails.email !== userInfo.email) {
            setShow(true)
            setLoading(false)
            return
        }
        let imgeUrl = ""
        let oldImage = userDetails.image
        
        const blob = isBase64Image(userInfo.image.url)
        if(blob) {
            const imgFile = await startUpload(userInfo.image.file)
            if(imgFile && imgFile[0].url) {
                imgeUrl = imgFile[0].url
            }
        }

        try {
            
            const res = await updateUser(
                {
                    userId:userDetails.id,
                    name:userInfo.name,
                    email:userInfo.email,
                    image:imgeUrl,
                    number:userInfo.number
                }
            )
            if(res) {
                toast({
                    title:"Updated",
                    description:`Your info has been updated`
                })
                window.location.href = "/profile"
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:`${error.message}`
            })
        }
    }
    useEffect(() => {
        function hideOverlay(e:any) {
            const overlay = document.querySelector(".verify-tab")
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }

        }
        document.body.addEventListener("click",hideOverlay)

        return () => document.body.removeEventListener("click",hideOverlay)
    },[])
    return (
        <div className="md:py-28 py-12 md:mx-auto md:w-[50%] pb-32">
            <div className=" flex justify-center flex-col items-center ">
                <h1 className="text-lg font-bold">
                    Edit profile
                </h1>

            </div>
            
            <form onSubmit={handleSubmit}  className="mx-4 mt-16 flex flex-col items-center justify-center gap-10">
                <div className="flex justify-center items-center md:w-full">
                    <div className="relative group">
                        <Image 
                        src={userInfo.image.url || "/profile.jpg"} 
                        alt={`${userInfo.name} image` || "profile image"}
                        priority
                        width={200}
                        height={200}
                        className="rounded-full w-[150px] h-[150px] object-cover"
                        />
                        <label htmlFor="image" className="absolute  hidden flex-col items-center  justify-center top-0 right-0 left-0 bottom-0 rounded-full text-base group-hover:bg-black/30 cursor-pointer group-hover:flex transition-all duration-300 group-active:bg-black/60">
                            <FaCloudDownloadAlt className="text-2xl"/>
                            Upload
                        </label>
                        <input onChange={handleImageChange} type="file" name="image" id="image" className=" hidden"/>
                    </div>
                   
                </div>
                <div className="flex gap-4 flex-col  w-full px-10">
                    <ProfileEditNameEmail 
                    userEmail={userInfo.email}
                    userName={userInfo.name}
                    setUserInfo={setUserInfo}
                    setErrorForm={setErrorForm}
                    />
                    <ProfileNumber 
                        setUserInfo={setUserInfo}
                        userNumber={userInfo.number}
                        setErrorForm={setErrorForm}
                    />
                </div>
                
                <div className="flex gap-2 px-10 w-full">
                    
                    <Link href={"/profile"} className="bg-black-1 rounded-2xl px-4 p-2 text-white flex-1 border border-white/10 hover:bg-white/20 hover:opacity-70 transition-all duration-300 active:opacity-50 active:bg-white/40 text-center">
                        Back
                    </Link>
                    <button className="bg-green-1 rounded-full px-4 p-2 text-white flex-1 hover:bg-green-1/20 hover:opacity-70 transition-all duration-300 active:opacity-50 active:bg-green-1/40 disabled:bg-green-1/10 disabled:cursor-default disabled:border disabled:border-white/10 " disabled={checkChange || errorForm || loading}>
                        {loading?<LoadingAnimation/>:"Save"}
                    </button>
                </div>
            </form>
           {show&&<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center  bg-black/80 z-50 items-end md:items-center">
                <div className="bg-black rounded-t-lg border border-white/10  w-full md:rounded-lg pt-6  md:w-[500px] verify-tab">
                    <EmailVerification email={userDetails.email} 
                    setShow={setShow}
                    userInfo={userInfo}
                    userDetails={userDetails}
                    
                    />
                </div>
            </div>}
        </div>
    )
}