// Get a reference to the "container" element
var container = document.getElementById("container");

// Create a new URLSearchParams object and get the "id" query parameter from the URL
const params = new URLSearchParams(location.search);
const id = params.get("id");

let fvrtBtn = document.getElementById("fvrtBtn"); // Get a reference to the "fvrtBtn" element

// Fetch data from the API using the meal ID as a query parameter
fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
  .then((res) => res.json()) // Convert the response to JSON format
  .then((data) => showDetails(data)); // Pass the JSON data to the showDetails() function

// Function to show the meal data on the page
const showDetails = (data) => {
  //first I am checking whether the selected meal is already in my favourite list
  // If yes-- Then I am changing button text to  Remove from favourite
  //else Add to favourite
  if (localStorage.getItem(id)) {
    fvrtBtn.innerHTML = "Remove from favourite";
  } else {
    fvrtBtn.innerHTML = "Add to favourite";
  }
  // Getting data from json
  let imgLink = data.meals[0].strMealThumb;
  let name = data.meals[0].strMeal;
  let strCategory = data.meals[0].strCategory;
  let tags = data.meals[0].strTags;
  let instructionsData = data.meals[0].strInstructions;
  let areaData = data.meals[0].strArea;
  let ytData = data.meals[0].strYoutube;
  let srcData = data.meals[0].strSource;

  //There are max 20 strIngredient and strMeasure so creating a loop to concatinate all those.\
  //To display Ingredients + Measures as Cumin seeds(1/2 tsp)
  //here Cumin seeds is strIngredient
  // and (1/2 tsp) is the strMeasure

  let ingPlusMeasure = "";

  for (let i = 1; i < 21; i++) {
    let tempIng = data.meals[0][`strIngredient${i}`];
    let tempMeasure = data.meals[0][`strMeasure${i}`];
    if (tempIng != "" && tempIng !== null) {
      ingPlusMeasure += tempIng + "(";
    }
    if (tempMeasure != "" && tempMeasure !== null && tempMeasure != " ") {
      ingPlusMeasure += tempMeasure + "), ";
    }
  }

  //Set page title
  var title = document.getElementById("title");
  title.innerHTML = name;

  //Creating img tag for image
  var img = document.createElement("img");
  img.src = imgLink;

  // Create a p element
  var category = document.createElement("p");
  category.innerHTML = "<strong>Category: </strong> " + strCategory;

  // Create a p element
  var tagele = document.createElement("p");
  if (tags != null) {
    tagele.innerHTML = "<strong>Tags: </strong>: " + tags;
  } else {
    tagele.innerHTML = "";
  }

  // Create a new "p" element for the instructions
  var instructions = document.createElement("p");

  // Modify the instructions data by replacing periods with periods followed by line breaks
  instructionsData = instructionsData.split(". ").join(".<br>");
  // Set the inner HTML of the instructions element to include the instructions data with a heading
  instructions.innerHTML =
    "<strong>Instructions </strong>: <br> " + instructionsData;

  // Create a new "p" element for the ingredients and measures
  var Ingredient = document.createElement("p");
  // Remove any trailing whitespace from the ingredients and measures string and remove the last character (a comma)
  ingPlusMeasure = ingPlusMeasure.trim().slice(0, -1);
  // Set the inner HTML of the Ingredient element to include the ingredients and measures data with a heading
  Ingredient.innerHTML =
    "<strong>Ingredients + Measures: </strong>: " + ingPlusMeasure;

  // Create a p element
  var area = document.createElement("p");

  area.innerHTML = "<strong>Area: </strong>: " + areaData;

  // Create a p element
  var youtube = document.createElement("p");

  // Set the inner HTML of the YouTube element to include a link to the YouTube source with a heading
  youtube.innerHTML =
    "<strong>Youtube: </strong>: " + `<a href=${ytData}>Go to YT source</a>`;

  // Create a p element
  var mainSrc = document.createElement("p");

  // If the main source data is not null
  if (srcData != null)
    // Set the inner HTML of the main source element to include a link to the main source page with a heading
    mainSrc.innerHTML =
      "<strong>Source: </strong>: " +
      `<a href=${srcData}>Go to source page</a>`;

  const imgdiv = document.createElement("div");
  imgdiv.className = "img-div";
  imgdiv.appendChild(img);

  const shortDesc = document.createElement("div");
  shortDesc.className = "short-desc";
  // Append the category, tags, ingredients and measures, area, YouTube, and main source elements to the short description div element
  shortDesc.appendChild(category);
  shortDesc.appendChild(tagele);
  shortDesc.appendChild(Ingredient);
  shortDesc.appendChild(area);
  shortDesc.appendChild(youtube);
  shortDesc.appendChild(mainSrc);

  const longDesc = document.createElement("div");
  longDesc.className = "long-desc";
  longDesc.appendChild(instructions);

  container.appendChild(imgdiv);
  container.appendChild(shortDesc);
  container.appendChild(longDesc);
};

//When user click on Add to favourite btn this function will be called
//Here I am checking if the selected item is in fvrt list
// If yes-- Then I am removing the item from fvrt list and changing the text to Add to favourite
//else setting the item to localstorage and changing the text to Remove from favourite
function addtofvrt() {
  if (!localStorage.getItem(id)) {
    fvrtBtn.innerHTML = "Remove from favourite";
    localStorage.setItem(id, id);
  } else {
    fvrtBtn.innerHTML = "Add to favourite";
    localStorage.removeItem(id, id);
  }
}
