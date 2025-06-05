import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EventManagement.css'; // Make sure you have this CSS file for styling

const API_BASE_URL = 'http://localhost:5000/api';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventDescription: '',
        eventLocation: '',
        speakers: [{ name: '', id: '' }], // Initialize as array of objects
        posterType: 'upload', // Default to 'upload'
        posterFile: null,
        posterUrl: '',
        reportLink: '',
        academicYear: '2024-25' // Default academic year
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const academicYears = ['2024-25', '2025-26']; // Available academic years

    // Fetch events when component mounts or when events are updated
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        setError('');
        try {
            const token = sessionStorage.getItem('adminToken');
            if (!token) {
                setError('Authentication token missing. Please log in.');
                setLoading(false);
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/events`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to fetch events. ' + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'posterFile') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setError(''); // Clear error on change
    };

    const handleSpeakerChange = (index, e) => {
        const { name, value } = e.target;
        const newSpeakers = [...formData.speakers];
        newSpeakers[index] = {
            ...newSpeakers[index],
            [name]: name === 'id' ? (value === '' ? '' : Number(value)) : value // Convert ID to number, handle empty string
        };
        setFormData({ ...formData, speakers: newSpeakers });
        setError('');
    };

    const addSpeakerField = () => {
        setFormData({
            ...formData,
            speakers: [...formData.speakers, { name: '', id: '' }]
        });
    };

    const removeSpeakerField = (index) => {
        const newSpeakers = formData.speakers.filter((_, i) => i !== index);
        setFormData({ ...formData, speakers: newSpeakers });
    };

    const handlePosterTypeChange = (e) => {
        setFormData({
            ...formData,
            posterType: e.target.value,
            posterFile: null, // Clear file if switching type
            posterUrl: '' // Clear URL if switching type
        });
        setError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            setError('Authentication token missing. Please log in.');
            return;
        }

        // Validate speakers array: must not be empty and all elements must be valid
        const hasValidSpeakers = formData.speakers.length > 0 &&
            formData.speakers.every(s => s.name && typeof s.id === 'number' && s.id > 0);

        if (!formData.eventName || !formData.eventDate || !formData.academicYear || !hasValidSpeakers) {
            setError('Please fill all required fields: Event Name, Date, Academic Year, and at least one Speaker with Name and valid ID.');
            return;
        }

        if (formData.posterType === 'upload' && !formData.posterFile && !isEditing) {
            setError('Please select a poster file for upload type.');
            return;
        }
        if (formData.posterType === 'url' && !formData.posterUrl) {
            setError('Please provide a poster URL for URL type.');
            return;
        }
        if (!formData.eventName || !formData.eventDate || !formData.academicYear || !formData.eventLocation || !hasValidSpeakers) {
        setError('Please fill all required fields: Event Name, Date, Academic Year, Location, and at least one Speaker with Name and valid ID.');
        return;
    }

        const data = new FormData();
        data.append('eventName', formData.eventName);
        data.append('eventDate', formData.eventDate);
        data.append('eventDescription', formData.eventDescription);
        data.append('academicYear', formData.academicYear);
        data.append('reportLink', formData.reportLink); // Can be empty or null
        data.append('eventLocation', formData.eventLocation); // <--- Append eventLocation


        // Speakers array needs to be stringified as JSON for FormData
        data.append('speakers', JSON.stringify(formData.speakers));

        // Poster handling
        data.append('posterType', formData.posterType);
        if (formData.posterType === 'upload' && formData.posterFile) {
            data.append('posterFile', formData.posterFile); // Append the actual file
        } else if (formData.posterType === 'url') {
            data.append('posterUrl', formData.posterUrl); // Append the URL string
        }


        try {
            if (isEditing) {
                await axios.put(`${API_BASE_URL}/events/${currentEventId}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Important for file uploads
                    }
                });
                setMessage('Event updated successfully!');
            } else {
                await axios.post(`${API_BASE_URL}/events`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Important for file uploads
                    }
                });
                setMessage('Event created successfully!');
            }
            resetForm();
            fetchEvents(); // Refresh event list
        } catch (err) {
            console.error('Error submitting event:', err);
            setError('Failed to save event. ' + (err.response?.data?.message || err.message));
        }
    };

        const handleEdit = (event) => {
        setIsEditing(true);
        setCurrentEventId(event._id);

        // Map speakers back to {name: '', id: ''} structure for the form
        const mappedSpeakers = event.speakers.map(s => ({
            name: s.name,
            id: s.id // ID should be number
        }));

        // --- CRITICAL LINE FOR DATE HANDLING ---
        const formattedDate = event.eventDate
            ? new Date(event.eventDate).toISOString().split('T')[0]
            : ''; // Set to empty string if eventDate is invalid or missing

        setFormData({
            eventName: event.eventName,
            eventDate: formattedDate, // Use the new formattedDate
            eventDescription: event.eventDescription || '',
            eventLocation: event.eventLocation || '', // <--- Populate eventLocation

            speakers: mappedSpeakers.length > 0 ? mappedSpeakers : [{ name: '', id: '' }], // Ensure at least one empty speaker
            posterType: event.poster.type,
            posterFile: null, // Don't pre-fill file input
            posterUrl: event.poster.type === 'url' ? event.poster.value : '',
            reportLink: event.reportLink || '',
            academicYear: event.academicYear || '2024-25'
        });
        setMessage('');
        setError('');
    };

    const handleDelete = async (id, posterData) => {
        if (!window.confirm('Are you sure you want to delete this event?')) {
            return;
        }
        setMessage('');
        setError('');
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            setError('Authentication token missing. Please log in.');
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Event deleted successfully!');
            fetchEvents();
        } catch (err) {
            console.error('Error deleting event:', err);
            setError('Failed to delete event. ' + (err.response?.data?.message || err.message));
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentEventId(null);
        setFormData({
            eventName: '',
            eventDate: '',
            eventDescription: '',
            eventLocation: '', // <--- Clear eventLocation

            speakers: [{ name: '', id: '' }],
            posterType: 'upload',
            posterFile: null,
            posterUrl: '',
            reportLink: '',
            academicYear: '2024-25'
        });
        setError('');
    };

    if (loading) {
        return <div className="event-management-container">Loading events...</div>;
    }

    return (
        <div className="event-management-container">
            <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
            <label htmlFor="eventLocation">Event Location:</label>
            <input
                type="text" // Or appropriate type like 'url' if it's a virtual link
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                required // <--- Make it required as per backend validation
            />
        </div>
                <div className="form-group">
                    <label htmlFor="academicYear">Academic Year:</label>
                    <select
                        id="academicYear"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        required
                    >
                        {academicYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="eventDescription">Description:</label>
                    <textarea
                        id="eventDescription"
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Speakers:</label>
                    {formData.speakers.map((speaker, index) => (
                        <div key={index} className="speaker-input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Speaker Name"
                                value={speaker.name}
                                onChange={(e) => handleSpeakerChange(index, e)}
                                required
                            />
                            <input
                                type="number" // Changed to number type for ID
                                name="id"
                                placeholder="Speaker ID (e.g., 123)"
                                value={speaker.id}
                                onChange={(e) => handleSpeakerChange(index, e)}
                                min="1" // Assuming ID is positive
                                required
                            />
                            {formData.speakers.length > 1 && (
                                <button type="button" onClick={() => removeSpeakerField(index)} className="remove-speaker-btn">
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addSpeakerField} className="add-speaker-btn">
                        Add Speaker
                    </button>
                </div>

                <div className="form-group">
                    <label>Poster Type:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="posterType"
                                value="upload"
                                checked={formData.posterType === 'upload'}
                                onChange={handlePosterTypeChange}
                            /> Upload File
                        </label>
                        <label style={{ marginLeft: '15px' }}>
                            <input
                                type="radio"
                                name="posterType"
                                value="url"
                                checked={formData.posterType === 'url'}
                                onChange={handlePosterTypeChange}
                            /> Provide URL
                        </label>
                    </div>
                </div>

                {formData.posterType === 'upload' && (
                    <div className="form-group">
                        <label htmlFor="posterFile">Poster File:</label>
                        <input
                            type="file"
                            id="posterFile"
                            name="posterFile"
                            onChange={handleChange}
                            accept="image/jpeg,image/png,image/webp"
                            // required={!isEditing || !formData.posterFile} // Make required if adding, or if no file on edit
                        />
                        {isEditing && formData.posterFile === null && (
                            <p style={{ fontSize: '0.8em', color: '#666' }}>
                                (Leave blank to keep existing poster, or select new file to replace)
                            </p>
                        )}
                        {isEditing && formData.currentPosterValue && (
                            <p style={{ fontSize: '0.8em', color: '#666' }}>
                                Current: <a href={formData.currentPosterValue.startsWith('http') ? formData.currentPosterValue : `${API_BASE_URL}${formData.currentPosterValue}`} target="_blank" rel="noopener noreferrer">View Current Poster</a>
                            </p>
                        )}
                    </div>
                )}

                {formData.posterType === 'url' && (
                    <div className="form-group">
                        <label htmlFor="posterUrl">Poster URL:</label>
                        <input
                            type="url"
                            id="posterUrl"
                            name="posterUrl"
                            value={formData.posterUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/poster.jpg"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="reportLink">Report Link (Optional):</label>
                    <input
                        type="url"
                        id="reportLink"
                        name="reportLink"
                        value={formData.reportLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/your-report"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {isEditing ? 'Update Event' : 'Add Event'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="cancel-btn">
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginTop: '40px' }}>Existing Events</h2>
            <div className="event-list">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <ul className="events-ul">
                        {events.map((event) => (
                            <li key={event._id} className="event-list-item">
                                <div className="event-details">
                                    <h3>{event.eventName} ({event.academicYear})</h3>
                                    <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                                    <p>Description: {event.eventDescription}</p>
                                    <p>Speakers:
                                        {event.speakers.map((s, idx) => (
                                            <span key={idx}> {s.name} ({s.id}){idx < event.speakers.length - 1 ? ',' : ''}</span>
                                        ))}
                                    </p>
                                    {event.poster && event.poster.value && (
                                        <p>Poster: <a href={event.poster.value.startsWith('http') ? event.poster.value : `${API_BASE_URL}${event.poster.value}`} target="_blank" rel="noopener noreferrer">View Poster ({event.poster.type})</a></p>
                                    )}
                                    {event.reportLink && (
                                        <p>Report: <a href={event.reportLink} target="_blank" rel="noopener noreferrer">View Report</a></p>
                                    )}
                                </div>
                                <div className="event-actions">
                                    <button onClick={() => handleEdit(event)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(event._id, event.poster)} className="delete-btn">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EventManagement;