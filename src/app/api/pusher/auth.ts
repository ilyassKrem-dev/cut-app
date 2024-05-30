import Pusher from "pusher"
import { NextApiRequest,NextApiResponse } from "next"

const pusher = new Pusher({
    appId:process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
})

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {socket_id,channel_name} = req.body
    const auth = pusher.authenticateUser(socket_id,channel_name)
    res.send(auth)
}