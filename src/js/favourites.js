var container = document.getElementById("container");

window.onload = function () {
  // Get data from local storage
  for (let key in localStorage) {
    if (!isNaN(parseInt(key))) {
      console.log(key);

      fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + key)
        .then((res) => res.json()) // Convert the response to JSON format
        .then((data) => showContent(data)); // Pass the JSON data to the showContent() function
    } //end if


  }
};

const showContent = (data) => {
  console.log(data.meals[0].strMeal);
  let imgLink = data.meals[0].strMealThumb;
  let desc = data.meals[0].strMeal;
  let tags = data.meals[0].strTags;

  // Create an img element
  var img = document.createElement("img");
  img.src = imgLink;

  // Create a p element
  var desciption = document.createElement("p");
  desciption.innerHTML = desc;

  // Create a p element
  var tagele = document.createElement("p");
  if (tags != null) {
    tagele.innerHTML = "Tags: " + tags;
  } else {
    tagele.innerHTML = "No Tags";
  }

  const card = document.createElement("div");
  card.className = "Cards";

  const info = document.createElement("div");
  info.className = "info";

  const remove = document.createElement("span");
  remove.className = "remove";

  remove.innerHTML = '<img src="./assests/remove.svg" alt="My SVG Image">';

  // Append the elements to the document
  card.appendChild(img);
  card.appendChild(info);

  info.appendChild(desciption);
  info.appendChild(tagele);
  info.appendChild(remove);

  container.appendChild(card);

  remove.addEventListener('click', function(){
    localStorage.removeItem(data.meals[0].idMeal);
    card.remove();
  });


  //Event listner on the meal image
  img.addEventListener('click', function(){
    window.location.href = './detailsPage.html?id='+data.meals[0].idMeal;
  });
  
};
