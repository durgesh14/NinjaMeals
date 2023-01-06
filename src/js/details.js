var container = document.getElementById("container");
const params = new URLSearchParams(location.search);
const id = params.get("id");

let fvrtBtn = document.getElementById("fvrtBtn");



fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
  .then((res) => res.json()) // Convert the response to JSON format
  .then((data) => showDetails(data)); // Pass the JSON data to the showDetails() function

const showDetails = (data) => {
//first I am checking whether the selected meal is already in my favourite list
// If yes-- Then I am changing button text to  Remove from favourite
//else Add to favourite
  if(localStorage.getItem(id)){
    fvrtBtn.innerHTML = "Remove from favourite";
   
   }
   
   else{
       
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
  

  //There are max 20 strIngredient so creating aloop to concatinate all those.
 
  let ingPlusMeasure = "";

  for(let i=1; i<21;i++){
     
    let tempIng = data.meals[0][`strIngredient${i}`]
    let tempMeasure = data.meals[0][`strMeasure${i}`]
    if(tempIng != "" && tempIng !==  null){
     
    
      ingPlusMeasure +=tempIng +"(";
    }
    if(tempMeasure != "" && tempMeasure !==  null && tempMeasure != " "){
     

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
  category.innerHTML = "<strong>Category: </strong> "+ strCategory;

  // Create a p element
  var tagele = document.createElement("p");
  if (tags != null) {
    tagele.innerHTML = "<strong>Tags: </strong>: " + tags;
  } else {
    tagele.innerHTML = "";
  }

// Create a p element
  var instructions = document.createElement("p");
  
  instructionsData = instructionsData.split('. ').join('.<br>');
  instructions.innerHTML = "<strong>Instructions </strong>: <br> "+instructionsData;


 // Create a p element
 var Ingredient = document.createElement("p");
 ingPlusMeasure = ingPlusMeasure.trim().slice(0,-1);
 Ingredient.innerHTML = "<strong>Ingredients + Measures: </strong>: " +ingPlusMeasure;

 // Create a p element
 var area = document.createElement("p");
 
 area.innerHTML = "<strong>Area: </strong>: " +areaData;


 // Create a p element
 var youtube = document.createElement("p");
 
 youtube.innerHTML = "<strong>Youtube: </strong>: " +`<a href=${ytData}>Go to YT source</a>`;


 // Create a p element
 var mainSrc = document.createElement("p");
 
 if(srcData != null)
 mainSrc.innerHTML = "<strong>Source: </strong>: " +`<a href=${srcData}>Go to source page</a>`;



  const imgdiv = document.createElement("div");
  imgdiv.className = "img-div";
  imgdiv.appendChild(img);

  const shortDesc = document.createElement("div");
  shortDesc.className = "short-desc";
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
function addtofvrt(){

 


        if(!localStorage.getItem(id)){
          fvrtBtn.innerHTML = "Remove from favourite";
          localStorage.setItem(id, id);
         }
         
         else{
             
          fvrtBtn.innerHTML = "Add to favourite";
             localStorage.removeItem(id, id);
         }
}


