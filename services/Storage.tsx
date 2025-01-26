import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a value to AsyncStorage with a given key.
 * @param key - The key to store the value under.
 * @param value - The value to store (can be any serializable data).
 */
export const setLocalStorage = async (key: string, value: unknown): Promise<void> => {
    try {
        const serializedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error setting key "${key}" in AsyncStorage:`, error);
        throw error;
    }
};

/**
 * Retrieve a value from AsyncStorage by key.
 * @param key - The key to retrieve the value for.
 * @returns The parsed value, or null if the key does not exist or the parsing fails.
 */
export const getLocalStorage = async <T = unknown>(key: string): Promise<T | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error retrieving key "${key}" from AsyncStorage:`, error);
        return null;
    }
};

/**
 * Remove a specific key from AsyncStorage.
 * @param key - The key to remove.
 */
export const removeLocalStorageUsingKey = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing key "${key}" from AsyncStorage:`, error);
        throw error;
    }
};

/**
 * Clear all data from AsyncStorage.
 */
export const clearLocalStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
        throw error;
    }
};
