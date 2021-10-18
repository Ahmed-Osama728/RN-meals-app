import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersMealScreen from '../screens/FiltersMealScreen';
import Colors from '../constants/Colors';
import { Platform, Text } from 'react-native';

const defaultNavOptions = {
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  },
  headerTitleStyle: { fontFamily: 'open-sans-bold' }
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetails: MealDetailsScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersMealScreen
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: <Text style={{ fontFamily: 'open-sans' }}>Meals</Text>
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: <Text style={{ fontFamily: 'open-sans' }}>Favourites</Text>
    }
  }
};

const favMealsTapNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: { fontFamily: 'open-sans' },
          activeTintColor: Colors.accentColor
        }
      });

const MainNavigator = createDrawerNavigator(
  {
    FavouriteMeals: {
      screen: favMealsTapNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      },
      itemsContainerStyle: {
        marginVertical: 15
      }
    }
  }
);

export default createAppContainer(MainNavigator);
