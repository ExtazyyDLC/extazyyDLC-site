
const overlay = document.getElementById('authOverlay');
const authBox = document.getElementById('authBox');
const keyBox = document.getElementById('keyBox');
const message = document.getElementById('authMessage');
const downloadBtn = document.getElementById('downloadBtn');

function toggleAuth() {
  overlay.classList.add('show');
}

function closeOnOutside(e) {
  if (e.target === overlay) {
    overlay.classList.remove('show');
  }
}

function handleLogin() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!user || !pass) {
    message.textContent = 'Заполните все поля!';
    return;
  }

  const stored = localStorage.getItem('user_' + user);

  if (!stored) {
    localStorage.setItem('user_' + user, pass);
    message.style.color = 'green';
    message.textContent = 'Регистрация успешна!';
  } else if (stored === pass) {
    message.style.color = 'green';
    message.textContent = 'Вход успешен!';
  } else {
    message.style.color = 'red';
    message.textContent = 'Неверный пароль!';
    return;
  }

  setTimeout(() => {
    authBox.style.display = 'none';
    keyBox.style.display = 'block';

    const savedKey = localStorage.getItem('key_' + user);
    if (savedKey) {
      document.getElementById('keyInput').value = savedKey;
      downloadBtn.style.display = 'block';
    }
  }, 1000);
}

function saveKey() {
  const key = document.getElementById('keyInput').value.trim();
  const user = document.getElementById('username').value.trim();

  let usedBy = localStorage.getItem('key_used_by_' + key);
  if (usedBy && usedBy !== user) {
    alert("Ключ уже активирован на другом аккаунте!");
    return;
  }

  localStorage.setItem('key_' + user, key);
  localStorage.setItem('key_used_by_' + key, user);

  // Временное действие: через 10 минут ключ удаляется
  setTimeout(() => {
    localStorage.removeItem('key_' + user);
    localStorage.removeItem('key_used_by_' + key);
  }, 10 * 60 * 1000);

  alert("Ключ сохранён!");
  downloadBtn.style.display = 'block';
}

function downloadClient() {
  alert("Началась загрузка клиента (заглушка)");
}
