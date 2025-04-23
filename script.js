const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const downloadSection = document.getElementById('downloadSection');

loginBtn.addEventListener('click', () => {
  loginForm.classList.toggle('hidden');
});

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const key = document.getElementById('keyInput').value.trim();

  if (username && password && key) {
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('activatedKey', key);
    alert(`Добро пожаловать, ${username}`);
    loginForm.classList.add('hidden');
    downloadSection.classList.remove('hidden');
  } else {
    alert("Пожалуйста, заполните все поля!");
  }
}
