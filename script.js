const weather = {
    apiKey: "a2636bbda93a96e6f0a952dad9b73a0b",
    apiBase: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener('keypress',resultOnEnter);

let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener("click", resultOnClick);

function resultOnClick(){
    fetchData(searchBox.value);
    searchBox.value='';
};

function resultOnEnter(event){
    if(event.keyCode == 13){
        fetchData(searchBox.value);
        searchBox.value='';
    }
}

function fetchData(city){
    fetch(`${weather.apiBase}weather?q=${city}&units=metric&appid=${weather.apiKey}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){

    if(weather.cod == '404'){
        alert("Enter Correct City");
    }

    else{
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weather.weather[0].description}')`;

        let city = document.querySelector('.city');
        city.innerHTML = `${weather.name},<br>${weather.sys.country}`;

        let now = new Date();
        let dateTime = document.querySelector('.weather-data .date-time');
        dateTime.innerText = dateTimeBuilder(now, weather);

        let dayNight = document.querySelector('.weather-data .day-night');
        dayNight.innerHTML = `Day ${Math.round(weather.main.temp_max)}°&uarr; &vellip; Night ${Math.round(weather.main.temp_min)}°&darr;`;

        let temp = document.querySelector('.weather-data .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}°<span>C</span>`;

        let feelsLike = document.querySelector('.weather-data .feels-like');
        feelsLike.innerText = `Feels Like ${Math.round(weather.main.feels_like)}°`;

        let icon = document.querySelector('.icon img');
        icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

        let description = document.querySelector('.description');
        description.innerText = `${weather.weather[0].description}`;

        let backCity = document.querySelector('.back_city');
        backCity.innerHTML = `${weather.name}, ${weather.sys.country}`;

        let backTemp = document.querySelector('.back .back_temp');
        backTemp.innerHTML = `${Math.round(weather.main.temp)}°<span>C</span>`;

        let pressure = document.querySelector('.pressure');
        pressure.innerText = `Pressure : ${weather.main.pressure} Bar`;

        let humidity = document.querySelector('.humidity');
        humidity.innerText = `Humidity : ${weather.main.humidity} %`;

        let visibility = document.querySelector('.visibility');
        visibility.innerText = `Visibility : ${weather.visibility/1000} Km`;

        let windDirection = document.querySelector('.wind .wind_direction');
        windDirection.innerText = `Wind Direction : From ${findWindDirection(weather.wind.deg)}`;

        let windSpeed = document.querySelector('.wind .wind_speed');
        windSpeed.innerText = `Wind Speed : ${Math.round(weather.wind.speed*4)} Km/h`;
    }
}

function dateTimeBuilder(_d, weather){
    let dateTime = calcTime(searchBox.value , weather.timezone);
    return `${dateTime}`;
}

function calcTime(_place, offset) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (1000*offset));

    let strHours = nd.getHours().toString();
    let strMinutes = nd.getMinutes().toString();

    if(strHours.length==1){
        strHours = `0${strHours}`;
    }
    
    if(strMinutes.length==1){
        strMinutes = `0${strMinutes}`;
    }
    
    let convertedTime = tConvert(`${strHours}:${strMinutes}`);

    return `${nd.getDate()} ${months[nd.getMonth()]} ${convertedTime}`;
}

function findWindDirection(d) {
    let directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
    d += 22.5;
    if (d < 0)
        d = 360 - Math.abs(d) % 360;
    else
        d = d % 360;
    let w = parseInt(d / 45);
    return `${directions[w]}`;
}   


function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM':' PM'; // Set AM/PM
      time[0] = +time[0] % 12||12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }