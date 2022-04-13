const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json())
    .catch(err => console.log(error))
}
//add post here


const userData = getData('users');
const recipeData = getData('recipes');
const ingredientData = getData('ingredients');

let apiCalls = Promise.all([userData, recipeData, ingredientData])

export default apiCalls;
