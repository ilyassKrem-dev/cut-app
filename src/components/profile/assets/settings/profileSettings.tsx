import { IoSettingsSharp } from "react-icons/io5";


export default function ProfileSettings() {

    return (
        <>
            <div className="absolute right-0 top-0 border-b border-l md:static  p-1 rounded-l-lg group flex gap-1 transition-all duration-300 cursor-pointer border-white/20 items-center md:border-0">
                <IoSettingsSharp  className="text-3xl cursor-pointer text-white/60 group-hover:opacity-60 transition-all duration-300"/>
                <p className=" group-hover:inline-block hidden transition-all duration-300 cursor-pointer group-hover:opacity-60 md:group-hover:hidden">Settings</p>
            </div>
        </>
    )
}