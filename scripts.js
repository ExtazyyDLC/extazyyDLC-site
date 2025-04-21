<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Активация ключа</title>
  <style>
    body { font-family: Arial; background: #f4f4f4; padding: 20px; }
    input, button { padding: 10px; margin: 10px 0; width: 100%; }
    #downloadLink { display: none; margin-top: 20px; }
    .success { color: green; }
    .error { color: red; }
  </style>
</head>
<body>
  <h2>Активация ключа</h2>
  <input type="text" id="keyInput" placeholder="Введите ключ" />
  <button onclick="activateKey()">Активировать</button>
  <div id="message"></div>
  <a id="downloadLink" href="https://example.com/yourfile.zip" download>Скачать файл</a>

  <script>
    const keys = {
      "1d": ["1DKEY1", "1DKEY2", "1DKEY3", "1DKEY4", "1DKEY5", "1DKEY6", "1DKEY7", "1DKEY8", "1DKEY9", "1DKEY10"],
      "7d": ["7DKEY1", "7DKEY2", "7DKEY3", "7DKEY4", "7DKEY5", "7DKEY6", "7DKEY7", "7DKEY8", "7DKEY9", "7DKEY10"],
      "30d": ["30DKEY1", "30DKEY2", "30DKEY3", "30DKEY4", "30DKEY5", "30DKEY6", "30DKEY7", "30DKEY8", "30DKEY9", "30DKEY10"],
      "60d": ["60DKEY1", "60DKEY2", "60DKEY3", "60DKEY4", "60DKEY5", "60DKEY6", "60DKEY7", "60DKEY8", "60DKEY9", "60DKEY10"],
      "90d": ["90DKEY1", "90DKEY2", "90DKEY3", "90DKEY4", "90DKEY5", "90DKEY6", "90DKEY7", "90DKEY8", "90DKEY9", "90DKEY10"],
      "365d": ["365DKEY1", "365DKEY2", "365DKEY3", "365DKEY4", "365DKEY5", "365DKEY6", "365DKEY7", "365DKEY8", "365DKEY9", "365DKEY10"],
      "forever": ["FOREVER1", "FOREVER2", "FOREVER3", "FOREVER4", "FOREVER5", "FOREVER6", "FOREVER7", "FOREVER8", "FOREVER9", "FOREVER10"]
    };

    function activateKey() {
      const inputKey = document.getElementById("keyInput").value.trim().toUpperCase();
      let found = false;

      for (const group in keys) {
        const index = keys[group].indexOf(inputKey);
        if (index !== -1) {
          keys[group].splice(index, 1); // Удаляем использованный ключ
          found = true;
          document.getElementById("message").innerHTML = `<p class="success">Ключ активирован! Доступ на ${group.replace("d", " дней")}.</p>`;
          document.getElementById("downloadLink").style.display = "inline-block";
          break;
        }
      }

      if (!found) {
        document.getElementById("message").innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
        document.getElementById("downloadLink").style.display = "none";
      }
    }
  </script>
</body>
</html>
