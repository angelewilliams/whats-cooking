

class Kitchen {
  constructor (pantry) {
    this.pantry = pantry;
    this.groceryList;
//     this.uniqueIngredients =  ;
  }

  checkPantry (recipe) {
        this.groceryList =  recipe.ingredientsInfo.filter((ingredient) => {
        let output = true;
        this.pantry.forEach((pantryIngredient) => {
          if(pantryIngredient.ingredient === ingredient.id  && pantryIngredient.amount > ingredient.quantity.amount){
            output = false;
          }
        })
        return output
      })
      return this.groceryList
  }
}

// unique ingredients = ingredientsData
// make those instances of our ingredients
//	collectIngredients(ingredientData) {
	// 	return this.ingredientsInfo.map((ingredient) => {
	// 		ingredientData.forEach((dataPoint) => {
	// 			if(dataPoint.id === ingredient.id) {
	// 				ingredient = new Ingredient(dataPoint);
	// 			};
	// 		});
	// 		return ingredient;
	// 	});
	// };


 // ingredients data set :
  //   {
   //   "id": 18372,
   //   "name": "bicarbonate of soda",
   //   "estimatedCostInCents": 582
   // },

   //  recipe data set in ingredients array :
   //          {
             //   "id": 20081,
             //   "quantity": {
             //     "amount": 1.5,
             //     "unit": "c"
             //   }
             // },

    // user data set in pantry array:
    // {
    //   "ingredient": 14412,
    //   "amount": 3
    // }

    export default Kitchen;