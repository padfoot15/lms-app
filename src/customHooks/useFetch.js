import {useState, useEffect } from 'react';
import axios from 'axios';

const  useFetch = (url) => {
    const [data, setData] = useState(null)  
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
        async function getBorrowers(){
          const data = await axios.get("https://blushing-overcoat-elk.cyclic.app/api" + url)
          setData(data.data)
          setLoading(false)
        }
        getBorrowers();
      },[url])

    return {data,loading};
}
 
export default useFetch;