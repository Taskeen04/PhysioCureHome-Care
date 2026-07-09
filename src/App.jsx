import React, { useState, useEffect, useRef } from "react";
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
  { title: "Orthopaedic Rehabilitation", img: "Ortho.webp" },
  { title: "Neurological Rehabilitation", img: "neuro.webp" },
  { title: "Post-Surgery Rehabilitation", img: "post.webp" },
  { title: "Sports Injury Rehabilitation", img: "https://plus.unsplash.com/premium_photo-1661767448598-f42428886f1c?w=700&auto=format&fit=crop&q=80&fm=webp" },
];

const faqs = [
  { q: "Do you provide home visits?", a: "Yes, I provide professional physiotherapy services exclusively at the comfort of your home across Hyderabad." },
  { q: "How do I book an appointment?", a: "You can book an appointment easily by clicking the WhatsApp button or by filling out the contact form below." },
  { q: "Which areas do you cover?", a: "I cover major areas in Hyderabad including Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, and more." },
  { q: "What conditions do you treat?", a: "I treat various conditions including back pain, neck pain, sports injuries, stroke rehab, post-surgery recovery, and neurological disorders." }
];

export default function App() {
  const [formData, setFormData] = useState({ name: "", phone: "", problem: "" });
  const [activeFaq, setActiveFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lazyLoaded, setLazyLoaded] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Immediate mounting fallback for search crawlers to maintain 100% SEO scores
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
      { rootMargin: "400px" } // Preloads the section early as the user approaches it
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const message = `Hello Mohammed Adil (PT), I would like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Problem:* ${formData.problem}`;
    window.open(`https://wa.me/919014063048?text=${message}`, "_blank");
  };

  return (
    <>
      <a href="tel:+919014063048" className="float-wa" aria-label="Call PhysioCure Home Care Support">
        <FaPhoneAlt />
      </a>

      {/* Semantic Header & Navigation */}
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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#why" onClick={() => setMenuOpen(false)}>Why Us</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Book My Appointment</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          </div>
        </nav>
      </header>

      {/* Semantic Main Content Wrap */}
      <main id="main-content">
        
        {/* Hero Section */}
        <section className="hero fade-in" aria-label="Introduction">
          <div>
            <p>YOUR RECOVERY, OUR MISSION</p>
            <h1>Professional <span>Home Physiotherapy</span> Services at Your Doorstep</h1>
            <p>Get expert, evidence-based physiotherapy treatment in the comfort and privacy of your home. No more traffic or clinic waiting times.</p>
            <a className="btn btn-wa" href="https://wa.me/919014063048" aria-label="Book Home Visit via WhatsApp">
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
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        {/* Services Section */}
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

        {/* Why Choose Us Section */}
        <section id="why" className="why-section" aria-labelledby="why-heading">
          <div className="section-title">
            <p>Excellence in Care</p>
            <h2 id="why-heading">Why Choose Our Services</h2>
          </div>
          <div className="grid">
            {[
              { t: "Home Visit", d: "Experience hospital-grade care without leaving your home.", i: "🏠" },
              { t: "Personalized Treatment", d: "Every patient gets a unique recovery plan designed for them.", i: "🎯" },
              { t: "Flexible Timings", d: "I work around your schedule to ensure consistent recovery.", i: "⏰" },
              { t: "Affordable Care", d: "High-quality professional physiotherapy at honest rates.", i: "💰" },
              { t: "Evidence-Based", d: "Treatment methods based on the latest medical research.", i: "📋" },
              { t: "Experienced PT", d: "Expert hands with years of clinical experience.", i: "👨‍⚕️" }
            ].map((item, idx) => (
              <article className="why-card" key={idx} aria-labelledby={`why-item-title-${idx}`}>
                <span className="why-icon" role="img" aria-hidden="true">{item.i}</span>
                <h3 id={`why-item-title-${idx}`} style={{ marginBottom: '10px' }}>{item.t}</h3>
                <p style={{ fontSize: '0.9rem', color: '#334155' }}>{item.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact & Appointment Booking Section */}
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
              <form className="contact-form" onSubmit={handleWhatsApp} aria-label="Appointment Request Form">
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
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
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
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
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
                  onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))} 
                ></textarea>
                
                <button type="submit" className="btn btn-wa" style={{ width: '100%' }}>Confirm Appointment via WhatsApp</button>
                <p className="trust-note">"We respect your privacy and will get back to you soon."</p>
              </form>
            </div>
          </div>
        </section>

        {/* Coverage Areas Section */}
        <section id="areas" className="areas-section" aria-labelledby="areas-heading">
          <div className="section-title">
            <p>Coverage</p>
            <h2 id="areas-heading">Areas Served in Hyderabad</h2>
          </div>
          <div className="area-grid">
            {["Banjara Hills", "Jubilee Hills", "Gachibowli", "Kondapur", "Mehdipatnam", "Tolichowki", "Hitech City", "Attapur", "Aaramgarh", "Dilsukhnagar", "Chandrayangutta"].map((area, idx) => (
              <div className="area-tag" key={idx}>
                <FaMapMarkerAlt aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
                {area}
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic below-the-fold dynamic rendering to reduce DOM complexity and improve initial main thread times */}
        {lazyLoaded ? (
          <>
            {/* Benefits Section */}
            <section id="benefits" style={{ background: "var(--bg-light)" }} aria-labelledby="benefits-heading">
              <div className="section-title">
                <p>Health Benefits</p>
                <h2 id="benefits-heading">Benefits of Physiotherapy</h2>
              </div>
              <div className="grid">
                {[
                  { icon: "💪", title: "Pain Relief", text: "Reduce chronic and acute pain naturally without depending only on medications." },
                  { icon: "🏃", title: "Improved Mobility", text: "Restore flexibility, balance and movement for daily activities." },
                  { icon: "⚡", title: "Faster Recovery", text: "Recover safely after surgery, injury or stroke with personalized rehabilitation." },
                  { icon: "🦴", title: "Better Strength", text: "Strengthen muscles and joints to prevent future injuries." },
                  { icon: "❤️", title: "Improved Quality of Life", text: "Live a healthier, more active and pain-free lifestyle." },
                  { icon: "🛡️", title: "Prevent Future Problems", text: "Correct posture and movement patterns to avoid recurring pain." }
                ].map((item, index) => (
                  <article className="why-card" key={index} aria-labelledby={`benefit-title-${index}`}>
                    <span className="why-icon" role="img" aria-hidden="true">{item.icon}</span>
                    <h3 id={`benefit-title-${index}`} style={{ marginBottom: "10px" }}>{item.title}</h3>
                    <p style={{ color: "#334155", fontSize: "0.9rem" }}>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* About Dr. Adil Section */}
            <section id="about" className="about-section" aria-labelledby="about-heading">
              <div>
                <img 
                  className="about-img" 
                  src="https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=800&fm=webp" 
                  srcSet="
                    https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=400&fm=webp 400w,
                    https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=800&fm=webp 800w,
                    https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=1200&fm=webp 1200w
                  "
                  sizes="(max-width: 968px) 100vw, 500px"
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

            {/* Testimonials Section */}
            <section id="testimonials" aria-labelledby="testimonials-heading">
              <div className="section-title">
                <p>Reviews</p>
                <h2 id="testimonials-heading">Patient Success Stories</h2>
              </div>
              <div className="grid">
                {[
                  { n: "Rahul K.", m: "Excellent treatment for my chronic back pain. Dr. Adil is very professional and patient." },
                  { n: "Ayesha S.", m: "My mother recovered quickly after her knee surgery thanks to his home visit sessions." },
                  { n: "Kiran Dev", m: "Very professional and caring approach. The convenience of home visits is unmatched." }
                ].map((t, idx) => (
                  <article className="testimonial-card" key={idx} aria-labelledby={`testimonial-author-${idx}`}>
                    <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="testimonial-text">"{t.m}"</p>
                    <p id={`testimonial-author-${idx}`} className="testimonial-author">- {t.n}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="faq-section" aria-labelledby="faq-heading">
              <div className="section-title">
                <p>Questions?</p>
                <h2 id="faq-heading">Frequently Asked Questions</h2>
              </div>
              <div className="faq-container">
                {faqs.map((f, idx) => (
                  <div 
                    className={`faq-item ${activeFaq === idx ? 'active' : ''}`} 
                    key={idx} 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <div 
                      className="faq-header"
                      role="button"
                      tabIndex={0}
                      aria-expanded={activeFaq === idx}
                      aria-controls={`faq-content-${idx}`}
                      id={`faq-header-${idx}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveFaq(activeFaq === idx ? null : idx);
                        }
                      }}
                    >
                      {f.q}
                      <span aria-hidden="true">{activeFaq === idx ? '−' : '+'}</span>
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
                ))}
              </div>
            </section>

            {/* Footer Section */}
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
          </>
        ) : (
          /* Placeholder blocks height pre-allocation to guarantee 0px Layout Shift (CLS) */
          <div style={{ minHeight: "1500px" }} />
        )}

      </main>
    </>
  );
}