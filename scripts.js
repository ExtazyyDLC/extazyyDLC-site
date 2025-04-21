// Готовые ключи (рандомные и с разными сроками)
let validKeys = [
  "EXTAZYYDLC-AB12C3-1D", "EXTAZYYDLC-XZ91PK-1D", "EXTAZYYDLC-MNP45T-1D",
  "EXTAZYYDLC-ZXCVBN-7D", "EXTAZYYDLC-PLMOKN-7D", "EXTAZYYDLC-QWERTY-30D",
  "EXTAZYYDLC-ASDFGH-30D", "EXTAZYYDLC-KJHGFD-60D", "EXTAZYYDLC-LKJHGF-90D",
  "EXTAZYYDLC-UIYTRE-365D", "EXTAZYYDLC-FDREWT-FOREVER"
];

// Загружаем сохранённые ключи (если есть)
const saved = localStorage.getItem("extazyy_keys");
if (saved) validKeys = JSON.parse(saved);

function saveKeys() {
  localStorage.setItem("extazyy_keys", JSON.stringify(validKeys));
}

function activateKey() {
  const keyInput = document.getElementById("activation-key").value.trim().toUpperCase();
  const message = document.getElementById("message");
  const download = document.getElementById("download-section");

  if (validKeys.includes(keyInput)) {
    const duration = keyInput.split("-")[2];
    const readable = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
    validKeys = validKeys.filter(k => k !== keyInput);
    saveKeys();

    message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${readable}.</p>`;
    download.classList.remove("hidden");
  } else {
    message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
    download.classList.add("hidden");
  }
}
