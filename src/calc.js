/**
 * Adiciona uma quantidade de tempo a uma data.
 * @param {Date} date - Data base.
 * @param {number} amount - Quantidade.
 * @param {'days'|'hours'|'minutes'} unit - Unidade de tempo.
 * @returns {Date} Nova instância de data.
 */
const add = (date, amount, unit) => {
	const d = new Date(date);
	switch (unit) {
		case "days":
			d.setDate(d.getDate() + amount);
			break;
		case "hours":
			d.setHours(d.getHours() + amount);
			break;
		case "minutes":
			d.setMinutes(d.getMinutes() + amount);
			break;
	}
	return d;
};

module.exports = { add };
