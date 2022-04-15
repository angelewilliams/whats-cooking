const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json())
    .catch(err => console.log(error))
}
//add post here

const postData = (fetchAPI, formData) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Please fill out all fields./ OR that is not an available ingredient');
    return response.json()
  })
  .catch(error => console.log(error))
}


const userData = getData('users');
const recipeData = getData('recipes');
const ingredientData = getData('ingredients');

let apiCalls = Promise.all([userData, recipeData, ingredientData])

export default apiCalls;
