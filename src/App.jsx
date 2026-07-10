import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { preload } from "react-dom";
import "./App.css";
import asli from "./assets/asli.webp";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

// Static arrays defined globally to optimize memory allocations and prevent redraw penalties
const services = [
  { title: "Orthopaedic Rehabilitation", img: "/Ortho.webp" },
  { title: "Neurological Rehabilitation", img: "/neuro.webp" },
  { title: "Post-Surgery Rehabilitation", img: "/post.webp" },
  { title: "Sports Injury Rehabilitation", img: "/sports.webp" },
];

const faqs = [
  { q: "Do you provide home visits?", a: "Yes, I provide professional physiotherapy services exclusively at the comfort of your home across Hyderabad." },
  { q: "How do I book an appointment?", a: "You can book an appointment easily by clicking the WhatsApp button or by filling out the contact form below." },
  { q: "Which areas do you cover?", a: "I cover major areas in Hyderabad including Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, and more." },
  { q: "What conditions do you treat?", a: "I treat various conditions including back pain, neck pain, sports injuries, stroke rehab, post-surgery recovery, and neurological disorders." }
];

// 1. Isolated Header Component to prevent menu-toggles from re-rendering the whole page
const Header = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header>
      <nav aria-label="Main Navigation">
        <div className="logo">
          <img
            src="/logo.webp"
            alt="PhysioCure Home Care Logo"
            width="60"
            height="60"
            decoding="async"
          />
          <span>PhysioCure Home Care</span>
        </div>
        <button 
          className="menu-icon" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#why" onClick={closeMenu}>Why Us</a>
          <a href="#contact" onClick={closeMenu}>Book My Appointment</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#about" onClick={closeMenu}>About</a>
        </div>
      </nav>
    </header>
  );
});
Header.displayName = "Header";

// 2. Memoized Hero Section to prevent unnecessary updates
const Hero = memo(() => {
  return (
    <section className="hero fade-in" aria-label="Introduction">
      <div>
        <p>YOUR RECOVERY, OUR MISSION</p>
        <h1>Professional <span>Home Physiotherapy</span> Services at Your Doorstep</h1>
        <p>Get expert, evidence-based physiotherapy treatment in the comfort and privacy of your home. No more traffic or clinic waiting times.</p>
        <a
  className="btn btn-wa"
  href="https://wa.me/919014063048?text=Hello%20PhysioCure%20Home%20Care,%0A%0AI%20am%20interested%20in%20booking%20a%20home%20physiotherapy%20appointment.%0A%0APatient%20Name:%0ALocation:%0ACondition:%0A%0AThank%20you."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Book Home Visit via WhatsApp"
>
          <FaWhatsapp style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Book Home Visit via WhatsApp
        </a>
        <div className="highlights">
          <div className="highlight-item">🏠 Home Visit</div>
          <div className="highlight-item">👨‍⚕️ Expert Care</div>
          <div className="highlight-item">⏰ Flexible Timings</div>
        </div>
      </div>
      <div>
        <img
          className="hero-img"
          src={asli}
          alt="Professional Home Physiotherapy Treatment Session"
          width="550"
          height="380"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

// 3. Services Section with ref-attachment for IntersectionObserver tracking
const Services = memo(({ triggerRef }) => {
  return (
    <section id="services" ref={triggerRef} className="services-section" aria-labelledby="services-heading">
      <div className="section-title">
        <p>What I Offer</p>
        <h2 id="services-heading">Our Specialized Services</h2>
      </div>
      <div className="services-grid">
        {services.map((s, idx) => (
          <article className="card fade-in" key={idx} aria-labelledby={`service-title-${idx}`}>
            <img
              src={s.img}
              alt={`${s.title} session`}
              width="350"
              height="250"
              loading="lazy"
              decoding="async"
            />
            <div className="card-content">
              <h3 id={`service-title-${idx}`}>{s.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#334155' }}>Advanced therapeutic interventions tailored for effective pain relief and recovery at home.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});
Services.displayName = "Services";

// 4. Memoized WhyChooseUs Section
const WhyChooseUs = memo(() => {
  const points = [
    { t: "Home Visit", d: "Experience hospital-grade care without leaving your home.", i: "🏠" },
    { t: "Personalized Treatment", d: "Every patient gets a unique recovery plan designed for them.", i: "🎯" },
    { t: "Flexible Timings", d: "I work around your schedule to ensure consistent recovery.", i: "⏰" },
    { t: "Affordable Care", d: "High-quality professional physiotherapy at honest rates.", i: "💰" },
    { t: "Evidence-Based", d: "Treatment methods based on the latest medical research.", i: "📋" },
    { t: "Experienced PT", d: "Expert hands with years of clinical experience.", i: "👨‍⚕️" }
  ];
  return (
    <section id="why" className="why-section" aria-labelledby="why-heading">
      <div className="section-title">
        <p>Excellence in Care</p>
        <h2 id="why-heading">Why Choose Our Services</h2>
      </div>
      <div className="grid">
        {points.map((item, idx) => (
          <article className="why-card" key={idx} aria-labelledby={`why-item-title-${idx}`}>
            <span className="why-icon" role="img" aria-hidden="true">{item.i}</span>
            <h3 id={`why-item-title-${idx}`} style={{ marginBottom: '10px' }}>{item.t}</h3>
            <p style={{ fontSize: '0.9rem', color: '#334155' }}>{item.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
WhyChooseUs.displayName = "WhyChooseUs";

// 5. Highly Optimized Form Component to protect INP scores during typing interactions
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({ name: "", phone: "", problem: "" });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleWhatsAppSubmit = useCallback((e) => {
    e.preventDefault();
    const message = `Hello Mohammed Adil (PT), I would like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Problem:* ${formData.problem}`;
    window.open(`https://wa.me/919014063048?text=${message}`, "_blank");
  }, [formData]);

  return (
    <form className="contact-form" onSubmit={handleWhatsAppSubmit} aria-label="Appointment Request Form">
      <label htmlFor="name-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>Your Name</label>
      <input 
        id="name-input"
        type="text" 
        name="name"
        autoComplete="name"
        aria-label="Your Name" 
        placeholder="Your Name" 
        required 
        value={formData.name} 
        onChange={handleChange} 
      />
      
      <label htmlFor="phone-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>Phone Number</label>
      <input 
        id="phone-input"
        type="tel" 
        name="phone"
        autoComplete="tel"
        aria-label="Phone Number" 
        placeholder="Phone Number" 
        required 
        value={formData.phone} 
        onChange={handleChange} 
      />
      
      <label htmlFor="problem-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>Describe your problem</label>
      <textarea 
        id="problem-input"
        rows="4" 
        name="problem"
        aria-label="Describe your problem" 
        placeholder="Describe your problem" 
        required 
        value={formData.problem} 
        onChange={handleChange} 
      ></textarea>
      
      <button type="submit" className="btn btn-wa" style={{ width: '100%' }}>Confirm Appointment via WhatsApp</button>
      <p className="trust-note">"We respect your privacy and will get back to you soon."</p>
    </form>
  );
});
ContactForm.displayName = "ContactForm";

// 6. Memoized Contact Section containing the isolated form component
const ContactSection = memo(() => {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-section-heading">
      <div className="contact-container">
        <div className="contact-info">
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>GET IN TOUCH</p>
          <h2 id="contact-section-heading" style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '800' }}>Book an Appointment</h2>
          <p>Ready to start your journey to a pain-free life? Reach out to me directly.</p>
          <ul className="info-list" aria-label="Contact Information">
            <li>
              <div className="info-icon" aria-hidden="true">
                <FaPhoneAlt />
              </div>
              <div>+91 90140 63048</div>
            </li>
            <li>
              <div className="info-icon" aria-hidden="true">
                <FaEnvelope />
              </div>
              <div>physiocurehomecare1@gmail.com</div>
            </li>
            <li>
              <div className="info-icon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <div>Home Services Across Hyderabad</div>
            </li>
            <li>
              <div className="info-icon" aria-hidden="true">
                <FaClock />
              </div>
              <div>Mon - Sun: 8:00 AM - 8:00 PM</div>
            </li>
          </ul>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
});
ContactSection.displayName = "ContactSection";

// 7. Memoized Coverage Areas Section
const CoverageAreas = memo(() => {
  const areas = ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Kondapur", "Mehdipatnam", "Tolichowki", "Hitech City", "Attapur", "Aaramgarh", "Dilsukhnagar", "Chandrayangutta"];
  return (
    <section id="areas" className="areas-section" aria-labelledby="areas-heading">
      <div className="section-title">
        <p>Coverage</p>
        <h2 id="areas-heading">Areas Served in Hyderabad</h2>
      </div>
      <div className="area-grid">
        {areas.map((area, idx) => (
          <div className="area-tag" key={idx}>
            <FaMapMarkerAlt aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
            {area}
          </div>
        ))}
      </div>
    </section>
  );
});
CoverageAreas.displayName = "CoverageAreas";

// 8. Memoized Benefits Section
const Benefits = memo(() => {
  const benefitsData = [
    { icon: "💪", title: "Pain Relief", text: "Reduce chronic and acute pain naturally without depending only on medications." },
    { icon: "🏃", title: "Improved Mobility", text: "Restore flexibility, balance and movement for daily activities." },
    { icon: "⚡", title: "Faster Recovery", text: "Recover safely after surgery, injury or stroke with personalized rehabilitation." },
    { icon: "🦴", title: "Better Strength", text: "Strengthen muscles and joints to prevent future injuries." },
    { icon: "❤️", title: "Improved Quality of Life", text: "Live a healthier, more active and pain-free lifestyle." },
    { icon: "🛡️", title: "Prevent Future Problems", text: "Correct posture and movement patterns to avoid recurring pain." }
  ];
  return (
    <section id="benefits" style={{ background: "var(--bg-light)" }} aria-labelledby="benefits-heading">
      <div className="section-title">
        <p>Health Benefits</p>
        <h2 id="benefits-heading">Benefits of Physiotherapy</h2>
      </div>
      <div className="grid">
        {benefitsData.map((item, index) => (
          <article className="why-card" key={index} aria-labelledby={`benefit-title-${index}`}>
            <span className="why-icon" role="img" aria-hidden="true">{item.icon}</span>
            <h3 id={`benefit-title-${index}`} style={{ marginBottom: "10px" }}>{item.title}</h3>
            <p style={{ color: "#334155", fontSize: "0.9rem" }}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
Benefits.displayName = "Benefits";

// 9. Memoized About Expert Section
const AboutExpert = memo(() => {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div>
        <img 
          className="about-img" 
          src="/about.webp" 
          alt="Dr. Adil providing physiotherapy" 
          width="500"
          height="500"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="about-content">
        <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>MEET THE EXPERT</p>
        <h2 id="about-heading" style={{ color: "black" }}>Mohammed Adil (PT)</h2>
        <p style={{ color: '#334155', marginBottom: '20px' }}>
          I am a dedicated, independent Physiotherapist providing expert clinical care in the privacy and comfort of your own home. With a focus on patient-centric recovery, I utilize evidence-based techniques to help individuals regain their strength, mobility, and confidence.
        </p>
        <p style={{ color: '#334155' }}>
          Whether you are recovering from surgery, managing a chronic condition, or seeking relief from sports injuries, I provide professional assessment and hands-on treatment plans tailored to your specific needs.
        </p>
      </div>
    </section>
  );
});
AboutExpert.displayName = "AboutExpert";

// 10. Memoized Testimonials Section
const Testimonials = memo(() => {
  const reviews = [
    { n: "Rahul K.", m: "Excellent treatment for my chronic back pain. Dr. Adil is very professional and patient." },
    { n: "Ayesha S.", m: "My mother recovered quickly after her knee surgery thanks to his home visit sessions." },
    { n: "Kiran Dev", m: "Very professional and caring approach. The convenience of home visits is unmatched." }
  ];
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <div className="section-title">
        <p>Reviews</p>
        <h2 id="testimonials-heading">Patient Success Stories</h2>
      </div>
      <div className="grid">
        {reviews.map((t, idx) => (
          <article className="testimonial-card" key={idx} aria-labelledby={`testimonial-author-${idx}`}>
            <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="testimonial-text">"{t.m}"</p>
            <p id={`testimonial-author-${idx}`} className="testimonial-author">- {t.n}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
Testimonials.displayName = "Testimonials";

// 11. FAQ Component with isolated accordion toggle state
const FAQSection = memo(() => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  const toggleFaq = useCallback((idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  }, []);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="section-title">
        <p>Questions?</p>
        <h2 id="faq-heading">Frequently Asked Questions</h2>
      </div>
      <div className="faq-container">
        {faqs.map((f, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div 
              className={`faq-item ${isOpen ? 'active' : ''}`} 
              key={idx} 
            >
              <div 
                className="faq-header"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
                id={`faq-header-${idx}`}
                onClick={() => toggleFaq(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFaq(idx);
                  }
                }}
              >
                {f.q}
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </div>
              <div 
                id={`faq-content-${idx}`}
                className="faq-content"
                role="region"
                aria-labelledby={`faq-header-${idx}`}
              >
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});
FAQSection.displayName = "FAQSection";

// 12. Memoized Footer Component
const Footer = memo(() => {
  return (
    <footer>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Follow Us On Social Media</h2>
      <p>Providing professional home care across Hyderabad</p>
      <div className="social-icons">
        <a href="https://wa.me/919014063048" target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="https://www.instagram.com/physiocurehomecare1?igsh=MXV3N2E4OTQ2bW5mbA==" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
          <FaInstagram />
        </a>
        <a href="https://youtube.com/@mohammedadil-dh2xr?si=njjETUlozXduSs6j" target="_blank" rel="noreferrer" aria-label="Subscribe to our YouTube channel">
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";

export default function App() {
  const [lazyLoaded, setLazyLoaded] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Immediate mounting fallback for search crawlers to maintain SEO scores
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yand/i.test(navigator.userAgent)
    ) {
      setLazyLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLazyLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Preloads the dynamic sections early as the user approaches them
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Leverage React 19 native dynamic asset preloading API to fetch hashed production asset securely
  preload(asli, { as: "image", fetchPriority: "high" });

  return (
    <>
      <a href="tel:+919014063048" className="float-wa" aria-label="Call PhysioCure Home Care Support">
        <FaPhoneAlt />
      </a>

      {/* Semantic Header & Navigation */}
      <Header />

      {/* Semantic Main Content Wrap */}
      <main id="main-content">
        
        {/* Hero Section */}
        <Hero />

        {/* Services Section serving as the trigger for below-the-fold mounting */}
        <Services triggerRef={triggerRef} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Contact & Appointment Booking Section */}
        <ContactSection />

        {/* Coverage Areas Section */}
        <CoverageAreas />

        {/* Dynamic below-the-fold lazy parsing to protect initial frame times and main-thread load */}
        {lazyLoaded ? (
          <>
            {/* Benefits Section */}
            <Benefits />

            {/* About Expert Section */}
            <AboutExpert />

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer Section */}
            <Footer />
          </>
        ) : (
          /* Pre-allocate height dynamically to avoid Layout Shift (CLS) on mount */
          <div style={{ minHeight: "1500px" }} />
        )}

      </main>
    </>
  );
}