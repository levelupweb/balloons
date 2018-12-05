import emailjs from "emailjs";

export const mailServer = emailjs.server.connect({
	host: process.env.SMTP_HOST,
	user: process.env.SMTP_USER,
	password: process.env.SMTP_PASSWORD,
	ssl: true
});

export default mailServer;
