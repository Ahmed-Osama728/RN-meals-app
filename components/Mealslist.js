import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';

import MealItem from './MealItem';

const Mealslist = (props) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  const renderMealItem = (itemData) => {
    const isFavMeal = favouriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <MealItem
        onSelectMeal={() =>
          props.navigation.navigate('MealDetails', {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavMeal
          })
        }
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability.toUpperCase()}
        complexity={itemData.item.complexity.toUpperCase()}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={renderMealItem}
        numColumns={1}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  }
});

export default Mealslist;
