/*
==================================================================================
GUIA DE SOBREVIVÊNCIA DO EXAME (LEIA ISTO NA HORA DA PROVA)
==================================================================================

ESTRUTURA DO BANCO DE DADOS (GENÉRICA -> REAL):

1. Tabela 'users' (Geralmente não muda)
    - Representa: Professor, Funcionário, Administrador.
    - Campos: name, email, password.

2. Tabela 'parent' (O PAI/AGRUPADOR)
    - Cenário EDUCAÇÃO (PDF Antigo): Mudar 'parent' para 'turmas'.
    - Cenário FERRAMENTAS (Rumor):   Mudar 'parent' para 'caixas' ou 'categorias'.
    - Cenário ESTOQUE:               Mudar 'parent' para 'prateleiras'.

    * DICA: Dê CTRL+H e substitua 'parent' pelo nome que o PDF pedir (ex: turmas).

3. Tabela 'child' (O ITEM/FILHO)
    - Cenário EDUCAÇÃO (PDF Antigo): Mudar 'child' para 'atividades'.
    - Cenário FERRAMENTAS (Rumor):   Mudar 'child' para 'ferramentas'.
    - Cenário ESTOQUE:               Mudar 'child' para 'produtos'.

    * DICA: Dê CTRL+H e substitua 'child' pelo nome que o PDF pedir (ex: atividades).

4. Campo 'description' na tabela child
    - O PDF pode pedir 'nome', 'titulo', 'descricao' ou 'modelo'.
    - Ajuste conforme o Diagrama DER da prova (Entrega 2).

==================================================================================
*/

-- 1. TABELA DE USUÁRIOS
-- Geralmente o PDF pede login com email e senha.
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- 2. TABELA PAI (Agrupador)
-- Ex: Turmas, Caixas de Ferramentas, Projetos
CREATE TABLE IF NOT EXISTS parent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. TABELA FILHO (Item Específico)
-- Ex: Atividades, Ferramentas, Tarefas
CREATE TABLE IF NOT EXISTS child (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL, -- Pode ser 'name', 'title', etc.
    parent_id INTEGER NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE
);

/*
==================================================================================
SCRIPTS DE POPULAÇÃO (ENTREGA 3 - REQUISITO: "Pelo menos 3 registros")
==================================================================================
*/

-- Inserindo 3 Usuários
INSERT OR IGNORE INTO users (id, name, email, password) VALUES 
(1, "Admin", "admin@email.com", "123"),
(2, "Professor Teste", "prof@email.com", "123"),
(3, "Funcionario", "func@email.com", "123");

-- Inserindo 3 Pais (Ex: Turmas/Caixas) vinculados ao usuario 1
INSERT OR IGNORE INTO parent (id, name, user_id) VALUES 
(1, "Grupo A (Turma/Caixa)", 1),
(2, "Grupo B (Turma/Caixa)", 1),
(3, "Grupo C (Turma/Caixa)", 1);

-- Inserindo 3 Filhos (Ex: Atividades/Ferramentas) vinculados ao Pai 1
INSERT OR IGNORE INTO child (id, description, parent_id) VALUES 
(1, "Item 1 (Atividade/Ferramenta)", 1),
(2, "Item 2 (Atividade/Ferramenta)", 1),
(3, "Item 3 (Atividade/Ferramenta)", 1);
