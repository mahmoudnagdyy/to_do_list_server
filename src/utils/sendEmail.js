// import nodemailer from 'nodemailer'


// export const sendEmail = async ({from = process.env.EMAIL, to, cc, bcc, subject, text, html, attachments} = {}) => {

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         },
//     });


//     const info = await transporter.sendMail({
//         from: `"TO DO LIST" <${from}>`,
//         to,
//         cc,
//         bcc,
//         subject,
//         text,
//         html,
//         attachments,
//     });

// }

import { Resend } from "resend";

const resend = new Resend('re_eSQNb1B6_Az77PMq39wD66Zj8cYw3TLcU')

export const sendEmail = async ({from = process.env.EMAIL, to, cc, bcc, subject, text, html, attachments} = {}) => {
        
    await resend.emails.send({
        from: 'To Do List <onboarding@resend.dev>',
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments,
    });

}