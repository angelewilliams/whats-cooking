// let domUpdates = {
// 	resetPageRender(recipeRepository, user) {
//     switch(true) {
//       case user.viewingSavedRecipe:
//       createRecipePreview(user.favoriteRecipes);
//       break
//       default:
//       createRecipePreview(recipeRepository.allRecipes);
//     }
//   },

//   saveRecipeToCook(e, recipeRepository, user){
//     let recipe = recipeRepository.allRecipes.find((recipe) => {
//       return `${recipe.id}` ===  e.target.dataset.cookid
//     });
//     if(recipe.wantToCook) {
//       user.removeRecipeFromCookList(recipe);
//       toggleToCookIcon(e, recipe);
//     } else if(!recipe.wantToCook) {
//       user.addRecipeToCook(recipe);
//       toggleToCookIcon(e, recipe);
//     }
//   },

//   identifyRecipe(e, recipeRepository, user){
//     let recipe = recipeRepository.allRecipes.find((recipe) => {
//       return `${recipe.id}` ===  e.target.dataset.saveid
//     });
//     if(recipe.saved && user.viewingSavedRecipe) {
//       user.removeFavoriteRecipe(recipe);
//       toggleSaveIcon(e, recipe);
//       createRecipePreview(user.favoriteRecipes)
//     } else if(recipe.saved && !user.viewingSavedRecipe) {
//       user.removeFavoriteRecipe(recipe);
//       toggleSaveIcon(e, recipe);
//     } else if(!recipe.saved && !user.viewingSavedRecipe) {
//       user.favoriteARecipe(recipe);
//       toggleSaveIcon(e, recipe);
//     } else if(!recipe.saved && user.viewingSavedRecipe) {
//       user.favoriteARecipe(recipe);
//       toggleSaveIcon(e, recipe);
//     };
//   },

//   toggleSaveIcon(e, recipe){
//     if(recipe.saved) {
//       e.target.src = './images/icon_banner_remove.png';
//       return
//     };
//     e.target.src = './images/icon_banner_add.png';
//   },

//   toggleToCookIcon(e, recipe){
//     if(recipe.wantToCook) {
//       e.target.src = './images/icon_fire_symbol_lit.png';
//       return;
//     };
//     e.target.src = './images/icon_fire_symbol_unlit.png';
//   },

//   togglePopUp(e) {
//     if(e.target.id === 'specificRecipe') {
//       toggleHidden(popUp);
//       toggleHidden(popUpShadow);
//     };
//   },

//   displayRecipeDetail (e, recipeRepository) {
//     if(e.target.dataset.id) {
//       var foundRecipe = recipeRepository.allRecipes.find((recipe) => {
//         return `${recipe.id}` ===  e.target.dataset.id;
//       });
//       displayPopUp(foundRecipe);
//       toggleHidden(popUpShadow);
//       toggleHidden(popUp);
//     };
//   },

// 	createRecipePreview(recipes) {
//   recipeSection.innerHTML = '';
//   recipes.forEach((recipe) => {
//     let srcCook = findCookIcon(recipe);
//     let srcSave = findSaveIcon(recipe);
//     recipeSection.innerHTML += `
//       <section class="recipe-preview" data-id="${recipe.id}">
//         <section class="recipe-heading" data-id="${recipe.id}">
//           <h3 data-id="${recipe.id}">${recipe.name}</h3>
//         </section>
//         <div data-id="${recipe.id}" class="recipe-img">
//           <img data-id="${recipe.id}" src="${recipe.img}" alt="Image of ${recipe.name}">
//         </div>
//         <section class="recipe-info" data-id="${recipe.id}">
//           <section class="tag-icon-section" data-id="${recipe.id}">
//             <div class="icons-section" data-id="${recipe.id}">
//               <img class="icon add-to-cook" src="${srcCook}" data-cookId="${recipe.id}">
//                 <img class="icon add-to-saved" id="saveIcon" src="${srcSave}" data-saveId="${recipe.id}">
//             </div>
//           </section>
//         </section>
//       </section>
//     `
//   });
// },

// findCookIcon (recipe) {
//   if (recipe.wantToCook) {
//     return './images/icon_fire_symbol_lit.png';
//   } else {
//     return './images/icon_fire_symbol_unlit.png';
//   };
// },

// findSaveIcon (recipe) {
//   if (recipe.saved) {
//     return './images/icon_banner_remove.png';
//   } else {
//     return './images/icon_banner_add.png';
//   };
// },

// displayFilteredTags(tagToFilter, user, recipeRepository) {
//   if(user.viewingSavedRecipe) {
//     let userFilteredSavedRecipes = user.filterFavsByTag(tagToFilter);
//     createRecipePreview(userFilteredSavedRecipes);
//     return;
//   };
//   const tempRecipeArr = recipeRepository.filterByTag(tagToFilter);
//   createRecipePreview(tempRecipeArr);
// },

// displayRecipesByName(inputName, recipeRepository, user){
//   if(user.viewingSavedRecipe) {
//     const filterSavedRecipesByName = user.filterFavsByName(inputName);
//     createRecipePreview(filterSavedRecipesByName);
//     return;
//   };
//   const tempRecipesArray = recipeRepository.filterByName(inputName);
//   createRecipePreview(tempRecipesArray);
// },

// displayPopUp (recipe){
//   popupImage.src = recipe.img;
//   popupImage.alt = `Image of ${recipe.name}`;
//   popupName.innerHTML = recipe.name;
//   renderPopupInstructions(recipe);
//   renderPopupIngredients(recipe);
//   togglePopupSaveIcon(recipe);
//   togglePopupCookIcon(recipe);
//   displayTotalCost(recipe);
// },

// togglePopupCookIcon(recipe){
//   popupToCookIcon.setAttribute('data-cookid', `${recipe.id}`);
//   if(recipe.wantToCook) {
//     popupToCookIcon.src = './images/icon_fire_symbol_lit.png';
//   } else {
//     popupToCookIcon.src = './images/icon_fire_symbol_unlit.png';
//   };
// },

//  togglePopupSaveIcon(recipe) {
//   popupSaveIcon.setAttribute('data-saveid', `${recipe.id}`);
//   if(recipe.saved) {
//     popupSaveIcon.src = './images/icon_banner_remove.png';
//   } else {
//     popupSaveIcon.src = './images/icon_banner_add.png';
//   };
// },

//  renderPopupIngredients(recipe){
//   popupIngredients.innerHTML = '';
//   recipe.ingredients.forEach((ingredient, i) => {
//     let newListIngredient = document.createElement('li');
//     newListIngredient.classList.add('ingredients-list');
//     newListIngredient.innerHTML = `${ingredient.name}: ${(recipe.ingredientsInfo[i].quantity.amount).toFixed(2)}  ${recipe.ingredientsInfo[i].quantity.unit}`;
//     popupIngredients.appendChild(newListIngredient);
//   });
// },

//  renderPopupInstructions (recipe) {
//   popupInstructions.innerHTML = '';
//   recipe.instructions.forEach((instruction) => {
//     let newListInstruction = document.createElement('li');
//     newListInstruction.classList.add('instructions-list');
//     newListInstruction.innerHTML = `Step ${instruction.number}: ${instruction.instruction}`;
//     popupInstructions.appendChild(newListInstruction);
//   });
// },

// displayTotalCost (recipe) {
//   let ingredientsBlock = document.getElementById('popupIngredients');
//   let totalCost = document.createElement('p');
//   totalCost.classList.add('total-cost-popup');
//   totalCost.innerHTML = `Total Cost: $${(recipe.calculateCost()/100).toFixed(2)}`;
//   ingredientsBlock.appendChild(totalCost);
// },

// toggleHidden (element) {
//   let classes = element.classList;
//   classes.toggle('hidden');
// },

// }


// export default domUpdates;