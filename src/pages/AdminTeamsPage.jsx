import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/AdminTeamsPage.css'; // You'll create this CSS file

const API_BASE_URL = 'http://localhost:5000'; // Your backend URL

// --- AdminTeamMemberCard Component (for display within admin page) ---
// This card includes edit and delete buttons.
const AdminTeamMemberCard = ({ member, onEdit, onDelete }) => {
    let photoSrc;
    if (member.photo.type === 'upload') {
        photoSrc = `${API_BASE_URL}${member.photo.value}`;
    } else if (member.photo.type === 'url') {
        photoSrc = member.photo.value;
    } else {
        photoSrc = 'https://via.placeholder.com/100x100/E0E0E0/888888?text=No+Photo';
    }

    return (
        <div className="admin-member-card">
            <div className="member-info-left">
                <div className="member-photo-container">
                    <img
                        src={photoSrc}
                        alt={member.name}
                        className="member-photo"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100x100/E0E0E0/888888?text=No+Photo';
                        }}
                    />
                </div>
                <div className="member-details-text">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position} ({member.academicYear})</p>
                    <p className="member-id">ID: {member.idNumber}</p>
                    <p className="member-order">Order: {member.displayOrder}</p>
                </div>
            </div>
            <div className="member-contact-info">
                <p>Phone: {member.phoneNumber} ({member.isPhoneNumberPublic ? 'Public' : 'Private'})</p>
                <p>Telegram: {member.telegramLink || 'N/A'} ({member.isTelegramLinkPublic ? 'Public' : 'Private'})</p>
                <p>LinkedIn: {member.linkedinId || 'N/A'}</p>
            </div>
            <div className="member-actions">
                <button onClick={() => onEdit(member)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(member._id)} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

// --- AdminTeamsPage Component ---
const AdminTeamsPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddingOrEditing, setIsAddingOrEditing] = useState(false); // Toggle form visibility
    const [currentEditingMember, setCurrentEditingMember] = useState(null); // Member being edited

    // Form state for adding/editing a team member
    const [formData, setFormData] = useState({
        name: '',
        idNumber: '',
        position: '',
        academicYear: '2025-26', // Default for new members
        displayOrder: '',
        linkedinId: '',
        phoneNumber: '',
        isPhoneNumberPublic: false,
        telegramLink: '',
        isTelegramLinkPublic: false,
        photoFile: null, // For file input
        photoUrl: '',    // For URL input
        photoType: 'upload' // 'upload' or 'url'
    });

    // Fetch team members from backend
    const fetchTeamMembers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch ALL members for admin view, sorted by displayOrder
            const response = await axios.get(`${API_BASE_URL}/api/team-members`);
            // Sort client-side to ensure displayOrder is respected
            const sortedMembers = response.data.sort((a, b) => a.displayOrder - b.displayOrder);
            setTeamMembers(sortedMembers);
        } catch (err) {
            console.error('Error fetching team members:', err);
            setError('Failed to fetch team members. Please check your backend and admin access.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);

    // Form input change handler
    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === 'photo') {
            setFormData(prev => ({ ...prev, photoFile: files[0], photoType: 'upload' }));
        } else if (name === 'photoUrl') {
            setFormData(prev => ({ ...prev, photoUrl: value, photoType: 'url', photoFile: null }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Form submission handler (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const dataToSend = new FormData();
        // Append all form fields to FormData
        for (const key in formData) {
            if (key === 'photoFile' && formData.photoFile) {
                dataToSend.append('photo', formData.photoFile); // <--- Change 'photoFile' to 'photo'            } else if (key === 'photoUrl' && formData.photoType === 'url') {
                dataToSend.append('photoUrl', formData.photoUrl);
            } else if (key !== 'photoFile' && key !== 'photoUrl' && key !== 'photoType') {
                dataToSend.append(key, formData[key]);
            }
        }
        dataToSend.append('photoType', formData.photoType); // Ensure photoType is always sent

        // If editing, add existing photo info to formData for backend logic
        if (currentEditingMember) {
            dataToSend.append('existingPhotoValue', currentEditingMember.photo.value);
            dataToSend.append('existingPhotoType', currentEditingMember.photo.type);
        }

        try {
            let response;
            
            if (currentEditingMember) {
                // Update existing member
                response = await axios.put(`${API_BASE_URL}/api/team-members/${currentEditingMember._id}`, dataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Team member updated successfully!');
            } else {
                // Add new member
                response = await axios.post(`${API_BASE_URL}/api/team-members`, dataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Team member added successfully!');
            }
            console.log('Operation successful:', response.data);
            resetForm(); // Clear form and hide it
            fetchTeamMembers(); // Re-fetch to update the list
        } catch (err) {
            console.error('Error submitting team member:', err.response?.data || err.message);
            setError(`Failed to save team member: ${err.response?.data?.message || err.message}`);
            alert(`Failed to save team member: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Reset form and clear editing state
    const resetForm = () => {
        setFormData({
            name: '', idNumber: '', position: '', academicYear: '2025-26', displayOrder: '', linkedinId: '',
            phoneNumber: '', isPhoneNumberPublic: false, telegramLink: '', isTelegramLinkPublic: false,
            photoFile: null, photoUrl: '', photoType: 'upload'
        });
        setCurrentEditingMember(null);
        setIsAddingOrEditing(false);
    };

    // Set form data for editing a member
    const handleEdit = (member) => {
        setCurrentEditingMember(member);
        setFormData({
            name: member.name,
            idNumber: member.idNumber,
            position: member.position,
            academicYear: member.academicYear,
            displayOrder: member.displayOrder,
            linkedinId: member.linkedinId,
            phoneNumber: member.phoneNumber,
            isPhoneNumberPublic: member.isPhoneNumberPublic,
            telegramLink: member.telegramLink,
            isTelegramLinkPublic: member.isTelegramLinkPublic,
            photoFile: null, // File input cannot be pre-filled for security reasons
            photoUrl: member.photo.type === 'url' ? member.photo.value : '', // Only pre-fill if it was a URL
            photoType: member.photo.type
        });
        setIsAddingOrEditing(true); // Show the form
    };

    // Delete team member
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
            setLoading(true);
            try {
                await axios.delete(`${API_BASE_URL}/api/team-members/${id}`);
                alert('Team member deleted successfully!');
                fetchTeamMembers(); // Re-fetch list
            } catch (err) {
                console.error('Error deleting team member:', err.response?.data || err.message);
                setError(`Failed to delete team member: ${err.response?.data?.message || err.message}`);
                alert(`Failed to delete team member: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div className="admin-teams-container">Loading team members...</div>;
    }

    if (error) {
        return <div className="admin-teams-container error-message">{error}</div>;
    }

    return (
        <div className="admin-teams-container">
            <h1 className="page-title">Manage Team Members</h1>

            {/* Add/Edit Form Toggle Button */}
            <button onClick={() => { setIsAddingOrEditing(!isAddingOrEditing); setCurrentEditingMember(null); }} className="toggle-form-button">
                {isAddingOrEditing ? 'Hide Form' : 'Add New Team Member'}
            </button>

            {/* Add/Edit Team Member Form */}
            {isAddingOrEditing && (
                <form onSubmit={handleSubmit} className="team-member-form">
                    <h2>{currentEditingMember ? 'Edit Team Member' : 'Add New Team Member'}</h2>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </label>
                    <label>
                        ID Number:
                        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Position/Role:
                        <input type="text" name="position" value={formData.position} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Academic Year:
                        <select name="academicYear" value={formData.academicYear} onChange={handleInputChange} required>
                            <option value="2024-25">2024-25</option>
                            <option value="2025-26">2025-26</option>
                            {/* Add more academic years as needed */}
                        </select>
                    </label>
                    <label>
                        Display Order (Lower = Higher Priority):
                        <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} placeholder="e.g., 1 for President" />
                    </label>
                    <label>
                        LinkedIn ID (e.g., 'johndoe'):
                        <input type="text" name="linkedinId" value={formData.linkedinId} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="isPhoneNumberPublic" checked={formData.isPhoneNumberPublic} onChange={handleInputChange} />
                        Make Phone Number Public
                    </label>
                    <label>
                        Telegram Link:
                        <input type="url" name="telegramLink" value={formData.telegramLink} onChange={handleInputChange} placeholder="e.g., https://t.me/yourusername" />
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="isTelegramLinkPublic" checked={formData.isTelegramLinkPublic} onChange={handleInputChange} />
                        Make Telegram Link Public
                    </label>

                    <div className="photo-input-group">
                        <label>Photo Source:</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="photoType" value="upload" checked={formData.photoType === 'upload'} onChange={handleInputChange} />
                                Upload File
                            </label>
                            <label>
                                <input type="radio" name="photoType" value="url" checked={formData.photoType === 'url'} onChange={handleInputChange} />
                                Use URL
                            </label>
                        </div>

                        {formData.photoType === 'upload' ? (
                            <label>
                                Upload Photo:
                                <input type="file" name="photo" accept="image/*" onChange={handleInputChange} required={!currentEditingMember || !currentEditingMember.photo.value} />
                                {currentEditingMember && currentEditingMember.photo.value && <p className="current-photo-info">Current Photo: {currentEditingMember.photo.value.split('/').pop()}</p>}
                            </label>
                        ) : (
                            <label>
                                Photo URL:
                                <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange} placeholder="https://example.com/photo.jpg" required={!currentEditingMember || !currentEditingMember.photo.value} />
                            </label>
                        )}
                    </div>

                    <button type="submit" className="submit-form-button">{currentEditingMember ? 'Update Member' : 'Add Member'}</button>
                    <button type="button" onClick={resetForm} className="cancel-edit-button">Cancel</button>
                </form>
            )}

            {/* Display All Team Members for Admin */}
            {teamMembers.length === 0 ? (
                <p className="no-members-message">No team members found in the database.</p>
            ) : (
                <div className="admin-members-list">
                    <h2>Existing Team Members</h2>
                    {teamMembers.map((member) => (
                        <AdminTeamMemberCard key={member._id} member={member} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTeamsPage;
