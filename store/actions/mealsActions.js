export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const FILTER_MEALS = 'FILTER_MEALS';

export const toggleFavMeals = (id) => {
  return { type: TOGGLE_FAVOURITE, mealId: id };
};
export const filterMeals = (appliedFilters) => {
  return { type: FILTER_MEALS, filters: appliedFilters };
};
