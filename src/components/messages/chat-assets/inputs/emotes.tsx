"uce client"
import { SetStateAction, useEffect, useState } from "react";
import { FaRegFaceSmile } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";


export default function EmotesToogle({setUserInput}:{
    setUserInput:React.Dispatch<SetStateAction<string>>
}) {
    const [show,setShow] = useState<boolean>(false)
    const handleClick = (emoji:any) => {
        setUserInput(prev => prev + emoji.emoji)
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".emote-picker");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className={`text-2xl mb-2 cursor-pointer   relative emote-picker`}>
            <FaRegFaceSmile className="hover:opacity-60 transition-all duration-300 text-white/70" onClick={() => setShow(prev => !prev)}/>
            {show&&<div className="absolute bottom-12 -left-4 ">
                <EmojiPicker searchDisabled width={300} onEmojiClick={handleClick}/>
            </div>}
        </div>
    )
}