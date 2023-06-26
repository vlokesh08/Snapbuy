import { React , useState, useEffect } from 'react';
import axios from 'axios';

function NewRequest() {
    const [reqName, setName] = useState('');
    const [reqTitle, reqTetTitle] = useState('');
    const [reqDescription, setDescription] = useState('');
  

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
          const formData = new FormData();
          formData.append('reqName', reqName);
          formData.append('reqTitle', reqTitle);
          formData.append('reqDescription', reqDescription);
          console.log(reqName);
          await axios.post('http://localhost:5001/api/lala', { FormData }, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Data successfully sent to the backend
        } catch (error) {
          console.error(error);
          // Handle error
        }
    };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium  dark:text-black">Your Name</label>
                <input type="text"
                    value={reqName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" 
                    class="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    required />
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium  dark:text-black">reqTitle</label>
                <input type="text"
                    value={reqTitle}
                    onChange={(e) => reqTetTitle(e.target.value)}
                    placeholder="Enter reqTitle of the Product" 
                    class="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    required />  </div>
            <div class="mb-6">
                <label for="repeat-password" class="block mb-2 text-sm font-medium  dark:text-black">Description</label>
                <input type="text"
                    value={reqDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter reqDescription of Product" 
                    class="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    required />
            </div>
            <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="terms" class="ml-2 text-sm font-medium  dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
    </div>
  )
}

export default NewRequest