const { isValidDate } = require("./validators");
const { pad } = require("./core");

/**
 * Converte uma data para o formato padrão do SQLite (DATETIME).
 * Formato de saída: YYYY-MM-DD HH:MM:SS
 *
 * @param {string|Date} [dateInput=new Date()] - Data a ser convertida. Padrão é Agora.
 * @returns {string} String formatada para inserção no banco.
 */
const toSQLite = (dateInput = new Date()) => {
	if (!isValidDate(dateInput)) throw new Error("Data inválida para SQLite");

	const d = new Date(dateInput);

	const year = d.getFullYear();
	const month = pad(d.getMonth() + 1);
	const day = pad(d.getDate());
	const hours = pad(d.getHours());
	const min = pad(d.getMinutes());
	const sec = pad(d.getSeconds());

	return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
};

/**
 * Gera uma data SQL para o futuro ou passado.
 * Útil para seeds de banco de dados (ex: created_at).
 *
 * @param {number} daysOffset - Dias a adicionar (positivo) ou subtrair (negativo).
 * @returns {string} Data SQL calculada.
 */
const sqlRelative = (daysOffset) => {
	const d = new Date();
	d.setDate(d.getDate() + daysOffset);
	return toSQLite(d);
};

module.exports = { toSQLite, sqlRelative };
