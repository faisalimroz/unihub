import React, { useState } from 'react';
import './UniversityList.css';
import { FaArrowRight } from "react-icons/fa";

const UniversityList = ({ universities, onClick }) => {
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentsFilter, setSelectedDepartmentsFilter] = useState([]);

    const handleClick = (university) => {
        if (selectedUniversity === university) {
            setSelectedUniversity(null);
            setSelectedDepartment(null);
        } else {
            setSelectedUniversity(university);
            setSelectedDepartment(null); // Reset selected department when changing the university
        }
    };

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    const handleCheckboxChange = (department) => {
        // Toggle the selected department in the filter list
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

    // Collect unique department names from all universities
    const allDepartments = Array.from(
        new Set(
            universities.reduce((departments, university) => {
                return departments.concat(university.departments.map((department) => department.name));
            }, [])
        )
    );

    // Filter universities based on selected departments
    const filteredUniversities = universities.filter((university) => {
        if (selectedDepartmentsFilter.length === 0) {
            // No filter applied, show all universities
            return true;
        } else {
            // Check if any selected department exists in the university's departments
            return university.departments.some((department) =>
                selectedDepartmentsFilter.includes(department.name)
            );
        }
    });


    return (
        <div className='flex'>
            <div className='div-checkbox ml-5 mt-5'>
                <div>
                    {/* Checkbox filters for all departments */}
                    {allDepartments.map((department, index) => (
                        <div key={index}>
                            <label className='checkbox-label '>
                                <input className='checkbox-input  '
                                    type="checkbox"
                                    checked={isDepartmentSelected(department)}
                                    onChange={() => handleCheckboxChange(department)}
                                />
                                {department}
                            </label>
                        </div>
                    ))}
                </div>

            </div>
            <div className='div-info mt-5'>
                <ul>
                    {filteredUniversities.map((university, index) => (
                        <React.Fragment key={index}>
                            <div style={{ display: 'flex', alignItems: 'center',border: '1px solid black', padding: '5px', margin: '0 0' }} onClick={() => handleClick(university)} >
                             {index+1}   <FaArrowRight className='ml-3 mr-2' /> {university.name}
                            </div>
                            {selectedUniversity && selectedUniversity.id === university.id && (
                                <div className=''>
                                    <p style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}>Teachers: {selectedUniversity.teachers}</p>
                                    <p style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}>Admission Fees: {selectedUniversity.admissionFees}</p>
                                    <p style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}>Departments:</p>
                                    <ul>
                                        {university.departments.map((department, deptIndex) => (
                                            <li style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}
                                                key={deptIndex}
                                                onClick={() => handleDepartmentClick(department)}
                                            >
                                                {department.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {selectedDepartment && (
                                        <div>
                                            <p style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}>Selected Department: {selectedDepartment.name}</p>
                                            <p style={{ border: '1px solid black', padding: '5px', margin: '0 0' }}>Faculty:</p>
                                            <ul>
                                                {selectedDepartment.faculty.map((facultyMember, facultyIndex) => (
                                                    <li className='' style={{ border: '1px solid black', padding: '5px', margin: '0 0' }} key={facultyIndex}>{facultyMember.name}</li>
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
    );
};

export default UniversityList;
