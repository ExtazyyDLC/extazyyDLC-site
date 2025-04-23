const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
  loginForm.classList.toggle('hidden');
});

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user && pass) {
    localStorage.setItem('loggedInUser', user);
    alert(`Добро пожаловать, ${user}`);
    loginForm.classList.add('hidden');
    // здесь можно сделать переход в личный кабинет
  } else {
    alert("Введите логин и пароль!");
  }
}
