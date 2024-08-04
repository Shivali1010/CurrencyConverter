const baseURL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_q0kREi7TQGBxyoZ4dKk786EYu3f03o8hWRuxwOZx`;

const dropdowns = document.querySelectorAll(".select-container select");
const button = document.querySelector(".button");
const input = document.querySelector("form input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for(let dropdown of dropdowns) {
    for(currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if(dropdown.name === "from" && currCode === "USD") {
            option.selected = "selected";
        }
        else if(dropdown.name === "to" && currCode === "INR") {
            option.selected = "selected";
        }
        dropdown.append(option); 
    }

    dropdown.addEventListener("change", (evt) => {
        updateFlag(evt.target.value, dropdown);
        console.log(evt.target.value);
    });
}

function updateFlag(currCode, parentSelect) {
    let countryCode = countryList[currCode];
    let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = parentSelect.parentElement.querySelector("img");
    img.src = newFlagSrc;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = input.value;
    if(amount === "" || amount < 1) {
        amount = 1;
    }
    let url = baseURL + "&base_currency=" + fromCurr.value;
    let response = await fetch(url);
    let responseData = await response.json();
    let data = responseData.data;
    let exchangeRate = data[toCurr.value].value;
    let finalAmount = amount * exchangeRate;

    msg.innerHTML = `${amount} ${fromCurr.value} = <strong>${finalAmount}</strong> ${toCurr.value}`;
     
});



