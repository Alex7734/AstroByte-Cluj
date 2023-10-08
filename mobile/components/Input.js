import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, TextInput} from "react-native";

export default ({ title, ...rest }) => {
    return(
        <View style={styles.wrapper}>
            <Text>{title}</Text>
            <TextInput { ...rest } />
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 10,
        marginHorizontal: 2,
        marginTop: 5,
    },

});

