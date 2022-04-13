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
    })

    it('should be a function', () => {
        
        expect(Kitchen).to.be.a('function');
    })

    it('should be able to store userdata pantry', () => {
        expect(kitchen.pantry).to.equal(usersData[0].pantry)
    })

    it('should instantiate kitchen in User', () => {
        expect(kitchen).to.deep.equal(user.kitchen)
    })

    it('should be able to check if pantry has the ingredients to make recipe', () => {
        console.log(kitchen)
        console.log(recipe)
        expect(kitchen.pantryIncludes).to.equal('false')
    })
})