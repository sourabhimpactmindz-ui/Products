import transport from "../../config/mail_config.js"


export const sendEmail = ({to , subject , html}) =>{
    return transport.sendMail({
        from : `"Myshop" sourabh.impactmindz@gmail.com `,
        to:to,
        subject:subject,
        html
    })
}