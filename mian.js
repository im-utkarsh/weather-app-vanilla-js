const apikey = "28bc134377737b411492bb8e38e11bef";
const city = document.querySelector(".location .city");
const date = document.querySelector(".location .date");
const temp = document.querySelector(".current .temp");
const weatherType = document.querySelector(".current .weather");
const hilow = document.querySelector(".current .hi-low");
const notify = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");
const searchbox = document.querySelector(".search-box");
const msghead = document.querySelector(".message .text-1");
const msgbody = document.querySelector(".message .text-2");
let timer1, timer2;

// handling data from input

searchbox.addEventListener("keypress", (e) => {
    if (e.key == "Enter" && searchbox.value.length > 0) {
        displayResults(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchbox.value}&units=metric&appid=${apikey}`
        );
    }
});

// handlling data from geolocation

function locationWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else
        showNotification(
            "Location Unavailable",
            "Geo location not found, enter city manually."
        );
}

function setPosition(position) {
    displayResults(
        `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apikey}`
    );
}

function showError(e) {
    if (e.code == 1)
        showNotification(
            "Location Failed",
            "Geo location blocked, enter city manually."
        );
    else
        showNotification(
            "Location Failed",
            "Unknown error, enter city manually."
        );
}

// display results

async function displayResults(query) {
    let weather;
    try {
        weather = await fetch(query).then((res) => {
            if (res.ok) return res.json();
            else throw new Error();
        });
    } catch (err) {
        showNotification("Invalid Location", "Please enter a valid location.");
    }
    console.log(weather);
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    date.innerHTML = dateBuilder();
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weatherType.innerHTML = weather.weather[0].main;

    hilow.innerHTML = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder() {
    let d = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

// handling notification

closeIcon.addEventListener("click", closeNotification);

function showNotification(texthead, textmsg) {
    msghead.innerHTML = texthead;
    msgbody.innerHTML = textmsg;
    notify.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        notify.classList.remove("active");
    }, 5000);

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
}

function closeNotification() {
    notify.classList.remove("active");

    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
}

// get weather using location on load
locationWeather();
