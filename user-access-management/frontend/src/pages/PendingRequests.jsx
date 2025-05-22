import React, { useEffect, useState } from 'react';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/requests/pending', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      setRequests(requests.filter(r => r.id !== id));
    } catch {
      alert('Error updating request');
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map(r => (
        <div key={r.id}>
          <p><strong>User:</strong> {r.user.username}</p>
          <p><strong>Software:</strong> {r.software.name}</p>
          <p><strong>Access:</strong> {r.accessType}</p>
          <p><strong>Reason:</strong> {r.reason}</p>
          <button onClick={() => updateStatus(r.id, 'Approved')}>Approve</button>
          <button onClick={() => updateStatus(r.id, 'Rejected')}>Reject</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PendingRequests;