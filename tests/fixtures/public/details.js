// public/details.js

const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return { id: params.get("id"), name: params.get("name") };
};

const loadChildren = async () => {
    checkAuth(); // Segurança
    const { id, name } = getUrlParams();

    if (!id) {
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("pageTitle").innerText = `Itens de: ${name}`;
    const listDiv = document.getElementById("childList");
    listDiv.innerHTML = "Carregando...";

    try {
        const res = await fetch(`${API_URL}/child/${id}`);
        const children = await res.json();

        listDiv.innerHTML = "";

        children.forEach((child) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <span>${child.description}</span>
                <button class="btn btn-danger" onclick="deleteChild(${child.id})">Excluir</button>
            `;
            listDiv.appendChild(div);
        });
    } catch (error) {
        listDiv.innerHTML = "Erro ao carregar.";
    }
};

const createChild = async () => {
    const { id } = getUrlParams();
    const descInput = document.getElementById("childName");
    const description = descInput.value;

    if (!description) return alert("Preencha a descrição!");

    try {
        const res = await fetch(`${API_URL}/child`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, parent_id: id }),
        });

        if (res.ok) {
            descInput.value = "";
            loadChildren();
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteChild = async (childId) => {
    if (!confirm("Excluir item?")) return;
    try {
        await fetch(`${API_URL}/child/${childId}`, { method: "DELETE" });
        loadChildren();
    } catch (error) {
        console.error(error);
    }
};

// Inicializa
loadChildren();
