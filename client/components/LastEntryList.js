import React from 'react';
import { TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';
import { formatDate } from '../utils/timestamp';
import { Ionicons } from '@expo/vector-icons';

const LastEntryList = ({ licencePlateHistory }) => {
    return (
        <View style={styles.container}>
            {/* Tableau avec bords arrondis */}
            <View style={styles.table}>
                <Text style={styles.tableTitle}>Historiques d'entrées</Text>
                {/* Utilisation de style directement sur FlatList pour rendre la liste scrollable */}
                <FlatList
                    style={{ maxHeight: 200 }}
                    data={licencePlateHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.plateItem}>
                            {/* Plaque avec fond gris et texte en gras */}
                            <View style={styles.plateContainer}>
                                <Text style={styles.plateText}>{item.plateNumber}</Text>
                            </View>

                            {/* Timestamp en blanc */}
                            <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>

                            {/* Bouton image avec fond vert */}
                            <TouchableOpacity style={styles.imageButton}>
                                <Ionicons name="image-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = {
    container: {
        padding: 20,
    },
    table: {
        borderColor: '#757575',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        height: 210,
    },
    tableTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: -23,
        marginLeft: 3,
        backgroundColor: "#515151",
        width: "auto",
        color: "#FFFFFF",
        alignSelf: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
    },
    plateItem: {
        flexDirection: 'row', // Aligne les éléments sur une ligne
        justifyContent: 'space-between', // Répartit l'espace entre les éléments
        alignItems: 'center', // Centre les éléments verticalement
        marginBottom: 8,
    },
    plateContainer: {
        backgroundColor: '#757575', // Fond gris
        borderRadius: 5,
        padding: 8,
        marginRight: 8,
    },
    plateText: {
        color: '#FFFFFF',
        fontWeight: 'bold', // Texte en gras
    },
    timestamp: {
        color: '#FFFFFF',
    },
    imageButton: {
        backgroundColor: '#52A311', // Fond vert
        borderRadius: 5,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default LastEntryList;