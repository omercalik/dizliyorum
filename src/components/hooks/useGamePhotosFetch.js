import React, {useState, useEffect, useCallback} from "react";

export const useGamePhotoFetch = (gameSlug) => {
  
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchData = useCallback(async()=> {
        setError(false);
        setLoading(true);
        const response = await fetch(`https://rawg.io/api/games/${gameSlug}/screenshots`);
        const data = await response.json();
        const item = data.results;
      
        setData(item);
       
        setLoading(false);
    }, [gameSlug])
    useEffect(() => {

        fetchData();
   
  
    },[fetchData]);
  
    return {data, loading};
  
  }

