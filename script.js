// Реєстрація користувача
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        if (!localStorage.getItem('user_' + username)) {
            localStorage.setItem('user_' + username, password);
            localStorage.setItem('user_key_' + username, ''); // ключ ще не активований
            document.getElementById('message').innerText = 'Registered successfully!';
        } else {
            document.getElementById('message').innerText = 'User already exists.';
        }
    }
}

// Логін користувача
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const stored = localStorage.getItem('user_' + username);
    if (stored && stored === password) {
        localStorage.setItem('extazyyUser', username);
        location.href = 'cabinet.html'; // Перехід на кабінет
    } else {
        document.getElementById('message').innerText = 'Invalid credentials.';
    }
}

// Перевірка логіну та відображення інформації про користувача
function checkLogin() {
    const user = localStorage.getItem('extazyyUser');
    if (!user) {
        location.href = 'login.html'; // Якщо користувач не залогінений, перенаправляє на сторінку входу
    } else {
        document.getElementById('welcome').innerText = 'Welcome, ' + user + '!';
        const usedKey = localStorage.getItem('user_key_' + user);
        if (usedKey) {
            document.getElementById('status').innerText = 'Key already activated.';
            document.getElementById('downloadSection').style.display = 'block'; // Показує кнопку завантаження
        }
    }
}

// Активація ключа
function activateKey() {
    const key = document.getElementById('keyInput').value.trim();
    const deviceId = getDeviceId();
    const user = localStorage.getItem('extazyyUser');

    fetch('keys.json') // Зчитуємо дані з keys.json
        .then(res => res.json())
        .then(data => {
            if (data[key]) {
                if (!data[key].activated) {
                    // Якщо ключ ще не активований
                    data[key].activated = true;
                    data[key].username = user;
                    data[key].deviceId = deviceId;
                    document.getElementById('status').innerText = 'Key activated for ' + data[key].days + ' days.';
                    document.getElementById('downloadSection').style.display = 'block';

                    // Оновлюємо дані в keys.json (на сервері)
                    updateKeyInDatabase(key, data[key]);

                    localStorage.setItem('user_key_' + user, key); // Зберігаємо активований ключ у localStorage
                } else if (data[key].deviceId === deviceId && data[key].username === user) {
                    document.getElementById('status').innerText = 'Key already activated for ' + data[key].days + ' days.';
                    document.getElementById('downloadSection').style.display = 'block'; // Показує кнопку завантаження
                } else {
                    document.getElementById('status').innerText = 'Key already used by another user or device.';
                }
            } else {
                document.getElementById('status').innerText = 'Invalid key.';
            }
        });
}

// Отримуємо ID пристрою (це локальний спосіб, для реального проекту потрібно буде інше рішення)
function getDeviceId() {
    let id = localStorage.getItem('deviceId');
    if (!id) {
        id = 'dev-' + Math.random().toString(36).substring(2, 15); // Генерація випадкового ID
        localStorage.setItem('deviceId', id);
    }
    return id;
}

// Оновлення даних в keys.json (реалізація на сервері)
function updateKeyInDatabase(key, keyData) {
    // Тут ви повинні реалізувати відправку даних на сервер або зберігання їх у базі даних
    const updatedData = JSON.stringify(keyData, null, 4);
    
    // Для реального серверу тут потрібно виконати HTTP-запит
    console.log("Key updated:", updatedData);
}

// Показати або приховати меню реєстрації / логіна
document.getElementById('loginBtn').addEventListener('click', function() {
    const authMenu = document.getElementById('authMenu');
    authMenu.style.display = authMenu.style.display === 'flex' ? 'none' : 'flex';
});
