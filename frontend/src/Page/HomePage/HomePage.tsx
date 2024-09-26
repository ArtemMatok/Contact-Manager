import React, { useState } from "react";
import { UploadCSV } from "../../Services/Contact";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


type Props = {};

const HomePage = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    console.log(selectedFile);
  };

  const handleSumbit = () => {
    const submit = async() => {
        const data = await UploadCSV(file);
        if(data){
            console.log(data);
            navigate('/data');
        }
    }
    submit();
  }
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg w-96 mx-auto mt-10">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
      />
      <button onClick={handleSumbit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
    
        Upload
      </button>

      <Link to={"/data"} className= "mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Go to Data
      </Link>
    </div>
  );
};

export default HomePage;
