document.getElementById('searchBtn').addEventListener('click', async () => {
    const cityName = document.getElementById('cityInput').value.trim();
    const weatherResult = document.getElementById('weatherResult');
    const cityNameElem = document.getElementById('cityName');
    const temperatureElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
    const forecastContainer = document.getElementById('forecastContainer');

    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${cityName}`);
        const data = await response.json();

        if (response.ok) {
            const current = data.list[0];
            cityNameElem.textContent = data.name;
            temperatureElem.innerHTML = `Temperature: <span>${current.main.temp}</span>°C`;
            descriptionElem.innerHTML = `Condition: <span>${current.weather[0].description}</span>`;

            forecastContainer.innerHTML = '';

            for (let i = 0; i < data.list.length; i += 8) {
                const dayData = data.list[i];
                const date = new Date(dayData.dt * 1000).toLocaleDateString();

                const dayCard = document.createElement('div');
                dayCard.style.border = '1px solid #ccc';
                dayCard.style.padding = '10px';
                dayCard.style.borderRadius = '5px';
                dayCard.innerHTML = `
                    <p><strong>${date}</strong></p>
                    <p>${dayData.main.temp}°C</p>
                    <p>${dayData.weather[0].description}</p>
                `;
                forecastContainer.appendChild(dayCard);
            }

            weatherResult.style.display = 'block';
        } else {
            alert(data.error || 'City not found');
            weatherResult.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server');
    }
});