import React, { useState } from 'react';
import './RegistrationPopup.css';

export default function RegistrationPopup({ open, onClose, onSubmit, defaultEmail }) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  if (!open) return null;

  return (
    <div className="reg-overlay">
      <div className="reg-modal">
        <h3>Register for Client Intake Access</h3>
        <p>You're almost done. Please provide company details to get access.</p>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
        <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Contact Person" />
        <div className="reg-actions">
          <button onClick={() => onSubmit({ company_name: companyName, contact_person: contactPerson })}>Submit</button>
          <button className="muted" onClick={onClose}>Cancel</button>
        </div>
        <div className="small">Contact email: {defaultEmail}</div>
      </div>
    </div>
  );
}
