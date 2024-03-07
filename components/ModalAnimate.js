import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const ModalAnimate = ({ isModalVisible, setModalVisible, children }) => {
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>
            <Modal
                isVisible={isModalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => { }}
                backdropOpacity={0.5}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        {/* Croix en absolute en haut à droite */}
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons name="close" size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {children}

                </View>
            </Modal>
        </View>
    );
};

const styles = {
    modalContainer: {
        padding: 20,
        backgroundColor: "#2D2D2D",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    header: {
        position: 'absolute',
        top: 10,
        right: 10, // Ajuste la position à droite
    },
};

export default ModalAnimate;