interface TemplateProps {
    email: string;
    codeVerify: string;
}

export default function EmailTemplate({ email, codeVerify }: TemplateProps): string {
    return `
        <div>
            <h1 style="font-weight: bold;">BarberCut</h1>
            <h4>Verify email for <b>${email}</b></h4>
            <div>
                <p style="font-weight: bold;font-size: 20px; text-align:center;">Your code:</p>
                
                <div style="text-align:center;">
                    <div style="background-color: white; border: 1px solid white; border-radius: 20px; color: black; font-wight:bold;font-size:18px;">
                        ${codeVerify}
                    </div>
                    <p>(This Code is valid for 5 minutes)</p>
                
                </div>
                <br/>
                <p style="font-wight:500;font-size:17px;text-align:center;">If you didn't request this email, there's nothing to worry about, you can safely ignore it</p>
            </div>
        </div>
    `;
}
