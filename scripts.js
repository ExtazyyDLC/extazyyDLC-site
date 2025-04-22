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
  if (!list) return;
  list.innerHTML = "";
  keys.forEach(key => {
    const li = document.createElement("li");
    li.textContent = key;
    list.appendChild(li);
  });
}

function activateKey() {
  const inputKey = document.getElementById("keyInput").value.trim
