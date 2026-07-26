const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname));

app.get('/api/weather', async (req, res) => {
    const cityName = req.query.city;
    const apiKey = 'dbaf80088a89cd0cae42ec447095edb6';

    if (!cityName) {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== "200") {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json({
            name: data.city.name,
            list: data.list
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});