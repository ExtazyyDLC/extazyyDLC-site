
function toggleAuth() {
    document.getElementById("authMenu").style.display = "flex";
}

function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!user || !pass) {
        message.innerText = "Заполните все поля!";
        return;
    }

    if (!localStorage.getItem("user_" + user)) {
        localStorage.setItem("user_" + user, pass);
        message.innerText = "Успешная регистрация!";
    } else {
        message.innerText = "Пользователь уже существует!";
    }
}

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (localStorage.getItem("user_" + user) === pass) {
        localStorage.setItem("extazyyUser", user);
        document.getElementById("authMenu").style.display = "none";
        document.getElementById("cabinet").style.display = "block";
        document.getElementById("userDisplay").innerText = user;
    } else {
        message.innerText = "Неверные данные!";
    }
}

function activateKey() {
    const key = document.getElementById("licenseKey").value;
    const user = localStorage.getItem("extazyyUser");
    const status = document.getElementById("keyStatus");

    const usedKey = localStorage.getItem("used_" + key);
    if (!key) {
        status.innerText = "Введите ключ!";
        return;
    }

    if (!usedKey) {
        localStorage.setItem("used_" + key, user);
        status.innerText = "Ключ активирован!";
        document.getElementById("downloadBtn").style.display = "inline-block";
    } else if (usedKey === user) {
        status.innerText = "Ключ уже активирован!";
        document.getElementById("downloadBtn").style.display = "inline-block";
    } else {
        status.innerText = "Ключ уже используется другим пользователем!";
    }
}
