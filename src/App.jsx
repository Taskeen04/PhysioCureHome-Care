import React, { useState } from "react";

import asli from "./assets/asli.webp";

// Static arrays defined outside component to optimize memory and prevent unnecessary re-creations during re-renders
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
      <style>{`
        :root {
          --primary: #2563EB;
          --primary-soft: #DBEAFE;
          --secondary: #14B8A6;
          --bg-light: #E6F4FF;
          --text-dark: #0F172A;
          --text-gray: #475569;
          --shadow: 0 10px 30px rgba(0,0,0,0.06);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; scroll-behavior: smooth; }
        
        /* FIX: Resetting root containers to allow full browser width */
        html, body, #root { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 !important; 
          padding: 0 !important; 
          overflow-x: hidden; 
        }
        
        body { background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.8s ease forwards; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 4%; background: linear-gradient(90deg,#0F172A,#2563EB); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 1000; box-shadow: 0 6px 20px rgba(37,99,235,0.25); width: 100%; }
        .logo{
          display:flex;
          flex-wrap: nowrap;
          align-items:center;
          gap:10px;
          color:white;
          font-size:1.2rem;
          white-space:nowrap;
          font-weight:700;
          font-family:"Trebuchet MS","Segoe UI",sans-serif;
        }

        .logo img{
          width:42px;
          height:42px;
          border-radius:50%;
          object-fit:cover;
        }
        
        .nav-links { display: flex; align-items: center; }
        .nav-links a { color: white; text-decoration: none; margin-left: 28px; font-weight: 500; font-size: 0.95rem; transition: var(--transition); }
        .nav-links a:hover { color: #FACC15; }
        
        .menu-icon { display: none; font-size: 28px; color: white; cursor: pointer; user-select: none; }

        section { padding: 90px 4%; width: 100%; }
        
        .hero { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 50px; align-items: center; min-height: 85vh; background: linear-gradient(135deg, #DCEEFF 0%, #E8FFF4 50%, #FFF6DE 100%); }
        .hero h1 { font-size: 3.5rem; line-height: 1.1; font-weight: 800; margin-bottom: 20px; color: var(--text-dark); }
        .hero h1 span { color: var(--primary); }
        .hero p { font-size: 1.2rem; color: var(--text-gray); margin-bottom: 35px; max-width: 580px; }
        .hero-img {
            width: 100%;
            max-width: 550px;
            height: auto;
            object-fit: cover;
            border-radius: 30px;
            box-shadow: 20px 20px 60px rgba(0,0,0,0.08);
            transition: var(--transition);
        }
        .hero-img:hover { transform: scale(1.02); }
        
        .highlights { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 30px; }
        .highlight-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 600; color: var(--primary); background: white; padding: 8px 16px; border-radius: 50px; box-shadow: var(--shadow); }

        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 16px 35px; border-radius: 100px; text-decoration: none; font-weight: 600; transition: var(--transition); border: none; cursor: pointer; }
        .btn-wa { background: var(--secondary); color: #fff; box-shadow: 0 8px 20px rgba(37,211,102,0.3); }
        .btn-wa:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(37,211,102,0.4); filter: brightness(1.05); }

        .section-title { text-align: center; margin-bottom: 60px; }
        .section-title h2 { font-size: 2.5rem; font-weight: 800; color: var(--text-dark); }
        .section-title p { color: var(--primary); font-weight: 600; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 10px; }

        .services-section { background: linear-gradient(135deg, #DFF7EC, #EAF4FF); }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 30px; 
        }

        .card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: var(--shadow); transition: var(--transition); height: 100%; border: 1px solid #D6E9FF; }
        .card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card-content { padding: 25px; text-align: center; }
        .card h3 { font-size: 1.2rem; margin-bottom: 10px; color: var(--text-dark); }
        
        .why-section { background: #fff; }
        .why-card { text-align: center; padding: 18px 12px; border-radius: 18px; width: 100%; max-width: 280px; margin: 0 auto; transition: var(--transition); background: var(--bg-light); border: 1px solid transparent; }
        .why-card:hover { border-color: var(--primary); background: #fff; transform: translateY(-5px); }
        .why-icon { font-size: 2.5rem; margin-bottom: 20px; display: block; }

        .areas-section { background: linear-gradient(135deg, #E9E4FF, #DDF4FF); text-align: center; }
        .area-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px; }
        .area-tag { background: #fff; padding: 12px 25px; width: 250px; display: flex; justify-content: center; align-items: center; margin: 0 auto; text-align: center; border-radius: 100px; font-weight: 600; color: var(--primary); box-shadow: var(--shadow); transition: var(--transition); gap: 10px; }
        .area-tag:hover { background: var(--primary); color: #fff; transform: scale(1.05); }

        .testimonial-card { background: #fff; padding: 40px; border-radius: 24px; box-shadow: var(--shadow); position: relative; width: 100%; }
        .stars { color: #ffc107; margin-bottom: 15px; font-size: 1.2rem; }
        .testimonial-text { font-style: italic; color: var(--text-gray); margin-bottom: 20px; }
        .testimonial-author { font-weight: 700; color: var(--text-dark); }

        .faq-section { background: var(--bg-light); }
        .faq-container { max-width: 800px; margin: 0 auto; }
        .faq-item { background: #fff; border-radius: 16px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: var(--transition); }
        .faq-header { padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; color: var(--text-dark); }
        .faq-content { padding: 0 25px; max-height: 0; overflow: hidden; transition: all 0.4s ease; color: var(--text-gray); font-size: 0.95rem; }
        .faq-item.active { border: 1px solid var(--primary-soft); }
        .faq-item.active .faq-content { padding: 0 25px 25px; max-height: 200px; }
        .faq-item.active .faq-header { color: var(--primary); }

        .contact-section { background: #fff; }
        .contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; background: var(--bg-light); padding: 50px; border-radius: 40px; box-shadow: var(--shadow); }
        .contact-info h3 { font-size: 2rem; margin-bottom: 20px; }
        .info-list { list-style: none; margin-top: 30px; }
        .info-list li {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .info-list li div:last-child {
            flex: 1;
            min-width: 0;
            word-break: break-word;
            overflow-wrap: anywhere;
        }
        .info-icon { width: 45px; height: 45px; min-width: 45px; background: var(--primary-soft); color: var(--primary); display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        
        .contact-form { background: #fff; padding: 40px; border-radius: 30px; box-shadow: var(--shadow); }
        .contact-form input, .contact-form textarea { width: 100%; padding: 15px 20px; margin-bottom: 15px; border: 1.5px solid #eee; border-radius: 12px; outline: none; transition: var(--transition); font-size: 0.95rem; }
        .contact-form input:focus, .contact-form textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(11,127,171,0.1); }
        .trust-note { font-size: 0.8rem; color: var(--text-gray); margin-top: 15px; text-align: center; }

        .about-section { background: linear-gradient(135deg, #FFF6DE, #FFE9E3); display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: center; }
        .about-img { width: 100%; border-radius: 30px; box-shadow: var(--shadow); }
        .about-content h2 { font-size: 2.2rem; margin-bottom: 20px; line-height: 1.2; }

        footer { background: #1a2b3c; color: #fff; padding: 60px 4% 30px; text-align: center; width: 100%; }
        .social-icons { display: flex; justify-content: center; gap: 20px; margin: 30px 0; }
        .social-icons a { color: #fff; font-size: 1.4rem; opacity: 0.7; transition: var(--transition); text-decoration: none; }
        .social-icons a:hover { opacity: 1; transform: translateY(-5px); color: var(--primary); }
        .footer-line { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 0.85rem; opacity: 0.6; }
        
        .float-wa{
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 65px;
          height: 65px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 30px;
          text-decoration: none;
          z-index: 9999;
        }

        @media(max-width: 968px) {
          nav { padding: 18px 5%; position: relative; }
          .menu-icon { display: block; z-index: 1001; }
          .nav-links {
            display: none;
            position: absolute;
            top: 80px;
            right: 5%;
            background: white;
            width: 250px;
            flex-direction: column;
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            padding: 10px 0;
            z-index: 1000;
            animation: slideDown 0.3s ease forwards;
          }
          .nav-links.show { display: flex; }
          
          .nav-links a { 
            color: var(--text-dark); 
            margin: 12px 25px; 
            font-size: 1rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .about-content h2{
            font-size: 1.8rem;
          }

          .hero, .contact-container, .about-section { grid-template-columns: 1fr; text-align: center; }
          .hero h1 { font-size: 2.5rem; }
          section { padding: 40px 5%; }
          
          .contact-container {
            padding: 30px 15px;
            gap: 30px;
            width: 100%;
            overflow-x: hidden;
          }

          .contact-form {
            padding: 20px;
            width: 100%;
          }

          .why-card {
            max-width: 100%;
          }
          
          .testimonial-card {
            max-width: 100%;
            margin: 0;
          }
        }
      `}</style>

      <a href="tel:+919014063048" className="float-wa">
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
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>
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
          <a className="btn btn-wa" href="https://wa.me/919014063048">
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
            alt="Professional Home Physiotherapy"
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
                <p style={{ fontSize: '0.85rem', color: '#666' }}>Advanced therapeutic interventions tailored for effective pain relief and recovery at home.</p>
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
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.d}</p>
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
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <textarea rows="4" placeholder="Describe your problem" required value={formData.problem} onChange={(e) => setFormData({ ...formData, problem: e.target.value })}></textarea>
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
              <p style={{ color: "#666", fontSize: "0.9rem" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div>
          <img 
            className="about-img" 
            src="https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=800" 
            alt="Dr. Adil" 
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-content">
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>MEET THE EXPERT</p>
          <h2 style={{ color: "black" }}>Mohammed Adil (PT)</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>
            I am a dedicated, independent Physiotherapist providing expert clinical care in the privacy and comfort of your own home. With a focus on patient-centric recovery, I utilize evidence-based techniques to help individuals regain their strength, mobility, and confidence.
          </p>
          <p style={{ color: '#555' }}>
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
          <a href="https://wa.me/919014063048" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/physiocurehomecare1?igsh=MXV3N2E4OTQ2bW5mbA==" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://youtube.com/@mohammedadil-dh2xr?si=njjETUlozXduSs6j" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </footer>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </>
  );
}