import React, { useState, useEffect, useRef } from 'react';

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Ref to the modal element
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Attach click listener to the document when modal is open


  const handleLogin = async (e) => {
    e.preventDefault();

    // Send a request to your backend to initiate the Auth0 login process
    // You'll need to implement this part based on your server's Auth0 configuration
  }

  return (
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="login-modal-inner" ref={modalRef}>
        <span className="login-modal-close" onClick={onClose}>
          X
        </span>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
