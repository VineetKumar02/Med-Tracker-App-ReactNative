import { StyleSheet, ViewStyle } from 'react-native';
import Colors from './Colors';

const button: ViewStyle = {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 25,
        gap: 10,
    },
    containerCentered: {
        flex: 1,
        flexDirection: 'column',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerSubText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.GRAY,
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 10, // Replace unsupported `gap` with `marginBottom`
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    btnPrimary: {
        ...button,
        backgroundColor: Colors.PRIMARY,
    },
    btnPrimaryText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    btnSecondary: {
        ...button,
        backgroundColor: Colors.WHITE,
    },
    btnSecondaryText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
});
