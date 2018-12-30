import emailjs from "emailjs";

export const mailServer = emailjs.server.connect({
	host: process.env.SMTP_HOST,
	user: process.env.SMTP_USER,
	password: process.env.SMTP_PASSWORD,
	tls: true,
	port: 587
});

export default mailServer;
