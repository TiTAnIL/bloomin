import React, { useState } from 'react';

export function GreetingModal({ open, onClose, onSave }) {
  const [greeting, setGreeting] = useState('');

  const handleSave = () => {
    onSave(greeting)
    setGreeting('')
    onClose()
  }

  // Close the modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  // Attach click listener to the document when modal is open
  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });
  

  return (
    <div className={`modal ${open ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add a Greeting</h2>
        <input
          type="text"
          placeholder="Greeting"
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
        />
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
