# ⛅ Weather App using Vanilla JavaScript
A simple web app for weather using vanilla javascript.  
[Live Demo](https://im-utkarsh.github.io/weather-app-vanilla-js/)

I will be using the https://openweathermap.org/ api to get weather details based on geo location or input provided by user.

## 💻Code
The exact location is determined using longitude and latitude retried using geolocation navigator.
```javascript
// first check if geolocation abailable
if ("geolocation" in navigator) {
    // getCurrentPosition takes 1 callback which gets 1 variable containing position related data
    navigator.geolocation.getCurrentPosition(setPosition);
}
``` 
Then make fetch query using user location or input provided, and get weather details from api.
```javascript
let queryLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apikey}`;

let queryInput = `https://api.openweathermap.org/data/2.5/weather?q=${searchbox.value}&units=metric&appid=${apikey}`;

weather = fetch(query).then((res)=>res.json());
```

## 📚References
* Original Idea: https://www.youtube.com/watch?v=n4dtwWgRueI
* Geolocation API: https://www.w3schools.com/html/html5_geolocation.asp
* Notification: https://codepen.io/alvarotrigo/pen/YzvKNvo
* Backgroung Image: https://unsplash.com/photos/QsWG0kjPQRY