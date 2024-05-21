
import {FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon,XIcon} from "react-share"

export default function SocialMedia({url}:{url:string}) {


    return (
        <div className="grid grid-cols-2 gap-4 w-full  max-[350px]:flex max-[350px]:item-center max-[350px]:gap-5 max-[350px]:justify-center" >
            <div className="hover:opacity-55">
                <FacebookShareButton url={url} className="flex gap-2 items-center !bg-blue-600 rounded-full  !pr-2 w-full max-[350px]:w-fit max-[350px]:!pr-0">
                    <FacebookIcon round size={40} />
                    <p className="cursor-pointer text-center flex-1 max-[350px]:hidden">Facebook</p>
                </FacebookShareButton>
            </div>
            <div className="hover:opacity-55">
                <WhatsappShareButton url={url} className="flex gap-2 items-center !bg-green-400 rounded-full  !pr-2 w-full max-[350px]:w-fit max-[350px]:!pr-0">
                    <WhatsappIcon round size={40} />
                    <p className="cursor-pointer text-center flex-1 max-[350px]:hidden">Whatsapp</p>
                </WhatsappShareButton>
            </div>  
            <div className="hover:opacity-55">
                <TwitterShareButton url={url} className="flex gap-2 items-center !bg-black rounded-full w-full  !pr-2 justify-between !border !border-white/10 max-[350px]:w-fit max-[350px]:!pr-0">
                    <XIcon round size={40} />
                    <p className="cursor-pointer text-center flex-1 max-[350px]:hidden">Twitter</p>
                </TwitterShareButton>
            </div> 
            <div className="hover:opacity-55">
                <LinkedinShareButton url={url} className="flex gap-2 items-center !bg-blue-500 rounded-full  w-full  !pr-2 justify-between max-[350px]:w-fit max-[350px]:!pr-0">
                    <LinkedinIcon round size={40} />
                    <p className="cursor-pointer text-center flex-1 max-[350px]:hidden">Linkedin</p>
                </LinkedinShareButton>
            </div> 
        </div>
    )
}