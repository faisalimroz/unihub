import React, { useEffect, useState } from 'react';
import './UniversityList.css';
import { FaArrowRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const UniversityList = ({ universities, onClick }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentsFilter, setSelectedDepartmentsFilter] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(intervalId); 
  }, [currentSlide]);

  const totalSlides = 3;
  const handleClick = (university) => {
    if (selectedUniversity === university) {
      setSelectedUniversity(null);
      setSelectedDepartment(null);
    } else {
      setSelectedUniversity(university);
      setSelectedDepartment(null); 
    }
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleCheckboxChange = (department) => {
    setSelectedDepartmentsFilter((prevFilter) => {
      if (prevFilter.includes(department)) {
        return prevFilter.filter((selectedDept) => selectedDept !== department);
      } else {
        return [...prevFilter, department];
      }
    });
  };

  const isDepartmentSelected = (department) => {
    return selectedDepartmentsFilter.includes(department);
  };

  const allDepartments = Array.from(
    new Set(
      universities.reduce((departments, university) => {
        return departments.concat(university.departments.map((department) => department.name));
      }, [])
    )
  );

  const filteredUniversities = universities.filter((university) => {
    if (selectedDepartmentsFilter.length === 0) {
      return true;
    } else {
      return university.departments.some((department) => selectedDepartmentsFilter.includes(department.name));
    }
  });

  return (
    <>
      <div className='banner-index'>
        <div className="hero min-h-[50vh] banners relative" id='banner'>
          
          <Carousel selectedItem={currentSlide} onChange={(index) => setCurrentSlide(index)}>
            <div>
              <img src="https://i.ibb.co/HVwS1yf/image.png" alt="Slide 1" style={{ maxHeight: '600px' }} />
            </div>
            <div>
              <img src="https://i.ibb.co/GCL2STr/image.png" alt="Slide 3" style={{ maxHeight: '600px' }} />
            </div>
            <div>
              <img src="https://i.ibb.co/r4YWXGp/image.png" alt="Slide 2" style={{ maxHeight: '600px' }} />
            </div>
           
          </Carousel>
        </div>
      </div>
      <div className='flex'>
        <div className='div-checkbox ml-5 mt-5'>
          <div>
            {allDepartments.map((department, index) => (
              <div key={index} style={{ marginBottom: '5px' }} className='checkbox-container'>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',



                    backgroundColor: isDepartmentSelected(department) ? '#8a2be2' : '#fff',
                    color: isDepartmentSelected(department) ? '#fff' : '#000',
                    transition: 'background-color 0.3s, border-color 0.3s',
                  }}
                  className={`checkbox-label ${isDepartmentSelected(department) ? 'checked' : ''}`}
                >
                  <input
                    className='checkbox-input'
                    type='checkbox'
                    checked={isDepartmentSelected(department)}
                    onChange={() => handleCheckboxChange(department)}
                    style={{ marginRight: '8px' }}
                  />
                  {department}
                </label>
              </div>

            ))}
          </div>
        </div>
        <div className='div-info mt-5 mr-4' style={{ fontFamily: 'serif' }}>
          <ul>
            {filteredUniversities.map((university, index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #8a2be2',
                    padding: '5px',
                    margin: '0 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleClick(university)}
                >
                  {index + 1} <FaArrowRight className='ml-3 mr-2' /> {university.name}
                </div>
                {selectedUniversity && selectedUniversity._id === university._id && (
                  <div>
                    <p style={{ border: '2px solid #8a2be2', padding: '5px', margin: '0 0' }}>Teachers: {selectedUniversity.teachers}</p>
                    <p style={{ border: '2px solid #8a2be2', padding: '5px', margin: '0 0' }}>Admission Fees: {selectedUniversity.admissionFees}</p>
                    <p style={{ border: '2px solid #8a2be2', padding: '5px', margin: '0 0' }}>Departments:</p>
                    <ul>
                      {university.departments.map((department, deptIndex) => (
                        <li
                          style={{
                            border: '2px solid #8a2be2',
                            padding: '5px',
                            margin: '0 0',
                            cursor: 'pointer',
                            background: selectedDepartment && selectedDepartment.name === department.name ? '#8a2be2' : 'none',
                            color: selectedDepartment && selectedDepartment.name === department.name ? '#fff' : '#000',
                          }}
                          key={deptIndex}
                          onClick={() => handleDepartmentClick(department)}
                        >
                          {department.name}
                        </li>
                      ))}
                    </ul>
                    {selectedDepartment && (
                      <div>
                        {/* <p style={{ border: '2px solid #8a2be2', padding: '5px', margin: '0 0',background:'	 #d9d9d9' }}>
                      Selected Department: {selectedDepartment.name}
                    </p> */}
                        <p style={{ border: '2px solid #8a2be2', padding: '5px', margin: '0 0', background: '	 #d9d9d9' }}>Faculty:</p>
                        <ul>
                          {selectedDepartment.faculty.map((facultyMember, facultyIndex) => (
                            <li
                              className=''
                              style={{
                                border: '1px solid #8a2be2',
                                padding: '5px',
                                margin: '0 0',
                                background: '#f0f0f0', // Set background color for faculty items
                              }}
                              key={facultyIndex}
                            >
                              {facultyMember.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UniversityList;
