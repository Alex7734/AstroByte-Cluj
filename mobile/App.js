import React, { useEffect } from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import { Map, Modal, Panel, Input, List } from './components/Index';
import { useState } from 'react';
import usePointStore, {addInitialMockUpPoints} from "./store/PointsStore";
import FirebaseApiClient from "./services/FirebaseClient";

export default function App() {
  const [points, setPoints] = useState()
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [pointsFilter, setPointsFilter] = useState(true);
  const [visibilityFilter, setVisibilityFilter] = useState('new_point');
  const [pointsVisible, setPointsVisible] = useState(true);

  const togglePointsFilter = () => {
    setPointsFilter(!pointsFilter);
    setPointsVisible(!pointsVisible);
  };

  const handleChangeText = (text) => {
    setName(text);
  };

  const handleSavePoint = () => {
    const tempCoordinate = usePointStore.getState().tempCoordinate;

    if (tempCoordinate) {
      usePointStore.getState().addPoint({
        coordinate: tempCoordinate,
        name: name,
        details: {
          key1: 'good',
          key2: 'value2',
        },
      });

      usePointStore.getState().savePoints();
      setVisibility(false);
    } else {
      console.error('No tempCoordinate found.');
    }
  };


  const handleLongPress = ({ nativeEvent }) => {
    setVisibilityFilter('new_point');
    usePointStore.getState().setTempCoordinate(nativeEvent.coordinate);
    setVisibility(true);
  };


  const handleList = () => {
    setVisibilityFilter('all_points');
    setVisibility(true);
  };

  useEffect(() => {
    const firebaseApiClient = new FirebaseApiClient('main.json');
    let point = {
      coordinate: { latitude: 46.726, longitude: 23.5365 },
      name: 'New Point',
      details: {
        type: 'benefic',
        control: 'noncontrolled',
        humidity: null,
        radius: null,
        size: "moderate",
        timeActive: null,
        temperature: null
      }
    }

    firebaseApiClient.fetchData()
        .then((data) => {
          console.log('Fetched data:', data);
          point.details.humidity = +data.humidity
          point.details.radius = +data.radius * 100
          point.details.timeActive = +data.timeActive
          point.details.temperature = +data.temperature
          usePointStore.getState().addPoint(point)
          usePointStore.getState().savePoints(point)
          usePointStore.getState().loadPoints()
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

  }, []);


  useEffect(() => {
    usePointStore.getState().loadPoints()
        .then(response => {
          setPoints(response)
        })
        .catch(e => console.log(e))
  }, []);


  useEffect(() => {
    addInitialMockUpPoints()
        .then(() => {
          usePointStore.getState().loadPoints()
              .then(response => {
                setPoints(response);
              })
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }, []);

  return (
      <View style={styles.container}>
        <SafeAreaView style={{display: !visibility}} />
        <View style={styles.mainApp}>
          <Map setPointsVisible={setPointsVisible} onLongPress={handleLongPress} points={usePointStore.getState().points} pointsFilter={pointsFilter} />
          <Panel onPressLeft={handleList} textLeft="List" togglePointsFilter={togglePointsFilter} pointsVisible={pointsFilter} />
        </View>
        <Modal visibility={visibility}>
          {visibilityFilter === 'new_point' ? (
              <View style={styles.form}>
                <Input title="Name" placeholder="Name of the Place" onChangeText={handleChangeText} />
                <TouchableOpacity style={styles.button} onPress={handleSavePoint}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
          ) : (
              <List points={usePointStore.getState().points} closeModal={() => setVisibility(false)} />
          )}
        </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainApp: {
    position: 'absolute',
  },
  form: {
    padding: 10,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    minWidth: Dimensions.get('window').width / 2 - 50,
  },
  buttonText: {
    color: 'white',
  },
  tooltip: {
    position: 'relative',
    top: 50,
    left: 10,
    zIndex: 1,
  },
});
