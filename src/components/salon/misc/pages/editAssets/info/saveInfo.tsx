import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";


import LoadingAnimation from "@/assets/other/spinner";
import { useToast } from "@/components/ui/use-toast";
import { changeSalonInfo } from "@/lib/actions/barber.action.edit";
export default function SaveInfo({ids,setSalon,salonInfo,check}:{
    ids:{
        userId:string;
        barberId:string;
    }
    setSalon:React.Dispatch<SetStateAction<any>>;
    salonInfo:{
        salonName:string;
        number:string;
    };
    check:boolean
}) {    
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const handleSave = async() => {
        if(loading || check) return
        setLoading(true)
        try {
            const res = await changeSalonInfo({
                userId:ids.userId,
                barberId:ids.barberId,
                salonInfo:salonInfo
            })
            if(res) {
                toast({
                    variant:"success",
                    title:"Saved",
                    description:'New info have been saved'
                })
                setSalon((prev:any) => {
                    return {...prev,salonName:res.salonName,phoneNumber:res.phoneNumber}
                })
                
                setLoading(false)
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:error.message
            })
        }
    }

    return (
        <div className="self-end">
            <Button className="bg-green-1/80 hover:bg-green-1/60 w-[150px] active:bg-green-1/40 transition-all duration-300" onClick={handleSave} disabled={check || loading}>
                {loading?<LoadingAnimation />:"Save"}
            </Button>
        </div>
    )
}