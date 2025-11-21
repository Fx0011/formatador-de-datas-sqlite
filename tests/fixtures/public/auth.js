// public/auth.js

// LOGIN
const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "dashboard.html";
        } else {
            errorMsg.innerText = data.error || "Falha no login";
        }
    } catch (error) {
        errorMsg.innerText = "Erro de conexão";
    }
};

// CADASTRO
const handleRegister = async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const errorMsg = document.getElementById("regErrorMsg");

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            alert("Sucesso! Faça login.");
            window.location.href = "index.html";
        } else {
            errorMsg.innerText = data.error || "Erro";
        }
    } catch (error) {
        errorMsg.innerText = "Erro de conexão";
    }
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se estamos na tela de login ou registro
    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", handleLogin);

    const regForm = document.getElementById("registerForm");
    if (regForm) regForm.addEventListener("submit", handleRegister);

    // Roda o checkAuth para redirecionar caso já esteja logado
    checkAuth();
});
