import { useState } from 'react';

const useFetch = async (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const rawData = await response.json();
                const objToArr = rawData.items || [];
                console.log("OBJTOARR:", objToArr);
                setData(objToArr);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
    


    return { data, loading, error };
};

export default useFetch;
