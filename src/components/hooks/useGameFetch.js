import React, {useState, useEffect, useCallback} from "react";
import { getStoredState } from "redux-persist";


export const useGameFetch = (pageNumber) => {
  
    const [data, setData] = useState({games:[]});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    

    const fetchData = useCallback(async()=> {
        setError(false);
        setLoading(true);
        const response = await (await fetch(`https://rawg.io/api/games?page=${pageNumber}`)).json();
        console.log(response);
        const item = response.results;
        
      
        setData((prev)=>({
            ...prev,
            games:[...response.results]}));
       
        setLoading(false);
    }, [pageNumber])

    
    useEffect(() => {
        fetchData();
    },[]);
  
    return [{data, loading}, fetchData];
  
  }

