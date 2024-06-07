
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import  EmailTemplate  from '@/assets/templates/email-template';


export async function POST(req:NextRequest) {

  try {
    const data = await req.json() 
    const {email,code} = data
    const templateHTML = EmailTemplate({ email, codeVerify: code });

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASS
        }
      });
    await transporter.sendMail({
    from: "nothingreply1@gmail.com",
    to: email,
    subject: 'Your verification code for BarberCut',
    html:templateHTML
    });
    return Response.json({success:true});
  } catch (error) {
    return Response.json({ error });
  }
}
