const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const db = require("./db");
const authRoutes = require("./routes/auth.routes");
const dataRoutes = require("./routes/data.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/api", authRoutes);
app.use("/api", dataRoutes);

// Setup do banco de dados
// Lê database.sql e executa o script para criar as tabelas automaticamente
const setupDatabase = async () => {
    try {
        const sqlPath = path.join(__dirname, "database.sql");

        if (fs.existsSync(sqlPath)) {
            const sql = fs.readFileSync(sqlPath, "utf8");

            // Executa o script SQL para criar as tabelas
            await new Promise((resolve, reject) => {
                db.exec(sql, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            console.log("Setup do banco de dados concluido.");
        } else {
            console.warn("Arquivo database.sql não encontrado. Pulando setup do banco de dados.");
        }
    } catch (error) {
        console.error("Erro ao configurar o banco de dados:", error);
    }
};

const startServer = async () => {
    try {
        await setupDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`>>>> http://localhost:${PORT}/ <<<<`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};

startServer();
