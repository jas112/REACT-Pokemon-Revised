import {useReducer, useEffect} from 'react';

function useLocalStorageReducer(key, initialValue, reducer) {
    const [state, dispatch] = useReducer(reducer, initialValue, () => {
        let startingStateValue;
        try {
            startingStateValue = JSON.parse(window.localStorage.getItem(key) || String(initialValue));
        } catch (err) {
            startingStateValue = initialValue;
        }
        return startingStateValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    },[state]);

    return [state, dispatch];
}

export {useLocalStorageReducer};