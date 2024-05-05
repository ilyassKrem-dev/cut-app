import { VscAccount } from "react-icons/vsc";
import { LuMessagesSquare } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";


export const icons = [
    {
        icon:<IoSearchOutline />,
        name:"Explore",
        path:"/"
    },
    {
        icon:<LuMessagesSquare />,
        name:"Messages",
        path:"/messages"
    },
    {
        icon:<VscAccount />,
        name:"Profile",
        path:"/profile"
    }
]