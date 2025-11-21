const { isValidDate } = require("./validators");

/**
 * Adiciona zero à esquerda se o número for menor que 10.
 * @private
 * @param {number} n - O número.
 * @returns {string} String com zero à esquerda.
 */
const pad = (n) => n.toString().padStart(2, "0");

/**
 * Formata uma data para o padrão brasileiro (PT-BR).
 * @param {string|Date} dateInput - Data de entrada.
 * @param {boolean} [withTime=false] - Se deve incluir hora e minuto.
 * @returns {string} Data formatada (ex: 21/11/2025).
 * @throws {Error} Se a data for inválida.
 */
const toBr = (dateInput, withTime = false) => {
	if (!isValidDate(dateInput)) throw new Error("Data inválida fornecida para toBr");

	const d = new Date(dateInput);
	const datePart = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

	if (!withTime) return datePart;
	return `${datePart} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/**
 * Retorna a data atual ajustada para input HTML (datetime-local).
 * Formato: YYYY-MM-DDTHH:MM
 * @returns {string} String compatível com input value.
 */
const currentInputValue = () => {
	const now = new Date();
	// Ajuste de fuso horário manual para garantir hora local
	const offsetMs = now.getTimezoneOffset() * 60000;
	const localISOTime = new Date(now.getTime() - offsetMs).toISOString().slice(0, 16);
	return localISOTime;
};

module.exports = { pad, toBr, currentInputValue };
