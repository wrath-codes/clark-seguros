//* -----------------------------------------------------------------------
//*  Send Email -->
//* -----------------------------------------------------------------------
// imports
// @libraries
import nodemailer from 'nodemailer'
const sendEmail = async (options) => {
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD
		}
	})

	//create message object
	const message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
		to: options.email, // list of receivers
		subject: options.subject,
		text: options.message
	}

	const info = await transporter.sendMail(message)

	console.log('Message sent: %s', info.messageId)
}

export { sendEmail }
