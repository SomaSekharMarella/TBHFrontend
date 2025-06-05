import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import '../styles/TeamPage.css'; // Ensure you create this CSS file

// Importing local image for hardcoded member
import praveen from '../assets/images/praveen.jpg'; // Make sure this path is correct
import hema from '../assets/images/hema_pic.jpg'; // Importing Hema's image
import charan from '../assets/images/chran_pic.jpg'; // Importing Charan's image
import arsha from '../assets/images/arsha_pic.jpg'; // Importing Arsha's image
import somu from '../assets/images/somu1.jpg'; // Importing Soma's image
import ashok from '../assets/images/ashok_pic.jpg'; // Importing Ashok's image
import bhargavi from '../assets/images/bhargavi_pic.jpg'; // Importing Bhargavi's image
import namra from '../assets/images/fathima_pic.jpg'; // Importing Namra's image
import anusha from '../assets/images/anusha_pic.jpg'; // Importing Anusha's image
import lakshmi from '../assets/images/lakshmi_pic.jpg'; // Importing Lakshmi's image    
import prasanna from '../assets/images/prass_pic.jpg'; // Importing Prasanna's image
import deekshitha from '../assets/images/deekshitha.jpg'; // Importing Deekshitha's image
import sirisha from '../assets/images/Sirisha.jpg'; // Importing Sirisha's image
import shabs from '../assets/images/shabs_pic.jpg'; // Importing Shabnam's image
import sarvagna from '../assets/images/Sarvagna.jpg'; // Importing Sarvagna's image
import anjali from '../assets/images/anjali_pic.jpg'; // Importing Anjali's image
import mouli from '../assets/images/Mouli.jpg'; // Importing Mouli's image
import srivalli from '../assets/images/srivalli_pic.jpg'; // Importing Srivalli's image
import mounisha from '../assets/images/mounisha.jpg'; // Importing Mounisha's image


const API_BASE_URL = 'http://localhost:5000'; // Your backend URL

// --- TeamMemberCard Component ---
// This component displays a single team member's details for the public view.
const TeamMemberCard = ({ member }) => {
    // Determine photo source based on type (upload from backend, external URL, or local import)
    let photoSrc;
    if (member.photo.type === 'upload') {
        photoSrc = `${API_BASE_URL}${member.photo.value}`;
    } else if (member.photo.type === 'url') {
        photoSrc = member.photo.value;
    } else if (member.photo.type === 'import') { // <--- ADDED: Handle 'import' type
        photoSrc = member.photo.value; // Directly use the imported value
    }
    else {
        // Fallback for missing or unknown photo type
        photoSrc = 'https://via.placeholder.com/150x150/E0E0E0/888888?text=No+Photo';
    }

    return (
        <div className="team-member-card">
            <div className="member-photo-container">
                <img
                    src={photoSrc}
                    alt={member.name}
                    className="member-photo"
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop on error
                        e.target.src = 'https://via.placeholder.com/150x150/E0E0E0/888888?text=No+Photo'; // Fallback image
                    }}
                />
            </div>
            <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-position">{member.position}</p>
                {/* Conditionally display ID Number only if it exists */}
                {member.idNumber && ( // <--- ADDED: Conditional rendering
                    <p className="member-id">ID: {member.idNumber}</p>
                )}

                {member.linkedinId && (
                    <a href={`https://www.linkedin.com/in/${member.linkedinId}`} target="_blank" rel="noopener noreferrer" className="member-social-link linkedin">
                        LinkedIn
                    </a>
                )}

                {/* Conditionally display phone number if it's marked as public */}
                {member.isPhoneNumberPublic && (
                    <p className="member-contact">Phone: {member.phoneNumber}</p>
                )}
                {/* Conditionally display Telegram link if it's marked as public and exists */}
                {member.isTelegramLinkPublic && member.telegramLink && (
                    <a href={member.telegramLink} target="_blank" rel="noopener noreferrer" className="member-social-link telegram">
                        Telegram
                    </a>
                )}
            </div>
        </div>
    );
};

// --- TeamsPage Component ---
const TeamsPage = () => {
    // Hardcoded team members for the '2024-25' academic year (completed year)
    // These will be displayed when '2024-25' is selected.
    const hardcoded2024_25Members = useMemo(() => [
        {
            _id: 'manual_team_1',
            name: 'Venkata Praveen Chennamsetty',
            idNumber: '2100030098',
            photo: { "type": "import", "value": praveen }, // Using the imported image variable
            position: 'Founder / Advisor',
            academicYear: '2024-25', // Changed to '2024-25' for consistency with filter
            displayOrder: 1,
            linkedinId: 'praveen-chennamsetty-7a0901235',
            phoneNumber: '6303736379',
            isPhoneNumberPublic: true,
            telegramLink: '',
            isTelegramLinkPublic: false
        },
    {
        "_id": "manual_team_2",
        "name": "Hema Garlapati",
        "idNumber": "2200031072",
        "photo": { "type": "import", "value": hema },
        "position": "President",
        "academicYear": "Y22 - CSE",
        "displayOrder": 2,
        "linkedinId": "hema-garlapati",
        "phoneNumber": "9493910478",
        "isPhoneNumberPublic": true,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_3",
        "name": "Sai Charan Tej Katta",
        "idNumber": "2200032987",
        "photo": { "type": "import", "value": charan },
        "position": "Vice - President",
        "academicYear": "Y22 - CSE",
        "displayOrder": 3,
        "linkedinId": "sai-charan-tej-katta-65b0a424a",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_4",
        "name": "Arsha Shaik",
        "idNumber": "2200033189",
        "photo": { "type": "import", "value": arsha },
        "position": "Technical - Lead",
        "academicYear": "Y22 - CSE",
        "displayOrder": 4,
        "linkedinId": "arsha-shaik-418b222bb",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_5",
        "name": "Soma Sekhar Marella",
        "idNumber": "2300030411",
        "photo": { "type": "import", "value": somu },
        "position": "Chief - Club Activities",
        "academicYear": "Y23 - CSE",
        "displayOrder": 5,
        "linkedinId": "soma-sekhar-marella-a16a67302",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    
    {
        "_id": "manual_team_7",
        "name": "Bhargavi Putti",
        "idNumber": "2300033497",
        "photo": { "type": "import", "value": bhargavi },
        "position": "Non Tech Lead",
        "academicYear": "Y23-CSE",
        "displayOrder": 7,
        "linkedinId": "",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },{
        "_id": "manual_team_6",
        "name": "Ashok Reddy",
        "idNumber": "2200031650",
        "photo": { "type": "import", "value": ashok },
        "position": "Projects - Head",
        "academicYear": "Y22 - CSE",
        "displayOrder": 6,
        "linkedinId": "",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_8",
        "name": "Namra Fathima",
        "idNumber": "2300030823",
        "photo": { "type": "import", "value": namra },
        "position": "Technical Core",
        "academicYear": "Y23 - CSE",
        "displayOrder": 8,
        "linkedinId": "namra-fathima-a8b6a42aa",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_9",
        "name": "Lakshmi Prasanna M",
        "idNumber": "2200033191",
        "photo": { "type": "import", "value": prasanna },
        "position": "Technical Core",
        "academicYear": "Y22 - CSE",
        "displayOrder": 9,
        "linkedinId": "sri-lakshmi-prasanna-madasu-0ba616259",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_10",
        "name": "Deekshitha Nalabothu",
        "idNumber": "2300032584",
        "photo": { "type": "import", "value": deekshitha },
        "position": "Technical Core",
        "academicYear": "Y23 - CSE",
        "displayOrder": 10,
        "linkedinId": "deekshitha-nalabothu-09a4bb32b",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_11",
        "name": "Sirisha Kadiyam",
        "idNumber": "2300030806",
        "photo": { "type": "import", "value": sirisha },
        "position": "Technical Core",
        "academicYear": "Y23 - CSE",
        "displayOrder": 11,
        "linkedinId": "sirisha-kadiyam-a99939344",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_19",
        "name": "Mouli Brahma Kaka",
        "idNumber": "2300030284",
        "photo": { "type": "import", "value": mouli },
        "position": "Core Member",
        "academicYear": "Y23-CSE",
        "displayOrder": 19,
        "linkedinId": "kaka-mouli-brahma-b401b4324",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_12",
        "name": "Mulla Shabham Aara",
        "idNumber": "2200030347",
        "photo": { "type": "import", "value": shabs },
        "position": "Design Lead",
        "academicYear": "Y22-CSE",
        "displayOrder": 12,
        "linkedinId": "mulla-shabnam-aara",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_13",
        "name": "Anusha Challapalli",
        "idNumber": "2300032634",
        "photo": { "type": "import", "value": anusha },
        "position": "Design Core",
        "academicYear": "Y23-CSE",
        "displayOrder": 13,
        "linkedinId": "kaka-mouli-brahma-b401b4324",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_14",
        "name": "Lakshmi Ponduri",
        "idNumber": "2300030543",
        "photo": { "type": "import", "value": lakshmi },
        "position": "Draft Lead",
        "academicYear": "Y23-CSE",
        "displayOrder": 14,
        "linkedinId": "lakshmi-ponduri-01015b338",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_15",
        "name": "Sarvagna Sudulagunta",
        "idNumber": "2300033295",
        "photo": { "type": "import", "value": sarvagna },
        "position": "Draft Core",
        "academicYear": "Y23-CSE",
        "displayOrder": 15,
        "linkedinId": "kaka-mouli-brahma-b401b4324",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_16",
        "name": "Srivalli Gunturi",
        "idNumber": "2300080340",
        "photo": { "type": "import", "value": srivalli },
        "position": "Draft Core",
        "academicYear": "Y23-CSE",
        "displayOrder": 16,
        "linkedinId": "kaka-mouli-brahma-b401b4324",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_17",
        "name": "Udayanjali Devu",
        "idNumber": "2300031808",
        "photo": { "type": "import", "value": anjali },
        "position": "PR Lead",
        "academicYear": "Y23-CSE",
        "displayOrder": 17,
        "linkedinId": "kaka-mouli-brahma-b401b4324",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    },
    {
        "_id": "manual_team_18",
        "name": "Mounisha Rangineni",
        "idNumber": "2300032576",
        "photo": { "type": "import", "value": mounisha },
        "position": "PR Core",
        "academicYear": "Y23-CSE",
        "displayOrder": 18,
        "linkedinId": "mounisha-rangineni-0279482a4",
        "phoneNumber": "",
        "isPhoneNumberPublic": false,
        "telegramLink": "",
        "isTelegramLinkPublic": false
    }
        // Add more 2024-25 hardcoded members here
    ], []);

    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // Initial filter selection: '2024-25' to show hardcoded members first
    const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024-25');
    // Only two academic year options as requested
    const academicYears = ['2024-25', '2025-26'];

    // Function to fetch team members based on selected academic year
    const fetchTeamMembers = useCallback(async (year) => {
        setLoading(true);
        setError('');
        try {
            if (year === '2024-25') {
                // For '2024-25', use hardcoded data
                setTeamMembers(hardcoded2024_25Members);
                setLoading(false);
            } else if (year === '2025-26') {
                // For '2025-26', fetch from backend
                const response = await axios.get(`${API_BASE_URL}/api/team-members?academicYear=${year}`);
                setTeamMembers(response.data);
                setLoading(false);
            } else {
                // Fallback for any unexpected year, though academicYears array restricts this
                setTeamMembers([]);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching team members:', err);
            setError(`Failed to fetch team members for ${year}. Please check your backend.`);
            setTeamMembers([]); // Clear members on error
            setLoading(false);
        }
    }, [hardcoded2024_25Members, setTeamMembers, setLoading, setError]); // Dependencies for useCallback

    // Effect hook to call fetchTeamMembers when selectedAcademicYear changes
    useEffect(() => {
        fetchTeamMembers(selectedAcademicYear);
    }, [selectedAcademicYear, fetchTeamMembers]); // Dependencies for useEffect

    // Handler for filter button clicks
    const handleYearChange = (year) => {
        setSelectedAcademicYear(year);
    };

    if (loading) {
        return <div className="teams-page-container">Loading team members...</div>;
    }

    if (error) {
        return <div className="teams-page-container error-message">{error}</div>;
    }

    return (
        <div className="teams-page-container">
            <h1 className="page-title">Our Team</h1>

            {/* Academic Year Filter Buttons */}
            <div className="academic-year-filter">
                <span className="filter-label">View Academic Year:</span>
                {academicYears.map(year => (
                    <button
                        key={year}
                        className={`filter-button ${selectedAcademicYear === year ? 'active' : ''}`}
                        onClick={() => handleYearChange(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Display Team Members Grid */}
            {teamMembers.length === 0 ? (
                <p className="no-members-message">No team members found for {selectedAcademicYear} academic year.</p>
            ) : (
                <div className="team-members-grid">
                    {teamMembers.map((member) => (
                        <TeamMemberCard key={member._id} member={member} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamsPage;
