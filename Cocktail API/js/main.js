//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getNameURL)

function getNameURL(){
  let name = document.querySelector('input').value
   
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks[0])
      document.querySelector('h2').innerText=data.drinks[0].strDrink
      document.querySelector('img').src=data.drinks[0].strDrinkThumb
      document.querySelector('p').innerText=data.drinks[0].strInstructions
      console.log(Array.from(data.drinks[0].strIngredient))
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
  }
