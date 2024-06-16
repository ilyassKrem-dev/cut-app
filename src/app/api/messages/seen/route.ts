
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client/edge";
import Pusher from "pusher";

const prisma = new PrismaClient()

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
})


export  async function POST(req:NextRequest) 
{
    try {
        const data = await req.json()
        const {userId,convoId,isBarber} = data as any
        let user:any;
        if(isBarber) {
            user = await prisma.barber.findUnique({
                where:{
                    id:userId
                }
            })
        } else {
            user = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })

        }
        if(!user) return NextResponse.json({error:"No user found"},{status:404})
        const convo = await prisma.convo.findUnique(
        {
            where:{
                id:convoId
            },
            include:{
                messages:true
            }
        })
        if(!convo) return NextResponse.json({error:"No convo found"},{status:404})
        const seenMessages = convo.messages.map((msg) => {
            if(!msg.isSeen && msg.receiverId == user.id) {
                return {...msg,isSeen:true}
            } else {
                return msg
            }
        })
       await prisma.message.updateMany({
            where:{
                convoId:convo.id,
                receiverId:user.id
            },
            data:{
                isSeen:true
            }
        })
        pusher.trigger(`chat-${convoId}`, "seen", seenMessages[seenMessages.length -1].content);
        return NextResponse.json({
            success:true
        },{
            status:200
        })
       
    } catch (error) {
        return NextResponse.json({
            error:"Internal server error",

        },{
            status:500
        })
    }
}