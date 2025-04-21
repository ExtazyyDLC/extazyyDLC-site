// Список заранее сгенерированных ключей
let keys = [
    "EXTAZYYDLC-ABCD-1D", "EXTAZYYDLC-EFGH-1D", "EXTAZYYDLC-IJKL-1D", "EXTAZYYDLC-MNOP-1D", "EXTAZYYDLC-QRST-1D",
    "EXTAZYYDLC-UVWX-1D", "EXTAZYYDLC-YZAB-1D", "EXTAZYYDLC-CDEF-1D", "EXTAZYYDLC-GHIJ-1D", "EXTAZYYDLC-KLMN-1D",

    "EXTAZYYDLC-OPQR-7D", "EXTAZYYDLC-STUV-7D", "EXTAZYYDLC-WXYZ-7D", "EXTAZYYDLC-ABEF-7D", "EXTAZYYDLC-CDGH-7D",
    "EXTAZYYDLC-IJKM-7D", "EXTAZYYDLC-NOPQ-7D", "EXTAZYYDLC-RSTU-7D", "EXTAZYYDLC-VWXY-7D", "EXTAZYYDLC-ZABC-7D",

    "EXTAZYYDLC-DEFG-30D", "EXTAZYYDLC-HIJK-30D", "EXTAZYYDLC-LMNO-30D", "EXTAZYYDLC-PQRS-30D", "EXTAZYYDLC-TUVW-30D",
    "EXTAZYYDLC-XYZA-30D", "EXTAZYYDLC-BCDE-30D", "EXTAZYYDLC-FGHI-30D", "EXTAZYYDLC-JKLM-30D", "EXTAZYYDLC-NOPQ-30D",

    // Добавь другие сроки по аналогии
];

// Сохраняем в localStorage при первом заходе
if (!localStorage.getItem("extazyy_keys")) {
    localStorage.setItem("extazyy_keys", JSON.stringify(keys));
} else {
    keys = JSON.parse(localStorage.getItem("extazyy_keys"));
}

function saveKeys() {
    localStorage.setItem("extazyy_keys", JSON.stringify(keys));
}

function activateKey() {
    const inputKey = document.getElementById("activation-key").value.trim().toUpperCase();
    const message = document.getElementById("message");
    const downloadSection = document.getElementById("download-section");

    const index = keys.indexOf(inputKey);
    if (index !== -1) {
        const duration = inputKey.split("-")[2];
        const daysText = duration === "FOREVER" ? "навсегда" : `${parseInt(duration)} дней`;
        keys.splice(index, 1); // удалить использованный ключ
        saveKeys();
        message.innerHTML = `<p class="success">Ключ активирован! Доступ на ${daysText}.</p>`;
        downloadSection.classList.remove("hidden");
    } else {
        message.innerHTML = `<p class="error">Неверный или уже использованный ключ!</p>`;
        downloadSection.classList.add("hidden");
    }
}
