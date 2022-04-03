import Ingredient from './Ingredient';
import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeData, ingredientData) {
    this.allRecipes = this.addRecipes(recipeData, ingredientData);
    this.tags = [];
  }

  addRecipes(recipeData, ingredientData) {
    return recipeData.map((data) => {
      return new Recipe(data, ingredientData)
    })
  }

  getTags() {
    this.tags = recipeData.reduce((acc, recipe) => {
      recipe.tags.forEach((tag) => {
        if(!acc.includes(tag)) {
          acc.push(tag)
    }
      })
      return acc
    },[])
  }

  filterByTag(tag){
   return this.allRecipes.filter((recipe) => {
     return recipe.tags.includes(tag);
   });
  }

  filterByName(recipeName){
    return this.allRecipes.filter((recipe) => {
      return recipe.name.includes(recipeName);
    });
  }
}
export default RecipeRepository;
