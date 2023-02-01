// Create a weather dashboard with form inputs.
// When a user searches for a city 
//they are presented with current and future conditions for that city 
//and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city
// they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history
// they are again presented with current and future conditions for that city


let $todaysWeather = $("#today");       //Variable for the first day's section
let $forecasts = $("#forecast");        //Variable for the 5-day forecast's section

// Object for easier manipulation
weatherSearch = {

    apiKey: "3703dc0a87a12ecb40acb1b87b0e9d16",     //Variable for api key

    // Function to get api data
    buidUrl: function () {
        let $searchTerm = $("#search-input").val().trim();      //Variable to retrieve user input value

        //Retrieve city information
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + $searchTerm + "&limit=5&appid=" + this.apiKey
        )
            .then(response => response.json())
            .then(citiesFound => {
                for (let i = 0; i < citiesFound.length; i++) {
                    const city = citiesFound[i];

                    // console.log(citiesFound);       //Check the data is received

                    //Parse city lat and lon to retrieve weather conditions
                    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=` + this.apiKey)
                }
            })

            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },

    // Function to display weather conditions on webpage
    displayWeather: function (data) {

        const cityname = data.city;             //Variable for the city's name
        const weatherDetails = data.list[0];    //Variable for weather conditions of the first day
        const weatherForecasts = data.list;     //Variable for all weather conditions

        // Append the weather condition for the first day to the webpage
        $todaysWeather.append(
            `<h3 class=city-details>
            ${cityname.name} 
            (${moment(weatherDetails.dt_txt).format("DD/MM/YYYY")})
            </h3>
            <img src="https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}.png" alt="" />
            <p>Temp: ${weatherDetails.main.temp} °C</p> 
            <p>Wind: ${weatherDetails.wind.speed} KPH</p> 
            <p>Humidity: ${weatherDetails.main.humidity}%</p>`
        );

        // Loop through the data to get the 5 day $forecasts from at least 24 hrs later
        for (let i = 8; i < weatherForecasts.length; i += 7) {

            const { dt_txt } = weatherForecasts[i];
            const { icon } = weatherForecasts[i].weather[0];
            const { temp, humidity } = weatherForecasts[i].main;
            const { speed } = weatherForecasts[i].wind;

            let $forecastList = $("<div>");     //Add div element to html file
            $forecastList.addClass("card");     //Add cards to display the weather conditions

            $forecasts.append($forecastList);   //Append new created div to forcast section

            //Check if the first day matches and append the divs with cards
            if (weatherDetails[i] === weatherDetails[0]) {

                $forecastList.append(
                    `<h4 class=city-details>${moment(dt_txt).format("DD/MM/YYYY")}</h4>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />          
              <p>Temp: ${temp} °C</p> 
              <p>Wind: ${speed} KPH</p> 
              <p>Humidity: ${humidity}%</p>`
                );
            }
        }

    },

};

// Function to clear search results
function clearSearch() {
    $todaysWeather.empty()      //Remove the appended elements from the first day section
    $forecasts.empty();         //Remove the appended elements from the forecast section

}

// Click function for displaying the search results and history
$("button").on("click", function (event) {

    event.preventDefault();    //Prevent the page from reloading on form submit.

    clearSearch()     //Clear the results of the previous search from 

    let searchWeather = weatherSearch.buidUrl();  // Build the query URL for the ajax request to the weather API


    let searchResults = "";         //Empty string variable for search results

    let searchTerm = $("#search-input").val().trim();       //Variable for inputted information
    searchResults += searchTerm;                            //Add user input to the empty string

    $("#history").append(
        `<button type=submit class=search-history>${searchResults}</button>`        //Create button for search history
    )

    searchTerm = "";

    // //To Check and show previous results in search-form div
    // if (localStorage.getItem("history") != null) {
    //   let historyTmp = localStorage.getItem("history");
    //   let searchResults = historyTmp.split('|');
    //   $('#history').empty();
    //   for (let i = 0; i < oldhistoryarray.length; i++) {
    //     $('#history').append('<p>' + oldhistoryarray[i] + '</p>');
    //   }
    // }
    //Storing New result in previous History localstorage
    // else {
    //   let historyTmp = $("#search-input").val().trim();
    //   localStorage.setItem("history", historyTmp);
    // }

    $.ajax({
        url: searchWeather,
        method: "GET"
    })
});

$(".search-history").on("click", function (event) {

    event.preventDefault;

    let buttonValue = $(".search-history").val().trim();

    console.log(buttonValue);
    // $("#search-input").append(buttonValue)

});
