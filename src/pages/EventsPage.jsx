import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import '../styles/EventsPage.css'; // Ensure your CSS path is correct
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






const API_BASE_URL = 'http://localhost:5000';

// EventCard component (defined within EventsPage.jsx)
const EventCard = ({ event }) => {
    // Removed reportClicked state as per previous request
    const posterSrc = event.poster.type === 'upload'
        ? `${API_BASE_URL}${event.poster.value}`
        : event.poster.value;

    return (
        <div className={`event-card`}>
            <div className="event-poster-container">
                <img
                    src={posterSrc}
                    alt={event.eventName}
                    className="event-poster"
                    onError={(e) => {
                        e.target.onerror = null;
                        console.error(`Failed to load image for ${event.eventName}:`, posterSrc);
                        e.target.src = 'https://via.placeholder.com/200x200/CCCCCC/888888?text=No+Poster';
                    }}
                />
            </div>

            <div className="event-details-overlay">
                <div className="event-details-center">
                    <h3 className="event-title">{event.eventName}</h3>
                    <p className="event-date">Date: {new Date(event.eventDate).toLocaleDateString('en-GB')}</p>
                    <div className="event-speakers">
                        <p className="speaker-heading">Speakers :</p>
                        {event.speakers.map((speaker, index) => (
                            <p key={index} className="speaker-item">
                                {speaker.name} - {speaker.id}
                            </p>
                        ))}
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


const EventsPage = () => {
    // Hardcoded Initial Events-now memoized with useMemo
    const initialManualEvents = useMemo(() => [
      {
            "_id": "event_1",
            "eventName": "Club Launch and Title Reveal",
            "eventDate": "2024-07-25",
            "eventDescription": "Official launch of the club and reveal of its title.",
            "speakers": [
                { "name": "Dr. RamaKrishna", "id": "Principal" },
                { "name": "Mr. Hari Kiran Vege", "id": "Dean Addl. Academics" },
                { "name": "Ms. Santhi Sri", "id": "DyHOD Student Affairs" }
            ],
            "academicYear": "2024-25",
            "poster": { "type": "import", "value":ClubLogo}, // <--- CHANGE THIS LINE
            "reportLink": ""
        },
    {
        "_id": "event_2",
        "eventName": "Introduction to Blockchain and its usecases",
        "eventDate": "2024-09-18",
        "eventDescription": "Session covering fundamental concepts of blockchain technology.",
        "speakers": [
            { "name": "Praveen Chennamsetty", "id": "2100030098" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":first}, // <--- CHANGE THIS LINE
        "reportLink": "https://drive.google.com/file/d/1ttacQr_SeEOBMwpKfJFDa6bIGg48BHcb/view?usp=sharing"
    },
    {
        "_id": "event_3",
        "eventName": "Getting started with Bitcoin and Ethereum",
        "eventDate": "2024-09-28",
        "eventDescription": "Introduction to major cryptocurrencies Bitcoin and Ethereum.",
        "speakers": [
            { "name": "VaraPrasad Reddy Karravula", "id": "2100030243" },
            { "name": "Kowsik G S M", "id": "2100030169" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":second}, // <--- CHANGE THIS LINE
        "reportLink": "https://drive.google.com/file/d/1pwoBejkZoalxilqqdjUbuIM2F4khJgxZ/view?usp=sharing"
    },
    {
        "_id": "event_4",
        "eventName": "Build Your Crypto",
        "eventDate": "2024-09-30",
        "eventDescription": "Workshop on creating your own cryptocurrency.",
        "speakers": [
            { "name": "Sai Charan Tej Katta", "id": "2200032987" },
            { "name": "Soma Sekhar Marella", "id": "2300030411" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":third}, // <--- CHANGE THIS LINE
        "reportLink": "https://drive.google.com/file/d/1uk-3fUY9tf5GtoUl_L5_7Ph723CVuCL3/view?usp=sharing"
    },
    {
        "_id": "event_5",
        "eventName": "The Web3 World",
        "eventDate": "2024-10-01",
        "eventDescription": "Exploring the decentralized web and its applications.",
        "speakers": [
            { "name": "Lakshmi Prasanna Madasu", "id": "2200033191" },
            { "name": "Hema Garlapati", "id": "2200031072" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":four}, // <--- CHANGE THIS LINE
        "reportLink": "https://drive.google.com/file/d/1H4Y1xLNWH49TyeTrK567qL7RB3E5IVne/view?usp=sharing"
    },
    {
        "_id": "event_6",
        "eventName": "Blockchain Applications and Usecases",
        "eventDate": "2024-10-17",
        "eventDescription": "Practical applications of blockchain technology in various industries.",
        "speakers": [
            { "name": "Soma Sekhar Marella", "id": "2300030411" },
            { "name": "G Surya Vishnu", "id": "2100030156" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":five}, // <--- CHANGE THIS LINE
        "reportLink": "https://drive.google.com/file/d/1pbf8V8epeJCe6zusb-bf7c8pM0_-PdfN/view?usp=sharing"
    },
    {
        "_id": "event_7",
        "eventName": "Smart Contracts using Blockchain",
        "eventDate": "2024-10-24",
        "eventDescription": "Introduction to creating and implementing smart contracts.",
        "speakers": [
            { "name": "CH V Prasanna Kumar", "id": "2100030097" },
            { "name": "G H V Sundar", "id": "2100030175" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":six}, // <--- CHANGE THIS LINE
        "reportLink": "https://docs.google.com/document/d/1lQRJWkeQOCOq8KSoOZkjoQWfE8n6TERP/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
    },
    {
        "_id": "event_8",
        "eventName": "Blockchain Security and Usecases in Industry",
        "eventDate": "2024-11-02",
        "eventDescription": "Security aspects of blockchain and industrial applications.",
        "speakers": [
            { "name": "Namra Fathima", "id": "2300030823" },
            { "name": "Lakshmi Ponduri", "id": "2300030543" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":seven}, // <--- CHANGE THIS LINE
        "reportLink": "https://docs.google.com/document/d/1iLGaW-DTfzIrBB1Y8SSNoh1dk3l7b32Z/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
    },
    {
        "_id": "event_9",
        "eventName": "Introduction to DApps and Architecture",
        "eventDate": "2024-11-09",
        "eventDescription": "Fundamentals of decentralized applications and their architecture.",
        "speakers": [
            { "name": "Arsha Shaik", "id": "2200033189" },
            { "name": "Hema Garlapati", "id": "2200031072" }
        ],
        "academicYear": "2024-25",
            "poster": { "type": "import", "value":eight}, // <--- CHANGE THIS LINE
        "reportLink": "https://docs.google.com/document/d/1KlpsRhDaHh_Kht0cZbEmcjcUoHF7_fza/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
    },
    {
        "_id": "event_10",
        "eventName": "Supply Chain and Logistics",
        "eventDate": "2024-11-15",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Srivalli", "id": "2300080340" },
            { "name": "Shabnam Aara", "id": "2200030347" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":nine}, // <--- CHANGE THIS LINE
        "reportLink": "https://docs.google.com/document/d/1zgDZt1uhW4cMSPnZAJBgLnyBec-4vGJj/edit?usp=sharing&ouid=107400350534257809164&rtpof=true&sd=true"
    },
    {
        "_id": "event_01",
        "eventName": "Blockchain Awareness Bootcamp",
        "eventDate": "2025-01-04",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Sai Charan", "id": "2200032987" },
            { "name": "Shabnam Aara", "id": "2200030347" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":ten}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_02",
        "eventName": "Decentrailized Finance",
        "eventDate": "2025-02-15",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Sai Charan", "id": "2200032987" },
            { "name": "Soma Sekhar", "id": "2300030411" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":eleven}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_03",
        "eventName": "Decentrailized Autonmous Organization",
        "eventDate": "2025-02-28",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Soma Sekhar", "id": "2300030411" },
            { "name": "Mouli Brahma", "id": "2300030284" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":twelve}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_04",
        "eventName": "Future Trends in Blockchain",
        "eventDate": "2025-03-02",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Lakshmi", "id": "2300030543" },
            { "name": "Mouli Brahma", "id": "2300030284" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":thirteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_05",
        "eventName": "Blockchain Security",
        "eventDate": "2025-03-07",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Soma Sekhar", "id": "2300030411" },
            { "name": "Bhargavi", "id": "2300030497" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":fourteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_06",
        "eventName": "Blockchain For Healthcare & Education",
        "eventDate": "2025-03-08",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Soma Sekhar", "id": "2300030411" },
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":fifteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_07",
        "eventName": "Scaling Blockchain",
        "eventDate": "2025-03-14",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Bhargavi", "id": "2300033497" },
            { "name": "Sirisha", "id": "2300030806" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":sixteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_77",
        "eventName": "Bloclchain Entrepreneur",
        "eventDate": "2025-03-19",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Sarvagna", "id": "2300033295" },
            { "name": "Deekshitha", "id": "2300032584" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":seventeen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_08",
        "eventName": "NFT'S & Creator Economy",
        "eventDate": "2025-04-02",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Mouli Brahma", "id": "2300030284" },
            { "name": "Namra Fathima", "id": "2300030823" }
            
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":eighteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_09",
        "eventName": "Blockchain Interoperability",
        "eventDate": "2025-04-09",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Sarvagna", "id":"2300033295"},
            { "name": "Bhargavi", "id": "2300030497" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":nineteen}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_10",
        "eventName": "Crypto Circuit",
        "eventDate": "2025-04-10",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Sirisha", "id": "2300030806" },
            { "name": "Mouli Brahma", "id": "2300030284" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":twenty}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },
    {
        "_id": "event_11",
        "eventName": "Smart Contracts Using Blockchain",
        "eventDate": "2025-04-16",
        "eventDescription": "Blockchain applications in supply chain and logistics management.",
        "speakers": [
            { "name": "Soma Sekhar", "id": "2300030411" },
            { "name": "Namra Fathima", "id": "2300030823" }
        ],
        "academicYear": "2024-25",
        "poster": { "type": "import", "value":twentyone}, // <--- CHANGE THIS LINE
        "reportLink": " "
    },

    ], []);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedAcademicYear, setSelectedAcademicYear] = useState('all');
    // Adjusted academic years for demonstration, ensure your backend also has these
    const academicYears = ['all',  '2024-25', '2025-26'];

        const fetchEvents = useCallback(async (year) => {
        setLoading(true);
        setError('');
        try {
            let url = `${API_BASE_URL}/api/events`;
            const response = await axios.get(url);
            let fetchedEvents = response.data;

            // Combine fetched events with manual events
            let combinedEvents = [...fetchedEvents, ...initialManualEvents];

            // --- APPLY NEW FILTERING LOGIC ---
            if (year !== 'all') {
                // const now = new Date(); // REMOVE THIS LINE
                combinedEvents = combinedEvents.filter(event => {
                    const eventDate = new Date(event.eventDate);
                    if (year === '2024-25') {
                        // Events up to May 2025 (inclusive)
                        const endOf2024_25 = new Date('2025-05-31T23:59:59Z');
                        return eventDate <= endOf2024_25 && eventDate.getFullYear() >= 2024;
                    } else if (year === '2025-26') {
                        // Events from June 2025 to May 2026 (inclusive)
                        const startOf2025_26 = new Date('2025-06-01T00:00:00Z');
                        const endOf2025_26 = new Date('2026-05-31T23:59:59Z');
                        return eventDate >= startOf2025_26 && eventDate <= endOf2025_26;
                    } else if (year === '2023-24') {
                        const startOf2023_24 = new Date('2023-06-01T00:00:00Z');
                        const endOf2023_23_24 = new Date('2024-05-31T23:59:59Z'); // Corrected variable name
                        return eventDate >= startOf2023_24 && eventDate <= endOf2023_23_24; // Corrected variable name
                    }
                    return false;
                });
            }
            // --- APPLY NEW SORTING LOGIC: Oldest Events First ---
            combinedEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)); // Ascending order (Oldest first)

            setEvents(combinedEvents);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to fetch events. Displaying manual events as fallback.');
            // Fallback to manual events, but also apply sorting to them
            const sortedManualEvents = [...initialManualEvents].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
            setEvents(sortedManualEvents);
            setLoading(false);
        }
    }, [initialManualEvents, setEvents, setLoading, setError]);


    useEffect(() => {
        fetchEvents(selectedAcademicYear);
    }, [selectedAcademicYear, fetchEvents]);


    const handleYearChange = (year) => {
        setSelectedAcademicYear(year);
    };


    if (loading) {
        return <div className="events-page-container">Loading events...</div>;
    }

    if (error) {
        return <div className="events-page-container error-message">{error}</div>;
    }

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

            {events.length === 0 ? (
                <p className="no-events-message">No events found for {selectedAcademicYear === 'all' ? 'all academic years' : `the ${selectedAcademicYear} academic year`}.</p>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsPage;