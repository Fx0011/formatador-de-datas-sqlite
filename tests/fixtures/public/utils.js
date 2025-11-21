// public/utils.js
const API_URL = "http://localhost:3000/api";

function checkAuth() {
    const user = localStorage.getItem("user");
    const path = window.location.pathname;

    // Se não tá logado e não tá nas telas de auth, manda pro login
    if (!user && !path.includes("index.html") && !path.includes("register.html")) {
        window.location.href = "index.html";
    }

    // Se já tá logado e tenta ir pro login, manda pro dashboard
    if (user && (path.includes("index.html") || path.includes("register.html"))) {
        window.location.href = "dashboard.html";
    }

    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
