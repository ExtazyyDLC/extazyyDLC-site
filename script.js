function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('extazyyUser', username);
        location.href = 'cabinet.html';
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
                } else if (data[key].deviceId === deviceId) {
                    document.getElementById('status').innerText = 'Key already activated on this device.';
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