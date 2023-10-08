import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export const FireModal = ({ selectedCircle, closeModal }) => {
    const handleAlert = () => {
        Alert.alert(
            'Emergency Alert',
            'This is a disruptive wildfire. Take immediate action!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Here logic to connect with the emergency
                    },
                },
            ],
        );
    };

    console.log(selectedCircle)

    return (
        <Modal visible={!!selectedCircle} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={selectedCircle.details.type === 'destructive'  ? styles.modalHeader : styles.modalHeaderBenefic}>
                    <Text style={styles.modalTitle}>Wildfire Information</Text>
                </View>
                {selectedCircle && (
                    <View style={styles.modalContent}>
                        <Text style={styles.infoLabel}>Type:</Text>
                        <Text style={styles.infoText}>{selectedCircle?.details.type}</Text>

                        <Text style={styles.infoLabel}>Temperature before event:</Text>
                        <Text style={styles.infoText}>{selectedCircle?.details.temperature}° celsius</Text>


                        <Text style={styles.infoLabel}>Humidity:</Text>
                        <Text style={styles.infoText}>{selectedCircle?.details.humidity} %</Text>


                        <Text style={styles.infoLabel}>Time Active:</Text>
                        <Text style={styles.infoText}>{selectedCircle?.details.timeActive} hours</Text>


                        <Text style={styles.infoLabel}>Radius:</Text>
                        <Text style={styles.infoText}>{selectedCircle?.details.radius} m</Text>


                        {selectedCircle.details.type === 'destructive' && (
                            <TouchableOpacity
                                style={styles.emergencyButton}
                                onPress={handleAlert}
                            >
                                <Text style={styles.emergencyButtonText}>Emergency Alert</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={selectedCircle.details.type === 'destructive' ? styles.closeButton : styles.closeButtonBenefic}
                            onPress={closeModal}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 40
    },
    modalHeader: {
        backgroundColor: 'red',
        padding: 20,
        alignItems: 'center',
    },
    modalHeaderBenefic: {
        backgroundColor: 'green',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 15,
    },
    emergencyButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
    },
    emergencyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonBenefic: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
