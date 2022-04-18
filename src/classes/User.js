import Kitchen from './Kitchen'

class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.kitchen = new Kitchen(userData.pantry);
    this.viewingSavedRecipe = false;
    this.viewingKitchen = false;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  favoriteARecipe(recipe) {
    recipe.saved = true;
    if(!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    };
  };

  removeFavoriteRecipe(recipe) {
    recipe.saved = false;
    this.favoriteRecipes.forEach((favoriteRecipe, i) => {
      if(favoriteRecipe === recipe){
        this.favoriteRecipes.splice(i, 1);
      };
    });
  };

  addRecipeToCook(recipe) {
    recipe.wantToCook = true;
    if(!this.recipesToCook.includes(recipe)){
      this.recipesToCook.push(recipe);
    };
  };

  removeRecipeFromCookList(recipe){
    recipe.wantToCook = false;
    this.recipesToCook.forEach((recipeToCook, i) => {
      if(recipeToCook === recipe){
        this.recipesToCook.splice(i, 1);
      };
    });
  };

  filterFavsByTag(tag) {
   return this.favoriteRecipes.filter((favoriteRecipe) => {
     return favoriteRecipe.tags.includes(tag);
   });
  };

  filterFavsByName(inputName){
    return this.favoriteRecipes.filter((recipe) => {
        let output = true
        inputName.toLowerCase().split(' ').forEach((input) => {
            if(!recipe.name.toLowerCase().includes(input)) {
              output = false
            }
          })
          return output
        });
      };
  };


export default User;
