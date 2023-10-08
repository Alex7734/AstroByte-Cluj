import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseApiClient from "../services/FirebaseClient";
import { predictFireDestructiveness } from "../model/LinearRegression";

const usePointStore = create((set) => ({
    points: [],
    tempCoordinate: null,

    loadPoints: async () => {
        try {
            const storedPoints = await AsyncStorage.getItem('points');
            if (storedPoints) {
                set({ points: JSON.parse(storedPoints) });
            }
        } catch (error) {
            console.error('Error loading points:', error);
        }
    },

    addPoint: (point) => set((state) => ({ points: [...state.points, point] })),

    savePoints: async () => {
        try {
            await AsyncStorage.setItem('points', JSON.stringify(usePointStore.getState().points));
            console.log(JSON.stringify(usePointStore.getState().points))
        } catch (error) {
            console.error('Error saving points:', error);
        }
    },

    setTempCoordinate: (coordinate) => {
        set({ tempCoordinate: coordinate });
    },

    clearPoints: () => {
        set({ points: [] });
    }
}));

export const addInitialMockUpPoints = async () => {
    const initialPoints = [
        {
            coordinate: { latitude: 46.711, longitude: 23.536 },
            name: 'Point 1',
            details: {
                type: 'benefic',
                control: 'controlled',
                size: 'small',
                humidity: 50,
                timeActive: 3,
                radius: 200,
                temperature: 20
            },
        },
        {
            coordinate: { latitude: 46.742, longitude: 23.537 },
            name: 'Point 2',
            details: {
                type: 'destructive',
                control: 'noncontrolled',
                size: 'big',
                humidity: 30,
                timeActive: 5,
                radius: 400,
                temperature: 25
            },
        },
    ];

    const updatedPoints = initialPoints.map((point) => {
        const { humidity, temperature, timeActive, radius } = point.details;
        const control = point.details.control === 'controlled' ? 0 : 1;
        const prediction = predictFireDestructiveness(humidity, temperature, timeActive, radius, control, point.coordinate.longitude, point.coordinate.latitude);
        const updatedType = prediction === 'Destructive' ? 'destructive' : 'benefic';

        return {
            ...point,
            details: {
                ...point.details,
                control: control,
                type: updatedType,
            },
        };
    });

    updatedPoints.forEach((point) => {
        usePointStore.getState().addPoint(point);
    });

    await usePointStore.getState().savePoints();
};

export default usePointStore;
