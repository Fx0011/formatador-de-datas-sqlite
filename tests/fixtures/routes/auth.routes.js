const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.get(sql, [email, password], (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Erro no servidor" });
        }

        if (!user) {
            return res.status(401).json({ error: "Email ou senha incorretos" });
        }

        res.json({ id: user.id, name: user.name, email: user.email });
    });
});

// POST /api/register
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    // Verifica se email já existe
    const checkSql = "SELECT id FROM users WHERE email = ?";
    db.get(checkSql, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            return res.status(400).json({ error: "Este e-mail já está cadastrado." });
        }

        // Insere novo usuário
        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.run(insertSql, [name, email, password], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ message: "Usuário criado com sucesso!" });
        });
    });
});

module.exports = router;
