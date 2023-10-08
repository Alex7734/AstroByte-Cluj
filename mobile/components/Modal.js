import React from 'react';
import { StyleSheet, Dimensions, Modal, Text, View } from 'react-native';
import { Children } from 'react/cjs/react.production.min';

export default  ({ children , visibility }) => {
    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={visibility}
        >
            <View style={styles.center}>
                <View style={styles.modelView}>
                    {children}
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },    
    modelView: {
        minWidth: Dimensions.get('window').width - 150,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
    
});