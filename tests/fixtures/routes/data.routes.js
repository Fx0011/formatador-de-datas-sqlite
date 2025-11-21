const express = require("express");
const router = express.Router();
const db = require("../db");

// ===================================================
// ROTAS PAI (Ex: Turmas / Caixas)
// ===================================================

// CRIAR pai
// POST /api/parent
router.post("/parent", async (req, res) => {
    const { name, user_id } = req.body;
    const sql = "INSERT INTO parent (name, user_id) VALUES (?, ?)";

    db.run(sql, [name, user_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, user_id });
    });
});

// LISTAR pais do usuário
// GET /api/parents/:userId
router.get("/parents/:userId", async (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM parent WHERE user_id = ?";

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// DELETAR pai
// DELETE /api/parent/:id
router.delete("/parent/:id", async (req, res) => {
    const { id } = req.params;

    // Verificar se tem filhos associados
    const checkSql = "SELECT count(*) as count FROM child WHERE parent_id = ?";

    db.get(checkSql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row.count > 0) {
            // PDF antigo exigia essa mensagem específica se tentar apagar com itens dentro
            return res
                .status(400)
                .json({ error: "Você não pode excluir este item pois ele possui registros vinculados." });
        }

        const deleteSql = "DELETE FROM parent WHERE id = ?";
        db.run(deleteSql, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Deletado com sucesso" });
        });
    });
});

// ===================================================
// ROTAS FILHO (Ex: Atividades / Ferramentas)
// ===================================================

// CRIAR filho
// POST /api/child
router.post("/child", async (req, res) => {
    const { description, parent_id } = req.body;
    const sql = "INSERT INTO child (description, parent_id) VALUES (?, ?)";

    db.run(sql, [description, parent_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, description, parent_id });
    });
});

// LISTAR filhos de um pai
// GET /api/child/:parentId
router.get("/child/:parentId", async (req, res) => {
    const { parentId } = req.params;
    // JOIN opcional para pegar o nome do pai se precisar exibir no cabeçalho
    const sql = `
        SELECT child.*, parent.name as parent_name 
        FROM child 
        JOIN parent ON child.parent_id = parent.id 
        WHERE parent_id = ?
    `;

    db.all(sql, [parentId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// DELETAR filho
// DELETE /api/child/:id
router.delete("/child/:id", async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM child WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Filho deletado com sucesso" });
    });
});

module.exports = router;
