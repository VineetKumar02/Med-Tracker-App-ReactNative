import { StyleSheet, ViewStyle } from 'react-native';
import Colors from './Colors';

const button: ViewStyle = {
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
};

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 25,
        gap: 10,
    },
    containerCentered: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 25,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        gap: 10,
        backgroundColor: Colors.WHITE,
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: Colors.DARK_GRAY,
        width: '100%',
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
