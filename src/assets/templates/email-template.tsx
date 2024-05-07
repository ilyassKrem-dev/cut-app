


interface tempalteProps {
    email:string,
    codeVerify:number
}

export const  EmailTemplate:React.FC<Readonly<tempalteProps>> = ({email,codeVerify}) => {

    return (
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <h1 style={{fontWeight:"bold"}}>Your login code for BarberCut</h1>
            <h2>Verify email for <b>{email}</b></h2>
            <div style={{display:"flex",flexDirection:"column",gap:"1px"}}>
                <p style={{fontWeight:'bold',fontSize:"20px"}}>Your code:</p>
                <div style={{backgroundColor:"white",border:"1px solid white",borderRadius:"20px",color:"black"}}>
                    {codeVerify}
                </div>
                <p>This Code well be valid only for 5 minutes</p>
            </div>
        </div>
    )
}