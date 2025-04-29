const keysDB = {
  "EXTAZYYDLC-1234-7": { days: 3, usedBy: null },
  "EXTAZYYDLC-0601-30": { days: 30, usedBy: null },
  "EXTAZYYDLC-kL7F-30": { days: 30, usedBy: null },
  "EXTAZYYDLC-EASY-90": { days: 90, usedBy: null },
  "EXTAZYYDLC-THka-30": { days: 30, usedBy: null }
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
  const user = JSON.parse(localStorage.getItem("user"));
  const keyData = keysDB[input];

  if (!keyData) {
    keyStatus.textContent = "Неверный ключ!";
    return;
  }

  if (keyData.usedBy && keyData.usedBy !== user.username) {
    keyStatus.textContent = `Ключ уже активирован пользователем ${keyData.usedBy}`;
    return;
  }

  const alreadyUsed = localStorage.getItem("activatedKey");
  if (alreadyUsed && alreadyUsed !== input) {
    keyStatus.textContent = "На этом устройстве уже активирован другой ключ!";
    return;
  }

  // Активируем ключ
  const expiry = Date.now() + keyData.days * 86400000;
  localStorage.setItem("activatedKey", input);
  localStorage.setItem("expiry", expiry);
  keysDB[input].usedBy = user.username; // ← Запоминаем, кто использовал ключ (локально)
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
