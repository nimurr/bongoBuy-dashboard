import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

 
export default function CustomerMessageDetails() {

    const {id} = useParams();

    const [message , setMessage ] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:5000/customer-message/${id}`)
        .then(res => setMessage(res?.data))
      },[])

      console.log(message)

      const handleBack =()=>{
        history.back()
      }
  return (
    <div className="dark:text-gray-200 p-5 dark:bg-gray-700 bg-white rounded">
        <button onClick={handleBack} className="mb-10 bg-black  text-white font-semibold py-2 px-8 rounded-md">Back</button>
      <h2 className="font-semibold text-primary">{message[0]?.name}</h2>
      <h2 className="font-semibold text-primary">{message[0]?.email}</h2>
      <h2 className="font-semibold text-primary">{message[0]?.phone}</h2>
      <p className="mt-5 text-gray-700 dark:text-gray-200"><span className="font-bold text-xl">Message:</span> {message[0]?.message}</p>
    </div>
  )
}
