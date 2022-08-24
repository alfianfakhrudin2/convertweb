const dropList = document.querySelectorAll(
        "form select"
    ),
    fromCurrency = document.querySelector(
        ".from select"
    ),
    toCurrency = document.querySelector(
        ".to select"
    ),
    getButton = document.querySelector(
        "form button"
    );

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        // console.log(currency_code)
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "IDR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // insert options
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (code in country_code) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            // imgTag.src = `https://flagcdn.com/${country_code[code]}/flat/64.png`
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`
        }
    }
}
window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateText = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateText.innerText = "get the value result...";
    // let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency.value}`;
    let url = `https://v6.exchangerate-api.com/v6/1985d8ae9c27d6fedb395947/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        })
        .catch(() => {
            exchangeRateText.innerText = "something when wrong";
        });
}