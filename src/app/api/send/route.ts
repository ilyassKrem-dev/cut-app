import { EmailTemplate } from '@/assets/templates/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:NextRequest) {

  try {
    const data = await req.json() 
    const {email,code} = data
    const emailSent = await resend.emails.send({
      from: 'nothingreply1@gmail.com',
      to: [email],
      subject: 'Email verifcation',
      text:"Verification Code",
      react: EmailTemplate({email,codeVerify:code}),
    });

    return Response.json(emailSent);
  } catch (error) {
    return Response.json({ error });
  }
}
