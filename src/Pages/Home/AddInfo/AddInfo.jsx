import  { useState } from 'react';
import './AddInfo.css'
const AddInfo = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    teachers: 0,
    admissionFees: 0,
    departmentName: '',
    facultyName: '',
    facultyPosition: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the data before submitting
    if (
      formData.universityName &&
      formData.teachers >= 0 &&
      formData.admissionFees >= 0 &&
      formData.departmentName &&
      formData.facultyName &&
      formData.facultyPosition
    ) {
      // Construct the submitted data in the required format
      const submittedData = {
        id: 1, // You may use a dynamic ID based on your application's logic
        name: formData.universityName,
        teachers: formData.teachers,
        admissionFees: formData.admissionFees,
        departments: [
          {
            id: 101, // You may use a dynamic ID for departments
            name: formData.departmentName,
            faculty: [
              {
                id: 1001, // You may use a dynamic ID for faculty members
                name: formData.facultyName,
                position: formData.facultyPosition,
              },
            ],
          },
        ],
      };

      // Log the submitted data to the console
      console.log('Submitted Data:', submittedData);

      // Reset the form after submission
      setFormData({
        universityName: '',
        teachers: 0,
        admissionFees: 0,
        departmentName: '',
        facultyName: '',
        facultyPosition: '',
      });
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  return (
    <div>
     
      <form className='form-container' onSubmit={handleSubmit}>
      <h1 className='font-bold'>Add University Data</h1>
        <label className='form-label'>
          University Name:
            <input className='form-input ' 
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
          />
        </label>
        
     
       
       
      
        <br />
        <label className='form-label'>
          Teachers:
            <input className='form-input '
            type="number"
            name="teachers"
            value={formData.teachers}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='form-label'>
          Admission Fees:
            <input className='form-input '
            type="number"
            name="admissionFees"
            value={formData.admissionFees}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='form-label'>
          Department Name:
            <input className='form-input '
            type="text"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='form-label'>
          Faculty Name:
            <input className='form-input '
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='form-label'>
          Faculty Position:
            <input className='form-input '
            type="text"
            name="facultyPosition"
            value={formData.facultyPosition}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddInfo;
