/**
 * @module formatador-de-datas-sqlite
 * @description Biblioteca de utilitários de data para projetos rápidos.
 */

const validators = require("./src/validators");
const core = require("./src/core");
const sql = require("./src/sql");
const calc = require("./src/calc");

// Exportação Unificada
module.exports = {
	// Validação
	isValid: validators.isValidDate,
	isBefore: validators.isBefore,

	// Formatação Core
	toBr: core.toBr,
	currentInputValue: core.currentInputValue,

	// SQL (SQLite Focus)
	toSQL: sql.toSQLite, // Alias amigável
	toSQLite: sql.toSQLite,
	sqlRelative: sql.sqlRelative,

	// Cálculos
	add: calc.add,

	// Utilitário rápido de log (pra debugar na prova)
	logNow: () => console.log(`[DEBUG TIME]: ${sql.toSQLite()}`),
};
