const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

const postData = (formData) => {
  return fetch(`http://localhost:3001/api/v1/users`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) { 
      throw new Error('Unable to add to pantry')
    } else { 
      return response.json()
    }
  })
  .catch(error => console.log(error))
}

const userData = getData('users');
const recipeData = getData('recipes');
const ingredientData = getData('ingredients');

let apiCalls = Promise.all([userData, recipeData, ingredientData, postData, getData]);

export default apiCalls;
