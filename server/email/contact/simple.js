/**
 *
 * @param {Object} data must contain: Name, Phone, Message
 */

export const simple = data =>
	`Имя пользователя: ${data.name}; Телефон: ${data.phone}; Сообщение: ${
		data.message
	}`;
