import React, { useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faRocket, faHandshake, faTruck, faBookOpen, faEye, faBullseye, faEnvelope, faPhone, faBlog, faIndustry, faChartBar, faLaptopCode, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logoImg from './logo.jpg';
import photoImg from './photo.jpg';

function App() {
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
          ✅ धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे!
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
            <li><a href="#home" onClick={closeMobileMenu}>होम</a></li>
            <li><a href="#services" onClick={closeMobileMenu}>सेवाएं</a></li>
            <li><a href="#testimonials" onClick={closeMobileMenu}>प्रशंसापत्र</a></li>
            <li><a href="#story" onClick={closeMobileMenu}>हमारे बारे में</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>संपर्क</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1><span className="highlight">ऑटोमोबाइल</span> आफ्टरमार्केट में विकास को बढ़ावा देना</h1>
            <p>ऑटोमोटिव उद्योग में 30 से अधिक वर्षों के अनुभव के साथ, वितरण और 5+ वर्षों के व्यापारिक विकास अधिकारी के रूप में, हम ऑटोमोटिव व्यवसायों को ऑटोमोबाइल आफ्टरमार्केट में उनकी सफलता को तेज़ करने में मदद करते हैं।</p>
            <div className="hero-buttons">
              <a href="#contact"><button className="btn-primary">शुरू करें</button></a>
              <a href="#story"><button className="btn-secondary">और जानें</button></a>
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
            <div className="stat-label">वर्षों का उद्योग अनुभव</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="stat-number">5+</div>
            <div className="stat-label">वर्षों का व्यापारिक परामर्श</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <div className="stat-number">9+</div>
            <div className="stat-label">सफल सहयोग</div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Services Section */}
      <section id="services" className="section services">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>व्यापक परामर्श समाधान</h2>
          <p>प्रतिस्पर्धी ऑटोमोटिव आफ्टरमार्केट उद्योग में स्थायी विकास को तेज़ करने के लिए रणनीतिक परामर्श समाधान और सिद्ध पद्धतियां</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faIndustry} />
              </div>
              <h3>बाजार अनुसंधान और विश्लेषण</h3>
              <p>आफ्टरमार्केट क्षेत्र में अनुपयोग अवसरों की पहचान करने और आपकी बाजार स्थिति को अनुकूलित करने के लिए गहन बाजार अनुसंधान और प्रतिस्पर्धी विश्लेषण।</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <h3>रणनीतिक व्यापार विकास</h3>
              <p>ऑटोमोबाइल आफ्टरमार्केट व्यवसायों के लिए विशेष रूप से तैयार किया गया व्यापक व्यापारिक रणनीति विकास, स्थायी विकास और प्रतिस्पर्धी लाभ पर ध्यान केंद्रित करते हुए।</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>आपूर्ति श्रृंखला उत्कृष्टता</h3>
              <p>सिद्ध पद्धतियों के साथ अपनी आपूर्ति श्रृंखला संचालन को व्यवस्थित करें जो दक्षता को अधिकतम करती है, लागत को कम करती है, और डिलीवरी प्रदर्शन में सुधार करती है।</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <h3>विकास त्वरण</h3>
              <p>आपके व्यापारिक विकास को तेज़ करने, बाजार प्रवेश को बढ़ाने, और ऑटोमोटिव आफ्टरमार्केट में लाभप्रदता को अधिकतम करने के लिए व्यक्तिगत परामर्श सेवाएं।</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <h3>डिजिटल परिवर्तन</h3>
              <p>डिजिटल युग में प्रतिस्पर्धी बने रहने के लिए अत्याधुनिक डिजिटल समाधान, स्वचालन प्रौद्योगिकी, और डेटा-संचालित अंतर्दृष्टि के साथ अपने संचालन को आधुनिक बनाएं।</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h3>टीम विकास और प्रशिक्षण</h3>
              <p>आपकी टीम को कुशल बनाने और सभी विभागों में परिचालन दक्षता में सुधार करने के लिए व्यापक प्रशिक्षण कार्यक्रम और कौशल विकास पहल।</p>
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
          <h2>सफलता की कहानियां और ग्राहक प्रशंसापत्र</h2>
          <p>हमारे संतुष्ट ग्राहकों से सुनें जिन्होंने हमारे विशेषज्ञ मार्गदर्शन और रणनीतिक परामर्श सेवाओं के साथ अपने व्यवसायों को रूपांतरित किया है</p>
          <div className="testimonials-container">
            <div className="photo-testimonials">
              <h3>ग्राहक सफलता की कहानियां</h3>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="testimonial-avatar">R</div>
                  <p>"प्रदान की गई विशेषज्ञता और रणनीतिक मार्गदर्शन ने हमें पहले वर्ष के भीतर अपना बाजार हिस्सा 40% बढ़ाने में मदद की। ऑटोमोटिव आफ्टरमार्केट की उनकी गहरी समझ अद्वितीय है।"</p>
                  <div className="testimonial-author">
                    <strong>रॉबर्ट विल्सन</strong>
                    <span>वीपी सेल्स, ऑटोमोटिव इंक.</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-avatar">L</div>
                  <p>"उत्कृष्ट परामर्श सेवाएं जिन्होंने हमारे व्यापारिक संचालन और लाभप्रदता को पूरी तरह से बदल दिया। उनकी सिफारिशों से आरओआई असाधारण रहा है।"</p>
                  <div className="testimonial-author">
                    <strong>लिसा चेन</strong>
                    <span>मालिक, पार्ट्स पैराडाइज़</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-avatar">D</div>
                  <p>"पेशेवर, जानकार, और परिणाम-केंद्रित दृष्टिकोण। मैं किसी भी ऑटोमोटिव व्यवसाय को उनकी सेवाओं की अत्यधिक सिफारिश करता हूं जो स्केल और विकास की तलाश में है।"</p>
                  <div className="testimonial-author">
                    <strong>डेविड मार्टिनेज़</strong>
                    <span>सीओओ, फास्टट्रैक ऑटो</span>
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
          <h2>व्यावसायिक प्रोफ़ाइल, दृष्टिकोण और मिशन</h2>
          <p>तीन दशकों का उद्योग नेतृत्व, रणनीतिक दृष्टिकोण, और ऑटोमोटिव आफ्टरमार्केट उत्कृष्टता के लिए प्रतिबद्धता</p>
          <div className="story-content">
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  <h3>व्यावसायिक प्रोफ़ाइल</h3>
                </div>
                <p>लक्ष्मीकांत नांदेडकर एक अनुभवी व्यापारी, लेखक और वक्ता हैं जिनकी दोपहिया स्पेयर पार्ट्स आफ्टरमार्केट क्षेत्र में एक विशिष्ट उपस्थिति है। 1995 से, उन्होंने ऑटोमोटिव स्पेयर्स उद्योग पर ध्यान केंद्रित करते हुए अपना वितरण व्यापार चलाया है। राजाराम बापू प्रौद्योगिकी संस्थान से इंजीनियरिंग में स्नातक के साथ, वे तकनीकी विशेषज्ञता को व्यापक व्यापारिक कौशल के साथ जोड़ते हैं। एक प्रसिद्ध सार्वजनिक वक्ता और उद्योग गुरु के रूप में, वे क्षेत्रीय कार्यक्रमों में व्यावहारिक अंतर्दृष्टि साझा करते हैं और एक सक्रिय डिजिटल उपस्थिति बनाए रखते हैं, सोशल मीडिया प्लेटफार्म और प्रशिक्षण परामर्श सेवाओं के माध्यम से पेशेवरों को शिक्षित करते हैं।</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <h3>हमारा दृष्टिकोण</h3>
                </div>
                <p>दोपहिया स्पेयर्स उद्योग में वितरकों, थोक विक्रेताओं, खुदरा विक्रेताओं और उद्योग भागीदारों के बीच ज्ञान साझा करने और सामूहिक विकास को बढ़ावा देकर आफ्टरमार्केट समुदाय को मजबूत बनाना।</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBullseye} />
                  </div>
                  <h3>हमारा मिशन</h3>
                </div>
                <p>प्रासंगिक बाजार रुझानों को क्यूरेट करके, समुदायिक उपलब्धियों का जश्न मनाकर, और सिद्ध रणनीतियों को साझा करके ऑटो आफ्टरमार्केट पेशेवरों को जोड़ना, शिक्षित करना और प्रेरित करना जो क्षेत्र में प्रदर्शन और समृद्धि को बढ़ाती है।</p>
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
          <h2>आइए मिलकर आपकी सफलता को आगे बढ़ाएं</h2>
          <p>अपने व्यापारिक विकास को तेज़ करने और ऑटोमोटिव आफ्टरमार्केट में दबदबा बनाने के लिए तैयार हैं? आज ही हमसे जुड़ें और अपनी रूपांतरण यात्रा शुरू करें।</p>
          <div className="contact-content">
            <div className="contact-form">
              <h3>अपनी विकास यात्रा शुरू करें</h3>
              <p>हमारा परामर्श फॉर्म भरें और आइए चर्चा करते हैं कि हम आपको आपके व्यापारिक उद्देश्यों को प्राप्त करने में कैसे मदद कर सकते हैं।</p>
              
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
                  <strong>धन्यवाद!</strong> आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे।
                </div>
              )}
              
              <form 
                name="contact" 
                method="POST" 
                action="https://sheetdb.io/api/v1/u042ecer08g72"
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
                    <label htmlFor="firstName">पहला नाम *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">अंतिम नाम *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">ईमेल पता *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">फोन नंबर *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">दुकान/कंपनी का नाम *</label>
                  <input type="text" id="company" name="company" required />
                </div>
                <div className="form-group">
                  <label htmlFor="businessType">व्यापार का प्रकार *</label>
                  <select id="businessType" name="businessType" required onChange={handleBusinessTypeChange}>
                    <option value="">व्यापार का प्रकार चुनें</option>
                    <option value="manufacturer">निर्माता</option>
                    <option value="distributor">वितरक</option>
                    <option value="wholesaler">थोक विक्रेता</option>
                    <option value="retailer">खुदरा विक्रेता</option>
                    <option value="mechanic">मैकेनिक</option>
                    <option value="others">अन्य</option>
                  </select>
                </div>
                <div className="form-group" id="othersField" style={{display: 'none'}}>
                  <label htmlFor="others">कृपया निर्दिष्ट करें *</label>
                  <input type="text" id="others" name="others" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">संदेश *</label>
                  <textarea id="message" name="message" rows="5" required placeholder="हम आपकी कैसे मदद कर सकते हैं?"></textarea>
                </div>
                <button type="submit" className="btn-primary">संदेश भेजें</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faEnvelope} /> ईमेल</h4>
                <p><a href="mailto:laxmikantnandedkar@gmail.com">laxmikantnandedkar@gmail.com</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faPhone} /> फोन</h4>
                <p><a href="tel:+919673388415">+91 96733 88415</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faBlog} /> ब्लॉग</h4>
                <p><a href="https://medium.com/@LaxmikantNandedkar" target="_blank" rel="noopener noreferrer">मीडियम पर हमें फॉलो करें</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ऑटोमोबाइल आफ्टरमार्केट परामर्श। सभी अधिकार सुरक्षित।</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
