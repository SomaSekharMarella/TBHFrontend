// AboutUsPage.jsx
import React from 'react';
import '../styles/AboutUsPage.css';

// Import your images directly
import T from '../assets/T.png';
import B from '../assets/B.png';
import H from '../assets/H.png';

const AboutUsPage = () => {
  return (
    <>
      <div className="about-hero-row">
        <div className="letter-gallery">
          <img src={T} alt="T" className="letter-img" />
          <img src={B} alt="B" className="letter-img" />
          <img src={H} alt="H" className="letter-img" />
          <div className="letter-separator-line"></div>
        </div>
        <div className="about-content-card">
          <h2><span role="img" aria-label="star">🌟</span> Who We Are</h2>
          <p><b>The Blockchain Hub</b> is the beating heart of Web3 innovation at KL University, Vijayawada.</p>
          <p>Founded in 2024 by <b>Mr. Praveen Chennamsetty</b> and a group of Y21 CSE students, we've grown from a niche study group into the university's premier blockchain collective.</p>
        </div>
      </div>

      {/* The rest of the About Us content follows below within the main container */}
      {/* This container helps with overall page structure and max-width */}
      <div className="about-page-main-content">
        {/* Our DNA Section */}
        <section className="about-section">
          <div className="dna-section">
            <h2>Our DNA</h2>
            <div className="dna-point">
              <span className="icon">🔗</span>
              <p><strong>A Learning Revolution:</strong> We replace theoretical lectures with hands-on coding sessions, hackathons, and collaborative research</p>
            </div>
            <div className="dna-point">
              <span className="icon">💡</span>
              <p><strong>Student-Powered:</strong> Every workshop, project, and event is designed and led by students – for students</p>
            </div>
            <div className="dna-point">
              <span className="icon">🌍</span>
              <p><strong>Beyond Campus:</strong> We actively collaborate with industry partners and contribute to open-source blockchain projects</p>
            </div>
          </div>

          <div className="founder-quote">
            <h2>Our Founder's Vision</h2>
            <blockquote>
              "We started TBH because blockchain wasn't just another tech trend – it was the future.
              Today, we're proud to see freshers evolve into blockchain developers who outshine industry professionals."
            </blockquote>
            <p>- Mr. Praveen Chennamsetty, Founder</p>
          </div>

          <div className="different-section">
            <h2>What Makes Us Different</h2>
            <div className="different-point">
              <span className="icon">🧑‍💻</span>
              <p><strong>No elitism:</strong> Our only prerequisite is curiosity</p>
            </div>
            <div className="different-point">
              <span className="icon">☕</span>
              <p><strong>Chai-fueled debates:</strong> Where Proof-of-Stake vs. Work gets heated</p>
            </div>
            <div className="different-point">
              <span className="icon">🚀</span>
              <p><strong>Project-first approach:</strong> Learn by building real dApps from Day 1</p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="what-we-do">
          <h1 className="section-title">🔧 What We Do</h1>
          <p className="section-intro">
            At The Blockchain Hub, we bridge the gap between blockchain theory and real-world impact. Here's how:
          </p>

          <div className="activity-category">
            <h2>🔬 Learn & Build</h2>
            <ul>
              <li><strong>Master Blockchain Tech:</strong> Hands-on workshops on Solidity, Smart Contracts, DeFi, NFTs, and Web3 tools (Hardhat, Truffle, Metamask).</li>
              <li><strong>Project-Based Learning:</strong> From beginner-friendly dApps to advanced protocols – code, deploy, and iterate.</li>
            </ul>
          </div>

          <div className="activity-category">
            <h2>⚡ Hackathons & Competitions</h2>
            <ul>
              <li><strong>Build Under Pressure:</strong> Participate in 48-hour blockchain challenges (e.g., "Design a DAO" or "Tokenize Real-World Assets").</li>
              <li><strong>Win & Shine:</strong> Compete in national/international hackathons with mentorship from our seniors and alumni.</li>
            </ul>
          </div>

          <div className="activity-category">
            <h2>🚀 Research & Innovation</h2>
            <ul>
              <li><strong>Explore Cutting-Edge Topics:</strong> Zero-knowledge proofs, Layer-2 scaling, consensus algorithms, and more.</li>
              <li><strong>Publish & Present:</strong> Contribute to open-source projects or publish research papers with faculty guidance.</li>
            </ul>
          </div>

          <div className="activity-category">
            <h2>🌍 Community & Networking</h2>
            <ul>
              <li><strong>Meet the Experts:</strong> Interactive sessions with blockchain developers, founders, and KLU alumni in Web3.</li>
              <li><strong>TBH Seniors' Corner:</strong> Get career advice, code reviews, and internship/job referrals from seniors.</li>
              <li><strong>Discord Community:</strong> Daily tech discussions, meme wars, and collaborative problem-solving.</li>
            </ul>
          </div>

          <div className="activity-category">
            <h2>📢 Outreach & Awareness</h2>
            <ul>
              <li><strong>Campus Advocacy:</strong> Organize talks and demos to introduce blockchain to non-tech students.</li>
              <li><strong>Open-Source Advocacy:</strong> Contribute to public blockchain projects and documentations.</li>
            </ul>
          </div>

          <p className="tagline">"We don't just learn blockchain – we build, break, and redefine it."</p>
        </section>

        {/* Why Join Us Section */}
        <section className="why-join">
          <h1 className="section-title">🚀 Why Join The Blockchain Hub?</h1>

          <div className="benefit-category">
            <h2>🧠 Supercharge Your Skills</h2>
            <ul>
              <li><strong>From Zero to Web3 Hero:</strong> Master blockchain fundamentals → advanced dApp development in our structured learning path.</li>
              <li><strong>Industry-Grade Toolkit:</strong>Get hands-on with Solidity, Hardhat, Ethers.js, and the exact stack used by Polygon/Coinbase teams.</li>
              <li><strong>Research That Matters:</strong> Contribute to cutting-edge projects on ZK-proofs, Layer-2 scaling, and consensus algorithms.</li>
            </ul>
          </div>

          <div className="benefit-category">
            <h2>💼 Turbocharge Your Career</h2>
            <ul>
              <li><strong>Industry Connections:</strong> Network with alumni at top Web3 companies (Polygon, Coinbase, etc.) and get referrals.</li>
              <li><strong>Hackathon Dominance:</strong> Boost your resume with competitions and certifications.</li>
              <li><strong>Internship Pipeline:</strong> Exclusive access to blockchain internship/job postings.</li>
            </ul>
          </div>

          <div className="benefit-category">
            <h2>🤝 For Your Tribe</h2>
            <ul>
              <li><strong>Seniors Who Care:</strong> Get 1:1 mentorship from experienced TBH members.</li>
              <li><strong>Collaborative Culture:</strong> Team up to solve problems, not just compete.</li>
              <li><strong>Discord Community:</strong> 24/7 support, meme battles, and #jobs-and-internships channel.</li>
            </ul>
          </div>

          <div className="benefit-category">
            <h2>🎉 For the Fun</h2>
            <ul>
              <li><strong>Crypto Trivia Nights:</strong> Test your knowledge and win NFT prizes.</li>
              <li><strong>Guest Speaker AMAs:</strong> Grill Ethereum devs and founders with uncensored questions.</li>
              <li><strong>IRL Meetups:</strong> Pizza + blockchain debates (Proof-of-Stake vs. Proof-of-Work, anyone?).</li>
            </ul>
          </div>

          <div className="belong-here">
            <h2>🎯 You Belong Here If You're...</h2>
            <div className="belong-points">
              <p>✅ A curious coder (no blockchain experience needed!).</p>
              <p>✅ A hustler looking to break into Web3.</p>
              <p>✅ A researcher obsessed with decentralized tech.</p>
              <p>✅ Just NFT-pilled and want to learn why it matters.</p>
            </div>
          </div>

          <div className="join-cta">
           <h2>🔥 Join Now – What's Next?</h2>
             <div className="cta-steps">
                <p>📲 DM us on <a href="https://www.instagram.com/klu_tbh/" target="_blank" rel="noopener noreferrer">Instagram (@klu_tbh)</a> for an invite.</p>
               <p>✈️ Join our <a href="https://t.me/klu_tbh" target="_blank" rel="noopener noreferrer">Telegram channel (@klu_tbh)</a> for instant updates.</p>
               <p>🎟️ Attend your first workshop .</p>
    </div>
</div>

          <p className="final-tagline">"The future of the internet is decentralized. Don't just watch it happen – build it with us."</p>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;