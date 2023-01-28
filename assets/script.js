// Create an object for the api key 
let searchResults = {};
//Create a function for buiding the url
let apiKey = "3703dc0a87a12ecb40acb1b87b0e9d16";
function buidUrl() {
    let initialUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
    let q = $("#search-input").val().trim();
    console.log("---------------\nURL: " + initialUrl + "\n---------------");

    //https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3703dc0a87a12ecb40acb1b87b0e9d16
    fetch(initialUrl + q + "&limit=5&appid=" + apiKey)
        .then(response => response.json())
        .then(citiesFound => {
            for (let i = 0; i < citiesFound.length; i++) {
                const city = citiesFound[i];

                console.log(citiesFound);
                // let city1 = citiesFound[i];
                // console.log(city.lat);
                // console.log(city.lon);
                //https://api.openweathermap.org/data/2.5/forecast?lat=35.6828387&lon=${city.lon}&appid=${apiKey}
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)
            }
        })

        .then((response) => response.json())
        .then((data) => {
            searchResults = data;
            // console.log(searchResults);
            // searchResults.push(results)
        })


}

//Function to display results on the webpage
function updatePage() {
    let data = buidUrl(data);
    console.log(data)
    let todaysWeather = $("#today");
    let forecast = $("#forecast")();

    // temp1.city.name
    // temp1.list[0].dt_txt
    // temp1.list[0].main.temp
    // temp1.list[0].wind.speed
    // temp1.list[0].main.humidity
    // console.log(results);
}

//Grab the value from the button rather than the input
//use event delegation (event.target.textContent) to grab the text of the city
//use icons from the fetch data

//Fetch for when the button is clicked
//Create a function to use the search button on click
$("#search-button").on("click", function (event) {

    event.preventDefault();    //Prevent the page from reloading on form submit.

    let searchWeather = buidUrl();  // Build the query URL for the ajax request to the weather API

    // Make the AJAX request to the API - GETs the JSON data at the buidUrl.
    $.ajax({
        url: searchWeather,
        method: "GET"
    })//.then(weatherDisplay);  // The data then gets passed as an argument to the weatherDisplay function
});

//  .on("click") function associated with the clear button
// $("#clear-all").on("click", clear);
// console.log(searchResults);

// renderSearch();

// let searchTerm = $("#search-button")

// searchTerm.addEventListener("click", function (event) {


//     // onclick = 'document.getElementById("demo").innerHTML = "New content!"
//     if (event.target.matches("button")) {
//         let city = event.target.textContent;
//         console.log(city);
//     }
// })