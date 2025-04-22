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

// Показати або приховати меню реєстрації / логіна
document.getElementById('loginBtn').addEventListener('click', function() {
    const authMenu = document.getElementById('authMenu');
    authMenu.style.display = authMenu.style.display === 'flex' ? 'none' : 'flex';
});
