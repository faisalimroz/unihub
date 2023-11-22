// UniversityData.js
import { useEffect, useState } from 'react';
import './UniversityData.css';
import UniversityList from './UniversityList/UniversityList';
import axios from 'axios';

const UniversityData = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the data
    axios.get("data.json")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
  };

  const handleDepartmentClick = (department) => {
    // Handle the department click, you can fetch faculty data here if needed
    console.log("Clicked on department:", department);
  };

  return (
    <div className='mb-[250px]'>
      <div>
        <UniversityList
          universities={universities}
          onClick={handleUniversityClick}
          onDepartmentClick={handleDepartmentClick}
        />
      </div>
    </div>
  );
};

export default UniversityData;
