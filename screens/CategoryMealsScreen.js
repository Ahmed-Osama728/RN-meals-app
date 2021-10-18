import React from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';

import Mealslist from '../components/Mealslist';
import { StyleSheet, Text, View } from 'react-native';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const listData = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <View style={{ flex: 1 }}>
      {listData.length === 0 ? (
        <View style={styles.screen}>
          <Text style={styles.fallbackText}>
            There no Meals!, maybe check your filters
          </Text>
        </View>
      ) : (
        <Mealslist navigation={props.navigation} listData={listData} />
      )}
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCatId = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCatId.title
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fallbackText: {
    fontFamily: 'open-sans',
    fontSize: 15
  }
});
export default CategoryMealsScreen;
