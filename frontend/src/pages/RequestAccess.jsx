import React, { useState, useEffect } from 'react';

const RequestAccess = () => {
  const [softwares, setSoftwares] = useState([]);
  const [form, setForm] = useState({ softwareId: '', accessType: '', reason: '' });

  useEffect(() => {
    fetch('/api/software', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setSoftwares(data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) alert('Request submitted');
      else alert('Error submitting request');
    } catch {
      alert('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Software Access</h2>
      <select name="softwareId" onChange={handleChange} required>
        <option value="">Select Software</option>
        {softwares.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <select name="accessType" onChange={handleChange} required>
        <option value="">Select Access Type</option>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <textarea name="reason" placeholder="Reason" onChange={handleChange} required />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestAccess;