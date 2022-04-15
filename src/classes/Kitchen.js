class Kitchen {
  constructor (pantry) {
    this.pantry = pantry;
    this.groceryList;
  }

  checkPantry (recipe) {
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
        return 'You are ready to cook!'
      }
      return 'It looks like you still need to pick up some items--We will put a grocery list together for you.'
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

}

    export default Kitchen;
