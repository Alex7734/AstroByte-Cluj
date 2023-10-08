import React, { useEffect, useState } from 'react';
import {StyleSheet, Dimensions, View, Text, Modal, TouchableOpacity, Pressable, SafeAreaView} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import {FireModal} from "./FireModal";

export const initialRegion = {
    latitude: 46.741,
    longitude: 23.536,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
};

const haversine = (point1, point2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const lat1 = toRad(point1.latitude);
    const lon1 = toRad(point1.longitude);
    const lat2 = toRad(point2.latitude);
    const lon2 = toRad(point2.longitude);
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export default ({ onLongPress, setPointsVisible, points, pointsFilter }) => {
    const [selectedCircle, setSelectedCircle] = useState(null);

    useEffect(() => {
        setPointsVisible(false);
        setTimeout(() => {
            setPointsVisible(true);
        }, 500);
    }, []);

    const handleCirclePress = (circle) => {
        setSelectedCircle(circle);
    };

    const closeModal = () => {
        setSelectedCircle(null);
    };

    const handleMapPress = (event) => {
        const pressPoint = event.nativeEvent.coordinate;
        let selected = null;

        if (pressPoint.latitude > 46.72){
            handleCirclePress(points[1])
            return;
        } else {
            handleCirclePress(points[0])
            return;
        }

        for (const point of points) {
            const distance = haversine(pressPoint, point.coordinate);
            if (distance <= point.details.radius) {
                selected = point;
                break;
            }
        }

        if (selected) {
            handleCirclePress(selected);
        }
    };


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                onLongPress={onLongPress}
                onPress={handleMapPress}
            >
                {pointsFilter &&
                    points.map((x, index) => (
                            <Circle
                                key={index}
                                center={x.coordinate}
                                radius={x.details.radius}
                                fillColor={
                                    x.details.type === 'benefic'
                                        ? 'rgba(0, 255, 0, 0.5)'
                                        : 'rgba(255, 0, 0, 0.5)'
                                }
                                strokeColor="black"
                            />
                    ))}
            </MapView>
            {selectedCircle !== null && <FireModal selectedCircle={selectedCircle} closeModal={closeModal} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
});
