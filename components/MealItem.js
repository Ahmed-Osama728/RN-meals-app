import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableNativeFeedback onPress={props.onSelectMeal}>
        <View>
          <View style={styles.mealHeader}>
            <ImageBackground
              style={styles.imgContainer}
              source={{ uri: props.image }}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.mealFooter}>
            <Text style={styles.mealInfo}>{props.duration}m</Text>
            <Text style={styles.mealInfo}>{props.complexity}</Text>
            <Text style={styles.mealInfo}>{props.affordability}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f5f4',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10
  },

  mealHeader: {
    width: '100%',
    height: '90%'
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderRadius: 10
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  mealFooter: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mealInfo: {
    fontFamily: 'open-sans-bold'
  }
});

export default MealItem;
