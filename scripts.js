// Статический список доступных ключей
const validKeys = [
  "EXTAZYYDLC-ABC123-1D",
  "EXTAZYYDLC-ABC124-1D",
  "EXTAZYYDLC-XYZ789-7D",
  "EXTAZYYDLC-QWERTY-30D",
  "EXTAZYYDLC-ASDFGH-60D",
  "EXTAZYYDLC-ZXCVBN-90D",
  "EXTAZYYDLC-MNBVCX-365D",
  "EXTAZYYDLC-PLMOKN-FOREVER"
];

function activateKey() {
  const inputKey = document.getElementById("keyInput").value.trim().toUpperCase();
  const message = document.getElementById("message");
  const downloadLink = document.getElementById("downloadLink");

  // Проверка, был ли этот ключ уже активирован на этом устройстве
  const activatedKey = localStorage.getItem("activated_key");

  if (activatedKey === inputKey) {
    message.innerHTML = `<p class="success">Ключ уже активирован на этом устройстве.</p>`;
    downloadLink.style.display = "inline-block";
    return;
  }

  // Проверка, валидный ли ключ
  if (validKeys.includes(inputKey)) {
    localStorage.setItem("activated_key", inputKey);
    const duration = inputKey.split("-")[2];
    const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
    message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
    downloadLink.style.display = "inline-block";
  } else {
    message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
    downloadLink.style.display = "none";
  }
}
