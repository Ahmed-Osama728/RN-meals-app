import { MEALS } from '../../data/dummy-data';
import { FILTER_MEALS, TOGGLE_FAVOURITE } from '../actions/mealsActions';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const existingMealIndex = state.favouriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingMealIndex >= 0) {
        const updatedFavMeals = [...state.favouriteMeals];
        updatedFavMeals.splice(existingMealIndex, 1);
        return { ...state, favouriteMeals: updatedFavMeals };
      } else {
        const addedMeal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favouriteMeals: state.favouriteMeals.concat(addedMeal)
        };
      }
    }

    case FILTER_MEALS: {
      const { filters } = action;
      const updatedFelteredMeals = state.filteredMeals.filter((meal) => {
        if (filters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filters.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (filters.isVegan && !meal.isVegan) {
          return false;
        }
        if (filters.isVegetarian && !meal.isGlutenFree) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFelteredMeals };
    }
    default:
      return state;
  }
};

export default mealsReducer;
