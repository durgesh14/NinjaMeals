var container = document.getElementById("container");
const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
  .then((res) => res.json()) // Convert the response to JSON format
  .then((data) => showDetails(data)); // Pass the JSON data to the showDetails() function

const showDetails = (data) => {
    // Getting data from json
  let imgLink = data.meals[0].strMealThumb;
  let name = data.meals[0].strMeal;
  let tags = data.meals[0].strTags;
  let instructionsData = data.meals[0].strInstructions;
  let areaData = data.meals[0].strArea;
  let ytData = data.meals[0].strYoutube;
  let instaData = data.meals[0].strSource;
  

  //There are max 20 strIngredient so creating aloop to concatinate all those.
  let strIngredient = "";
  for(let i=1; i<21;i++){
    let tempIng = data.meals[0][`strIngredient${i}`]
    if(tempIng != "" && tempIng !==  null){
     
      strIngredient += tempIng+", ";
    }
    
  }

  let strMeasure = "";
  for(let i=1; i<21;i++){
    let tempMeasure = data.meals[0][`strMeasure${i}`]
    if(tempMeasure != "" && tempMeasure !==  null && tempMeasure != " "){
     
      strMeasure += tempMeasure+", ";
    }
    
  }
  

  //Creating img tag for image
  var img = document.createElement("img");
  img.src = imgLink;

  // Create a p element
  var MealName = document.createElement("p");
  MealName.innerHTML = "<strong>Dish: </strong> "+ name;

  // Create a p element
  var tagele = document.createElement("p");
  if (tags != null) {
    tagele.innerHTML = "<strong>Tags: </strong>: " + tags;
  } else {
    tagele.innerHTML = "";
  }

// Create a p element
  var instructions = document.createElement("p");
  instructions.innerHTML = "<strong>Instructions: </strong>: "+instructionsData;


 // Create a p element
 var Ingredient = document.createElement("p");
 strIngredient = strIngredient.trim().slice(0, -1);
 Ingredient.innerHTML = "<strong>Ingredients: </strong>: " +strIngredient;

 // Create a p element
 var area = document.createElement("p");
 
 area.innerHTML = "<strong>Area: </strong>: " +areaData;


 // Create a p element
 var youtube = document.createElement("p");
 
 youtube.innerHTML = "<strong>Youtube: </strong>: " +`<a href=${ytData}>Go to YT source</a>`;


 // Create a p element
 var insta = document.createElement("p");
 
 if(instaData != null)
 insta.innerHTML = "<strong>Instagram: </strong>: " +`<a href=${instaData}>Go to Instagram source</a>`;


 // Create a p element
 var measure = document.createElement("p");
 strMeasure = strMeasure.trim().slice(0, -1);
 measure.innerHTML = "<strong>Measures: </strong>: " +strMeasure;


  const imgdiv = document.createElement("div");
  imgdiv.className = "img-div";
  imgdiv.appendChild(img);

  const shortDesc = document.createElement("div");
  shortDesc.className = "short-desc";
  shortDesc.appendChild(MealName);
  shortDesc.appendChild(tagele);
  shortDesc.appendChild(Ingredient);
  shortDesc.appendChild(area);
  shortDesc.appendChild(youtube);
  shortDesc.appendChild(insta);
  shortDesc.appendChild(measure);

  const longDesc = document.createElement("div");
  longDesc.className = "long-desc";
  longDesc.appendChild(instructions);


  container.appendChild(imgdiv);
  container.appendChild(shortDesc);
  container.appendChild(longDesc);
  
};
