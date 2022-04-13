

class Kitchen {
  constructor (pantry) {
    this.pantry = pantry;
//     this.uniqueIngredients =  ;
  }

  checkPantry (recipe) {
      recipe.ingredientsInfo.reduce((acc, ingredient) => {

      }, [])
    //iterate through recipe ingredients
      //for each ingredient, iterate through pantry and see if kitchen 
      //has enough to make recipe (check if pantry nuber is bigger than recipe number)
      //if it fails, add that ingredient to return, if it gets to the end, return nothing
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