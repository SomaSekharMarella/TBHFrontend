import React from 'react';
import '../styles/HomePage.css';
import { FaBook, FaCode, FaTrophy, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import chainBg from '../assets/chain_bg.png';

// Helper to animate each letter
const AnimatedText = ({ text, className, initialDelay = 0, staggerDelay = 0.05 }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="letter-animate" // This class is what the CSS targets
        style={{ animationDelay: `${initialDelay + i * staggerDelay}s` }} // Calculate combined delay
      >
        {char === ' ' ? '\u00A0' : char} {/* Handles spaces correctly */}
      </span>
    ))}
  </span>
);

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section with background image */}
      <section className="hero-section hero-bg" style={{ backgroundImage: `url(${chainBg})` }}>
        <div className="hero-overlay">
          {/* Use AnimatedText with custom delays for each line */}
          <AnimatedText
            text="THE BLOCKCHAIN HUB"
            className="hero-title"
            initialDelay={0.3}   // This line starts animating after 0.3 seconds
            staggerDelay={0.08}   // Each letter appears 0.08 seconds after the previous
          />
          <AnimatedText
            text='"Empowering Decentralization"'
            className="hero-tagline"
            initialDelay={0.8}   // This line starts animating after 0.8 seconds (after the first line begins)
            staggerDelay={0.06}   // Each letter appears 0.06 seconds after the previous
          />
        </div>
      </section>

      {/* About the Club Section */}
      <section className="about-club-section section"> {/* Added .section class */}
        <h2>About the Club</h2>
        <p>
          <b> THE BLOCKCHAIN HUB (TBH) </b>at <b>KL University</b> is more than just a student club — it's a <b>revolutionary platform</b> for <b>future tech </b>leaders. Born out of a shared passion for innovation, <b>TBH</b> was founded by <b>Praveen</b> and his team, who turned their bold vision into a thriving community despite early struggles and delays in approvals.
          At <b>TBH</b>, we believe <b>blockchain is the future</b>, and our mission is simple — make every student <b>blockchain-literate</b> and ready for the <b>decentralized digital world</b>.
        </p>
      </section>

      {/* What is Blockchain Section */}
      <section className="what-is-blockchain-section section"> {/* Added .section class */}
        <h2>What is Blockchain?</h2>
        <div className="blockchain-explain">
          <div className="blockchain-icon"><FaLightbulb size={48} color="#f4d03f" /></div>
          <div className="blockchain-text">
            <p>Blockchain is a revolutionary technology that allows information to be stored securely without needing a central authority. It powers cryptocurrencies like Bitcoin, enables smart contracts, and ensures transparency in digital systems.</p>
            <ul>
              <li>🔗 A distributed digital ledger</li>
              <li>🔒 Immutable, secure, and decentralized</li>
              <li>🚀 Enables cryptocurrencies, NFTs, and smart contracts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section section"> {/* Consolidated and added .section class */}
        <h2>What We Do ?</h2>
        <div className="highlights-container">
        {/* This container will manage the stacking */}
          <div className="highlight-card">
            <FaBook className="highlight-icon" size={36} color="#1a237e" />
            <h3>Learn Blockchain</h3>
            <p>
              From fundamentals to advanced topics — we organize workshops, interactive sessions, and hands-on labs for students of all skill levels.
            </p>
          </div>
          <div className="highlight-card">
            <FaCode className="highlight-icon" size={36} color="#1a237e" />
            <h3>Build Projects</h3>
            <p>
              Work on real-world blockchain applications — dApps, smart contracts, and more — in collaborative peer groups.
            </p>
          </div>
          <div className="highlight-card">
            <FaTrophy className="highlight-icon" size={36} color="#1a237e" />
            <h3>Hackathons</h3>
            <p>
              Take part in competitions and challenges, connect with the wider blockchain ecosystem, and bring your ideas to life.
            </p>
          </div>
          <div className="highlight-card">
            <FaLightbulb className="highlight-icon" size={36} color="#1a237e" />
            <h3>Research & Innovation</h3>
            <p>
              Dive deep into emerging trends like Zero-Knowledge Proofs, Layer 2 Scaling, and Web3 infrastructure, contributing to the future of tech.
            </p>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="join-movement-section section"> {/* Added .section class */}
        <h2>Join the Movement !</h2>
        <p>
          Be part of a vibrant community, gain hands-on experience, and shape the future of technology. TBH empowers you to learn, build, and lead in the world of blockchain. <b>Ready to make a difference?</b>
        </p>
        <Link to="https://t.me/klu_tbh" target="_blank">
          <button type="button" className="join-btn">Join TBH Now</button>
        </Link>
      </section>

      

    </div>
  );
};

export default HomePage;