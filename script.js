// Weather App


const weatherForm = document.querySelector(".Form");
const input = document.querySelector(".input");
const card = document.querySelector(".card");

const apiKey = "ff409bb7c5f23387d3f4b8273ce2b63c";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();
    const city = input.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            displayError(error);

        }
    }
    else {
           displayError("Please Enter a city");
    }

})

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch (apiUrl);

    console.log(response);

    if (!response.ok){
        throw new Error("Could not fetch the weather Data");
    }
    else {
        return await response.json();
        
    }
}


function displayWeatherInfo(data){
      
    console.log(data);
    const{name:city, 
        main: {temp, humidity}, 
        weather : [{description, id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const  weatherDegree = document.createElement("p");
        const weatherCondition = document.createElement("p");
        const weatherDesc = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        cityDisplay.classList.add("cityDisplay");
        card.appendChild(cityDisplay);

        weatherDegree.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        weatherDegree.classList.add("weatherDegree");
        card.appendChild(weatherDegree);

        weatherCondition.textContent = `Humidity: ${humidity}%`;
        weatherCondition.classList.add("weatherCondition");
        card.appendChild(weatherCondition);

        weatherDesc.textContent = `${description}`;
        weatherDesc.classList.add("weatherDesc");
        card.appendChild(weatherDesc);

      weatherEmoji.textContent = getWeatherEmoji(id);
      weatherEmoji.classList.add("weatherEmoji");
      card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherID){

    switch(true){
        case (weatherID >= 200 && weatherID < 300): 
        return "⚡⛈️ "
        case (weatherID >= 300 && weatherID < 400): 
        return "🌦️"
        case (weatherID >= 500 && weatherID < 600):
        return "🌧️" 
        case (weatherID >= 600 && weatherID < 700):
        return "❄️"
        case (weatherID === 800):
        return "☀️";
        case (weatherID >= 700 && weatherID < 800):
        return "🌫️" 
        case (weatherID >= 800 && weatherID < 810):
            return "☁️" 
            default :
            return "❓"
    }

}


function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild (errorDisplay);
}