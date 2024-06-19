

import { NextResponse,NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client/edge"
import Pusher from "pusher"
const prisma = new PrismaClient()

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
})

export const POST = async(req:NextRequest) => {
    
    try {
        const data = await req.json()
        const { content, senderId, receiverId, convoId } = data;
        const message = await prisma.message.create({
            data:{
                content:content,
                senderId:senderId,
                receiverId:receiverId,
                convo:{
                    connect:{
                        id:convoId
                    }
                }
            }
        })
        pusher.trigger(`chat-${convoId}`, "message", message);
        pusher.trigger(`chat-${convoId}`, "message-bar", message);
        pusher.trigger(`messages`, "navBar", message);
        return NextResponse.json(message,{
            status:200
        });
    } catch (error) {
        throw new Error(`Failed to fetch data`)
    }
}

