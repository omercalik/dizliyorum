import { useState, useEffect, useCallback } from 'react';

export const useMoreGameFetch = (url) => {
    const [data, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchGame = useCallback(async () => {
        setError(false);
        setLoading(true);

        try{
            const endpoint = `${url}`;
           
            console.log(endpoint)
            const result = await(await fetch(endpoint)).json();
            
            setState({
                ...result,
                
            });
        } catch(error){
            setError(true);
        }
        setLoading(false);
    },[url]);

    useEffect(() => {
        fetchGame();
      }, [fetchGame]);
 return [data, loading, error];
};