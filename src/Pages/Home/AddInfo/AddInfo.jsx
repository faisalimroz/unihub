import {  useState } from 'react';
import axios from 'axios';
import './AddInfo.css';
import Swal from 'sweetalert2';
const AddInfo = () => {
 
  const [formData, setFormData] = useState({
    universityName: '',
    teachers: 0,
    admissionFees: 0,
    departments: [{ name: '', faculties: [{ facultyName: '', facultyPosition: '' }] }],
  });
    
  const handleChange = (e, deptIndex, facIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (deptIndex !== undefined && facIndex !== undefined) {
      updatedFormData.departments[deptIndex].faculties[facIndex][name] = value;
    } else if (deptIndex !== undefined) {
      updatedFormData.departments[deptIndex][name] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const handleAddDepartment = () => {
    const updatedFormData = { ...formData };
    updatedFormData.departments.push({ name: '', faculties: [{ facultyName: '', facultyPosition: '' }] });
    setFormData(updatedFormData);
  };

  const handleAddFaculty = (deptIndex) => {
    const updatedFormData = { ...formData };
    updatedFormData.departments[deptIndex].faculties.push({ facultyName: '', facultyPosition: '' });
    setFormData(updatedFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the data before submitting
    if (
      formData.universityName &&
      formData.teachers >= 0 &&
      formData.admissionFees >= 0 &&
      formData.departments.length > 0 &&
      formData.departments.every((dept) => dept.name && dept.faculties.length > 0)
    ) {
      try {
        const response = await axios.post('https://unihub-server-ne3q.vercel.app//temporaryinfo', {
          universityData: {
            id: 1,
            name: formData.universityName,
            teachers: formData.teachers,
            admissionFees: formData.admissionFees,
            departments: formData.departments.map((dept, deptIndex) => ({
              id: deptIndex + 1,
              name: dept.name,
              faculty: dept.faculties.map((fac, facIndex) => ({
                id: facIndex + 1,
                name: fac.facultyName,
                position: fac.facultyPosition,
              })),
            })),
          },
        });

        // Handle success, e.g., show a success message or redirect the user
        console.log('Post Request Successful:', response.data);

        // Reset the form after successful submission
        setFormData({
          universityName: '',
          teachers: 0,
          admissionFees: 0,
          departments: [{ name: '', faculties: [{ facultyName: '', facultyPosition: '' }] }],
        });
      } catch (error) {
        // Log the error for debugging
        console.error('Error during post request:', error);

        // Show an error message to the user
        alert('There was an error submitting the data. Please try again.');
      }
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };


  return (
    <div className='mt-4 mb-4'>
      <form  className='form-container border-4 border-purple-400 '  onSubmit={handleSubmit}>
        <h1 className='font-bold'>Add University Data</h1>
        <label className='form-label'>
          University Name:
          <input
            className='form-input '
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label className='form-label'>
          Teachers:
          <input
            className='form-input mr-12'
            type="number"
            name="teachers"
            value={formData.teachers}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label className='form-label'>
          Admission Fees:
          <input
            className='form-input '
            type="number"
            name="admissionFees"
            value={formData.admissionFees}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        {formData.departments.map((dept, deptIndex) => (
          <div key={deptIndex}>
            <label className='form-label'>
              Department Name:
              <input
                className='form-input ml-3'
                type="text"
                name="name"
                value={dept.name}
                onChange={(e) => handleChange(e, deptIndex)}
              />
              <button type="button" className='university bg-purple-400 mt-3 ml-4 p-2 rounded' onClick={handleAddDepartment}>
                Add Department
              </button>
            </label>
            {dept.faculties.map((fac, facIndex) => (
              <div key={facIndex}>
                <label className='form-label ml-5'>
                  Faculty Name:
                  <input
                    className='form-input ml-3'
                    type="text"
                    name="facultyName"
                    value={fac.facultyName}
                    onChange={(e) => handleChange(e, deptIndex, facIndex)}
                  />
                </label>
                <label className='form-label ml-3'>
                  Faculty Position:
                  <input
                    className='form-input ml-3 '
                    type="text"
                    name="facultyPosition"
                    value={fac.facultyPosition}
                    onChange={(e) => handleChange(e, deptIndex, facIndex)}
                  />
                  <button
                    className='university bg-purple-400 mt-3 p-2 rounded ml-5'
                    type="button"
                    onClick={() => handleAddFaculty(deptIndex)}
                  >
                    Add Faculty
                  </button>
                </label>
              </div>
            ))}
          </div>
        ))}
        <br />
        <button  className='university submit-button bold bg-purple-400 rounded p-2' type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInfo;
