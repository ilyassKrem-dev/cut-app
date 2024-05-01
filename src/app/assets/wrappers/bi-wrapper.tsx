

import BiMainNav from "../big-sc/Nav/bi-nav"

export default function BiMainWrapper({children}:{
    children:React.ReactNode
}) {

    return (
        <>
            <BiMainNav />
            {children}
            
        </>
    )
}
