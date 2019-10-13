
const searchText = document.querySelector(".search-text");
const searchButton = document.querySelector(".search-button");
const recipeResults = document.querySelector(".recipe-results");

searchButton.addEventListener("click", search);

function search() {

    recipeResults.innerHTML = '<p class="loading">Searching...</p>';

    const searchValue = searchText.value;

    const baseUrl = "https://edamam-recipe-search.p.rapidapi.com/search?q=";
    const url = baseUrl + searchValue + "&r=" + searchValue;

    fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
            "x-rapidapi-key": "f1f6bf4f35msh6bce51834ab65fep1142d8jsne932f1fff042"
        }
    }) 
    .then(function(response) {
        return response.json();
    })
    .then(json => {
        displayResults(json);
        console.log(json);

    })
    .catch(err => {
        console.log(err);
    });
}



function displayResults(json) {

    recipeResults.innerHTML = "";

    var recipeArray = json.hits

    if(recipeArray.length === 0) {
        recipeResults.innerHTML = '<p class="no-results">There are no results</p>';
        return;
    }

    for(var i = 0; i < recipeArray.length; i++) {


        recipeResults.innerHTML += '<h3 class="recipe-heading">' + recipeArray[i].recipe.label + '</h3>';
        recipeResults.innerHTML += '<img src="' + recipeArray[i].recipe.image + '" />';
    }

}

