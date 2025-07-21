import React, { useState } from 'react';
// axios is not strictly necessary if you use fetch, but it's fine to keep it if you prefer
// import axios from 'axios'; // Removed as fetch is used for Apps Script
import '../styles/ContactUs.css'; // Import the CSS file for this page

// Import your background image. Adjust the path if your assets folder is different.
import backgroundImage from '../assets/images/contactus.jpg'; // Assuming this is the image you provided
// Import your club logo for the left panel

// You might have these icons in your assets or use a library like Font Awesome
// For simplicity, we'll use inline SVGs or placeholders for now.
// If you have actual icon files (e.g., .svg, .png), import them here:
// import instagramIcon from '../assets/icons/instagram.svg';
// import telegramIcon from '../assets/icons/telegram.svg';
// import linkedinIcon from '../assets/icons/linkedin.svg';

// <--- IMPORTANT: Replaced with your actual Web App URL from your Google Apps Script deployment ---
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxUvUc0jO1CMe_auF8Mv1yhgzs2oh61FawkP-3JYd3QwoZHr680oHDK6uEvM2VquL-3sw/exec';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage(''); // Clear messages on input change
        setError('');
    };

    const handleSubmit = async (e) => { // Made function async
        e.preventDefault(); // Prevent default form submission (page reload)

        // Basic client-side validation
        if (!formData.name || !formData.email || !formData.query) {
            setError('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true); // Set submitting state to true
        setMessage(''); // Clear previous messages
        setError('');

        try {
            // Send data to Google Apps Script Web App using fetch API
            const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
                method: 'POST',
                mode: 'cors', // Essential for cross-origin requests
                headers: {
                    'Content-Type': 'application/json', // Tell the server we're sending JSON
                },
                body: JSON.stringify(formData), // Convert your form data to JSON string
            });

            const result = await response.json(); // Parse the JSON response from Apps Script

            if (result.success) {
                setMessage(result.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', query: '' }); // Clear the form
            } else {
                setError(result.message || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Error sending contact form to Apps Script:', err);
            setError('Kindly Reach Out our Team via Telegram or Email.'); // Generic error message
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className="contact-us-page-container">
            <div className="contact-left-panel" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="overlay"></div> {/* For darkening the background if needed */}
                <div className="left-panel-content">
                    {/* Add your club logo here */}
                </div>
            </div>

            <div className="contact-right-panel">
                <h1 className="contact-title">Contact Us <span>📞</span></h1> {/* Added a phone icon */}

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="contact-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting} // Disable input during submission
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting} // Disable input during submission
                    />
                    <textarea
                        name="query"
                        placeholder="Type your query here"
                        value={formData.query}
                        onChange={handleChange}
                        rows="5" // Adjust rows as needed
                        required
                        disabled={isSubmitting} // Disable input during submission
                    ></textarea>
                    <button type="submit" className="send-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'} {/* Change button text during submission */}
                    </button>
                </form>

                <div className="official-handles">
                    <h3>Our Official Handles</h3>
                    <p>Email: <a href="mailto:theblockchainhub.klu@gmail.com">theblockchainhub.klu@gmail.com</a></p>
                    <p>Location: KL University, Vijayawada</p>
                    <div className="social-icons">
                        {/* Replace with actual icon components or image tags if you have them */}
                        <a href="https://www.instagram.com/klu_tbh" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.716 0-3.056.012-4.122.06c-1.066.049-1.79.21-2.428.468c-.65.268-1.222.62-1.782 1.18c-.56.56-1.022 1.132-1.18 1.782c-.258.638-.419 1.362-.468 2.428c-.048 1.066-.06 1.406-.06 4.122s.012 3.056.06 4.122c.049 1.066.21 1.79.468 2.428c.268.65.62 1.222 1.18 1.782c.56.56 1.132 1.022 1.782 1.18c.638.258 1.362.419 2.428.468c1.066.048 1.406.06 4.122.06s3.056-.012 4.122-.06c1.066-.049 1.79-.21 2.428-.468c.65-.268 1.222-.62 1.782-1.18c.56-.56 1.022-1.132 1.18-1.782c-.258-.638.419-1.362.468-2.428c.048-1.066.06-1.406.06-4.122s-.012-3.056-.06-4.122c-.049-1.066-.21-1.79-.468-2.428c-.268-.65-.62-1.222-1.18-1.782c-.56-.56-1.132-1.022-1.782-1.18c-.638-.258-1.362-.419-2.428-.468C15.056 2.012 14.716 2 12 2zm0 1.6c2.662 0 2.966.01 4.02.059c.975.045 1.503.186 1.858.324c.36.142.607.307.848.548c.24.24.405.488.548.848c.138.355.279.883.324 1.858c.049 1.054.059 1.358.059 4.02s-.01 2.966-.059 4.02c-.045.975-.186 1.503-.324 1.858c-.142.36-.307.607-.548.848c-.24.24-.488.405-.848.548c-.355.138-.883.279-1.858.324c-1.054.049-1.358.059-4.02.059s-2.966-.01-4.02-.059c-.975-.045-1.503-.186-1.858-.324c-.36-.142-.607-.307-.848-.548c-.24-.24-.405-.488-.548-.848c-.138-.355-.279-.883-.324-1.858c-.049-1.054-.059-1.358-.059-4.02s.01-2.966.059-4.02c.045-.975.186-1.503.324-1.858c.142-.36.307-.607.548-.848c.24-.24.488-.405.848-.548c.355-.138.883-.279 1.858-.324C9.034 3.61 9.338 3.6 12 3.6zm0 3.6c-2.646 0-4.8 2.154-4.8 4.8s2.154 4.8 4.8 4.8s4.8-2.154 4.8-4.8s-2.154-4.8-4.8-4.8zm0 1.6c1.763 0 3.2 1.437 3.2 3.2s-1.437 3.2-3.2 3.2s-3.2-1.437-3.2-3.2s1.437-3.2 3.2-3.2zm6.4-7.2c-.528 0-.96.432-.96.96s.432.96.96.96s.96-.432.96-.96s-.432-.96-.96-.96z"/></svg>
                        </a>
                        <a href="https://t.me/klu_tbh" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10zm4.848 7.391l-2.454 7.294c-.172.51-.518.648-.859.356l-2.368-1.745c-.23-.17-.442-.232-.676-.232c-.227 0-.44.062-.676.232l-1.127.828c-.236.173-.448.235-.676.235c-.47 0-.74-.298-.859-.858l-1.454-6.857c-.118-.56.124-.802.684-.684l13.107 4.953c.56.118.802.36.684.92z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/tbhklu/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764s1.75.79 1.75 1.764s-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
