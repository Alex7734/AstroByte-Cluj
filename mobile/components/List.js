import React, {useState} from "react";
import {StyleSheet, Dimensions, View, FlatList, Text, TouchableOpacity, Pressable} from "react-native";
import {FireModal} from "./FireModal";

export default ({ points, closeModal }) => {


    return (
        <>
            <View style={styles.list}>
                <FlatList
                    data={points}
                    renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text>{item.name}</Text>
                                {item.details.type === 'destructive' && (
                                    <Text style={styles.disruptiveIndicator}>Disruptive</Text>
                                )}
                                {item.details.type === 'benefic' && (
                                    <Text style={styles.beneficIndicator}>Benefic</Text>
                                )}
                            </View>
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={closeModal}>
                    <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get("window").height - 450,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#eee",
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    disruptiveIndicator: {
        marginLeft: 10,
        color: 'red',
        fontWeight: 'bold',
    },
    beneficIndicator: {
        marginLeft: 10,
        color: 'green',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "black",
        borderRadius: 50,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        marginBottom: 5,
        marginHorizontal: 5,
    },
});
