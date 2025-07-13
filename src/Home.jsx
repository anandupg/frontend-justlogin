import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Use backend URL directly

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/home`, {
      credentials: 'include', // Important for cookies!
    })
      .then(res => {
        setLoading(false);
        if (res.status === 401 || res.status === 403) {
          navigate('/');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.message) setMessage(data.message);
      })
      .catch(() => {
        setLoading(false);
        setMessage('Error fetching message');
      });
  }, [navigate]);

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/', { state: { logout: true } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Home</h2>
      <div>{message}</div>
      <button onClick={handleLogout} style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
} 