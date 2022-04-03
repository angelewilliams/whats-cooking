import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import User from '../src/classes/User';
const {recipeData} = require('../src/data/recipes');
const {usersData} = require('../src/data/users');

describe.only('User', () => {
  let user, user2, recipe0, recipe1, recipe2, recipe3;
  beforeEach(() => {
    user = new User(usersData[0]);
    user2 = new User(usersData[3]);
    recipe0 = new Recipe(recipeData[0]);
    recipe1 = new Recipe(recipeData[1]);
    recipe2 = new Recipe(recipeData[2]);
    recipe3 = new Recipe(recipeData[3]);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function')
  });

  it('should be an instance of User class', () => {
    expect(user).to.be.an.instanceOf(User)
  });

  it('should populate user data', () => {
    expect(user.name).to.equal("Saige O'Kon");
    expect(user.id).to.equal(1);
    expect(user.pantry.length).to.equal(usersData[0].pantry.length);
    expect(user.pantry[0].amount).to.equal(4);
  });



  it('should be able to have a favorite recipe', () => {
    expect(user.favoriteRecipes.length).to.equal(0);
    user.favoriteARecipe(recipe0);
    user.favoriteARecipe(recipe0);
    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0]).to.equal(recipe0);
  });

  it('should be able to remove a favorited recipe', () => {
    user.favoriteARecipe(recipe0);
    user.favoriteARecipe(recipe1);
    user.favoriteARecipe(recipe2);
    user.removeFavoriteRecipe(recipe1);
    expect(user.favoriteRecipes[0].id).to.equal(595736);
    expect(user.favoriteRecipes[1].id).to.equal(412309);
    expect(user.favoriteRecipes[1]).to.equal(recipe2);
  })

  it('should be able to add a recipe to recipesToCook', () => {
    user.addRecipeToCook(recipe2);
    expect(user.recipesToCook.length).to.equal(1);
  });

  it('should be able to filter favoriteRecipes by tag', () => {
    user.favoriteARecipe(recipe0);
    user.favoriteARecipe(recipe1);
    user.favoriteARecipe(recipe2);
    let output = user.filterFavsByTag('snack');
    expect(output[0].tags[0]).to.equal('antipasti')
  });

  it('should be able to filter favoriteRecipes by tag', () => {
    user.favoriteARecipe(recipe0);
    user.favoriteARecipe(recipe1);
    user.favoriteARecipe(recipe2);
    let output = user.filterFavsByName('Grilled Pork Chop');
    expect(output[0].name).to.equal(recipe1.name);
  });

})
