/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';




class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      initLocation: {
        latitude: 0,
        longitude: 0,
      }
    }
  }

 

  async sendlocation() {
    Geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var curLocation = {
        latitude: lat,
        longitude: long,
      }

      console.log(position);

      this.setState({initLocation: curLocation});

      fetch('https://projectresearch.conveyor.cloud/Login/UpdateLocation', {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          latitude: lat,
          longitude:long,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          mocked: position.mocked,
          timestamp: position.timestamp
        }),
      })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.latitude != null) {
          console.log('latitude'+ responseData.latitude );
        } else {
          //Alert.alert('Login fail');
        }
      })
      .catch(error => {
        //hits this everytime on the actual device
        //console.error(error);
      })
      .done();


    }, 
    (error) => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("hi");
      this.sendlocation();
    }, 500);
  }


  render() {
    return (
      <View>
      <Text>latitude {this.state.initLocation.latitude}</Text>
      
      <Text>longitude {this.state.initLocation.longitude}</Text>
      </View>
    )
  }
}
export default App;
