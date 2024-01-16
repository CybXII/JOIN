
const STORAGE_TOKEN = "HIER DEIN TOKEN EINFÜGEN";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";


async function loadToken(){
    let resp = await fetch("../json/storagetoken.json")
    token = await resp.json();
    console.log(token)
}


async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}
