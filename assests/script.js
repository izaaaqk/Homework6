//name variables
const $form = document.querySelector(".title form");
const $input = document.querySelector(".title input");
const $msg = document.querySelector(".title .msg");
const $cities = document.querySelector(".section .cities");

//add event listener to my btn
$form.addEventListener("submit", btn => {
    btn.preventDefault();

    let inputVal = $input.value;

    const listItems = $cities.querySelectorAll(".section .city");
    const listItemsArray = Array.from(listItems);
//added some conditions for my input to be precise
    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            if (inputVal.includes(",")) {
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
    }
    const today = moment();
    //api call
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${"37fcd1e7adf83820e8d9db2feba781a9"}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, weather, wind } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                weather[0]["icon"]
            }.svg`;
//add the elements that i requested on my pli call to my html
    const $div = document.createElement("div");
    $div.classList.add("city");
    const contBox = `<h2 class="city-name" data-name="${name}">
        <span>${name}</span>
        <sup class="date">${today.format("MM-DD-YY")}</sup>
        </h2>
        <figure>
            <img class="city-icon" src="${icon}" alt="${
            weather[0]["description"]
             }">
        <figcaption>${weather[0]["description"]}</figcaption>
       
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <div>Humidity: ${main.humidity} %  </div>
        <div>Wind: ${wind.speed} MPH </div>
         </figure>
         
    `;
    $div.innerHTML = contBox;
    $cities.appendChild($div);
        })
        .catch(() => {
            $msg.textContent = "try again";
        });

    $msg.textContent = "";
    $form.reset();
    $input.focus();
});

//this is the api for the five day forcast
// const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${"37fcd1e7adf83820e8d9db2feba781a9"}&units=metric`;

