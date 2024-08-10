document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.container');
        const searchButton = document.querySelector('.search-box button');
        const weatherBox = document.querySelector('.weather-box');
        const weatherDetails = document.querySelector('.weather-details');
        const error404 = document.querySelector('.not-found');
    
        searchButton.addEventListener('click', () => {
            const APIKey = 'd4dbe2ba75c6f608324195cb42d0ec73';
            const city = document.querySelector('.search-box input').value.trim();
    
            if (city === '') return;
    
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
                .then(response => response.json())
                .then(json => {
                    if (json.cod === '404') {
                        container.style.height = '400px';
                        weatherBox.classList.remove('active');
                        weatherDetails.classList.remove('active');
                        error404.classList.add('active');
                        return;
                    }
    
                    error404.classList.remove('active');
                    container.style.height = '555px';
                    weatherBox.classList.add('active');
                    weatherDetails.classList.add('active');
    
                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');
    
                    
    
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
                    description.innerHTML = `${json.weather[0].description}`;
                    humidity.innerHTML = `${json.main.humidity}%`;
                    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
                });
        });
    });
    