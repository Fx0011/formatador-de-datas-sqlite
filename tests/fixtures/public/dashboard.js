// public/dashboard.js

const loadParents = async () => {
    const user = checkAuth(); // Pega o usuário e verifica permissão
    if (!user) return;

    document.getElementById("userName").innerText = `Olá, ${user.name}`;
    const listDiv = document.getElementById("parentList");
    listDiv.innerHTML = "Carregando...";

    try {
        const res = await fetch(`${API_URL}/parents/${user.id}`);
        const parents = await res.json();

        listDiv.innerHTML = "";

        parents.forEach((parent) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <span><strong>${parent.id}</strong> - ${parent.name}</span>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="goToDetails(${parent.id}, '${parent.name}')">Visualizar</button>
                    <button class="btn btn-danger" onclick="deleteParent(${parent.id})">Excluir</button>
                </div>
            `;
            listDiv.appendChild(div);
        });
    } catch (error) {
        listDiv.innerHTML = "Erro ao carregar.";
    }
};

const createParent = async () => {
    const user = checkAuth();
    const nameInput = document.getElementById("parentName");
    const name = nameInput.value;

    if (!name) return alert("Preencha o nome!");

    try {
        const res = await fetch(`${API_URL}/parent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, user_id: user.id }),
        });

        if (res.ok) {
            nameInput.value = "";
            loadParents();
        } else {
            alert("Erro ao criar");
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteParent = async (id) => {
    if (!confirm("Tem certeza?")) return;
    try {
        const res = await fetch(`${API_URL}/parent/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) loadParents();
        else alert(data.error || "Erro ao excluir");
    } catch (error) {
        alert("Erro de conexão");
    }
};

const goToDetails = (id, name) => {
    window.location.href = `details.html?id=${id}&name=${encodeURIComponent(name)}`;
};

// Inicializa ao carregar
loadParents();
