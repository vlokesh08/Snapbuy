import { React , useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
// import axios from "axios";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
} from "../../../assets/images/index";
import axios from "axios";

const SpecialOffers = () => {
  const [temp, setData] = useState([]);
  // const [imageDataUrl, setImageDataUrl] = useState('');

  function bufferToDataURL(buffer, contentType) {
    const base64 = buffer.toString('base64');
    return `data:${contentType};base64,${base64}`;
  }
  
  // useEffect(() => {
  //   // Assuming you have received the image data from the server
  //   // image.data is the buffer and image.contentType is the content type (e.g., "image/png")
  //   const dataUrl = bufferToDataURL(image.data, image.contentType);
  //   setImageDataUrl(dataUrl);
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(temp);
  }, [temp]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/data');
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="felx flex-wrap justify-center w-full pb-20">
      <Heading heading="Products" />
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-7 justify-between">
      {temp && temp.map((doc) => (
        // console.log(bufferToDataURL(doc.image.data, doc.image.contentType))
        <Product
          _id={doc._id}
          img={`data:${doc.image.contentType};base64,${doc.image.data.toString('base64')}`}
          productName={doc.title}
          price={doc.price}
          color="Blank and White"
          badge={true}
          des={doc.description}
        />
      ))}
      </div>
    </div>
  );
};


export default SpecialOffers;
