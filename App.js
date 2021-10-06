import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';


const {width: SCREEN_WIDTH} = Dimensions.get('window');
const API_KEY = "???";


const icons = {
  "Clouds" : "md-cloudy",
  "Clear" : "md-sunny",
  "Rain" : "md-rainy",
  "Thunderstorm":"md-thunderstorm",
  "Snow" : "md-snow",
  "Fog" : "cloudy-outline",
  "Drizzle" : "md-rainy-outline"
}


export default function App() {
 const [city, setCity] = useState("Loading...");
 const [days, setDays] = useState([]);
 const [ok, setOk] = useState(true);


  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
   
    if(!granted){
      setOk(false);
    }

     const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
     const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
     setCity(location[0].region);

     const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`);
     const json = await response.json();
     setDays(json.daily);

    

  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled={true} contentContaienrStyle={styles.weather} horizontal={true} >
          {days.length === 0 ? (
            <View style={styles.day}><ActivityIndicator size="large" color="#ffffff"/></View>
          ) : (
            days.map((day, index) =>
            <View key={index} style={styles.day}>
              <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Ionicons style={styles.icons} name={icons[day.weather[0].main]} size={68} color="white" />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          )
          )}
          
         
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
    fontSize: 68,
    fontWeight: "500",
    color:"#ffffff"
  },
  weather: {
    backgroundColor:"gray"
  },
  day: {
    width: SCREEN_WIDTH,
    flex:1
  },
  temp: {
    fontSize:98,
    marginLeft:30,
    fontWeight: "500",
    color:"#ffffff"
  },
  description: {
    marginTop:-10,
    fontSize:38,
    marginLeft:40,
    color:"#ffffff"
  },
  tinyText: {
    fontSize:18,
    marginLeft:40,
    color:"#ffffff"
  },
  icons: {
    marginRight:30
  }
})
