const search = document.getElementById('search'),
submit = document.getElementById('submit'),
mealsEle = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealsEle = document.getElementById('single-meal');

function searchMeal(e){
    e.preventDefault();
    resultHeading.innerHTML="";
    const keyword = search.value;
    console.log(keyword);
    if(keyword.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then((resp) => resp.json())
        .then(data => {
            resultHeading.innerHTML=`<h2>Search results for '${keyword}' </h2>` ;
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
              } else {
                mealsEle.innerHTML = data.meals
                  .map(
                    (meal) => `
                  <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3></div>
                  </div>`
                  )
                  .join("");
              }
            });
          search.value = "";
        } else {
          alert("Please enter a search term");
        }
      }

submit.addEventListener('submit', searchMeal)