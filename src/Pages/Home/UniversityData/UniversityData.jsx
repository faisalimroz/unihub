import { useEffect, useState } from 'react';
import './UniversityData.css';
import UniversityList from './UniversityList/UniversityList';
import axios from 'axios';

const UniversityData = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Api request to fetch the data
    axios.get("unihub-server.vercel.app/info")
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
