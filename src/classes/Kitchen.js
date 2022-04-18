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

  addToPantry() {
    let pantryIds = this.pantry.map((item) => {
      return item.ingredient
    })

    let groceryListIds = this.groceryList.map((item) => {
      return item.id
    })

    groceryListIds.forEach((ingredientId) => {
      if(pantryIds.includes(ingredientId)) {
        let output = this.groceryList.find((ingredient) => ingredient.id === ingredientId)
        this.pantry.forEach((item) => {
          if(item.ingredient === ingredientId) {
            item.amount += output.quantity.amount
          }
        })
      } else {
        this.groceryList.forEach((ingredient) => {
          if(ingredient.id === ingredientId) {
            this.pantry.push({ingredient: ingredient.id, amount: ingredient.quantity.amount})
          }
        })
      }
    })
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
		return this.groceryList.map((ingredient) => {
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
