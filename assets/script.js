// let apiKey = 3703dc0a87a12ecb40acb1b87b0e9d16;

//Fetch for when the button is clicked
//Grab the value from the button rather than the input
//use event delegation (event.target.textContent) to grab the text of the city
//use icons from the fetch data
fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3703dc0a87a12ecb40acb1b87b0e9d16")
    .then(response => response.json())
    .then(citiesFound => {
        let city1 = citiesFound[0];
        console.log(city1.lat);
        console.log(city1.lon);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city1.lat}&lon=${city1.lon}&appid=3703dc0a87a12ecb40acb1b87b0e9d16`)
    })

    .then(response => response.json())
    .then(results => {
        console.log(results);
    })