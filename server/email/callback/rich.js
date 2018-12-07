/**
 *
 * @param {Object} data must contain: Name, Phone, Message
 */

export const rich = data => ({
	data: `<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">

			<title>Обратный звонок с сайта Золотая Стрекоза</title>

		</head>
		<body style="margin:0; padding:0; background-color:#F2F2F2;font-family: Arial, Helvetica, sans-serif;">
			<center>
				<table>
					<tr>
							<td height="40" style="font-size:10px; line-height:10px;">&nbsp;</td>
					</tr>
				</table>
				<table width="660" cellpadding="0" cellspacing="0" border="0" class="wrapper" bgcolor="#FFFFFF">
					<tr>
						<td height="20" style="font-size:10px; line-height:10px;">&nbsp;</td>
					</tr>
					<tr>
						<td align="center" valign="top">
							<table width="600" cellpadding="0" cellspacing="0" border="0" class="container">
							
								<tr>
									<td align="left" valign="top">
										<p style="font-size: 30px;margin-bottom:10px;"><b>
											Заявка на обратный звонок
										</b></p>
										<p style="font-size: 20px; color: #888888;margin-top: 0px">
											Данную информацию оставил один из пользователей сайта Золотая Стрекоза. Обработайте данную заявку как можно скорее
										</p>
										<ul style="margin-top: 20px">
											<li>Имя: ${data.name || "Неизвестно"}</li>
											<li>Телефон: ${data.phone || "Неизвестно"}</li>
											<li>Дополнительное сообщение: ${data.message || "Без сообщения"}</li>
										</ul>
									</td>
									<td width="30px" valign="top">
										&nbsp;
									</td>
								</tr>
						</td>
					</tr>
				</table>  
			
				</table>
				<table width="600" bgColor="#F2F2F2">
					<tr>
						<td height="40" style="font-size:10px; line-height:10px;">&nbsp;</td>
					</tr>
				</table>
			</center>
		</body>
	</html>`,
	alternative: true
});
