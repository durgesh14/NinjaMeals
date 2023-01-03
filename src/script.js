function searchFunction() {
    // Get the value of the search field
    var searchValue = document.getElementById("search").value;
    console.log( document.querySelector(".meal"));

    while(document.querySelector(".meal")){
        var div = document.querySelector(".meal");  // Get the div element
        var parent = div.parentNode;  // Get the parent element of the div
        parent.removeChild(div);
      }
  
 //console.log( document.querySelector("meal"));
    // Do something with the search value (e.g. send an AJAX request to a server)
    // ...

  //  fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + searchValue)
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchValue)
    .then(res=>res.json())
    .then(data=> searchResults(data))
    .catch(error => {
        console.error(error);  // Log the error to the console
      });
    
    
    
    const searchResults = (data) =>{
        console.log(data);
        if(data.meals == null){
            alert("No search found!!")
            
        }else{
    const itemsdiv = document.getElementById('item-list');
    
    
    data.meals.forEach(meal=>{
    
        const food = document.createElement('div');
    
        food.className = 'meal';
        const foodName = `<h3>${meal.strMeal}</h3>`;
        food.innerHTML = foodName;
        itemsdiv.appendChild(food);
    });
    }
  }
}


