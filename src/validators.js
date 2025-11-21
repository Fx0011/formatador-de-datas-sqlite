/**
 * Verifica se uma entrada é uma data válida.
 * @param {string|Date|number} date - A data a ser verificada.
 * @returns {boolean} Retorna true se a data for válida.
 */
const isValidDate = (date) => {
	const d = new Date(date);
	return d instanceof Date && !isNaN(d);
};

/**
 * Verifica se a data A é anterior à data B.
 * @param {Date} dateA - Data inicial.
 * @param {Date} dateB - Data para comparação.
 * @returns {boolean} True se A vier antes de B.
 */
const isBefore = (dateA, dateB) => {
	return new Date(dateA).getTime() < new Date(dateB).getTime();
};

module.exports = { isValidDate, isBefore };
