import { VscAccount } from "react-icons/vsc";
import { LuMessagesSquare } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";

export const icons = [
    {
        icon:<IoSearchOutline />,
        name:"Explore",
        path:"/"
    },
    {
        icon:<LuMessagesSquare />,
        name:"Messages",
        path:"/messages",
    },
    {
        icon:<RiHomeLine />,
        name:"Salon",
        path:"/salon",
        for:"barber"
    },
    {
        icon:<VscAccount />,
        name:"Profile",
        path:"/profile"
    }
]