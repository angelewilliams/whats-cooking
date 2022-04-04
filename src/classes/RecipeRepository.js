import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeData, ingredientData) {
    this.allRecipes = this.addRecipes(recipeData, ingredientData);
    this.tags = this.getTags(recipeData);
  };

  addRecipes(recipeData, ingredientData) {
    return recipeData.map((data) => {
      return new Recipe(data, ingredientData);
    });
  };

  getTags(recipeData) {
    return recipeData.reduce((acc, recipe) => {
      recipe.tags.forEach((tag) => {
        if(!acc.includes(tag)) {
          acc.push(tag);
    };
      });
      return acc;
    },[]);
  };

  filterByTag(tag){
   return this.allRecipes.filter((recipe) => {
     return recipe.tags.includes(tag);
   });
  };

  filterByName(inputName){
    return this.allRecipes.filter((recipe) => {
    let output = true
     inputName.toLowerCase().split(' ').forEach((input) => {
        if(!recipe.name.toLowerCase().split(' ').includes(input)) {
          output = false
        }
      })
      return output
    });
  };
};
export default RecipeRepository;
