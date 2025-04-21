function activateKey() {
    const key = document.getElementById('activation-key').value;
    const message = document.getElementById('message');
    const downloadSection = document.getElementById('download-section');

    if (!key) {
        message.textContent = "Пожалуйста, введите ключ активации.";
        return;
    }

    // Логика для проверки ключа активации (например, через API)
    fetch('https://your-server-url/activate', {
        method: 'POST',
        body: JSON.stringify({ key: key }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            message.textContent = "Ключ активирован! Скачайте клиент.";
            message.style.color = "green";
            downloadSection.classList.remove('hidden');
        } else {
            message.textContent = "Неверный ключ или срок его действия истек.";
            message.style.color = "red";
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        message.textContent = "Произошла ошибка при активации ключа.";
        message.style.color = "red";
    });
}
