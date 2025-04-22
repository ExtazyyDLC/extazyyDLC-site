function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        if (!localStorage.getItem('user_' + username)) {
            localStorage.setItem('user_' + username, password);
            document.getElementById('message').innerText = 'Registered successfully!';
        } else {
            document.getElementById('message').innerText = 'User already exists.';
        }
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const stored = localStorage.getItem('user_' + username);
    if (stored && stored === password) {
        localStorage.setItem('extazyyUser', username);
        location.href = 'cabinet.html';
    } else {
        document.getElementById('message').innerText = 'Invalid credentials.';
    }
}

function checkLogin() {
    const user = localStorage.getItem('extazyyUser');
    if (!user) {
        location.href = 'login.html';
    } else {
        document.getElementById('welcome').innerText = 'Welcome, ' + user + '!';
    }
}

function activateKey() {
    const key = document.getElementById('keyInput').value.trim();
    const deviceId = getDeviceId();
    fetch('keys.json')
        .then(res => res.json())
        .then(data => {
            if (data[key]) {
                if (!data[key].activated) {
                    data[key].activated = true;
                    data[key].deviceId = deviceId;
                    document.getElementById('status').innerText = 'Key activated for ' + data[key].days + ' days.';
                    document.getElementById('downloadSection').style.display = 'block';
                } else if (data[key].deviceId === deviceId) {
                    document.getElementById('status').innerText = 'Key already activated for ' + data[key].days + ' days.';
                    document.getElementById('downloadSection').style.display = 'block';
                } else {
                    document.getElementById('status').innerText = 'Key already used on another device.';
                }
            } else {
                document.getElementById('status').innerText = 'Invalid key.';
            }
        });
}

function getDeviceId() {
    let id = localStorage.getItem('deviceId');
    if (!id) {
        id = 'dev-' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('deviceId', id);
    }
    return id;
}