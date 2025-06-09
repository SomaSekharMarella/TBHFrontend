import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios'; // Axios is imported here
import '../styles/EventsPage.css'; // Ensure your CSS path is correct

// --- IMPORTANT: Import your event poster images here ---
// Assuming these paths are correct relative to client/src/pages/
import ClubLogo from '../assets/logo.png';
import first from '../assets/posters/1.jpg';
import second from '../assets/posters/2.jpg';
import third from '../assets/posters/3.jpg';
import four from '../assets/posters/4.jpg';
import five from '../assets/posters/5.jpg';
import six from '../assets/posters/6.jpg';
import seven from '../assets/posters/7.jpg';
import eight from '../assets/posters/8.jpg';
import nine from '../assets/posters/9.jpg';
import ten from '../assets/posters/10.jpg';
import eleven from '../assets/posters/11.jpg';
import twelve from '../assets/posters/12.jpg';
import thirteen from '../assets/posters/13.jpg';
import fourteen from '../assets/posters/14.jpg';
import fifteen from '../assets/posters/15.jpg';
import sixteen from '../assets/posters/16.jpg';
import seventeen from '../assets/posters/17.jpg';
import eighteen from '../assets/posters/18.jpg';
import nineteen from '../assets/posters/19.jpg';
import twenty from '../assets/posters/20.jpg';
import twentyone from '../assets/posters/21.jpg';


// --- Helper function to format date (dd/mm/yyyy or as string) ---
const formatDate = (dateString) => {
    if (!dateString) return null;

    const dateObj = new Date(dateString);
    // Check if it's a valid Date object (not 'Invalid Date') and looks like a date
    const looksLikeStandardDate = /^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString);

    if (looksLikeStandardDate && !isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString('en-GB', { // 'en-GB' locale ensures dd/mm/yyyy
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    // If not a valid Date object or not a standard date format, return the string as is
    return dateString;
};

// --- EventCard Component for displaying individual events ---
const EventCard = ({ event }) => {
    // Determine poster source. Axios base URL is set in App.js.
    let posterSrc;
    // Assuming event.poster.value is the path from backend or external URL
    if (event.poster && event.poster.type === 'upload' && event.poster.value) {
        // For uploaded images, prepend the backend base URL.
        // We'll get the backend base URL from axios.defaults.baseURL and remove the /api
        const backendBaseUrl = axios.defaults.baseURL.replace(/\/api$/, '');
        posterSrc = `${backendBaseUrl}${event.poster.value}`;
    } else if (event.poster && event.poster.type === 'url' && event.poster.value) {
        posterSrc = event.poster.value;
    } else if (event.poster && event.poster.type === 'import' && event.poster.value) {
        // For images imported directly into the React component
        posterSrc = event.poster.value;
    }
     else {
        posterSrc = 'https://via.placeholder.co/200x200/CCCCCC/888888?text=No+Poster';
    }


    const formattedDate = formatDate(event.eventDate);

    return (
        <div className="event-card">
            <div className="event-poster-container">
                <img
                    src={posterSrc}
                    alt={event.eventName}
                    className="event-poster"
                    onError={(e) => {
                        e.target.onerror = null;
                        console.error(`Failed to load image for ${event.eventName}:`, posterSrc);
                        e.target.src = 'https://via.placeholder.co/200x200/CCCCCC/888888?text=No+Poster'; // Fallback
                    }}
                />
            </div>

            <div className="event-details-overlay">
                <div className="event-details-center">
                    <h3 className="event-title">{event.eventName}</h3>
                    {formattedDate && <p className="event-date">Date: {formattedDate}</p>}
                    <div className="event-speakers">
                        <p className="speaker-heading">Speakers :</p>
                        {event.speakers && event.speakers.length > 0 ? (
                            event.speakers.map((speaker, index) => (
                                <p key={index} className="speaker-item">
                                    {speaker.name} {speaker.id && `(${speaker.id})`}
                                </p>
                            ))
                        ) : (
                            <p className="speaker-item">No speakers listed</p>
                        )}
                    </div>
                </div>
                <div className="event-actions-right">
                    {event.reportLink && (
                        <a
                            href={event.reportLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="report-button"
                            aria-label={`View report for ${event.eventName}`}
                        >
                            <span className="arrow-icon">→</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- EventsPage Component ---
const EventsPage = () => {
    // Hardcoded Initial Events - memoized with useMemo to prevent re-creation on every render
    const initialManualEvents = useMemo(() => [
        {
            "_id": "manual_event_1",
            "eventName": "Club Launch and Title Reveal",
            "eventDate": "2024-07-25",
            "eventDescription": "Official launch of the club and reveal of its title.",
            "speakers": [
                { "name": "Dr. RamaKrishna", "id": "Principal" },
                { "name": "Mr. Hari Kiran Vege", "id": "Dean Addl. Academics" },
                { "name": "Ms. Santhi Sri", "id": "DyHOD Student Affairs" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": ClubLogo },
            "reportLink": ""
        },
        {
            "_id": "manual_event_2",
            "eventName": "Introduction to Blockchain and its usecases",
            "eventDate": "2024-09-18",
            "eventDescription": "Session covering fundamental concepts of blockchain technology.",
            "speakers": [
                { "name": "Praveen Chennamsetty", "id": "2100030098" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": first },
            "reportLink": "https://drive.google.com/file/d/1ttacQr_SeEOBMwpKfJFDa6bIGg48BHcb/view?usp=sharing"
        },
        {
            "_id": "manual_event_3",
            "eventName": "Getting started with Bitcoin and Ethereum",
            "eventDate": "2024-09-28",
            "eventDescription": "Introduction to major cryptocurrencies Bitcoin and Ethereum.",
            "speakers": [
                { "name": "VaraPrasad Reddy Karravula", "id": "2100030243" },
                { "name": "Kowsik G S M", "id": "2100030169" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": second },
            "reportLink": "https://drive.google.com/file/d/1pwoBejkZoalxilqqdjUbuIM2F4khJgxZ/view?usp=sharing"
        },
        {
            "_id": "manual_event_4",
            "eventName": "Build Your Crypto",
            "eventDate": "2024-09-30",
            "eventDescription": "Workshop on creating your own cryptocurrency.",
            "speakers": [
                { "name": "Sai Charan Tej Katta", "id": "2200032987" },
                { "name": "Soma Sekhar Marella", "id": "2300030411" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": third },
            "reportLink": "https://drive.google.com/file/d/1uk-3fUY9tf5GtoUl_L5_7Ph723CVuCL3/view?usp=sharing"
        },
        {
            "_id": "manual_event_5",
            "eventName": "The Web3 World",
            "eventDate": "2024-10-01",
            "eventDescription": "Exploring the decentralized web and its applications.",
            "speakers": [
                { "name": "Lakshmi Prasanna Madasu", "id": "2200033191" },
                { "name": "Hema Garlapati", "id": "2200031072" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": four },
            "reportLink": "https://drive.google.com/file/d/1H4Y1xLNWH49TyeTrK567qL7RB3E5IVne/view?usp=sharing"
        },
        {
            "_id": "manual_event_6",
            "eventName": "Blockchain Applications and Usecases",
            "eventDate": "2024-10-17",
            "eventDescription": "Practical applications of blockchain technology in various industries.",
            "speakers": [
                { "name": "Soma Sekhar Marella", "id": "2300030411" },
                { "name": "G Surya Vishnu", "id": "2100030156" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": five },
            "reportLink": "https://drive.google.com/file/d/1pbf8V8epeJCe6zusb-bf7c8pM0_-PdfN/view?usp=sharing"
        },
        {
            "_id": "manual_event_7",
            "eventName": "Smart Contracts using Blockchain",
            "eventDate": "2024-10-24",
            "eventDescription": "Introduction to creating and implementing smart contracts.",
            "speakers": [
                { "name": "CH V Prasanna Kumar", "id": "2100030097" },
                { "name": "G H V Sundar", "id": "2100030175" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": six },
            "reportLink": "https://docs.google.com/document/d/1lQRJWkeQOCOq8KSoOZkjoQWfE8n6TERP/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_8",
            "eventName": "Blockchain Security and Usecases in Industry",
            "eventDate": "2024-11-02",
            "eventDescription": "Security aspects of blockchain and industrial applications.",
            "speakers": [
                { "name": "Namra Fathima", "id": "2300030823" },
                { "name": "Lakshmi Ponduri", "id": "2300030543" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": seven },
            "reportLink": "https://docs.google.com/document/d/1iLGaW-DTfzIrBB1Y8SSNoh1dk3l7b32Z/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_9",
            "eventName": "Introduction to DApps and Architecture",
            "eventDate": "2024-11-09",
            "eventDescription": "Fundamentals of decentralized applications and their architecture.",
            "speakers": [
                { "name": "Arsha Shaik", "id": "2200033189" },
                { "name": "Hema Garlapati", "id": "2200031072" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": eight },
            "reportLink": "https://docs.google.com/document/d/1KlpsRhDaHh_Kht0cZbEmcjcUoHF7_fza/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_10",
            "eventName": "Supply Chain and Logistics",
            "eventDate": "2024-11-15",
            "eventDescription": "Blockchain applications in supply chain and logistics management.",
            "speakers": [
                { "name": "Srivalli", "id": "2300080340" },
                { "name": "Shabnam Aara", "id": "2200030347" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": nine },
            "reportLink": "https://docs.google.com/document/d/1zgDZt1uhW4cMSPnZAJBgLnyBec-4vGJj/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_11", // Renamed from event_01
            "eventName": "Blockchain Awareness Bootcamp",
            "eventDate": "2025-01-04",
            "eventDescription": "Comprehensive bootcamp on blockchain awareness.",
            "speakers": [
                { "name": "Sai Charan", "id": "2200032987" },
                { "name": "Shabnam Aara", "id": "2200030347" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": ten },
            "reportLink": "https://docs.google.com/document/d/1N_19LIBv4GPRfN6GUpA6m7JwuFag71NZ/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_12", // Renamed from event_02
            "eventName": "Decentralized Finance (DeFi)",
            "eventDate": "2025-02-15",
            "eventDescription": "Deep dive into Decentralized Finance concepts and protocols.",
            "speakers": [
                { "name": "Sai Charan", "id": "2200032987" },
                { "name": "Soma Sekhar", "id": "2300030411" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": eleven },
            "reportLink": "https://docs.google.com/document/d/1DWNUXE5X0t8QLkkWwz6WSkJvmnD9ymO-/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_13", // Renamed from event_03
            "eventName": "Decentralized Autonomous Organization (DAO)",
            "eventDate": "2025-02-28",
            "eventDescription": "Understanding DAOs and their role in blockchain governance.",
            "speakers": [
                { "name": "Soma Sekhar", "id": "2300030411" },
                { "name": "Mouli Brahma", "id": "2300030284" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": twelve },
            "reportLink": "https://docs.google.com/document/d/1osKXY_wHdNXgMZcdhibwJO6LRLqvL9L_/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_14", // Renamed from event_04
            "eventName": "Future Trends in Blockchain",
            "eventDate": "2025-03-02",
            "eventDescription": "Discussion on emerging trends and future directions in blockchain technology.",
            "speakers": [
                { "name": "Lakshmi", "id": "2300030543" },
                { "name": "Mouli Brahma", "id": "2300030284" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": thirteen },
            "reportLink": "https://docs.google.com/document/d/1Wjk0A5l9AI58ziZY1xGgNXiISCoA1J3e/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_15", // Renamed from event_05
            "eventName": "Blockchain Security",
            "eventDate": "2025-03-07",
            "eventDescription": "Key principles and practices for securing blockchain applications.",
            "speakers": [
                { "name": "Soma Sekhar", "id": "2300030411" },
                { "name": "Bhargavi", "id": "2300030497" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": fourteen },
            "reportLink": "https://docs.google.com/document/d/1Ch1Wff4ycOyvfRzSwMkx7VihD24iaE11/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_16", // Renamed from event_06
            "eventName": "Blockchain For Healthcare & Education",
            "eventDate": "2025-03-08",
            "eventDescription": "Exploring blockchain use cases in healthcare and education sectors.",
            "speakers": [
                { "name": "Soma Sekhar", "id": "2300030411" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": fifteen },
            "reportLink": "https://docs.google.com/document/d/1NfS3FCRgP-JjweFl7G4D9AZUhbt8Z89e/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_17", // Renamed from event_07
            "eventName": "Scaling Blockchain",
            "eventDate": "2025-03-14",
            "eventDescription": "Strategies and techniques for scaling blockchain networks and applications.",
            "speakers": [
                { "name": "Bhargavi", "id": "2300033497" },
                { "name": "Sirisha", "id": "2300030806" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": sixteen },
            "reportLink": "https://docs.google.com/document/d/1fJ9aXLfTHWQDdDqsoRg7UucDBMan9484/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_18", // Renamed from event_77
            "eventName": "Blockchain Entrepreneurship",
            "eventDate": "2025-03-19",
            "eventDescription": "Guidance for aspiring blockchain entrepreneurs and startup founders.",
            "speakers": [
                { "name": "Sarvagna", "id": "2300033295" },
                { "name": "Deekshitha", "id": "2300032584" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": seventeen },
            "reportLink": ""
        },
        {
            "_id": "manual_event_19", // Renamed from event_08
            "eventName": "NFTs & Creator Economy",
            "eventDate": "2025-04-02",
            "eventDescription": "Deep dive into Non-Fungible Tokens (NFTs) and their impact on the creator economy.",
            "speakers": [
                { "name": "Mouli Brahma", "id": "2300030284" },
                { "name": "Namra Fathima", "id": "2300030823" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": eighteen },
            "reportLink": "https://docs.google.com/document/d/15l-x-qaCxpsokrxX2UYMAh3kRbVEwkzh/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
        },
        {
            "_id": "manual_event_20", // Renamed from event_09
            "eventName": "Blockchain Interoperability",
            "eventDate": "2025-04-09",
            "eventDescription": "Understanding how different blockchain networks can communicate and interact.",
            "speakers": [
                { "name": "Sarvagna", "id": "2300033295" },
                { "name": "Bhargavi", "id": "2300030497" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": nineteen },
            "reportLink": ""
        },
        {
            "_id": "manual_event_21", // Renamed from event_10
            "eventName": "Crypto Circuit",
            "eventDate": "2025-04-10",
            "eventDescription": "An interactive session or challenge related to cryptocurrencies.",
            "speakers": [
                { "name": "Sirisha", "id": "2300030806" },
                { "name": "Mouli Brahma", "id": "2300030284" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": twenty },
            "reportLink": ""
        },
        {
            "_id": "manual_event_22", // Renamed from event_11
            "eventName": "Smart Contracts Using Blockchain (Advanced)",
            "eventDate": "2025-04-16",
            "eventDescription": "Advanced topics and development of smart contracts.",
            "speakers": [
                { "name": "Soma Sekhar", "id": "2300030411" },
                { "name": "Namra Fathima", "id": "2300030823" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value": twentyone },
            "reportLink": ""
        },
    ], []);

    const [events, setEvents] = useState([]); // Will be populated by fetched data or manual events
    const [loading, setLoading] = useState(true);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState('all');
    // Adjusted academic years for demonstration, ensure your backend also has these
    const academicYears = useMemo(() => {
        const years = new Set(initialManualEvents.map(event => event.academicYear));
        // You would ideally get available years from your backend if it returns them
        // For now, combining hardcoded and dynamically derived years
        return ['all', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
    }, [initialManualEvents]);


    // Fetch events with fallback to manualEvents
    const fetchEvents = useCallback(async () => {
        setLoading(true);
        // Removed setError('') as 'error' state is no longer used for display
        let fetchedData = [];

        try {
            // Attempt to fetch from backend
            // axios.defaults.baseURL is set in App.js, so we just use relative path
            const response = await axios.get('/api/events');
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                fetchedData = response.data;
                console.log('Successfully fetched events from backend.');
            } else {
                console.log('Backend returned no events, will use manual events as primary.');
            }
        } catch (err) {
            console.error('Error fetching events from backend:', err);
            // Removed setError call as 'error' state is no longer used for display
            // The console.error is sufficient for debugging purposes.
        }

        // Combine fetched events (if any) with manual events
        // Prioritize fetched events by putting them first, then unique manual events
        let combinedEvents = [...fetchedData];
        initialManualEvents.forEach(manualEvent => {
            if (!combinedEvents.some(e => e._id === manualEvent._id)) {
                combinedEvents.push(manualEvent);
            }
        });

        // --- Apply client-side filtering by academic year ---
        let filteredEvents = combinedEvents;
        if (selectedAcademicYear !== 'all') {
            filteredEvents = combinedEvents.filter(event => event.academicYear === selectedAcademicYear);
        }

        // --- Apply sorting logic: Oldest Events First ---
        filteredEvents.sort((a, b) => {
            // Handle cases where eventDate might be a string (e.g., "March") for sorting
            const dateA = new Date(a.eventDate);
            const dateB = new Date(b.eventDate);

            // If dates are invalid, try to use academic year or event name for sorting
            if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
                return a.academicYear.localeCompare(b.academicYear) || a.eventName.localeCompare(b.eventName);
            }
            if (isNaN(dateA.getTime())) return 1; // Put invalid dates at the end
            if (isNaN(dateB.getTime())) return -1; // Put invalid dates at the end

            return dateA - dateB; // Ascending order (Oldest first)
        });

        setEvents(filteredEvents);
        setLoading(false);
    }, [initialManualEvents, selectedAcademicYear]); // Added selectedAcademicYear as dependency for filtering

    useEffect(() => {
        fetchEvents(); // No need to pass selectedAcademicYear here, it's a dependency of fetchEvents
    }, [fetchEvents]); // Dependency for useEffect

    const handleYearChange = (year) => {
        setSelectedAcademicYear(year);
    };

    return (
        <div className="events-page-container">
            <h1 className="page-title">Blockchain Club Events</h1>

            <div className="academic-year-filter">
                <span className="filter-label">Select Academic Year:</span>
                {academicYears.map(year => (
                    <button
                        key={year}
                        className={`filter-button ${selectedAcademicYear === year ? 'active' : ''}`}
                        onClick={() => handleYearChange(year)}
                    >
                        {year === 'all' ? 'All Years' : year}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="loading-message">Loading events...</p>
            ) : (
                <>
                    {/* The error message display has been completely removed from here */}
                    {events.length === 0 ? ( // Check 'events' state after filtering
                        <p className="no-events-message">No events found for {selectedAcademicYear === 'all' ? 'all academic years' : `the ${selectedAcademicYear} academic year`}.</p>
                    ) : (
                        <div className="events-grid">
                            {events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventsPage;
