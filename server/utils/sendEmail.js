import emailServer from "../emailServer";

export const sendEmail = (to, subject, attachment) =>
	new Promise((resolve, reject) =>
		emailServer.send(
			{
				text:
					"Если данное письмо не отображается корректно, обратитесь в тех. поддержку",
				from: "ООО Золотая Стрекоза",
				to: `<${to}>`,
				subject,
				attachment
			},
			(err, message) => (!err ? resolve(message) : reject(err))
		)
	);

export default sendEmail;
