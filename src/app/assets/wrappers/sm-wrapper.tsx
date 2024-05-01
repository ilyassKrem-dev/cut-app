
import SmMainNav from "../small-sc/Nav/sm-nav"
import SmMainHeader from "../small-sc/header/sm-header"
export default function SmMainWrapper({children}:{
    children:React.ReactNode
}) {

    return (
        <>
            <SmMainHeader />
            {children}
            <SmMainNav />
        </>
    )
}