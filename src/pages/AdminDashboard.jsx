import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
    return (
        <div className="admin-dashboard-container">
            <div className="admin-header">
                <h1 className="page-title">Welcome, Admin!</h1>
                <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
            <p className="dashboard-intro">Manage your club's content here.</p>

            <div className="admin-features-grid">
                {/* Link to Admin Teams Management Page */}
                <Link to="/admin/teams" className="feature-card">
                    <h2>Manage Team Members</h2>
                    <p>Add, edit, or remove student team members.</p>
                    <span className="feature-icon">👥</span>
                </Link>

                {/* Re-enabled: Link to Admin Events Management Page */}
                <Link to="/admin/events" className="feature-card">
                    <h2>Manage Events</h2>
                    <p>Add, edit, or remove club events.</p>
                    <span className="feature-icon">🗓️</span>
                </Link>

                {/* You can add more admin features here */}
                {/* <Link to="/admin/news" className="feature-card">
                    <h2>Manage News/Announcements</h2>
                    <p>Create and update club announcements.</p>
                    <span className="feature-icon">📰</span>
                </Link> */}
            </div>
        </div>
    );
};

export default AdminDashboard;
