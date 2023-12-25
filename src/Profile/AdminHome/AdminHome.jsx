import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHome.css';

const AdminHome = () => {
  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
 

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/temporaryinfo');
        setPendingData(response.data);
      } catch (error) {
        console.error('Error fetching pending data:', error);
      }
    };

    fetchPendingData();
  }, []);

  const handleAcceptData = async (selectedData) => {
    if (!selectedData) return;
  
    try {
      // Send the original data to the '/info' endpoint
      await axios.post('http://localhost:5000/info', selectedData);
  
      // Delete the data from 'temporaryinfo' using the original _id
      await axios.delete(`http://localhost:5000/temporaryinfo/${selectedData._id}`);
     
      setSelectedData(null);
      setPendingData((prevData) => prevData.filter((data) => data._id !== selectedData._id));
      alert('Data accepted and submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  
  const handleRejectData = async (selectedData) => {
    if (!selectedData) return;

    try {
      await axios.delete(`http://localhost:5000/temporaryinfo/${selectedData._id}`);
      setSelectedData(null);
      setPendingData((prevData) => prevData.filter((data) => data._id !== selectedData._id));
      alert('Data rejected and removed successfully!');
    } catch (error) {
      console.error('Error rejecting data:', error);
      alert('There was an error rejecting the data.');
    }
  };

  return (
    <div className="admin-container">
      {pendingData.map((data) => (
        <div key={data._id} className="pending-data">
          <div className="info-section">
            <h2>Pending Data Review</h2>
            <p>University Name: {data.name}</p>
            <p>Teachers: {data.teachers}</p>
            <p>Admission Fees: {data.admissionFees}</p>
          </div>

          <div className="button-section">
            <button
              className="accept-button"
              onClick={() => handleAcceptData(data)}
             
            >
              Accept Data
            </button>
            <button className="reject-button" onClick={() => handleRejectData(data)}>
              Reject Data
            </button>
          </div>
        </div>
      ))}

      {selectedData && (
        <div className="selected-data">
          <div className="info-section">
            <h2>Selected Data</h2>
            <p>University Name: {selectedData.name}</p>
            <p>Teachers: {selectedData.teachers}</p>
            <p>Admission Fees: {selectedData.admissionFees}</p>
          </div>

          <div className="button-section">
            <button
              className="accept-button"
              onClick={() => handleAcceptData(selectedData)}
             
            >
              Confirm Acceptance
            </button>
            <button className="reject-button" onClick={() => handleRejectData(selectedData)}>
              Reject Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
