const loginBtn = document.getElementById("loginBtn");
const authModal = document.getElementById("authModal");
const authSubmit = document.getElementById("authSubmit");
const activateKey = document.getElementById("activateKey");
const downloadBtn = document.getElementById("downloadBtn");

loginBtn.addEventListener("click", () => {
  authModal.classList.remove("hidden");
});

authSubmit.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (username && password) {
    localStorage.setItem("account", JSON.stringify({ username, password }));
    alert("Успешный вход!");
  }
});

activateKey.addEventListener("click", () => {
  const key = document.getElementById("licenseKey").value.trim();
  const savedAccount = JSON.parse(localStorage.getItem("account"));
  const keys = JSON.parse(localStorage.getItem("usedKeys") || "{}");

  if (!savedAccount) {
    alert("Сначала войдите в аккаунт!");
    return;
  }

  fetch("keys.json")
    .then((res) => res.json())
    .then((validKeys) => {
      if (validKeys[key] && !keys[key]) {
        keys[key] = savedAccount.username;
        localStorage.setItem("usedKeys", JSON.stringify(keys));
        localStorage.setItem("activatedKey", key);
        downloadBtn.classList.remove("hidden");
        alert("Ключ активирован!");
      } else {
        alert("Ключ не существует или уже использован.");
      }
    });
});
