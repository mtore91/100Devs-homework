//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getNameURL)
let drinkArray = []
function getNameURL(){
  let name = document.querySelector('input').value
  
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      for(let x = 0; x < data.drinks.length; x++) {
        drinkArray.push(data.drinks[x])
      }
      console.log(data.drinks[0])
      document.querySelector('h2').innerText=data.drinks[0].strDrink
      document.querySelector('img').src=data.drinks[0].strDrinkThumb
      document.querySelector('p').innerText=data.drinks[0].strInstructions

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
    start()
  }

  function showDrink() {
    document.querySelector("h2").innerText = drinkArray[i].strDrink
    document.querySelector("img").src = drinkArray[i].strDrinkThumb
    document.querySelector("p").innerText = drinkArray[i].strInstructions 
    i++
  }

  let intervalID

let i = 1

function start() {
  intervalID = setInterval(showDrink, 5000);
}



