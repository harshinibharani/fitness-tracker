import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import RegistrationPage from './components/RegistrationPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import LogWorkout from './components/LogWorkout';
import TrackMacros from './components/TrackMacros';
import { theme } from './theme'; // Import your custom theme
import { ThemeProvider } from '@mui/material/styles';

function App() {

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/logworkout" element={<LogWorkout />} />
          <Route path="/trackmacros" element={<TrackMacros />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
