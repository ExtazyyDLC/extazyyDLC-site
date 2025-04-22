// Список действующих ключей и их сроков (в днях)
const validKeys = {
  "EXTAZYYDLC-ABC123-1D": "1D",
  "EXTAZYYDLC-X9K8L1-7D": "7D",
  "EXTAZYYDLC-QWERTY-30D": "30D",
  "EXTAZYYDLC-ASDFGH-60D": "60D",
  "EXTAZYYDLC-ZXCVBN-90D": "90D",
  "EXTAZYYDLC-MNBVCX-365D": "365D",
  "EXTAZYYDLC-PLMOKN-FOREVER": "FOREVER"
};

// Проверка, активирован ли уже ключ на этом устройстве
const activatedKey = localStorage.getItem("extazyy_activated_key");
if (activatedKey) {
  document.getElementById("message").innerHTML = `<p class="success">Ключ уже активирован. Доступ разрешён.</p>`;
  document.getElementById("downloadLink").style.display = "inline-block";
}

function activateKey() {
  const inputKey = document.getElementById("keyInput").value.trim().toUpperCase();
  const message = document.getElementById("message");
  const downloadLink = document.getElementById("downloadLink");

  if (localStorage.getItem("extazyy_activated_key")) {
    message.innerHTML = `<p class="error">Ключ уже активирован на этом устройстве.</p>`;
    return;
  }

  if (validKeys[inputKey]) {
    const duration = validKeys[inputKey];
    const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
    localStorage.setItem("extazyy_activated_key", inputKey);
    message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
    downloadLink.style.display = "inline-block";
  } else {
    message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
    downloadLink.style.display = "none";
  }
}
