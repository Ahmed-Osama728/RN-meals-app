import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import GridItemTile from '../components/GridItemTile';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <GridItemTile
        onSelect={() => {
          props.navigation.navigate('CategoryMeals', {
            categoryId: itemData.item.id
          });
        }}
        color={itemData.item.color}
        title={itemData.item.title}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navOptions) => {
  const headerLeftButton = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          title="menu"
          onPress={() => {
            navOptions.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    );
  };

  return {
    headerLeft: headerLeftButton
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CategoriesScreen;
