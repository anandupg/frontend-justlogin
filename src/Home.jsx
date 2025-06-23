import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetch('http://localhost:5000/api/home', {
      headers: { 'Authorization': 'Bearer ' + token },
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/');
        }
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Home</h2>
      <div>{message}</div>
      <button onClick={handleLogout} style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
} 