// Get a reference to the "container" element
var container = document.getElementById("container");
// Add an event listener for the "load" event to the window object
window.onload = function () {
  // Loop through all the keys in local storage
  for (let key in localStorage) {
    if (!isNaN(parseInt(key))) {
      // If the key is a number (the meal ID)
      console.log(key);

      fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + key) // Fetch data from the API using the meal ID as a query parameter
        .then((res) => res.json()) // Convert the response to JSON format
        .then((data) => showContent(data)); // Pass the JSON data to the showContent() function
    } //end if
  }
};

// Function to show the meal data on the page
const showContent = (data) => {
  // Get the values for the meal image, name, and tags
  let imgLink = data.meals[0].strMealThumb;
  let desc = data.meals[0].strMeal;
  let tags = data.meals[0].strTags;

  // Create an img element
  var img = document.createElement("img");
  img.src = imgLink;

  // Create a p element for the meal name
  var desciption = document.createElement("p");
  desciption.innerHTML = desc;

  // Create a p element for the tags
  var tagele = document.createElement("p");
  if (tags != null) {
    // If there are tags for the meal

    tagele.innerHTML = "Tags: " + tags;
  } else {
    // If there are no tags for the meal
    tagele.innerHTML = "No Tags";
  }

  // Create a div element for the card
  const card = document.createElement("div");
  card.className = "Cards";

  // Create a div element for the info
  const info = document.createElement("div");
  info.className = "info";

  // Create a span element for the remove button
  const remove = document.createElement("span");
  remove.className = "remove";

  // Set the content of the span element to an SVG image of a remove button
  remove.innerHTML = '<img src="./assests/remove.svg" alt="My SVG Image">';

  // Append the elements to the document
  card.appendChild(img);
  card.appendChild(info);

  info.appendChild(desciption);
  info.appendChild(tagele);
  info.appendChild(remove);

  container.appendChild(card);

  // Add an event listener for the "click" event to the "remove" element
  remove.addEventListener("click", function () {
    localStorage.removeItem(data.meals[0].idMeal); // Remove the meal from local storage using its ID as the key

    card.remove();
  });

  // Add an event listener for the "click" event to the "img" element
  img.addEventListener("click", function () {
    // Navigate to the details page for the meal using its ID as a query parameter in the URL
    window.location.href = "./detailsPage.html?id=" + data.meals[0].idMeal;
  });
};
