let users = JSON.parse(localStorage.getItem('extazyy_users')) || {};
let currentUser = JSON.parse(localStorage.getItem('extazyy_currentUser')) || null;
let keys = JSON.parse(localStorage.getItem('extazyy_keys')) || {};

function saveUsers() {
    localStorage.setItem('extazyy_users', JSON.stringify(users));
}

function saveCurrentUser() {
    localStorage.setItem('extazyy_currentUser', JSON.stringify(currentUser));
}

function saveKeys() {
    localStorage.setItem('extazyy_keys', JSON.stringify(keys));
}

function showLoginForm() {
    document.getElementById('auth-modal').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function loginUser() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const message = document.getElementById('auth-message');

    if (users[username] && users[username].password === password) {
        currentUser = { username, role: users[username].role };
        saveCurrentUser();
        message.textContent = 'Вход выполнен';
        closeAuthModal();
        document.getElementById('activation-form').classList.remove('hidden');
    } else {
        message.textContent = 'Неверный логин или пароль';
    }
}

function registerUser() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const message = document.getElementById('auth-message');

    if (!users[username]) {
        users[username] = { password, role: 'Участник' };
        saveUsers();
        message.textContent = 'Пользователь зарегистрирован';
    } else {
        message.textContent = 'Пользователь уже существует';
    }
}

function activateKey() {
    const keyInput = document.getElementById('activation-key').value.trim();
    const message = document.getElementById('message');

    if (!currentUser) {
        message.innerHTML = '<p class="error">Сначала войдите в аккаунт.</p>';
        return;
    }

    if (keys[keyInput] && (!keys[keyInput].used || keys[keyInput].usedBy === currentUser.username)) {
        keys[keyInput].used = true;
        keys[keyInput].usedBy = currentUser.username;
        saveKeys();
        message.innerHTML = '<p class="success">Ключ активирован. Доступ предоставлен.</p>';
        document.getElementById('download-section').classList.remove('hidden');
    } else {
        message.innerHTML = '<p class="error">Неверный ключ или он уже использован другим пользователем.</p>';
    }
}

// Примерная начальная загрузка ключей (только админ должен иметь интерфейс генерации)
if (Object.keys(keys).length === 0) {
    const durations = ['1D', '7D', '30D', '60D', '90D', '365D', 'FOREVER'];
    durations.forEach(duration => {
        for (let i = 0; i < 10; i++) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomPart = '';
            for (let j = 0; j < 6; j++) {
                randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            const key = `EXTAZYYDLC-${randomPart}-${duration}`;
            keys[key] = { duration, used: false, usedBy: null };
        }
    });
    saveKeys();
}

if (currentUser) {
    document.getElementById('activation-form').classList.remove('hidden');
}
