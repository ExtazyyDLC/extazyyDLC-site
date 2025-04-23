const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const authForm = document.getElementById('authForm');
const authSubmit = document.getElementById('authSubmit');
const dashboard = document.getElementById('dashboard');
const userNickname = document.getElementById('userNickname');
const activateBtn = document.getElementById('activateBtn');
const downloadSection = document.getElementById('downloadSection');

let users = JSON.parse(localStorage.getItem('users')) || {};
let keys = JSON.parse(localStorage.getItem('keys')) || {
  "EXCELLENTDATA-1": { days: 1, usedBy: null },
  "EXCELLENTDATA-7": { days: 7, usedBy: null },
  "EXCELLENTDATA-30": { days: 30, usedBy: null },
  "EXCELLENTDATA-60": { days: 60, usedBy: null }
};

let currentUser = null;

loginBtn.onclick = () => authForm.classList.remove('hidden');
registerBtn.onclick = () => authForm.classList.remove('hidden');

authSubmit.onclick = () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!username || !password) return alert("Введите логин и пароль!");

  if (users[username] && users[username].password !== password) {
    return alert("Неверный пароль!");
  }

  if (!users[username]) {
    users[username] = { password, keys: {} };
  }

  currentUser = username;
  localStorage.setItem('users', JSON.stringify(users));
  userNickname.textContent = username;
  authForm.classList.add('hidden');
  dashboard.classList.remove('hidden');
};

activateBtn.onclick = () => {
  const key = document.getElementById('keyInput').value.trim();
  if (!keys[key]) return alert("Ключ недействителен.");
  if (keys[key].usedBy && keys[key].usedBy !== currentUser) {
    return alert("Ключ уже использован другим пользователем.");
  }

  keys[key].usedBy = currentUser;
  users[currentUser].keys[key] = Date.now() + keys[key].days * 24 * 60 * 60 * 1000;

  localStorage.setItem('keys', JSON.stringify(keys));
  localStorage.setItem('users', JSON.stringify(users));

  downloadSection.classList.remove('hidden');
};
