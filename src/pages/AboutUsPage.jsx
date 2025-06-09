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
              "We launched The Blockchain Hub to help students move from Web2 to Web3 thinking. Blockchain isn't just tech — it's decentralization, transparency, smart contracts, and trustless systems. We wanted to create a place where peers could explore these concepts, build on-chain, and understand the real power of decentralized applications. Today, watching students deploy smart contracts and contribute to real networks proves that we’re not just learning the future — we’re building it, block by block."
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
    <h1 className="section-title">Why Join The Blockchain Hub?</h1>

    <div className="benefit-category">
        <h2>Elevate Your Technical Expertise</h2>
        <ul>
            <li><strong>Comprehensive Learning Pathway:</strong> Progress from blockchain fundamentals to advanced dApp development through our structured curriculum.</li>
            <li><strong>Industry-Standard Tooling:</strong> Gain hands-on experience with Solidity, Hardhat, Ethers.js, and other tools used by leading Web3 organizations.</li>
            <li><strong>Cutting-Edge Research Opportunities:</strong> Contribute to innovative projects exploring ZK-proofs, Layer-2 scaling solutions, and next-generation consensus mechanisms.</li>
        </ul>
    </div>

    <div className="benefit-category">
        <h2>Accelerate Your Professional Growth</h2>
        <ul>
            <li><strong>Strategic Networking:</strong> Connect with alumni at prominent Web3 companies including Polygon and Coinbase, with potential referral opportunities.</li>
            <li><strong>Competitive Advantage:</strong> Enhance your credentials through hackathon participation and industry-recognized certifications.</li>
            <li><strong>Exclusive Career Access:</strong> Benefit from our curated pipeline of blockchain internships and employment opportunities.</li>
        </ul>
    </div>

    <div className="benefit-category">
        <h2>Collaborative Community</h2>
        <ul>
            <li><strong>Mentorship Program:</strong> Receive personalized guidance from experienced TBH members.</li>
            <li><strong>Team-Based Learning:</strong> Engage in collaborative problem-solving within our supportive environment.</li>
            <li><strong>Dedicated Support:</strong> Access our 24/7 Discord community for technical discussions, career opportunities, and networking.</li>
        </ul>
    </div>

    <div className="benefit-category">
        <h2>Engaging Events</h2>
        <ul>
            <li><strong>Technical Challenges:</strong> Participate in blockchain trivia competitions with unique rewards.</li>
            <li><strong>Industry Insights:</strong> Interact directly with Ethereum developers and project founders through exclusive AMA sessions.</li>
            <li><strong>In-Person Gatherings:</strong> Join our meetups combining networking with technical discussions on critical blockchain topics.</li>
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
               <p>🎟 Attend your first workshop .</p>
    </div>
</div>

    <p className="final-tagline">
        "The decentralized web represents the next evolution of the internet. We're building that future today - join us in shaping it."
        <br/><strong>- Soma Sekhar, President</strong>
    </p>
</section>
      </div>
    </>
  );
};

export default AboutUsPage;