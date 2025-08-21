import React, { useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faRocket, faHandshake, faTruck, faBookOpen, faEye, faBullseye, faEnvelope, faPhone, faBlog, faIndustry, faChartBar, faLaptopCode, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logoImg from './logo.jpg';
import photoImg from './photo.jpg';

function App() {
  const SHEETS_ENDPOINT = process.env.REACT_APP_SHEETS_URL;
  // Check if form was successfully submitted
  const urlParams = new URLSearchParams(window.location.search);
  const formSuccess = urlParams.get('success') === 'true';

  // Clear URL parameter after showing success message
  React.useEffect(() => {
    if (formSuccess) {
      // Show success message for 5 seconds, then clear URL
      const timer = setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);
  const handleBusinessTypeChange = (e) => {
    const othersField = document.getElementById('othersField');
    const othersInput = document.getElementById('others');
    
    if (e.target.value === 'others') {
      othersField.style.display = 'block';
      othersInput.required = true;
    } else {
      othersField.style.display = 'none';
      othersInput.required = false;
      othersInput.value = '';
    }
  };

  // Optional: show a quick loading state on submit while Netlify processes
  const handleFormSubmit = (e) => {
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }
    // Fire-and-forget: also send to Google Sheets Apps Script if configured
    try {
      if (SHEETS_ENDPOINT) {
        const fd = new FormData(form);
        // Include a timestamp and path for context
        fd.append('submittedAt', new Date().toISOString());
        fd.append('page', window.location.href);

        const payloadObj = Object.fromEntries(fd.entries());
        const json = JSON.stringify(payloadObj);

        // Prefer beacon to avoid blocking navigation, fallback to keepalive fetch
        if (navigator.sendBeacon) {
          const blob = new Blob([json], { type: 'application/json' });
          navigator.sendBeacon(SHEETS_ENDPOINT, blob);
        } else {
          fetch(SHEETS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json,
            keepalive: true
          }).catch(() => {});
        }
      }
    } catch (_) {
      // ignore client-side errors; Netlify will still receive the form
    }
    // Do not preventDefault; let Netlify handle the POST + redirect
  };

  const toggleMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Smooth scrolling for navigation links and buttons
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href') || e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to all anchor tags and buttons with href
    const clickableElements = document.querySelectorAll('a[href^="#"], button[onclick*="#"]');
    clickableElements.forEach(element => {
      element.addEventListener('click', handleSmoothScroll);
    });

    // Also add to hero buttons specifically
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
      button.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners
    return () => {
      clickableElements.forEach(element => {
        element.removeEventListener('click', handleSmoothScroll);
      });
      heroButtons.forEach(button => {
        button.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="App">
      {/* Success Message Banner */}
      {formSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          zIndex: 9999,
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          ✅ Thank you! Your message has been sent successfully. We will get back to you soon!
        </div>
      )}
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logoImg} alt="Company Logo" />
          </div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
            <li><a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a></li>
            <li><a href="#story" onClick={closeMobileMenu}>About</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Driving Growth in <span className="highlight">Automobile</span> Aftermarket</h1>
            <p>With over 30 years of experience in the automotive industry, spanning trading and 5+ years as a business growth consultant, we help automotive businesses accelerate their success in the automobile aftermarket industry.</p>
            <div className="hero-buttons">
              <a href="#contact"><button className="btn-primary">Get Started</button></a>
              <a href="#story"><button className="btn-secondary">Learn More</button></a>
            </div>
            <div className="social-links">
              <a href="https://youtube.com/@lgnandedkar2041?si=r7vkf1uCdOOQujYy" target="_blank" rel="noopener noreferrer" className="youtube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.facebook.com/share/16btthLGff/" target="_blank" rel="noopener noreferrer" className="facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.linkedin.com/in/laxmikant-nandedkar-465887247" target="_blank" rel="noopener noreferrer" className="linkedin">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://www.instagram.com/laxmikant_nandedkar?igsh=ODZzeDEwMTYzajAz" target="_blank" rel="noopener noreferrer" className="instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://medium.com/@LaxmikantNandedkar" target="_blank" rel="noopener noreferrer" className="medium">
                <span className="medium-text">M</span>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src={photoImg} alt="Business Consultant" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div className="stat-number">30+</div>
            <div className="stat-label">Years of Industry Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="stat-number">5+</div>
            <div className="stat-label">Years of Business Consulting</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <div className="stat-number">9+</div>
            <div className="stat-label">Successful Collaborations</div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Services Section */}
      <section id="services" className="section services">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>Comprehensive Consulting Solutions</h2>
          <p>Strategic consulting solutions and proven methodologies to accelerate sustainable growth in the competitive automotive aftermarket industry</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <h3>Strategic Business Development</h3>
              <p>Comprehensive business strategy development tailored specifically for automobile aftermarket businesses, focusing on sustainable growth and competitive advantage.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faIndustry} />
              </div>
              <h3>Market Research & Analysis</h3>
              <p>In-depth market research and competitive analysis to identify untapped opportunities and optimize your market positioning in the aftermarket sector.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>Supply Chain Excellence</h3>
              <p>Streamline your supply chain operations with proven methodologies that maximize efficiency, reduce costs, and improve delivery performance.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <h3>Growth Acceleration</h3>
              <p>Personalized consulting services designed to accelerate your business growth, enhance market penetration, and maximize profitability in the automotive aftermarket.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <h3>Digital Transformation</h3>
              <p>Modernize your operations with cutting-edge digital solutions, automation technologies, and data-driven insights to stay competitive in the digital age.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h3>Team Development & Training</h3>
              <p>Comprehensive training programs and skill development initiatives to upskill your team and improve operational efficiency across all departments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="section testimonials">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>Success Stories & Client Testimonials</h2>
          <p>Hear from our satisfied clients who have transformed their businesses with our expert guidance and strategic consulting services</p>
          <div className="testimonials-container">
            <div className="photo-testimonials">
              <h3>Client Success Stories</h3>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="testimonial-avatar">R</div>
                  <p>"The expertise and strategic guidance provided helped us increase our market share by 40% within the first year. Their deep understanding of the automotive aftermarket is unparalleled."</p>
                  <div className="testimonial-author">
                    <strong>Robert Wilson</strong>
                    <span>VP Sales, AutoMotive Inc.</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-avatar">L</div>
                  <p>"Outstanding consulting services that completely transformed our business operations and profitability. The ROI from their recommendations has been exceptional."</p>
                  <div className="testimonial-author">
                    <strong>Lisa Chen</strong>
                    <span>Owner, Parts Paradise</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-avatar">D</div>
                  <p>"Professional, knowledgeable, and results-driven approach. I highly recommend their services to any automotive business looking to scale and grow."</p>
                  <div className="testimonial-author">
                    <strong>David Martinez</strong>
                    <span>COO, FastTrack Auto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Story Section */}
      <section id="story" className="section story">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>Professional Profile, Vision & Mission</h2>
          <p>Three decades of industry leadership, strategic vision, and commitment to automotive aftermarket excellence</p>
          <div className="story-content">
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  <h3>Professional Profile</h3>
                </div>
                <p>Laxmikant Nandedkar is a seasoned business owner, writer, and speaker with a distinguished presence in the two-wheeler spare parts aftermarket sector. Since 1995, he has led his own distribution business, focusing on the automotive spares industry. With a Bachelor's in Engineering from Rajarambapu Institute of Technology, he combines technical expertise with extensive business acumen. As a renowned public speaker and industry mentor, he shares practical insights at sectoral events and maintains an active digital presence, educating professionals through social media platforms and training consultancy services.</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <h3>Our Vision</h3>
                </div>
                <p>To strengthen aftermarket community by sharing knowledge and driving collective growth among distributors, wholesalers, retailers, and industry partners in the two wheeler spares industry.</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBullseye} />
                  </div>
                  <h3>Our Mission</h3>
                </div>
                <p>To connect, educate, and motivate auto aftermarket professionals by curating relevant market trends, celebrating community accomplishments, and sharing proven tactics that elevate performance and prosperity across the sector.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>Let's Drive Your Success Together</h2>
          <p>Ready to accelerate your business growth and dominate the automotive aftermarket? Connect with us today to start your transformation journey.</p>
          <div className="contact-content">
            <div className="contact-form">
              <h3>Start Your Growth Journey</h3>
              <p>Fill out our consultation form and let's discuss how we can help you achieve your business objectives.</p>
              
              {/* Success Message */}
              {formSuccess && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #c3e6cb'
                }}>
                  <strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.
                </div>
              )}
              
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field"
                action="/thank-you.html"
                onSubmit={handleFormSubmit}
                className="contact-form-fields"
              >
                {/* Hidden field for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field for spam protection */}
                <div style={{display: 'none'}}>
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Shop/Company Name</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className="form-group">
                  <label htmlFor="businessType">Type of Business *</label>
                  <select id="businessType" name="businessType" required onChange={handleBusinessTypeChange}>
                    <option value="">Select business type</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="distributor">Distributor</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="retailer">Retailer</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="form-group" id="othersField" style={{display: 'none'}}>
                  <label htmlFor="others">Please specify *</label>
                  <input type="text" id="others" name="others" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faEnvelope} /> Email</h4>
                <p><a href="mailto:laxmikantnandedkar@gmail.com">laxmikantnandedkar@gmail.com</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faPhone} /> Phone</h4>
                <p><a href="tel:+919673388415">+91 96733 88415</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faBlog} /> Blog</h4>
                <p><a href="https://medium.com/@LaxmikantNandedkar" target="_blank" rel="noopener noreferrer">Follow us on Medium</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Automobile Aftermarket Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
