import Image from "next/image";
import { FaCheck,FaCheckDouble  } from "react-icons/fa6";
interface Props {
    userImage:string;
    otherUserImage:string;
    messages:{
        senderId:string;
        id:string;
        convoId:string;
        recieverId:string;
        content:string;
        isSeen:boolean
    }[];
    userId:string |null |undefined;
}

export default function Messages({
    messages,
    userImage,
    otherUserImage,
    userId
}:Props) {

    return (
        <div>
            <div className="flex flex-col pt-4 gap-10 px-4 pb-5">
                {messages.map((msg,index) => {
                    const userCheck = msg.senderId == userId
                    return (
                        <div key={msg.id+index+"EC"} className={`flex items-center  ${userCheck  ? " justify-end":"justify-start"} gap-3`}>
                            <Image 
                            src={(userCheck  ? userImage:otherUserImage) ?? "/profile.jpg"} 
                            alt=""
                            width={40}
                            height={40}
                            className={`w-[35px] h-[35px] ${userCheck ? "order-2":"order-1"} rounded-full self-start`} />
                            <div className={`${userCheck ? "order-1":"order-2"}  p-1 px-3 rounded-lg ${userCheck ? "bg-white/10":"bg-blue-400"} break-words flex gap-2`}>
                                <p className={`${userCheck ? "order-1":"order-2"} max-w-[200px] break-words`}>{msg.content}</p>
                                
                                {!msg.isSeen?
                                <FaCheck className={`text-xs self-end text-white/40 mb-1 ${userCheck?"order-2 ":"order-1"}`}/>
                                :
                                <FaCheckDouble className={`text-xs self-end  mb-1 ${userCheck?"order-2 text-blue-400":"order-1 text-black"}`}/>}
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}