import React, { useState } from "react";
import "./app.css";
import asli from "./assets/asli.webp";

// Static arrays defined globally to optimize memory allocations and prevent redraw penalties
const services = [
  { title: "Orthopaedic Rehabilitation", img: "Ortho.webp" },
  { title: "Neurological Rehabilitation", img: "neuro.webp" },
  { title: "Post-Surgery Rehabilitation", img: "post.webp" },
  { title: "Sports Injury Rehabilitation", img: "https://plus.unsplash.com/premium_photo-1661767448598-f42428886f1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwaW5qdXJ5JTIwcmVoYWJpbGl0YXRpb258ZW58MHx8MHx8fDA%3D" },
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

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const message = `Hello Mohammed Adil (PT), I would like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Problem:* ${formData.problem}`;
    window.open(`https://wa.me/919014063048?text=${message}`, "_blank");
  };

  return (
    <>
      <a href="tel:+919014063048" className="float-wa" aria-label="Call PhysioCure Home Care">
        <i className="fas fa-phone"></i>
      </a>

      <nav>
        <div className="logo">
          <img
            src="/logo.webp"
            alt="PhysioCure Logo"
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

      <section className="hero fade-in">
        <div>
          <p>YOUR RECOVERY, OUR MISSION</p>
          <h1>Professional <span>Home Physiotherapy</span> Services at Your Doorstep</h1>
          <p>Get expert, evidence-based physiotherapy treatment in the comfort and privacy of your home. No more traffic or clinic waiting times.</p>
          <a className="btn btn-wa" href="https://wa.me/919014063048" aria-label="Book Home Visit via WhatsApp">
            <i className="fab fa-whatsapp" style={{ marginRight: '10px' }}></i> Book Home Visit via WhatsApp
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
            alt="Professional Home Physiotherapy Treatment"
            width="550"
            height="380"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="section-title">
          <p>What I Offer</p>
          <h2>Our Specialized Services</h2>
        </div>
        <div className="services-grid">
          {services.map((s, idx) => (
            <div className="card fade-in" key={idx}>
              <img
                src={s.img}
                alt={s.title}
                width="350"
                height="250"
                loading="lazy"
                decoding="async"
              />
              <div className="card-content">
                <h3>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#334155' }}>Advanced therapeutic interventions tailored for effective pain relief and recovery at home.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="why-section">
        <div className="section-title">
          <p>Excellence in Care</p>
          <h2>Why Choose Our Services</h2>
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
            <div className="why-card" key={idx}>
              <span className="why-icon">{item.i}</span>
              <h3 style={{ marginBottom: '10px' }}>{item.t}</h3>
              <p style={{ fontSize: '0.9rem', color: '#334155' }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>GET IN TOUCH</p>
            <h3>Book an Appointment</h3>
            <p>Ready to start your journey to a pain-free life? Reach out to me directly.</p>
            <ul className="info-list">
              <li>
                <div className="info-icon"><i className="fas fa-phone"></i></div>
                <div>+91 90140 63048</div>
              </li>
              <li>
                <div className="info-icon"><i className="fas fa-envelope"></i></div>
                <div>physiocurehomecare1@gmail.com</div>
              </li>
              <li>
                <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>Home Services Across Hyderabad</div>
              </li>
              <li>
                <div className="info-icon"><i className="fas fa-clock"></i></div>
                <div>Mon - Sun: 8:00 AM - 8:00 PM</div>
              </li>
            </ul>
          </div>
          <div>
            <form className="contact-form" onSubmit={handleWhatsApp}>
              <input type="text" aria-label="Your Name" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="tel" aria-label="Phone Number" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <textarea rows="4" aria-label="Describe your problem" placeholder="Describe your problem" required value={formData.problem} onChange={(e) => setFormData({ ...formData, problem: e.target.value })}></textarea>
              <button type="submit" className="btn btn-wa" style={{ width: '100%' }}>Confirm Appointment via WhatsApp</button>
              <p className="trust-note">"We respect your privacy and will get back to you soon."</p>
            </form>
          </div>
        </div>
      </section>

      <section id="areas" className="areas-section">
        <div className="section-title">
          <p>Coverage</p>
          <h2>Areas Served in Hyderabad</h2>
        </div>
        <div className="area-grid">
          {["Banjara Hills", "Jubilee Hills", "Gachibowli", "Kondapur", "Mehdipatnam", "Tolichowki", "Hitech City", "Attapur", "Aaramgarh", "Dilsukhnagar", "Chandrayangutta"].map((area, idx) => (
            <div className="area-tag" key={idx}>
              <i className="fas fa-map-marker-alt"></i> {area}
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" style={{ background: "var(--bg-light)" }}>
        <div className="section-title">
          <p>Health Benefits</p>
          <h2>Benefits of Physiotherapy</h2>
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
            <div className="why-card" key={index}>
              <span className="why-icon">{item.icon}</span>
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "#334155", fontSize: "0.9rem" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div>
          <img 
            className="about-img" 
            src="https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=800" 
            alt="Dr. Adil providing physiotherapy" 
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-content">
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>MEET THE EXPERT</p>
          <h2 style={{ color: "black" }}>Mohammed Adil (PT)</h2>
          <p style={{ color: '#334155', marginBottom: '20px' }}>
            I am a dedicated, independent Physiotherapist providing expert clinical care in the privacy and comfort of your own home. With a focus on patient-centric recovery, I utilize evidence-based techniques to help individuals regain their strength, mobility, and confidence.
          </p>
          <p style={{ color: '#334155' }}>
            Whether you are recovering from surgery, managing a chronic condition, or seeking relief from sports injuries, I provide professional assessment and hands-on treatment plans tailored to your specific needs.
          </p>
        </div>
      </section>

      <section id="testimonials">
        <div className="section-title">
          <p>Reviews</p>
          <h2>Patient Success Stories</h2>
        </div>
        <div className="grid">
          {[
            { n: "Rahul K.", m: "Excellent treatment for my chronic back pain. Dr. Adil is very professional and patient." },
            { n: "Ayesha S.", m: "My mother recovered quickly after her knee surgery thanks to his home visit sessions." },
            { n: "Kiran Dev", m: "Very professional and caring approach. The convenience of home visits is unmatched." }
          ].map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"{t.m}"</p>
              <p className="testimonial-author">- {t.n}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-title">
          <p>Questions?</p>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {faqs.map((f, idx) => (
            <div className={`faq-item ${activeFaq === idx ? 'active' : ''}`} key={idx} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
              <div className="faq-header">
                {f.q}
                <span>{activeFaq === idx ? '−' : '+'}</span>
              </div>
              <div className="faq-content">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Follow Us On Social Media</div>
        <p>Providing professional home care across Hyderabad</p>
        <div className="social-icons">
          <a href="https://wa.me/919014063048" target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/physiocurehomecare1?igsh=MXV3N2E4OTQ2bW5mbA==" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://youtube.com/@mohammedadil-dh2xr?si=njjETUlozXduSs6j" target="_blank" rel="noreferrer" aria-label="Subscribe to our YouTube channel">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </footer>

      <!-- Asynchronous Loading for FontAwesome styles -->
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        media="print" 
        onLoad={(e) => { e.target.media = 'all'; }} 
      />
    </>
  );
}