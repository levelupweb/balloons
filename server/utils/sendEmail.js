import emailServer from "../emailServer";

export const sendEmail = (
	subject,
	attachment,
	fallback = "Если данное письмо не отображается корректно, обратитесь в тех. поддержку"
) =>
	new Promise((resolve, reject) =>
		emailServer.send(
			{
				text: fallback,
				from: `<${process.env.EMAIL_FROM}>`,
				to: `<${process.env.EMAIL_TO}>`,
				subject: `[Zolotaya-Strekoza.ru]: ${subject}`,
				attachment
			},
			(err, message) =>
				console.log(err, message) || (!err ? resolve(message) : reject(err))
		)
	);

export default sendEmail;
