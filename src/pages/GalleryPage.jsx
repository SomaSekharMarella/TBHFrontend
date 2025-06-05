import React, { useMemo } from 'react'; // Removed useState and useCallback as they are no longer needed
import '../styles/GalleryPage.css'; // Import the CSS file for this page

// --- IMPORTANT: Import your actual images here ---
// Create an 'images' folder inside 'assets' (e.g., client/src/assets/images/)
// and place your club photos there. Then import them like this:
import launch from '../assets/gallery/launch.jpg'; // Example: Replace with your image paths
import bootcamp from '../assets/gallery/gallery1.jpg';
import projectexpo from '../assets/gallery/gallery2.jpg';
import bits from '../assets/gallery/gallery4.jpg';
import intro from '../assets/gallery/intro.jpg';
import samyakEventsImage from '../assets/gallery/Samyak.jpg';
import proTBH from '../assets/gallery/mouli.jpg';
import som from '../assets/gallery/SomStrength1.jpg';
import silmaster from '../assets/gallery/silmaster.jpg';
// Add more imports for all your gallery images as needed

// --- GalleryItemCard Component (for displaying individual images) ---
const GalleryItemCard = ({ item }) => {
    // Determine photo source
    let photoSrc;
    // Assuming imageSrc holds the actual URL/path, or imported module
    if (item.imageSrc) {
        photoSrc = item.imageSrc;
    } else {
        photoSrc = 'https://via.placeholder.com/400x300/E0E0E0/888888?text=No+Image'; // Fallback
    }

    let formattedDate = null;
    if (item.dateTaken) {
        // Try to parse it as a Date object if it resembles a standard date format
        // This regex checks for YYYY-MM-DD or MM/DD/YYYY numeric formats
        const looksLikeStandardDate = /^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/.test(item.dateTaken);

        if (looksLikeStandardDate) {
            const dateObj = new Date(item.dateTaken);
            // Check if dateObj is a valid date (not 'Invalid Date')
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('en-GB', { // 'en-GB' locale ensures dd/mm/yyyy
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } else {
                // If it looked like a date but parsed as invalid, display as is
                formattedDate = item.dateTaken;
            }
        } else {
            // If it doesn't look like a standard date (e.g., "March", "12-15"), display as is
            formattedDate = item.dateTaken;
        }
    }

    return (
        <div className="gallery-item-card">
            <div className="gallery-image-container">
                <img
                    src={photoSrc}
                    alt={item.title}
                    className="gallery-image"
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop on error
                        e.target.src = 'https://via.placeholder.com/400x300/E0E0E0/888888?text=Image+Not+Found'; // Fallback
                    }}
                />
            </div>
            <div className="gallery-details">
                <h3 className="gallery-title">{item.title}</h3>
                {item.description && <p className="gallery-description">{item.description}</p>}
                {/* Conditionally render date only if it's formatted or exists */}
                {formattedDate && (
                    <p className="gallery-date">Date: {formattedDate}</p>
                )}
            </div>
        </div>
    );
};

// --- GalleryPage Component ---
const GalleryPage = () => {
    // Define your hardcoded gallery items for the "2024-25" academic year (representing 2025 moments)
    const galleryItemsFor2024_25 = useMemo(() => [
        {
        _id: 'event_1',
        title: 'Blockchain Club Inauguration',
        description: 'The exciting launch of our blockchain club with inspiring speeches from Dr. Santhi Sri, Dr. Hari Kiran Vege, and our founding team. A day full of energy and new possibilities!',
        imageSrc: launch,
        academicYear: '2024-25',
        dateTaken: '2024-07-25',
        displayOrder: 1
    },

    // 2. Basics Sessions
    {
        _id: 'event_2',
        title: 'Blockchain Fundamentals Series',
        description: 'We kicked off with two beginner-friendly sessions explaining blockchain basics - from how Bitcoin works to understanding Ethereum smart contracts. Perfect starting point for newcomers!',
        imageSrc: intro,
        academicYear: '2024-25',
        dateTaken: '2024-09-18',
        displayOrder: 2
    },

    // 3. Samyak Bootcamp Events
    {
        _id: 'event_3',
        title: 'Web3 Builder Workshops',
        description: 'During Samyak Bootcamp, we hosted two hands-on events where students built their first crypto tokens and explored the Web3 world. So much creativity in one room!',
        imageSrc: samyakEventsImage,
        academicYear: '2024-25',
        dateTaken: '1-4 October 2024',
        displayOrder: 3
    },

    // 4. SIL Weekly Series
    {
        _id: 'event_4',
        title: 'Weekly Learning Journey(SIL)',
        description: "Throughout the semester, we organized weekly sessions diving deep into different blockchain topics. Watching everyone's knowledge grow week by week was amazing!",
        imageSrc:som ,
        academicYear: '2024-25',
        dateTaken: 'Everyweek srom september 2024',
        displayOrder: 4
    },

    // 5. Awareness Bootcamp
    {
        _id: 'event_5',
        title: 'Blockchain Awareness Day',
        description: 'Flagship event featuring: Keynote by our Addl Dean Academics Hari Kiran Sir, faculty panel with Mohan Kumar Sir & Phani Kumar Sir, 200+ attendees across engineering streams.',
        imageSrc: bootcamp,
        academicYear: '2024-25',
        dateTaken: '2025-01-04',
        displayOrder: 5
    },

    // 6. Project TBH Initiative
    {
        _id: 'event_6',
        title: 'Project TBH (Train-Build-Help)',
        description: 'Our special program to guide interested students through blockchain projects. From learning basics to building real applications - the progress has been incredible!',
        imageSrc: proTBH,
        academicYear: '2024-25',
        dateTaken: 'Throughout Even Semester',
        displayOrder: 6
    },

    // 7. KLU Project Expo
    {
        _id: 'event_7',
        title: "ProjectExpo'25 - KLU",
        description: 'Proud moment at KL University expo where we presented four student-built blockchain systems, including a voting system and supply chain tracker. Our hard work paid off!',
        imageSrc: projectexpo,
        academicYear: '2024-25',
        dateTaken: '2025-01-28',
        displayOrder: 7
    },

    // 8. Tech-Xcelerate Hackathon
    {
        _id: 'event_8',
        title: 'BITS Pilani Tech-Xcelerate Hackathon',
        description: 'Two teams represented us at BITS Pilani\'s Tech-Xcelerate. One team made it to finals! Fantastic experience competing and connecting with blockchain enthusiasts from other colleges.',
        imageSrc: bits,
        academicYear: '2024-25',
        dateTaken: '2025-03-21',
        displayOrder: 8
    },

    // 9. Ongoing SIL Events
    {
        _id: 'event_9',
        title: 'SIL Masterclass Series',
        description: 'Keeping the momentum going with our regular blockchain discussions. Each week we explore new concepts and applications - the learning never stops!',
        imageSrc: silmaster,
        academicYear: '2024-25',
        dateTaken: 'EveryWeek from February 2025',
        displayOrder: 9
    }
        // --- Add more gallery items for 2024-25 academic year / 2025 moments here ---
    ].sort((a, b) => a.displayOrder - b.displayOrder), []); // Sort by display order

    // Removed state and logic for academic year filtering as per your request
    // Removed unused 'useState' declarations for loading and error
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    return (
        <div className="gallery-page-container">
            {/* Updated title to reflect the single academic year */}
            <h1 className="page-title">Our Club Moments (2024-25)</h1>

            {/* Removed Academic Year Filter Buttons as per your request */}

            {/* Display Gallery Items Grid */}
            {galleryItemsFor2024_25.length === 0 ? (
                <p className="no-gallery-items-message">No moments found for 2024-25 yet. Check back soon!</p>
            ) : (
                <div className="gallery-items-grid">
                    {galleryItemsFor2024_25.map((item) => (
                        <GalleryItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
