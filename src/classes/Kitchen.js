class Kitchen {
  constructor (pantry) {
    this.pantry = pantry;
    this.groceryList;
    this.currentRecipe;
  }

  checkPantry (recipe) {
    this.currentRecipe = recipe
    this.currentRecipe.canCook = false
        this.groceryList = recipe.ingredientsInfo.filter((ingredient) => {
        let output = true;
        this.pantry.forEach((pantryIngredient) => {
          if(pantryIngredient.ingredient === ingredient.id  && pantryIngredient.amount >= ingredient.quantity.amount){
            output = false;
          }
        })
        return output;
      })
      if(!this.groceryList.length){
        this.currentRecipe.canCook = true
        return `You are ready to cook ${recipe.name}!`
      }
      this.currentRecipe.canCook = false
      console.log( this.currentRecipe.canCook)
      return `It looks like you need the following ingredients to make ${recipe.name}: `
  }

  updateAmountToBuy() {
    this.groceryList = this.groceryList.map((groceryListItem) => {
      this.pantry.forEach((pantryItem) => {
        if(pantryItem.ingredient === groceryListItem.id){
          groceryListItem.quantity.amount -= pantryItem.amount
        }
      })
      return groceryListItem
    })
  }

  addToPantry() {
  // As a user, I should be able to add more ingredients to my pantry
  // from form input most likely also needs to translate into a POST to get added/update to the user API
  //We will want to return an object that we can use as the formData to use in our POST request

  }

  cookRecipe(){
  //As a user, when I cook a meal, those ingredients should be removed from my pantry
  //input: recipe ingredients and amounts AND pantry ingredient amounts
  // will also need to remove the ingredient from the user API
  //

  }

  getIngredientNames(ingredientData) {
		return this.pantry.map((ingredient) => {
      let output;
			ingredientData.forEach((dataPoint) => {
				if(dataPoint.id === ingredient.ingredient) {
					output = {id: dataPoint.id, name: dataPoint.name, amount: ingredient.amount}
				}
			});
			return output;
		});
	};

  getGroceryNames(ingredientData) {
		this.groceryList = this.groceryList.map((ingredient) => {
      let output;
			ingredientData.forEach((dataPoint) => {
				if(dataPoint.id === ingredient.id) {
					output = {id: dataPoint.id, name: dataPoint.name, amount: ingredient.quantity.amount}
				}
			});
			return output;
		});
	};

};





    export default Kitchen;
