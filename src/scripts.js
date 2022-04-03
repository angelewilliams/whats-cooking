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
const instantiateClasses = (recipeData, ingredientData, userData) => {
  let recipeRepository = new RecipeRepository(recipeData, ingredientData);
    let generateRandomUser = () => {
      return userData[Math.floor(Math.random() * userData.length)];
    };
  let user = new User(generateRandomUser());
  createRecipePreview(recipeRepository.allRecipes);
  createEventListeners(recipeRepository, user);
};

apiCalls.then(data => {
  let userData = data[0].usersData;
  let recipeData = data[1].recipeData;
  let ingredientData = data[2].ingredientsData;
  instantiateClasses(recipeData, ingredientData, userData);
});

//~~~~~~~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const recipeSection = document.getElementById('recipesSection');
let popUp = document.querySelector('.popup-div');
const popUpShadow = document.getElementById('shadow');
const filterBreakfast = document.getElementById('breakfast');
const filterLunch = document.getElementById('lunch');
const filterDinner = document.getElementById('dinner');
const filterSnack = document.getElementById('snack');
const filterDip = document.getElementById('dip');
const searchBar = document.getElementById('searchBar');
const resetFilters = document.getElementById('clear');
const popupToCookIcon = document.getElementById('popupAddCook');
const popupSaveIcon = document.getElementById('popupAddSaved');
let savedRecipes = document.getElementById('saveRecipes');
let allRecipesBar = document.querySelector('.underline-box-all');
let savedRecipesBar = document.querySelector('.underline-box-saved');
let popupName = document.getElementById('popupName');
let popupImage = document.getElementById('popupImage');
let popupInstructions = document.getElementById('popupInstructions');
let popupIngredients = document.getElementById('popupIngredients');

//~~~~~~~~~~~~~~~~~~~~ EVENT LISTENERS  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const createEventListeners = (recipeRepository, user) => {
  popUp.addEventListener('click', (e) => {
    hidePopUp(e);
    if(user.viewingSavedRecipe) {
      createRecipePreview(user.favoriteRecipes, e);
    } else {
        createRecipePreview(recipeRepository.allRecipes, e);
      }
  });

  recipeSection.addEventListener('click', (e) => {
    displayRecipeDetail(e, recipeRepository);

    if(e.target.dataset.cookid){
      saveRecipeToCook(e, recipeRepository, user);
    };

    if(e.target.dataset.saveid) {
      identifyRecipe(e, recipeRepository, user);
    };
  });

  filterBreakfast.addEventListener('click', () => {
      displayFilteredTags('breakfast', user, recipeRepository);
  });

  filterLunch.addEventListener('click', () => {
      displayFilteredTags('lunch', user, recipeRepository);
  });

  filterDinner.addEventListener('click', () => {
      displayFilteredTags('dinner', user, recipeRepository);
  });

  filterSnack.addEventListener('click', () => {
      displayFilteredTags('snack', user, recipeRepository);
  });

  filterDip.addEventListener('click', () => {
      displayFilteredTags('dip', user, recipeRepository);
  });

  resetFilters.addEventListener('click', () => {
      resetPageRender(recipeRepository, user);
  });

  searchBar.addEventListener('input', () => {
      displayRecipesByName(searchBar.value, recipeRepository, user);
  });

  popupToCookIcon.addEventListener('click', (e) => {
      saveRecipeToCook(e, recipeRepository, user);
  });

  popupSaveIcon.addEventListener('click', (e) => {
      identifyRecipe(e, recipeRepository, user);
  });

  savedRecipes.addEventListener('click', (e) => {
    if(!user.viewingSavedRecipe) {
      toggleHidden(savedRecipesBar);
      toggleHidden(allRecipesBar);
      createRecipePreview(user.favoriteRecipes, e);
    }
    user.viewingSavedRecipe = true;
  });

  allRecipes.addEventListener('click', () => {
    if(user.viewingSavedRecipe) {
      toggleHidden(allRecipesBar);
      toggleHidden(savedRecipesBar);
      createRecipePreview(recipeRepository.allRecipes);
    };
    user.viewingSavedRecipe = false;
  });
};

  //~~~~~~~~~~~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let saveRecipeToCook = (e, recipeRepository, user) => {
    let recipe = recipeRepository.allRecipes.find((recipe) => {
      return `${recipe.id}` ===  e.target.dataset.cookid
    });
    user.addRecipeToCook(recipe);
    toggleToCookIcon(e, recipe);
  };

  let resetPageRender = (recipeRepository, user) => {
    if(user.viewingSavedRecipe) {
      createRecipePreview(user.favoriteRecipes);
    } else {
      createRecipePreview(recipeRepository.allRecipes);
    };
  };

  let identifyRecipe = (e, recipeRepository, user) => {
    let recipe = recipeRepository.allRecipes.find((recipe) => {
      return `${recipe.id}` ===  e.target.dataset.saveid
    });
    if(recipe.saved && user.viewingSavedRecipe) {
      recipe.saved = false
      toggleSaveIcon(e, recipe)
      user.removeFavoriteRecipe(recipe)
      createRecipePreview(user.favoriteRecipes)
    } else if(recipe.saved && !user.viewingSavedRecipe) {
      user.removeFavoriteRecipe(recipe)
      recipe.saved = false
      toggleSaveIcon(e, recipe)
    } else if(!recipe.saved && !user.viewingSavedRecipe) {
      recipe.saved = true
      user.favoriteARecipe(recipe)
      toggleSaveIcon(e, recipe)
    } else if(!recipe.saved && user.viewingSavedRecipe) {
      recipe.saved = true
      toggleSaveIcon(e, recipe)
      user.favoriteARecipe(recipe)
    };
  };

  let toggleSaveIcon = (e, recipe) => {
    if(recipe.saved) {
      e.target.src = './images/icon_banner_remove.png'
      return
    }
    e.target.src = './images/icon_banner_add.png'
  };

  let toggleToCookIcon = (e, recipe) => {
    if(recipe.wantToCook) {
      e.target.src = './images/icon_fire_symbol_lit.png'
      return
    };
    e.target.src = './images/icon_fire_symbol_unlit.png'
  };

  let hidePopUp = (e) => {
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

var createRecipePreview = (recipes) => {
  recipeSection.innerHTML = '';
  recipes.forEach((recipe) => {
    let srcCook = findCookIcon(recipe);
    let srcSave = findSaveIcon(recipe);
    recipeSection.innerHTML += `
      <section class="recipe-preview" data-id="${recipe.id}">
        <section class="recipe-heading" data-id="${recipe.id}">
          <h3 data-id="${recipe.id}">${recipe.name}</h3>
        </section>
        <div data-id="${recipe.id}" class="recipe-img">
          <img data-id="${recipe.id}" src="${recipe.img}">
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
    createRecipePreview(userFilteredSavedRecipes);
    return;
  };
  const tempRecipeArr = recipeRepository.filterByTag(tagToFilter);
  createRecipePreview(tempRecipeArr);
};

const displayRecipesByName = (inputName, recipeRepository, user) => {
  if(user.viewingSavedRecipe) {
    const filterSavedRecipesByName = user.filterFavsByName(inputName);
    createRecipePreview(filterSavedRecipesByName);
    return;
  };
  const tempRecipesArray = recipeRepository.filterByName(inputName);
  createRecipePreview(tempRecipesArray);
};

const displayPopUp = (recipe) => {
  popupImage.src = recipe.img;
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
    newListIngredient.innerHTML = `${ingredient.name}:  ${(recipe.ingredientsInfo[i].quantity.amount).toFixed(2)}${recipe.ingredientsInfo[i].quantity.unit}`;
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
