import { View, Text, Alert, SafeAreaView, ActivityIndicator } from "react-native"
import React, {useState, useEffect } from "react"
import * as Location from 'expo-location'

const openWeatherKey = 'e16b3cf62b95830717af0172a4d9e156'
let url = `http://api.openweathermap.org/data/2.5onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

const Weather = () => {
    const [forecast, setForecast] = useState(null)
    const [refresing, setRefresing] = useState(false)

    const loadForecast = async () => {
        setRefresing(true)
        const { status } = await Location.requestPermissionsAsync()
        if (status!== 'granted') {
            Alert.alert('Permission to access location was denied')
            // setRefresing(false)
            // return
        }
        
        // get the current location
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})

        // fetches the weather data from the openweathermap api
        const response =await fetch(`${url}` + `&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
        const data = await response.json()

        if (!response.ok) {
            Alert.alert('error', 'Something went wrong')
        } else {
            setForecast(data)
        }
        setRefresing(false)
    }

    // useEffect is a hook that runs after the compenent is rending
    useEffect(() => {
        loadForecast()
    })

    if (!forecast) {
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        )
    }

    return (
        <View>
            <Text>Weather</Text>
        </View>
    )
}

export default Weather