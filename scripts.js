let keys = JSON.parse(localStorage.getItem("extazyy_keys")) || [
  "EXTAZYYDLC-ABC123-1D",
  "EXTAZYYDLC-X9K8L1-7D",
  "EXTAZYYDLC-QWERTY-30D",
  "EXTAZYYDLC-ASDFGH-60D",
  "EXTAZYYDLC-ZXCVBN-90D",
  "EXTAZYYDLC-MNBVCX-365D",
  "EXTAZYYDLC-PLMOKN-FOREVER"
];

function saveKeys() {
  localStorage.setItem("extazyy_keys", JSON.stringify(keys));
}

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
  const inputKey = document.getElementById("activation-key").value.trim().toUpperCase();
  const message = document.getElementById("message");
  const downloadSection = document.getElementById("download-section");

  const index = keys.indexOf(inputKey);
  if (index !== -1) {
    const duration = inputKey.split("-")[2];
    const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
    keys.splice(index, 1); // Удалить ключ
    saveKeys();
    updateKeyList();
    message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
    downloadSection.classList.remove("hidden");
  } else {
    message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
    downloadSection.classList.add("hidden");
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
  saveKeys();
  updateKeyList();
  document.getElementById("generatedKey").innerHTML = `<p class="success">Сгенерирован ключ: <b>${newKey}</b></p>`;
}

// Инициализация
document.addEventListener("DOMContentLoaded", updateKeyList);
