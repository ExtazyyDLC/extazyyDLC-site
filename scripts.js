// Список начальных ключей
let keys = JSON.parse(localStorage.getItem("extazyy_keys")) || [
  "EXTAZYYDLC-ABC123-1D",
  "EXTAZYYDLC-X9K8L1-7D",
  "EXTAZYYDLC-QWERTY-30D",
  "EXTAZYYDLC-ASDFGH-60D",
  "EXTAZYYDLC-ZXCVBN-90D",
  "EXTAZYYDLC-MNBVCX-365D",
  "EXTAZYYDLC-PLMOKN-FOREVER"
];

// Сохранение в localStorage
function saveKeys() {
  localStorage.setItem("extazyy_keys", JSON.stringify(keys));
}

// Отображение ключей
function updateKeyList() {
  const list = document.getElementById("keyList");
  list.innerHTML = "";
  keys.forEach(key => {
    const li = document.createElement("li");
    li.textContent = key;
    list.appendChild(li);
  });
}

// Активация ключа
function activateKey() {
  const inputKey = document.getElementById("keyInput").value.trim().toUpperCase();
  const message = document.getElementById("message");
  const downloadLink = document.getElementById("downloadLink");

  const index = keys.indexOf(inputKey);
  if (index !== -1) {
    const duration = inputKey.split("-")[2];
    const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
    keys.splice(index, 1); // Удалить ключ
    saveKeys();
    updateKeyList();
    message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
    downloadLink.style.display = "inline-block";
  } else {
    message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
    downloadLink.style.display = "none";
  }
}

// Инициализация
updateKeyList();
