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
