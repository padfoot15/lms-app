import {useState, useEffect } from 'react';
import axios from 'axios';

const  useFetch = (url) => {
    const [data, setData] = useState(null)  
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
        async function getRecords(){
          const data = await axios.get(process.env.REACT_APP_API_URL + url)
          setData(data.data)
          setLoading(false)
        }
        getRecords();
      },[url])

    return {data,loading};
}
 
export default useFetch;