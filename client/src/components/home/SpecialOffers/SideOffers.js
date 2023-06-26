import { React , useState, useEffect } from "react";
import axios from "axios";
import Heading from "../Products/Heading";

function SideOffers() {
    const [temp, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(temp);
  }, [temp]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/items');
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
        <Heading heading="Requests" />
        {temp && temp.map((doc) => (
            <div className=" bg-slate-100 shadow-lg w-full m-4 p-5 rounded-lg">
                <h1 className=" font-extrabold text-lg">{doc.reqName}</h1>
                <h2>{doc.reqTitle}</h2>
                <h4>{doc.reqDescription}</h4>
            </div>
      ))}
        
    </div>
  )
}

export default SideOffers