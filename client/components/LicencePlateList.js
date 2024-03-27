import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const LicensePlateList = ({ licensePlates, onButtonPress }) => {
    console.log(licensePlates);
    return (
        <View style={styles.container}>
            {/* Tableau avec bords arrondis */}
            <View style={styles.table}>
                <Text style={styles.tableTitle}>Mes Plaques</Text>
                {/* Utilisation de style directement sur FlatList pour rendre la liste scrollable */}
                <FlatList
                    style={{ maxHeight: 200 }}
                    data={licensePlates}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.plateItem}>
                            <Text style={styles.plateText}>{item.number}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Bouton avec fond gris, texte blanc, et bords arrondis */}
            <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                <Text style={styles.buttonText}>Ajouter une plaque</Text>
            </TouchableOpacity>
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
        marginBottom: 13,
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
        padding: 8,
        borderRadius: 5,
        borderColor: '#757575',
        borderWidth: 1,
        marginBottom: 8,
    },
    plateText: {
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#757575',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
};

export default LicensePlateList;