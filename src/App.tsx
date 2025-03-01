import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginForm from './components/LoginForm';
import PatientRegistration from './components/PatientRegistration';
import DoctorDashboard from './components/DoctorDashboard';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/register"
            element={
              <PrivateRoute
                element={<PatientRegistration />}
              />
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <PrivateRoute
                element={<DoctorDashboard />}
              />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;