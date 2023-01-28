// Create an object for the api key 

//Create a function for buiding the url
function buidUrl() {
    let initialUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
    let apiKey = "3703dc0a87a12ecb40acb1b87b0e9d16";
    let q = $("#search-input").val().trim();
    console.log("---------------\nURL: " + initialUrl + "\n---------------");

    //https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3703dc0a87a12ecb40acb1b87b0e9d16
    fetch(initialUrl + q + "&limit=6&appid=" + apiKey)
        .then(response => response.json())
        .then(citiesFound => {
            console.log(citiesFound);
            let city = citiesFound[0];
            console.log(city.lat);
            console.log(city.lon);

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}api`)
        })

        .then(response => response.json())
        .then(results => {
            let thisResults = results[0]
            console.log(thisResults);
            // searchResults.push(results)
        })
}
//Fetch for when the button is clicked
//Grab the value from the button rather than the input
//use event delegation (event.target.textContent) to grab the text of the city
//use icons from the fetch data

//Create a function to use the search button on click
$("#search-button").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the articles
    // clear();

    // Build the query URL for the ajax request to the NYT API
    var searchWeather = buidUrl();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: searchWeather,
        method: "GET"
    }).then();
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