const keysDB = {
  "EXTAZYYDLC-1234-7": { days: 7 },
  "EXTAZYYDLC-4321-30": { days: 30 }
};

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username || !password) {
    document.getElementById("error").textContent = "Введите все поля!";
    return;
  }
  localStorage.setItem("user", JSON.stringify({ username, password }));
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "index.html";
  else document.getElementById("welcome").textContent = `Здравствуйте, ${user.username}!`;
}

function activateKey() {
  const input = document.getElementById("keyInput").value.trim();
  const keyStatus = document.getElementById("keyStatus");
  if (!keysDB[input]) {
    keyStatus.textContent = "Неверный ключ!";
    return;
  }

  const alreadyUsed = localStorage.getItem("activatedKey");
  if (alreadyUsed && alreadyUsed !== input) {
    keyStatus.textContent = "На этом устройстве уже активирован другой ключ!";
    return;
  }

  const expiry = Date.now() + keysDB[input].days * 86400000;
  localStorage.setItem("activatedKey", input);
  localStorage.setItem("expiry", expiry);
  keyStatus.textContent = `Ключ активирован! Действует до ${new Date(expiry).toLocaleDateString()}`;
  document.getElementById("downloadLink").style.display = "block";
}

function checkKey() {
  const key = localStorage.getItem("activatedKey");
  const expiry = parseInt(localStorage.getItem("expiry"));
  if (key && expiry && Date.now() < expiry) {
    document.getElementById("keyStatus").textContent = `Ключ активирован. Действует до ${new Date(expiry).toLocaleDateString()}`;
    document.getElementById("downloadLink").style.display = "block";
  }
}

if (window.location.pathname.includes("dashboard")) {
  checkLogin();
  checkKey();
}
