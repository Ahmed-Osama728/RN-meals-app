import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealsList from '../components/Mealslist';
import { MEALS } from '../data/dummy-data';

const FavouritesScreen = (props) => {
  const listData = useSelector((state) => state.meals.favouriteMeals);

  return (
    <View style={styles.screen}>
      {listData.length === 0 ? (
        <Text style={styles.emptyText}>
          There is no Favourites, start picking your meals...
        </Text>
      ) : (
        <MealsList listData={listData} navigation={props.navigation} />
      )}
    </View>
  );
};

FavouritesScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.filter((meal) => meal.id === mealId);

  const headerLeftButton = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          title="menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    );
  };

  return {
    headerTitle: selectedMeal.title,
    headerLeft: headerLeftButton
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontFamily: 'open-sans',
    fontSize: 15
  }
});

export default FavouritesScreen;
