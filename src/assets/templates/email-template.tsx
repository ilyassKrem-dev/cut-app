interface TemplateProps {
    email: string;
    codeVerify: string;
}

export default function EmailTemplate({ email, codeVerify }: TemplateProps): string {
    return `
        <div>
            <h1 style="font-weight: bold;">Your login code for BarberCut</h1>
            <br/><br/>
            <h2>Verify email for <b>${email}</b></h2>
            <br/><br/>
            <div>
                <p style="font-weight: bold;font-size: 20px;">Your code:</p>
                <br/><br/>
                <div style="background-color: white; border: 1px solid white; border-radius: 20px; color: black;">
                    ${codeVerify}
                </div>
                <br/><br/>
                <p>This Code will be valid only for 5 minutes</p>
            </div>
        </div>
    `;
}
