
import SmMainLinks from "./misc/sm-links";
import { auth } from "@/auth";
export default async function SmMainNav() {
    const session = await auth() as any
    if(!session) return <SmMainLinks />

    return <SmMainLinks isBarber={session.user.isBarber}/>
}