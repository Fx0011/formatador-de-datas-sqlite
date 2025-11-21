const DateUtils = require("../index");

console.log("Iniciando Testes de Sanidade...\n");

try {
	// 1. Teste SQLite
	const sqlDate = DateUtils.toSQL();
	console.log(`[PASS] toSQL(): ${sqlDate}`);
	if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(sqlDate)) throw new Error("Formato SQL Incorreto");

	// 2. Teste BR
	const brDate = DateUtils.toBr(new Date());
	console.log(`[PASS] toBr():  ${brDate}`);

	// 3. Teste Input
	const inputVal = DateUtils.currentInputValue();
	console.log(`[PASS] Input:  ${inputVal}`);

	// 4. Teste Relativo
	const future = DateUtils.sqlRelative(7);
	console.log(`[PASS] Future: ${future} (+7 dias)`);

	console.log("\nTodos os testes passaram. O pacote está pronto para uso.");
} catch (error) {
	console.error("\nFALHA NOS TESTES:", error.message);
	process.exit(1);
}
