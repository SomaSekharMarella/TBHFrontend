import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; // <--- IMPORTANT: Import axios here

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import About from './pages/AboutUsPage';
import Events from './pages/EventsPage'; // Public Events Page
import Team from './pages/TeamPage';  // Public Teams Page
import Contact from './pages/ContactUs';
import Gallery from './pages/GalleryPage'; // <--- Add this import

import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminTeamsPage from './pages/AdminTeamsPage'; // Admin Teams Management
import AdminEventsPage from './components/EventManagement'; // Admin Events Management

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // This useEffect runs once on component mount to check for existing token
    // and sets up axios default header if a token is found.
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            setIsAdminLoggedIn(true);
            // Set default Authorization header for all Axios requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            setIsAdminLoggedIn(false);
            // Clear default Authorization header if no token
            delete axios.defaults.headers.common['Authorization'];
        }
    }, []); // Empty dependency array means this runs only once on mount

    // handleLogin is called by AdminLogin component upon successful login
    const handleLogin = (status) => {
        setIsAdminLoggedIn(status);
        if (status) {
            // After successful login, AdminLogin component stores the token in sessionStorage.
            // We need to ensure axios picks it up for subsequent requests.
            const token = sessionStorage.getItem('adminToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
    };

    // handleLogout is called from AdminDashboard or other admin components
    const handleLogout = () => {
        sessionStorage.removeItem('adminToken'); // Remove token from storage
        setIsAdminLoggedIn(false); // Update state
        delete axios.defaults.headers.common['Authorization']; // Clear default header for axios
        // Optionally, navigate to the public home page or admin login page after logout
        // navigate('/'); // Example if you have a navigate hook here
    };

    return (
        <Router>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gallery" element={<Gallery />} /> {/* <--- Add this route */}

                        {/* Admin Login Route */}
                        <Route
                            path="/admin"
                            element={isAdminLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLogin={handleLogin} />}
                        />

                        {/* Admin Protected Routes */}
                        <Route
                            path="/admin/dashboard"
                            element={isAdminLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin" replace />}
                        />
                        <Route
                            path="/admin/teams"
                            element={isAdminLoggedIn ? <AdminTeamsPage /> : <Navigate to="/admin" replace />}
                        />
                        <Route
                            path="/admin/events" // Route for Admin Events Management
                            element={isAdminLoggedIn ? <AdminEventsPage /> : <Navigate to="/admin" replace />}
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;