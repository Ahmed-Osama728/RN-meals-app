import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { toggleFavMeals } from '../store/actions/mealsActions';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const dispatch = useDispatch();

  const availableMeals = useSelector((state) => state.meals.meals);

  const mealId = props.navigation.getParam('mealId');

  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const toggleFavMealHandler = useCallback(() => {
    dispatch(toggleFavMeals(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    //  props.navigation.setParams({ mealTitle: selectedMeal.title });

    props.navigation.setParams({ toggleFavMeal: toggleFavMealHandler });
  }, [toggleFavMealHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <View>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.img} />
        <View style={styles.mealDetails}>
          <Text style={styles.mealInfo}>{selectedMeal.duration}m</Text>
          <Text style={styles.mealInfo}>{selectedMeal.complexity}</Text>
          <Text style={styles.mealInfo}>{selectedMeal.affordability}</Text>
        </View>
        <View style={styles.infoTitle}>
          <Text style={styles.title}>Ingredients</Text>
          {selectedMeal.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
          ))}
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map((step) => (
            <ListItem key={step}>{step}</ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  //const mealId = navigationData.navigation.getParam('mealId');
  //const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealTitle = navigationData.navigation.getParam('mealTitle');

  const toggleFavMeal = navigationData.navigation.getParam('toggleFavMeal');

  const isFav = navigationData.navigation.getParam('isFav');

  const headerRightButton = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavMeal}
        />
      </HeaderButtons>
    );
  };
  return {
    headerTitle: mealTitle,
    headerRight: headerRightButton
  };
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300
  },
  mealDetails: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
  },
  mealInfo: {
    fontFamily: 'open-sans-bold'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center'
  },
  listItem: {
    fontFamily: 'open-sans',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15
  }
});

export default MealDetailsScreen;
