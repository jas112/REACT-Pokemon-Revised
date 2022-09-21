import {useState, useEffect} from 'react';

function useLocalStorageState(key, initialValue) {

    const [state, setState] = useState(() => {
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

}

export default useLocalStorageState;