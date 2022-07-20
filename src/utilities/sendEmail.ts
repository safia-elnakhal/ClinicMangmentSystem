/* eslint-disable quotes */
import * as nodemailer from 'nodemailer'
import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

require('dotenv').config()

type EmailType =
    | 'invoice_creation'
    | 'appointment_creation'
    | 'doctor_creation'
    | 'employee_creation'
    | 'patient_creation'

export default class EmailClient {
    private account!: { name: string; email: string }

    private transporter!: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    private message!: { subject: string; body: string }

    constructor() {
        // console.log(process.env)

        const orgName = 'ITI Eyes Clinic 👁👃👁'
        const orgEmail = process.env.ORG_EMAIL || ''
        const orgPass = process.env.ORG_EMAIL_PASSWORD || ''

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: orgEmail,
                pass: orgPass,
            },
        })

        this.account = {
            name: orgName,
            email: orgEmail,
        }
    }

    private defineMessage(type: EmailType, userName: string) {
        switch (type) {
            case 'appointment_creation':
                this.message = {
                    subject: 'New appointment is linked to you.',
                    body: `<h1>Hi ${userName.split(' ')[0]},</h1>
                <p>We like to inform you that a new appointment is linked to your account and you can access it from your profile.</p>
                `,
                }
                break

            case 'invoice_creation':
                this.message = {
                    subject: 'New invoice is linked to your account.',
                    body: `<h1>Hi ${userName.split(' ')[0]},</h1>
                <p>We like to inform you that a new invoice is linked to your account and you can access it from your profile.</p>
                `,
                }
                break

            case 'patient_creation':
                this.message = {
                    subject: `Hola ${
                        userName.split(' ')[0]
                    }, welcome in our clinic ^^`,
                    body: `
                    <p>It's a message from Eng. Emam El-Emam, general manager of the clinics and I want to graduate you for visiting us 🎉.</p>
                    <p>We would like for you to be always sick so we can see you, hahaha I'm joking.</p>
                    <p>Emam El-Emam</p>
                    `,
                }
                break

            case 'employee_creation':
                this.message = {
                    subject: `Hola ${
                        userName.split(' ')[0]
                    }, welcome on board ^^`,
                    body: `
                    <h1>Hi ${userName.split(' ')[0]}, it's a great news.</h1>
                        <p>I'm Eng. Emam El-Emam, general manager of the clinics and I want to graduate you for being one of the team 🎉.</p>
                        <p>Emam El-Emam</p>
                        `,
                }
                break

            case 'doctor_creation':
                this.message = {
                    subject: `Hola Dr. ${
                        userName.split(' ')[0]
                    }, welcome on board ^^`,
                    body: `
                        <h1>Hi Dr. ${
                            userName.split(' ')[0]
                        }, it's a great news.</h1>
                            <p>I'm Eng. Emam El-Emam, general manager of the clinics and I want to graduate you for being one of the team 🎉.</p>
                            <p>We look forward to treat all of our patients asap.</p>
                            <p>Emam El-Emam</p>
                            `,
                }
                break

            default:
                break
        }
    }

    async sendMessage(
        type: EmailType,
        userName: string,
        userEmail: string
    ): Promise<boolean> {
        this.defineMessage(type, userName)

        const sendingInfo = await this.transporter.sendMail({
            from: `${this.account.name} < ${this.account.email} >`,
            to: `${userName} < ${userEmail} >`,
            subject: this.message.subject,
            html: this.message.body,
        })

        console.log(sendingInfo)

        return (
            sendingInfo.accepted.length === 1 &&
            sendingInfo.accepted[0] === userEmail
        )
    }
}
