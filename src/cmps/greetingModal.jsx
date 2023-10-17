import React, { useState } from 'react';

export function GreetingModal({ open, onClose, onSave }) {
  const [greeting, setGreeting] = useState('');

  const handleSave = () => {
    onSave(greeting)
    setGreeting('')
    onClose()
  }

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
