import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { filterMeals } from '../store/actions/mealsActions';

const SwitchItem = (props) => {
  return (
    <View style={styles.switchItem}>
      <Text style={styles.switchTitle}>{props.children}</Text>
      <Switch
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={'white'}
      />
    </View>
  );
};
const FiltersMealScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian
    };

    dispatch(filterMeals(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restricitons </Text>
      <SwitchItem
        value={isGlutenFree}
        onChange={(newValue) => {
          setIsGlutenFree(newValue);
        }}
      >
        Gluten-Free
      </SwitchItem>
      <SwitchItem
        value={isLactoseFree}
        onChange={(newValue) => {
          setIsLactoseFree(newValue);
        }}
      >
        Lactose-Free
      </SwitchItem>
      <SwitchItem
        value={isVegan}
        onChange={(newValue) => {
          setIsVegan(newValue);
        }}
      >
        Vegan
      </SwitchItem>
      <SwitchItem
        value={isVegetarian}
        onChange={(newValue) => {
          setIsVegetarian(newValue);
        }}
      >
        Vegetarian
      </SwitchItem>
    </View>
  );
};

FiltersMealScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginVertical: 15,
    width: '80%'
  },
  switchTitle: {
    fontFamily: 'open-sans'
  }
});

export default FiltersMealScreen;
