"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SalonType } from "./salonType";
import { getBaberById } from "@/lib/actions/barber.action";
import SalonId from "./salonId";
import LoadingAnimation from "@/assets/other/spinner";
import { Button } from "@mui/material";


export default function SalonLayout({id,session,barber}:{
    id:string;
    session:any;
    barber:SalonType|null
}) {
   

    return (
        <>
            {barber&&<SalonId 
            barber={barber as SalonType} 
            userId={session?.user?.id}
            barberUserId={barber.userId}/>}
            {!barber&&<div className="h-screen flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg"><LoadingAnimation /></h1>
                <p className="text-sm text-white/80">If i takes to long reload</p>
                <a href={`/`} className="w-[150px]">
                    <Button className="w-full !bg-gray-300/80 rouned-md !text-black">Reload</Button>
                </a>
            </div>}
        </>
    )

    
}