
import { IoMdSend } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState,useRef, useEffect } from "react";
import { FaRegFaceSmile } from "react-icons/fa6";
import axios from "axios";
export default function ChatInput({userId,convoId,barberId,isBarber}:{
    userId:string;
    convoId:string;
    barberId:string;
    isBarber:boolean
}) {
    const [userInput,setUserInput] = useState<string>("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value)
    }
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight - 16}px`;
        }
    }, [userInput]);

    const handleSend = async() => {
        if(userInput.trim().length ==0) return
        try {
            const res = await axios.post("/api/messages",
             {
                    content:userInput,
                    senderId:isBarber ? barberId : userId,
                    receiverId:isBarber ? userId : barberId,
                    convoId:convoId,
                }
            )
            if(res) setUserInput("")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="border-t border-t-white/10  pb-24 pt-4 px-2  md:p-4">
            <div  className="flex items-center justify-center ">
                <div className="flex max-w-[650px] justify-center items-end w-full gap-1 bg-black border px-3 rounded-xl  border-white/10 h-fit">
                    <div className={`text-2xl mb-2 cursor-pointer  hover:opacity-60 transition-all duration-300 text-white/70`}>
                        <FaRegFaceSmile />
                    </div>
                    <div className="flex-1 relative h-fit ">
                        <Textarea 
                        ref={textAreaRef}
                        placeholder="Aa.."
                        onKeyDown={(e) => {
                            
                           
                            if(e.key == "Enter") {
                                e.preventDefault()
                                handleSend()
                            }
                        }} 
                        value={userInput}
                        onChange={handleChange} 
                        className={` text-white focus-visible:ring-offset-0 
                        focus-visible:ring-0   resize-none custom-scrollbar !max-h-[120px]  overflow-y-auto pt-3 !bg-transparent border-0 text-white/80`}
                        />
                    </div>
                    <div className={`text-3xl mb-2 cursor-pointer -rotate-90 hover:opacity-60 transition-all duration-300 text-white/70 ${userInput.trim().length == 0 ? "opacity-20": "opacity-100 hover:rotate-0"}`}
                    
                    onClick={handleSend}>
                        <IoMdSend />
                    </div>

                </div>

            </div>
        </div>
    )
}