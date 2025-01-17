//~~~~~~~~~~~~~~~~~~~~ IMPORTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import './styles.css';
import apiCalls from './apiCalls';
import './images/turing-logo.png';
import './images/icon_banner_add.png';
import './images/icon_banner_remove.png';
import './images/icon_fire_symbol_lit.png';
import './images/icon_fire_symbol_unlit.png';
import RecipeRepository from '../src/classes/RecipeRepository';
import User from '../src/classes/User';

//~~~~~~~~~~~~~~~~~ API CALLS & CLASS INSTANTIATION ~~~~~~~~~~~~~~~~`
const instantiateClasses = (recipeData, ingredientData, userData, postData, getData) => {
  let recipeRepository = new RecipeRepository(recipeData, ingredientData);
    let generateRandomUser = () => {
      return userData[Math.floor(Math.random() * userData.length)];
    };
  let user = new User(generateRandomUser());
  createRecipePreview(recipeRepository.allRecipes, recipeSection);
  createEventListeners(recipeRepository, user, ingredientData, postData, getData);
};

apiCalls.then(data => {
  let userData = data[0];
  let recipeData = data[1];
  let ingredientData = data[2];
  let postData = data[3];
  let getData = data[4];
  instantiateClasses(recipeData, ingredientData, userData, postData, getData);
});
//~~~~~~~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const recipeSection = document.getElementById('recipesSection');
let allRecipesBar = document.querySelector('.underline-box-all');
const searchBar = document.getElementById('searchBar');

let savedRecipes = document.getElementById('saveRecipes');
let savedRecipesBar = document.querySelector('.underline-box-saved');
let form = document.getElementById('filterForm');

let popUp = document.querySelector('.popup-div');
let popUpShadow = document.getElementById('shadow');
let popupName = document.getElementById('popupName');
let popupImage = document.getElementById('popupImage');
let popupInstructions = document.getElementById('popupInstructions');
let popupIngredients = document.getElementById('popupIngredients');
let popupToCookIcon = document.getElementById('popupAddCook');
let popupSaveIcon = document.getElementById('popupAddSaved');

let kitchenBar = document.getElementById('userKitchen');
let kitchenPage = document.querySelector('.kitchen');
let mainPage = document.querySelector('.main-page');
let userPantry = document.querySelector('.user-pantry');
let recipesToCook = document.getElementById('recipesToCook');
let checkRecipe = document.getElementById('checkRecipe');
let recipeAction = document.getElementById('recipeAction');

//~~~~~~~~~~~~~~~~~~~~ EVENT LISTENERS  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const createEventListeners = (recipeRepository, user, ingredientData, postData, getData) => {

  kitchenBar.addEventListener('click', (e) => {
    displayKitchen(user, ingredientData);
  });

  popUp.addEventListener('click', (e) => {
    hidePopup(e);
  });

  recipeSection.addEventListener('click', (e) => {
    displayRecipeSection(e);
  });

  form.addEventListener('click', (e) => {
    clickForm(e);
  });

  searchBar.addEventListener('input', () => {
    checkSearchBar();
  });

  popupToCookIcon.addEventListener('click', (e) => {
      saveRecipeToCook(e, recipeRepository, user);
  });

  popupSaveIcon.addEventListener('click', (e) => {
      identifyRecipe(e, recipeRepository, user);
  });

  savedRecipes.addEventListener('click', (e) => {
    checkSavedRecipesView(e);
  });

  allRecipes.addEventListener('click', (e) => {
    checkAllRecipesView(e);
  });

  recipeAction.addEventListener('click', (e) => {
    prepareToCook(e, user, postData, getData, ingredientData);
  });

  recipesToCook.addEventListener('click', (e) => {
    checkEventTarget(e, recipeRepository, user, ingredientData);
  });

  const hidePopup = (e) => {
    togglePopUp(e);
    form.reset();
    if(user.viewingSavedRecipe) {
      createRecipePreview(user.favoriteRecipes, recipeSection);
    } else {
        createRecipePreview(recipeRepository.allRecipes, recipeSection);
    };
  };

  const displayRecipeSection = (e) => {
    displayRecipeDetail(e, recipeRepository);
    if(e.target.dataset.cookid){
      saveRecipeToCook(e, recipeRepository, user);
    };
    if(e.target.dataset.saveid) {
      identifyRecipe(e, recipeRepository, user);
    };
  };

  const clickForm = (e) => {
    if(e.target.dataset.filterid) {
      displayFilteredTags(e.target.value, user, recipeRepository);
    };
    if(e.target.id === 'clear') {
      resetPageRender(recipeRepository, user);
    };
  };

  const checkSearchBar = () => {
    if(searchBar.value) {
      displayRecipesByName(searchBar.value, recipeRepository, user);
    } else {
      resetPageRender(recipeRepository, user);
    };
  };

  const checkSavedRecipesView = () => {
    if(!user.viewingSavedRecipe) {
      user.viewingKitchen = false;
      toggleHidden(savedRecipesBar);
      toggleHidden(allRecipesBar);
      kitchenPage.classList.add('hidden');
      mainPage.classList.remove('hidden');
      createRecipePreview(user.favoriteRecipes, recipeSection);
      form.reset();
    }
    user.viewingSavedRecipe = true;
  };

  const checkAllRecipesView = () => {
    if(user.viewingSavedRecipe || user.viewingKitchen) {
      user.viewingKitchen = false;
      user.viewingSavedRecipe = false;
      toggleHidden(allRecipesBar);
      toggleHidden(savedRecipesBar);
      kitchenPage.classList.add('hidden');
      mainPage.classList.remove('hidden');
      resetPageRender(recipeRepository, user);
      form.reset();
    };
  };

  let generateRadioButtons = () => {
    recipeRepository.tags.forEach((tag) => {
      form.innerHTML += `<input type="radio" id="${tag}" data-filterId="filter" name="filter" value="${tag}">
      <label for="${tag}">${tag}</label><br>`
    });
  };
  generateRadioButtons();
};

  //~~~~~~~~~~~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let prepareToCook = (e, user, postData, getData, ingredientData) => {
    if(e.target.id === 'addToPantry'){
      postIngredientData(user, postData, getData, ingredientData);
    }
    else if(e.target.id === 'cookRecipe'){
      removeIngredientData(user, postData, getData, ingredientData);
    };
  };

  let removeIngredientData = (user, postData, getData, ingredientData) => {
    let stuffToRemove = user.kitchen.currentRecipe.ingredientsInfo;
    let postList = stuffToRemove.map((recipeIngredient) => {
      return {userID: user.id, ingredientID:recipeIngredient.id, ingredientModification: (recipeIngredient.quantity.amount * -1)};
    });
    postList.forEach((form) => {
      postData(form)
      .then(() => {
        getData('users')
          .then(users => {
            users.forEach((person) => {
              if(person.id === user.id){
                user.kitchen.pantry = person.pantry;
              }
            })
          })
          .then(() => {
            reRenderKitchen(user, ingredientData)   
          });
        });
    });
  };

  let reRenderKitchen = (user, ingredientData) => {
    let recipe = user.kitchen.currentRecipe;
    user.removeRecipeFromCookList(recipe);
    displayKitchen(user, ingredientData)
    checkRecipe.innerHTML = '';
    checkRecipe.innerHTML += `Please Select A Recipe`;
    recipeAction.innerHTML = '';
  };

  let postIngredientData = (user, postData, getData, ingredientData) => {
    let newList = user.kitchen.groceryList.map((groceryItem) => {
      return {userID: user.id, ingredientID:groceryItem.id, ingredientModification: groceryItem.amount};
    });
    newList.forEach((form) => {
      postData(form)
      .then(() => {
        getData('users')
          .then(users => {
            users.forEach((person) => {
              if(person.id === user.id){
                user.kitchen.pantry = person.pantry;
              }
              })
            })
          .then(() => {
            user.kitchen.groceryList = [];
            renderUserIngredients(user, ingredientData);
            let recipe = user.kitchen.currentRecipe;
            let output = user.kitchen.checkPantry(recipe);
            renderRecipeToCook(user, output, {id:'cookRecipe', innerText:'Cook this Recipe!'});
        });
      });
    });
  };

  let checkEventTarget = (e, recipeRepository, user, ingredientData) => {
    if(e.target.dataset.id) {
      selectRecipeDom(e, recipeRepository, user, ingredientData);
    };
  };
  
  let selectRecipeDom = (e, recipeRepository, user, ingredientData) => {
    let recipe = recipeRepository.allRecipes.find((recipe) => {
      return `${recipe.id}` ===  e.target.dataset.id;
    });
    if(recipe !== user.kitchen.currentRecipe){
      let output = user.kitchen.checkPantry(recipe);
      user.kitchen.updateAmountToBuy();
      user.kitchen.getGroceryNames(ingredientData);
      if(!user.kitchen.currentRecipe.canCook){
        renderRecipeToCook(user, output, {id:'addToPantry', innerText:'Add ingredients to my pantry!'});
      }
      else if (user.kitchen.currentRecipe.canCook){
          renderRecipeToCook(user, output, {id:'cookRecipe', innerText:'Cook this recipe!'});
      };
    };
  };

  let renderRecipeToCook = (user, output, button) => {
    checkRecipe.innerHTML = '';
    checkRecipe.innerHTML = output;
    user.kitchen.groceryList.forEach((ingredient) => {
      checkRecipe.innerHTML += `<p>${ingredient.name}: ${ingredient.amount}</p>`
    });
    recipeAction.innerHTML = '';
    recipeAction.innerHTML += `<button class="recipe-action" id="${button.id}">${button.innerText}</button>` ;
  };

  let displayKitchen = (user, ingredientData) => {
    renderUserIngredients(user, ingredientData);
    user.viewingKitchen = true;
    user.viewingSavedRecipe = false;
    kitchenPage.classList.remove('hidden');
    mainPage.classList.add('hidden');
    createRecipePreview(user.recipesToCook, recipesToCook)
  };

  let renderUserIngredients = (user, ingredientData) => {
    userPantry.innerHTML = '';
    let itemsToDisplay = user.kitchen.getIngredientNames(ingredientData);
    itemsToDisplay.forEach((item) => {
      userPantry.innerHTML +=  ` <li>${item.name} : ${item.amount}</li>`
    });
  };

  let resetPageRender = (recipeRepository, user) => {
    switch(true) {
      case user.viewingSavedRecipe:
      createRecipePreview(user.favoriteRecipes, recipeSection);
      break
      default:
      createRecipePreview(recipeRepository.allRecipes, recipeSection);
    };
  };

  let saveRecipeToCook = (e, recipeRepository, user) => {
    let recipe = recipeRepository.allRecipes.find((recipe) => {
      return `${recipe.id}` ===  e.target.dataset.cookid
    });
    if(recipe.wantToCook) {
      user.removeRecipeFromCookList(recipe);
      toggleToCookIcon(e, recipe);
    } else if(!recipe.wantToCook) {
      user.addRecipeToCook(recipe);
      toggleToCookIcon(e, recipe);
    };
  };

  let identifyRecipe = (e, recipeRepository, user) => {
    let recipe = recipeRepository.allRecipes.find((recipe) => {
      return `${recipe.id}` ===  e.target.dataset.saveid
    });
    if(recipe.saved && user.viewingSavedRecipe) {
      user.removeFavoriteRecipe(recipe);
      toggleSaveIcon(e, recipe);
      createRecipePreview(user.favoriteRecipes, recipeSection)
    } else if(recipe.saved && !user.viewingSavedRecipe) {
      user.removeFavoriteRecipe(recipe);
      toggleSaveIcon(e, recipe);
    } else if(!recipe.saved && !user.viewingSavedRecipe) {
      user.favoriteARecipe(recipe);
      toggleSaveIcon(e, recipe);
    } else if(!recipe.saved && user.viewingSavedRecipe) {
      user.favoriteARecipe(recipe);
      toggleSaveIcon(e, recipe);
    };
  };

  let toggleSaveIcon = (e, recipe) => {
    if(recipe.saved) {
      e.target.src = './images/icon_banner_remove.png';
      return
    };
    e.target.src = './images/icon_banner_add.png';
  };

  let toggleToCookIcon = (e, recipe) => {
    if(recipe.wantToCook) {
      e.target.src = './images/icon_fire_symbol_lit.png';
      return;
    };
    e.target.src = './images/icon_fire_symbol_unlit.png';
  };

  let togglePopUp = (e) => {
    if(e.target.id === 'specificRecipe') {
      toggleHidden(popUp);
      toggleHidden(popUpShadow);
    };
  };

  const displayRecipeDetail = (e, recipeRepository) => {
    if(e.target.dataset.id) {
      var foundRecipe = recipeRepository.allRecipes.find((recipe) => {
        return `${recipe.id}` ===  e.target.dataset.id;
      });
      displayPopUp(foundRecipe);
      toggleHidden(popUpShadow);
      toggleHidden(popUp);
    };
  };

const createRecipePreview = (recipes, element) => {
  element.innerHTML = '';
  recipes.forEach((recipe) => {
    let srcCook = findCookIcon(recipe);
    let srcSave = findSaveIcon(recipe);
    element.innerHTML += `
      <section class="recipe-preview" data-id="${recipe.id}">
        <section class="recipe-heading" data-id="${recipe.id}">
          <h3 data-id="${recipe.id}">${recipe.name}</h3>
        </section>
        <div data-id="${recipe.id}" class="recipe-img">
          <img data-id="${recipe.id}" src="${recipe.img}" alt="Image of ${recipe.name}">
        </div>
        <section class="recipe-info" data-id="${recipe.id}">
          <section class="tag-icon-section" data-id="${recipe.id}">
            <div class="icons-section" data-id="${recipe.id}">
              <img class="icon add-to-cook" src="${srcCook}" data-cookId="${recipe.id}">
                <img class="icon add-to-saved" id="saveIcon" src="${srcSave}" data-saveId="${recipe.id}">
            </div>
          </section>
        </section>
      </section>
    `
  });
};

let findCookIcon = (recipe) => {
  if (recipe.wantToCook) {
    return './images/icon_fire_symbol_lit.png';
  } else {
    return './images/icon_fire_symbol_unlit.png';
  };
};

let findSaveIcon = (recipe) => {
  if (recipe.saved) {
    return './images/icon_banner_remove.png';
  } else {
    return './images/icon_banner_add.png';
  };
};

const displayFilteredTags = (tagToFilter, user, recipeRepository) => {
  if(user.viewingSavedRecipe) {
    let userFilteredSavedRecipes = user.filterFavsByTag(tagToFilter);
    createRecipePreview(userFilteredSavedRecipes, recipeSection);
    return;
  };
  const tempRecipeArr = recipeRepository.filterByTag(tagToFilter);
  createRecipePreview(tempRecipeArr, recipeSection);
};

const displayRecipesByName = (inputName, recipeRepository, user) => {
  if(user.viewingSavedRecipe) {
    const filterSavedRecipesByName = user.filterFavsByName(inputName);
    createRecipePreview(filterSavedRecipesByName, recipeSection);
    return;
  };
  const tempRecipesArray = recipeRepository.filterByName(inputName);
  createRecipePreview(tempRecipesArray, recipeSection);
};

const displayPopUp = (recipe) => {
  popupImage.src = recipe.img;
  popupImage.alt = `Image of ${recipe.name}`;
  popupName.innerHTML = recipe.name;
  renderPopupInstructions(recipe);
  renderPopupIngredients(recipe);
  togglePopupSaveIcon(recipe);
  togglePopupCookIcon(recipe);
  displayTotalCost(recipe);
};

const togglePopupCookIcon = (recipe) => {
  popupToCookIcon.setAttribute('data-cookid', `${recipe.id}`);
  if(recipe.wantToCook) {
    popupToCookIcon.src = './images/icon_fire_symbol_lit.png';
  } else {
    popupToCookIcon.src = './images/icon_fire_symbol_unlit.png';
  };
};

const togglePopupSaveIcon = (recipe) => {
  popupSaveIcon.setAttribute('data-saveid', `${recipe.id}`);
  if(recipe.saved) {
    popupSaveIcon.src = './images/icon_banner_remove.png';
  } else {
    popupSaveIcon.src = './images/icon_banner_add.png';
  };
};

const renderPopupIngredients = (recipe) => {
  popupIngredients.innerHTML = '';
  recipe.ingredients.forEach((ingredient, i) => {
    let newListIngredient = document.createElement('li');
    newListIngredient.classList.add('ingredients-list');
    newListIngredient.innerHTML = `${ingredient.name}: ${(recipe.ingredientsInfo[i].quantity.amount).toFixed(2)}  ${recipe.ingredientsInfo[i].quantity.unit}`;
    popupIngredients.appendChild(newListIngredient);
  });
};

const renderPopupInstructions = (recipe) => {
  popupInstructions.innerHTML = '';
  recipe.instructions.forEach((instruction) => {
    let newListInstruction = document.createElement('li');
    newListInstruction.classList.add('instructions-list');
    newListInstruction.innerHTML = `Step ${instruction.number}: ${instruction.instruction}`;
    popupInstructions.appendChild(newListInstruction);
  });
};

const displayTotalCost = (recipe) => {
  let ingredientsBlock = document.getElementById('popupIngredients');
  let totalCost = document.createElement('p');
  totalCost.classList.add('total-cost-popup');
  totalCost.innerHTML = `Total Cost: $${(recipe.calculateCost()/100).toFixed(2)}`;
  ingredientsBlock.appendChild(totalCost);
};

const toggleHidden = (element) => {
  let classes = element.classList;
  classes.toggle('hidden');
};
