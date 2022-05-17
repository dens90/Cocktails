let searchCocktail = document.getElementById("ricerca");
let bodyCocktail = document.getElementById("body-card");
let btnIngredients = document.getElementById("showIngredients");
const result = document.getElementById("ingredients");

async function searchCocktails() {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktail.value}`
    );
    const waitResponse = await response.json();
    console.log(waitResponse);
    return waitResponse;
  } catch (error) {
    console.log(error);
  }
}

let btn = document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  let results = document.querySelectorAll(".outputCocktail");
  results ? results.forEach((res) => res.remove()) : false;

  searchCocktails().then((data) => {
    const sliced = data.drinks.slice(0, 3);
    sliced.map((drink) => {
      let div = document.createElement("div");
      div.classList.add("outputCocktail");
      div.setAttribute("id", "outputCocktail");
      div.innerHTML = `
        <div class="resultCocktail">${drink.strDrink}</div>
        `;
      bodyCocktail.appendChild(div);

      getElements(drink);
    });
  });
});

const arr = [];

function getElements(cocktail) {
  let results = document.querySelectorAll(".resultCocktail");

  results.forEach((item) =>
    item.addEventListener("click", (e) => {
      if (item.innerText === cocktail.strDrink) {
        let ingredients = document.getElementById("ingredients");
        const contentIngredients = document.getElementById(
          "content-ingredients"
        );
        clearIngredients(contentIngredients);
        let arr = [
          cocktail.strIngredient1,
          cocktail.strIngredient2,
          cocktail.strIngredient3,
          cocktail.strIngredient4,
          cocktail.strIngredient5,
          cocktail.strIngredient6,
          cocktail.strIngredient7,
          cocktail.strIngredient8,
          cocktail.strIngredient9,
          cocktail.strIngredient10,
          cocktail.strIngredient11,
          cocktail.strIngredient12,
          cocktail.strIngredient13,
          cocktail.strIngredient14,
          cocktail.strIngredient15,
        ];

        ingredients.innerHTML += `
        <div id="content-ingredients">
    <h1>${cocktail.strDrink}</h1>
    <p>${cocktail.strInstructionsIT}</p>
    <h1>Ingredienti</h1>
    
    </div>
    `;
        populateIngredients(arr);
      }
    })
  );
}

function populateIngredients(arr) {
  const composeIngredient = arr.filter((item) => typeof item === "string");
  const allIngredients = document.querySelectorAll(".ingredient");
  deleteOldItems(allIngredients);
  composeIngredient.map((item) => {
    console.log(item);
    let div = document.createElement("div");
    div.setAttribute("class", "ingredient");
    div.innerHTML = item;
    result.appendChild(div);
  });
}

const clearIngredients = (element) => {
  element ? element.remove() : false;
};
const deleteOldItems = (element) => {
  element.forEach((el) => {
    el.remove();
  });
};
