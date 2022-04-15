import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
const { ingredientsData } = require('../src/data/sampleDatasets');
import User from '../src/classes/User';
const { recipeData } = require('../src/data/sampleDatasets');
import Recipe from '../src/classes/Recipe';
const { usersData } = require('../src/data/sampleDatasets');
import Kitchen from '../src/classes/Kitchen';

describe.only('Kitchen', () => {
    let kitchen, user, recipe;

    beforeEach(() => {
        user = new User(usersData[0]);
        kitchen = new Kitchen (usersData[0].pantry);
        recipe = new Recipe(recipeData[0], ingredientsData);
    });

    it('should be a function', () => {

        expect(Kitchen).to.be.a('function');
    });

    it('should be able to store userdata pantry', () => {
        expect(kitchen.pantry).to.equal(usersData[0].pantry)
    });

    it('should instantiate kitchen in User', () => {
        expect(kitchen).to.deep.equal(user.kitchen)
    });

    it('should be able to check if pantry has the ingredients to make recipe', () => {
        const recipeResult = [
            { id: 18372, quantity: { amount: 0.5, unit: 'tsp' } },
            { id: 1123, quantity: { amount: 1, unit: 'large' } },
            { id: 19335, quantity: { amount: 0.5, unit: 'c' } },
            { id: 19206, quantity: { amount: 3, unit: 'Tbsp' } },
            { id: 19334, quantity: { amount: 0.5, unit: 'c' } },
            { id: 1012047, quantity: { amount: 24, unit: 'servings' } },
            { id: 10019903, quantity: { amount: 2, unit: 'c' } },
            { id: 1145, quantity: { amount: 0.5, unit: 'c' } },
            { id: 2050, quantity: { amount: 0.5, unit: 'tsp' } }
          ]


        let pantryCheck = kitchen.checkPantry(recipe)

        expect(kitchen.groceryList).to.deep.equal(recipeResult)
        expect(pantryCheck).to.equal('It looks like you still need to pick up some items--We will put a grocery list together for you.')
    });

    it('should be able to determine the amounts of missing ingredients still needed to cook a recipe', () => {
      kitchen.checkPantry(recipe);
      let itemToCheck = kitchen.groceryList[3].quantity.amount;

      expect(itemToCheck).to.equal(3);

      kitchen.updateAmountToBuy();
      itemToCheck = kitchen.groceryList[3].quantity.amount;

      expect(itemToCheck).to.equal(1);

    });

})
