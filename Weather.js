import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Forecast from './Forecast';

export default function Weather(props) {
    
    const apiKey = '6e22eda0422b463a1a0c4e624e7af0e2'

    const [forecastInfo, setForecastInfo] = useState({
        main: 'main',
        description: 'description',
        temp: 0,
    })
    useEffect(() => {
    console.log(`fetching data with zipCode = ${props.zipCode}`)
    if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=${apiKey}`)
                .then((response) => response.json())
                .then((json) => {
                   setForecastInfo({
                        main: json.weather[0].main,
                        description: json.weather[0].description,
                        temp: json.main.temp
                    });
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    },[props.zipCode]) 
 
    return (
        <View>
            <ImageBackground source={require('./bg.jpg')} style={styles.backdrop}>
                <View style={styles.cover}>
                    <Text style={styles.medium}>Zip Code: {props.zipCode}</Text>
                    <Forecast {...forecastInfo} />
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    backdrop: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    
    export default function Forecast(props) {
        return (
            <View style={styles.center}>
                <Text style={styles.medium}>{props.main}</Text>
                <Text style={styles.small}>{props.description}</Text>
                <View>
                    <Text style={styles.medium}>
                        <Text style={{fontSize: 40}}>{props.temp}</Text>
                        <Text> °C</Text>
                    </Text>
                </View>
            </View>
        );
    }
    
    const styles = StyleSheet.create({
        center: {
            alignItems: 'center',
        },
        medium: {
            fontSize: 30,
            color: '#FFF',
            marginTop: 20,
        },
        small: {
            fontSize: 20,
            color: '#FFF',
            marginTop: 20,
    
        }
    })
    cover: {
        backgroundColor: '#000', 
        width: '100%',
        height: 300,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        fontSize: 20, 
        color: '#FFF',
    }
});