function searchFunction() {
  // Get the element where the meals will be displayed
  var itemsdiv = document.getElementById("item-list");

  // Get the value of the search field
  var searchValue = document.getElementById("search").value;

  //Loop to remove the list items to only show relevant search result.
  while (document.querySelector(".meal")) {
    var div = document.querySelector(".meal"); // Get the div element
    var parent = div.parentNode; // Get the parent element of the div
    parent.removeChild(div);
  }
  // To remove the results when nothing is present in input field
  if (searchValue.length == 0) {
    itemsdiv.removeChild(div);
  }

  // The fetch() function returns a Promise that resolves with the response from the server
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchValue)
    .then((res) => res.json()) // Convert the response to JSON format
    .then((data) => searchResults(data)) // Pass the JSON data to the searchResults() function
    .catch((error) => {
      console.error(error); // Log the error to the console
    });

  // The searchResults() function takes a list of data(All the meals) and displays them on the page
  const searchResults = (data) => {
    if (data.meals == null) {
      //Check if searched meal is not found
      alert("No search found!!");
    } else {
      //If meal is found

      // Loop through the list of meals
      data.meals.forEach((meal) => {
        // Create a new 'div' element for the meal
        const food = document.createElement("div");
        const favourite = document.createElement("button");

        food.className = "meal meal-div"; // Add a class name to the div element
        favourite.className = "meal fvrt-btn button";

        const foodName = `<h3>${meal.strMeal}</h3>`; // Create the HTML content for the meal
        food.innerHTML = foodName; // Set the inner HTML of the div element to the HTML content
        if (!localStorage.getItem(meal.idMeal))
          favourite.innerHTML = "Add to favourite";
        else {
          favourite.innerHTML = "Remove from favourite";
        }
        itemsdiv.appendChild(food); // Append the div element to the itemsdiv element
        itemsdiv.appendChild(favourite);

        // Add an event listener for the "click" event to the "favourite" element
        favourite.addEventListener("click", (event) => {
          // If the meal with the specified ID does not exist in local storage
          if (!localStorage.getItem(meal.idMeal)) {
            // Change the text of the "favourite" element to "Remove from favorite"
            favourite.innerHTML = "Remove from favourite";
            // Add the meal to local storage with the ID as the key and the meal name as the value
            localStorage.setItem(meal.idMeal, meal.strMeal);
          }
          // If the meal with the specified ID does exist in local storage
          else {
            // Change the text of the "favourite" element to "Add to favorite"
            favourite.innerHTML = "Add to favourite";
            // Remove the meal from local storage
            localStorage.removeItem(meal.idMeal);
          }
        });

        //Event listner on the meal name
        food.addEventListener("click", function () {
          window.location.href = "./detailsPage.html?id=" + meal.idMeal;
        });
        //});
      });
    }
  };
}
