import React, { useState } from 'react';

const CreateSoftware = () => {
  const [form, setForm] = useState({ name: '', description: '', accessLevels: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/software', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...form, accessLevels: form.accessLevels.split(',') })
      });
      if (res.ok) alert('Software created');
      else alert('Error creating software');
    } catch {
      alert('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Software</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <input name="accessLevels" placeholder="Access Levels (comma-separated)" onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateSoftware;