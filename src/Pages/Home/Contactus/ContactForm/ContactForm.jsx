import  { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,name)
    // Handle form submission logic here
    // You can access the form values using the name, email, and message variables
  };

  return (
    <div className='help-form'>
     <form className="contact-form" onSubmit={handleSubmit}>
      <div className='help'>
      <div className="form-field">
      
      <input
        type="text"
        id="name"
        value={name}
        placeholder='Your name'
        onChange={handleChangeName}
        required
      />
    </div>
    <div className="form-field">
    
      <input
        type="email"
        id="email"
        value={email}
        
        placeholder='Your Email'
        onChange={handleChangeEmail}
        required
      />
    </div>
      </div>
      <div className="form-field">
        
        <textarea
          id="message"
          value={message}
          
          placeholder='Message'
          onChange={handleChangeMessage}
          required
        ></textarea>
      </div>
      <button className='bg-orange-200 p-2' type="submit">Submit</button>
    </form>
    </div>
    
  );
};

export default ContactForm;
