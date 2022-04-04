import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from "../src/classes/Recipe";
const { recipeData, ingredientsData } = require('../src/data/sampleDatasets');

describe('Recipe Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new RecipeRepository(recipeData, ingredientsData);
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should have an array full of instantiations of recipe objects', () => {
    expect(repository.allRecipes[1]).to.be.an.instanceOf(Recipe)
  })

  it('should have a method to take in recipe data and output to array', () => {
    const recipe = new Recipe(recipeData[0], ingredientsData)
    expect(repository.allRecipes[0]).to.deep.equal(recipe);
  });

  it('filterbyTag should be a method of RecipeRepository', ()=>{
    expect(repository.filterByTag).to.be.a('function');
  });

  it('filterByTag should return a filtered list of recipes based on a tag', () => {
    let output = repository.filterByTag('snack');
    expect(output.length).to.equal(1);
    expect(output[0].id).to.equal(595736);
  });

  it('filterByTag should NOT affect the length of the allRecipes property array', () => {
    expect(repository.allRecipes.length).to.equal(3);
    repository.filterByTag('snack');
    expect(repository.allRecipes.length).to.equal(3);
  });

  it('filterbyName should be a method of RecipeRepository', ()=>{
    expect(repository.filterByName).to.be.a('function');
  });

  it('filterByName should return a filtered list of recipes based on a string', () => {
    let output = repository.filterByName('Cookie');
    expect(output[0].id).to.equal(595736);
    expect(output.length).to.equal(1);
  });
  it('should be able to record all individual tags from the data set', () => {
    repository.getTags(recipeData);
    const cookieTag = recipeData[0].tags[0];
    expect(repository.tags[0]).to.equal(cookieTag);
  })

})
