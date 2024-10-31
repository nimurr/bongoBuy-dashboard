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
    <div>
        <button onClick={handleBack} className="mb-10 bg-black text-white font-semibold py-2 px-8 rounded-md">Back</button>
      <h2 className="font-semibold">{message[0]?.name}</h2>
      <h2 className="font-semibold">{message[0]?.email}</h2>
      <h2 className="font-semibold">{message[0]?.phone}</h2>
      <p className="mt-5 text-gray-700">{message[0]?.message}</p>
    </div>
  )
}
