<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Активация и генерация ключей</title>
  <style>
    body { font-family: Arial; background: #f4f4f4; padding: 20px; }
    input, button, select { padding: 10px; margin: 10px 0; width: 100%; }
    #downloadLink { display: none; margin-top: 20px; }
    .success { color: green; }
    .error { color: red; }
    .container { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Активация ключа</h2>
    <input type="text" id="keyInput" placeholder="Введите ключ" />
    <button onclick="activateKey()">Активировать</button>
    <div id="message"></div>
    <a id="downloadLink" href="https://example.com/yourfile.zip" download>Скачать файл</a>
  </div>

  <div class="container">
    <h2>Генерация ключей</h2>
    <select id="durationSelect">
      <option value="1D">1 день</option>
      <option value="7D">7 дней</option>
      <option value="30D">30 дней</option>
      <option value="60D">60 дней</option>
      <option value="90D">90 дней</option>
      <option value="365D">365 дней</option>
      <option value="FOREVER">Навсегда</option>
    </select>
    <button onclick="generateKey()">Сгенерировать ключ</button>
    <div id="generatedKey"></div>
  </div>

  <div class="container">
    <h3>Список доступных ключей</h3>
    <ul id="keyList"></ul>
  </div>

  <script>
    // Список начальных (предустановленных) ключей
    const keys = [
      "EXTAZYYDLC-ABC123-1D",
      "EXTAZYYDLC-X9K8L1-7D",
      "EXTAZYYDLC-QWERTY-30D",
      "EXTAZYYDLC-ASDFGH-60D",
      "EXTAZYYDLC-ZXCVBN-90D",
      "EXTAZYYDLC-MNBVCX-365D",
      "EXTAZYYDLC-PLMOKN-FOREVER"
    ];

    function updateKeyList() {
      const list = document.getElementById("keyList");
      list.innerHTML = "";
      keys.forEach(key => {
        const li = document.createElement("li");
        li.textContent = key;
        list.appendChild(li);
      });
    }

    function activateKey() {
      const inputKey = document.getElementById("keyInput").value.trim().toUpperCase();
      const message = document.getElementById("message");
      const downloadLink = document.getElementById("downloadLink");

      const index = keys.indexOf(inputKey);
      if (index !== -1) {
        const duration = inputKey.split("-")[2];
        const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
        keys.splice(index, 1); // Удалить использованный ключ
        updateKeyList();
        message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
        downloadLink.style.display = "inline-block";
      } else {
        message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
        downloadLink.style.display = "none";
      }
    }

    function generateKey() {
      const duration = document.getElementById("durationSelect").value;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomPart = '';
      for (let i = 0; i < 6; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const newKey = `EXTAZYYDLC-${randomPart}-${duration}`;
      keys.push(newKey);
      updateKeyList();
      document.getElementById("generatedKey").innerHTML = `<p class="success">Сгенерирован ключ: <b>${newKey}</b></p>`;
    }

    // Показать ключи при загрузке страницы
    updateKeyList();
  </script>
</body>
</html>
