import React from 'react';

const PatientDashboard: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f8ff' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#2c3e50' }}>🎉 Congratulations! 🎉</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>
          You have successfully registered at <strong>Shifa Clinic</strong>.
        </p>
        <p style={{ fontSize: '16px', color: '#777' }}>
          Welcome to our family! We are committed to your health and well-being.
        </p>
      </div>
    </div>
  );
};

export default PatientDashboard;
