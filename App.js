import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';


const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  // const [location, setLocation] = useState(); 
  // const [ok, setOk] = useState(true);
  // const ask = async() => {
  //   const permission = await Location.requestForegroundPermissionsAsync();
  // }

  // useEffect(()=>{
  //   ask();
  // }, []);


  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled={true} contentContaienrStyle={styles.weather} horizontal={true} >
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>sunny</Text>
          </View>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "coral"
  },
  city: {
    flex:1.6,
    justifyContent:"center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 48,
    fontWeight: "500"
  },
  weather: {
    backgroundColor:"gray"
  },
  day: {
    width: SCREEN_WIDTH,
    flex:1,
    alignItems: "center"
  },
  temp: {
    marginTop:50,
    fontSize:148,
    fontWeight: "500"
  },
  description: {
    marginTop:-20,
    fontSize:68
  }
})
