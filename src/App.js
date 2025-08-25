import React, { useEffect, useState, createContext, useContext } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faRocket, faHandshake, faTruck, faBookOpen, faEye, faBullseye, faEnvelope, faPhone, faBlog, faIndustry, faChartBar, faLaptopCode, faUserTie, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logoImg from './logo.jpg';
import photoImg from './photo.jpg';

// Language Context
const LanguageContext = createContext();

// Language data
const translations = {
  hi: {
    // Navigation
    nav: {
      home: "होम",
      services: "सेवाएं",
      testimonials: "प्रशंसापत्र",
      about: "हमारे बारे में",
      contact: "संपर्क"
    },
    // Hero Section
    hero: {
      title: "ऑटोमोबाइल आफ्टरमार्केट में विकास को बढ़ावा देना",
      subtitle: "ऑटोमोटिव उद्योग में 30 से अधिक वर्षों के अनुभव के साथ, वितरण और 5+ वर्षों के व्यापारिक विकास अधिकारी के रूप में, हम ऑटोमोटिव व्यवसायों को ऑटोमोबाइल आफ्टरमार्केट में उनकी सफलता को तेज़ करने में मदद करते हैं।",
      getStarted: "शुरू करें",
      learnMore: "और जानें"
    },
    // Stats
    stats: {
      experience: "वर्षों का उद्योग अनुभव",
      consulting: "वर्षों का व्यापारिक परामर्श",
      collaborations: "सफल सहयोग"
    },
    // Services
    services: {
      title: "व्यापक परामर्श समाधान",
      subtitle: "प्रतिस्पर्धी ऑटोमोटिव आफ्टरमार्केट उद्योग में स्थायी विकास को तेज़ करने के लिए रणनीतिक परामर्श समाधान और सिद्ध पद्धतियां",
      marketResearch: {
        title: "बाजार अनुसंधान और विश्लेषण",
        desc: "आफ्टरमार्केट क्षेत्र में अनुपयोग अवसरों की पहचान करने और आपकी बाजार स्थिति को अनुकूलित करने के लिए गहन बाजार अनुसंधान और प्रतिस्पर्धी विश्लेषण।"
      },
      businessDev: {
        title: "रणनीतिक व्यापार विकास",
        desc: "ऑटोमोबाइल आफ्टरमार्केट व्यवसायों के लिए विशेष रूप से तैयार किया गया व्यापक व्यापारिक रणनीति विकास, स्थायी विकास और प्रतिस्पर्धी लाभ पर ध्यान केंद्रित करते हुए।"
      },
      supplyChain: {
        title: "आपूर्ति श्रृंखला उत्कृष्टता",
        desc: "सिद्ध पद्धतियों के साथ अपनी आपूर्ति श्रृंखला संचालन को व्यवस्थित करें जो दक्षता को अधिकतम करती है, लागत को कम करती है, और डिलीवरी प्रदर्शन में सुधार करती है।"
      },
      growth: {
        title: "विकास त्वरण",
        desc: "आपके व्यापारिक विकास को तेज़ करने, बाजार प्रवेश को बढ़ाने, और ऑटोमोटिव आफ्टरमार्केट में लाभप्रदता को अधिकतम करने के लिए व्यक्तिगत परामर्श सेवाएं।"
      },
      digital: {
        title: "डिजिटल परिवर्तन",
        desc: "डिजिटल युग में प्रतिस्पर्धी बने रहने के लिए अत्याधुनिक डिजिटल समाधान, स्वचालन प्रौद्योगिकी, और डेटा-संचालित अंतर्दृष्टि के साथ अपने संचालन को आधुनिक बनाएं।"
      },
      team: {
        title: "टीम विकास और प्रशिक्षण",
        desc: "आपकी टीम को कुशल बनाने और सभी विभागों में परिचालन दक्षता में सुधार करने के लिए व्यापक प्रशिक्षण कार्यक्रम और कौशल विकास पहल।"
      }
    },
    // Testimonials
    testimonials: {
      title: "सफलता की कहानियां और ग्राहक प्रशंसापत्र",
      subtitle: "हमारे संतुष्ट ग्राहकों से सुनें जिन्होंने हमारे विशेषज्ञ मार्गदर्शन और रणनीतिक परामर्श सेवाओं के साथ अपने व्यवसायों को रूपांतरित किया है",
      clientStories: "ग्राहक सफलता की कहानियां"
    },
    // About
    about: {
      title: "व्यावसायिक प्रोफ़ाइल, दृष्टिकोण और मिशन",
      subtitle: "तीन दशकों का उद्योग नेतृत्व, रणनीतिक दृष्टिकोण, और ऑटोमोटिव आफ्टरमार्केट उत्कृष्टता के लिए प्रतिबद्धता",
      profile: {
        title: "व्यावसायिक प्रोफ़ाइल",
        desc: "लक्ष्मीकांत नांदेडकर एक अनुभवी व्यापारी, लेखक और वक्ता हैं जिनकी दोपहिया स्पेयर पार्ट्स आफ्टरमार्केट क्षेत्र में एक विशिष्ट उपस्थिति है। 1995 से, उन्होंने ऑटोमोटिव स्पेयर्स उद्योग पर ध्यान केंद्रित करते हुए अपना वितरण व्यापार चलाया है। राजाराम बापू प्रौद्योगिकी संस्थान से इंजीनियरिंग में स्नातक के साथ, वे तकनीकी विशेषज्ञता को व्यापक व्यापारिक कौशल के साथ जोड़ते हैं। एक प्रसिद्ध सार्वजनिक वक्ता और उद्योग गुरु के रूप में, वे क्षेत्रीय कार्यक्रमों में व्यावहारिक अंतर्दृष्टि साझा करते हैं और एक सक्रिय डिजिटल उपस्थिति बनाए रखते हैं, सोशल मीडिया प्लेटफार्म और प्रशिक्षण परामर्श सेवाओं के माध्यम से पेशेवरों को शिक्षित करते हैं।"
      },
      vision: {
        title: "हमारा दृष्टिकोण",
        desc: "दोपहिया स्पेयर्स उद्योग में वितरकों, थोक विक्रेताओं, खुदरा विक्रेताओं और उद्योग भागीदारों के बीच ज्ञान साझा करने और सामूहिक विकास को बढ़ावा देकर आफ्टरमार्केट समुदाय को मजबूत बनाना।"
      },
      mission: {
        title: "हमारा मिशन",
        desc: "प्रासंगिक बाजार रुझानों को क्यूरेट करके, समुदायिक उपलब्धियों का जश्न मनाकर, और सिद्ध रणनीतियों को साझा करके ऑटो आफ्टरमार्केट पेशेवरों को जोड़ना, शिक्षित करना और प्रेरित करना जो क्षेत्र में प्रदर्शन और समृद्धि को बढ़ाती है।"
      }
    },
    // Contact
    contact: {
      title: "आइए मिलकर आपकी सफलता को आगे बढ़ाएं",
      subtitle: "अपने व्यापारिक विकास को तेज़ करने और ऑटोमोटिव आफ्टरमार्केट में दबदबा बनाने के लिए तैयार हैं? आज ही हमसे जुड़ें और अपनी रूपांतरण यात्रा शुरू करें।",
      formTitle: "अपनी विकास यात्रा शुरू करें",
      formSubtitle: "हमारा परामर्श फॉर्म भरें और आइए चर्चा करते हैं कि हम आपको आपके व्यापारिक उद्देश्यों को प्राप्त करने में कैसे मदद कर सकते हैं।",
      form: {
        firstName: "पहला नाम",
        lastName: "अंतिम नाम",
        email: "ईमेल पता",
        phone: "फोन नंबर",
        company: "दुकान/कंपनी का नाम",
        businessType: "व्यापार का प्रकार",
        selectBusiness: "व्यापार का प्रकार चुनें",
        manufacturer: "निर्माता",
        distributor: "वितरक",
        wholesaler: "थोक विक्रेता",
        retailer: "खुदरा विक्रेता",
        mechanic: "मैकेनिक",
        others: "अन्य",
        specify: "कृपया निर्दिष्ट करें",
        message: "संदेश",
        messagePlaceholder: "हम आपकी कैसे मदद कर सकते हैं?",
        submit: "संदेश भेजें"
      },
      info: {
        email: "ईमेल",
        phone: "फोन",
        blog: "ब्लॉग",
        followMedium: "मीडियम पर हमें फॉलो करें"
      }
    },
    // Success messages
    success: {
      banner: "धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे!",
      message: "धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे।"
    },
    // Footer
    footer: {
      copyright: "© 2024 ऑटोमोबाइल आफ्टरमार्केट परामर्श। सभी अधिकार सुरक्षित।"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      testimonials: "Testimonials",
      about: "About",
      contact: "Contact"
    },
    // Hero Section
    hero: {
      title: "Driving Growth in Automobile Aftermarket",
      subtitle: "With over 30 years of experience in the automotive industry, spanning distribution and 5+ years as a business growth officer, we help automotive businesses accelerate their success in the automobile aftermarket.",
      getStarted: "Get Started",
      learnMore: "Learn More"
    },
    // Stats
    stats: {
      experience: "Years of Industry Experience",
      consulting: "Years of Business Consulting",
      collaborations: "Successful Collaborations"
    },
    // Services
    services: {
      title: "Comprehensive Consulting Solutions",
      subtitle: "Strategic consulting solutions and proven methodologies to accelerate sustainable growth in the competitive automotive aftermarket industry",
      marketResearch: {
        title: "Market Research & Analysis",
        desc: "In-depth market research and competitive analysis to identify untapped opportunities and optimize your market positioning in the aftermarket sector."
      },
      businessDev: {
        title: "Strategic Business Development",
        desc: "Comprehensive business strategy development tailored specifically for automobile aftermarket businesses, focusing on sustainable growth and competitive advantage."
      },
      supplyChain: {
        title: "Supply Chain Excellence",
        desc: "Streamline your supply chain operations with proven methodologies that maximize efficiency, reduce costs, and improve delivery performance."
      },
      growth: {
        title: "Growth Acceleration",
        desc: "Personalized consulting services designed to accelerate your business growth, enhance market penetration, and maximize profitability in the automotive aftermarket."
      },
      digital: {
        title: "Digital Transformation",
        desc: "Modernize your operations with cutting-edge digital solutions, automation technologies, and data-driven insights to stay competitive in the digital age."
      },
      team: {
        title: "Team Development & Training",
        desc: "Comprehensive training programs and skill development initiatives to upskill your team and improve operational efficiency across all departments."
      }
    },
    // Testimonials
    testimonials: {
      title: "Success Stories & Client Testimonials",
      subtitle: "Hear from our satisfied clients who have transformed their businesses with our expert guidance and strategic consulting services",
      clientStories: "Client Success Stories"
    },
    // About
    about: {
      title: "Professional Profile, Vision & Mission",
      subtitle: "Three decades of industry leadership, strategic vision, and commitment to automotive aftermarket excellence",
      profile: {
        title: "Professional Profile",
        desc: "Laxmikant Nandedkar is a seasoned business owner, writer, and speaker with a distinguished presence in the two-wheeler spare parts aftermarket sector. Since 1995, he has led his own distribution business, focusing on the automotive spares industry. With a Bachelor's in Engineering from Rajarambapu Institute of Technology, he combines technical expertise with extensive business acumen. As a renowned public speaker and industry mentor, he shares practical insights at sectoral events and maintains an active digital presence, educating professionals through social media platforms and training consultancy services."
      },
      vision: {
        title: "Our Vision",
        desc: "To strengthen aftermarket community by sharing knowledge and driving collective growth among distributors, wholesalers, retailers, and industry partners in the two wheeler spares industry."
      },
      mission: {
        title: "Our Mission",
        desc: "To connect, educate, and motivate auto aftermarket professionals by curating relevant market trends, celebrating community accomplishments, and sharing proven tactics that elevate performance and prosperity across the sector."
      }
    },
    // Contact
    contact: {
      title: "Let's Drive Your Success Together",
      subtitle: "Ready to accelerate your business growth and dominate the automotive aftermarket? Connect with us today to start your transformation journey.",
      formTitle: "Start Your Growth Journey",
      formSubtitle: "Fill out our consultation form and let's discuss how we can help you achieve your business objectives.",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Shop/Company Name",
        businessType: "Type of Business",
        selectBusiness: "Select business type",
        manufacturer: "Manufacturer",
        distributor: "Distributor",
        wholesaler: "Wholesaler",
        retailer: "Retailer",
        mechanic: "Mechanic",
        others: "Others",
        specify: "Please specify",
        message: "Message",
        messagePlaceholder: "How can we help you?",
        submit: "Send Message"
      },
      info: {
        email: "Email",
        phone: "Phone",
        blog: "Blog",
        followMedium: "Follow us on Medium"
      }
    },
    // Success messages
    success: {
      banner: "✅ Thank you! Your message has been sent successfully. We will get back to you soon!",
      message: "Thank you! Your message has been sent successfully. We will get back to you soon."
    },
    // Footer
    footer: {
      copyright: "© 2024 Automobile Aftermarket Consulting. All rights reserved."
    }
  }
};

// Language Provider Component
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language Switch Component
const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button 
      className="language-switch" 
      onClick={toggleLanguage}
      title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <FontAwesomeIcon icon={faGlobe} />
      <span>{language === 'hi' ? 'EN' : 'हि'}</span>
    </button>
  );
};

function App() {
  const { t } = useLanguage();
  
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
          ✅ {t.success.banner}
        </div>
      )}
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logoImg} alt="Company Logo" />
          </div>
          <LanguageSwitch />
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={closeMobileMenu}>{t.nav.home}</a></li>
            <li><a href="#services" onClick={closeMobileMenu}>{t.nav.services}</a></li>
            <li><a href="#testimonials" onClick={closeMobileMenu}>{t.nav.testimonials}</a></li>
            <li><a href="#story" onClick={closeMobileMenu}>{t.nav.about}</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>{t.nav.contact}</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>{t.hero.title.includes('Automobile') ? 
                `Driving Growth in ` : 
                t.hero.title.split('ऑटोमोबाइल')[0]
              }<span className="highlight">{t.hero.title.includes('Automobile') ? 'Automobile' : 'ऑटोमोबाइल'}</span>{
                t.hero.title.includes('Automobile') ? 
                ' Aftermarket' : 
                t.hero.title.split('ऑटोमोबाइल')[1]
              }</h1>
            <p>{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <a href="#contact"><button className="btn-primary">{t.hero.getStarted}</button></a>
              <a href="#story"><button className="btn-secondary">{t.hero.learnMore}</button></a>
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
            <div className="stat-label">{t.stats.experience}</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="stat-number">5+</div>
            <div className="stat-label">{t.stats.consulting}</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <div className="stat-number">9+</div>
            <div className="stat-label">{t.stats.collaborations}</div>
          </div>
        </div>
      </section>

      {/* Page Separator */}
      <div className="page-separator"></div>

      {/* Services Section */}
      <section id="services" className="section services">
        <div className="section-gradient"></div>
        <div className="container">
          <h2>{t.services.title}</h2>
          <p>{t.services.subtitle}</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faIndustry} />
              </div>
              <h3>{t.services.marketResearch.title}</h3>
              <p>{t.services.marketResearch.desc}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <h3>{t.services.businessDev.title}</h3>
              <p>{t.services.businessDev.desc}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>{t.services.supplyChain.title}</h3>
              <p>{t.services.supplyChain.desc}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <h3>{t.services.growth.title}</h3>
              <p>{t.services.growth.desc}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <h3>{t.services.digital.title}</h3>
              <p>{t.services.digital.desc}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h3>{t.services.team.title}</h3>
              <p>{t.services.team.desc}</p>
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
          <h2>{t.testimonials.title}</h2>
          <p>{t.testimonials.subtitle}</p>
          <div className="testimonials-container">
            <div className="photo-testimonials">
              <h3>{t.testimonials.clientStories}</h3>
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
          <h2>{t.about.title}</h2>
          <p>{t.about.subtitle}</p>
          <div className="story-content">
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  <h3>{t.about.profile.title}</h3>
                </div>
                <p>{t.about.profile.desc}</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <h3>{t.about.vision.title}</h3>
                </div>
                <p>{t.about.vision.desc}</p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-content-text">
                <div className="story-header">
                  <div className="story-icon">
                    <FontAwesomeIcon icon={faBullseye} />
                  </div>
                  <h3>{t.about.mission.title}</h3>
                </div>
                <p>{t.about.mission.desc}</p>
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
          <h2>{t.contact.title}</h2>
          <p>{t.contact.subtitle}</p>
          <div className="contact-content">
            <div className="contact-form">
              <h3>{t.contact.formTitle}</h3>
              <p>{t.contact.formSubtitle}</p>
              
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
                  <strong>{t.success.message}</strong>
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
                    <label htmlFor="firstName">{t.contact.form.firstName} *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">{t.contact.form.lastName} *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t.contact.form.email} *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t.contact.form.phone} *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">{t.contact.form.company} *</label>
                  <input type="text" id="company" name="company" required />
                </div>
                <div className="form-group">
                  <label htmlFor="businessType">{t.contact.form.businessType} *</label>
                  <select id="businessType" name="businessType" required onChange={handleBusinessTypeChange}>
                    <option value="">{t.contact.form.selectBusiness}</option>
                    <option value="manufacturer">{t.contact.form.manufacturer}</option>
                    <option value="distributor">{t.contact.form.distributor}</option>
                    <option value="wholesaler">{t.contact.form.wholesaler}</option>
                    <option value="retailer">{t.contact.form.retailer}</option>
                    <option value="mechanic">{t.contact.form.mechanic}</option>
                    <option value="others">{t.contact.form.others}</option>
                  </select>
                </div>
                <div className="form-group" id="othersField" style={{display: 'none'}}>
                  <label htmlFor="others">{t.contact.form.specify} *</label>
                  <input type="text" id="others" name="others" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t.contact.form.message} *</label>
                  <textarea id="message" name="message" rows="5" required placeholder={t.contact.form.messagePlaceholder}></textarea>
                </div>
                <button type="submit" className="btn-primary">{t.contact.form.submit}</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faEnvelope} /> {t.contact.info.email}</h4>
                <p><a href="mailto:laxmikantnandedkar@gmail.com">laxmikantnandedkar@gmail.com</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faPhone} /> {t.contact.info.phone}</h4>
                <p><a href="tel:+919673388415">+91 96733 88415</a></p>
              </div>
              <div className="contact-item">
                <h4><FontAwesomeIcon icon={faBlog} /> {t.contact.info.blog}</h4>
                <p><a href="https://medium.com/@LaxmikantNandedkar" target="_blank" rel="noopener noreferrer">{t.contact.info.followMedium}</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

export default function AppWithLanguage() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
