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
  FaYoutube,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

// Helper function to reliably convert any YouTube Shorts URL, standard URL, or ID into an embed URL
function getYouTubeEmbedUrl(urlOrId) {
  if (!urlOrId) return "";
  if (urlOrId.includes("youtube.com/embed/")) return urlOrId;
  const shortsMatch = urlOrId.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  const watchMatch = urlOrId.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shareMatch = urlOrId.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shareMatch) return `https://www.youtube.com/embed/${shareMatch[1]}`;
  return `https://www.youtube.com/embed/${urlOrId}`;
}

// YouTube Shorts Patient Review Videos
const PATIENT_VIDEOS = {
  stroke: {
    title: "Patient Review after Stroke (Paralysis)",
    url: "https://youtube.com/shorts/30SdeV9ISlI?si=tF9CH9cAlZXHN2v5"
  },
  tkr: {
    title: "Patient Review after Total knee Replacement",
    url: "https://youtube.com/shorts/4yCh5Cg0fJ4?si=JmEyk2-mR3agsjmg"
  },
  mcl: {
    title: "Patient Review after MCL Ligament Injury",
    url: "https://youtube.com/shorts/6QAPZCMqht8?si=4C3oYgtvECcxhSf5"
  }
};

const carouselVideos = [
  PATIENT_VIDEOS.stroke,
  PATIENT_VIDEOS.tkr,
  PATIENT_VIDEOS.mcl
];

// Static data for services
const services = [
  { 
    title: "Orthopaedic Rehabilitation", 
    img: "/Ortho.webp",
    description: "Expert orthopedic home physiotherapy in Hyderabad for knee pain, arthritis, fractures, joint replacement and post-surgery rehabilitation."
  },
  { 
    title: "Neurological Rehabilitation", 
    img: "/neuro.webp",
    description: "Professional neurological home physiotherapy in Hyderabad for stroke, Parkinson's disease, spinal cord injury and balance training."
  },
  { 
    title: "Post-Surgery Rehabilitation", 
    img: "/post.webp",
    description: "Sports physiotherapy in Hyderabad for ligament injuries, muscle strains, ACL recovery and faster return to sports."
  },
  { 
    title: "Sports Injury Rehabilitation", 
    img: "/sports.webp",
    description: "Home physiotherapy after surgery in Hyderabad for faster recovery, mobility improvement and pain management."
  }
];

// Static data for FAQs
const faqs = [
  { q: "Do you provide home visits?", a: "Yes, I provide professional physiotherapy services exclusively at the comfort of your home across Hyderabad." },
  { q: "How do I book an appointment?", a: "You can book an appointment easily by clicking the WhatsApp button or by filling out the contact form below." },
  { q: "Which areas do you cover?", a: "I cover major areas in Hyderabad including Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, and more." },
  { q: "What conditions do you treat?", a: "I treat various conditions including back pain, neck pain, sports injuries, stroke rehab, post-surgery recovery, and neurological disorders." }
];

// Dropdown condition navigation items
const conditionsNavItems = [
  { name: "Total knee replacement", slug: "total-knee-replacement" },
  { name: "Stroke", slug: "stroke" },
  { name: "Back pain", slug: "back-pain" },
  { name: "Frozen shoulder", slug: "frozen-shoulder" }
];

// 3-Step Recovery Journey data for Total Knee Replacement
const tkrRecoverySteps = [
  {
    phase: "Phase 1 (Weeks 1-2): Pain & Stiffness Control",
    desc: "We focus on reducing surgical swelling, managing pain, and gently getting your knee to straighten fully and bend to 90 degrees."
  },
  {
    phase: "Phase 2 (Weeks 3-6): Rebuilding Strength",
    desc: "We activate your thigh muscles, improve your balance, and guide you to walk safely with less dependence on walking aids."
  },
  {
    phase: "Phase 3 (Weeks 6+): Complete Independence",
    desc: "We graduate you to climbing stairs effortlessly, walking longer distances, and returning to your favorite daily activities."
  }
];

// Condition page data with exact headings, verified local image paths, and professional descriptions
const conditionsData = {
  "total-knee-replacement": {
    headingSuffix: "Total Knee Replacement",
    image: "/conditions/total_knee_replacement.webp",
    description:
      "A Total Knee Replacement (TKR) is a life-changing surgery where damaged joint surfaces are replaced with artificial implants. While the surgeon fixes the joint, specialized physiotherapy is what actually brings it to life. It is the absolute key to eliminating stiffness, rebuilding muscle strength, and getting you back to walking pain-free."
  },
  "stroke": {
    headingSuffix: "Stroke",
    image: "/conditions/Stroke.webp",
    description:
      "Stroke recovery requires dedicated neurological rehabilitation to encourage neuroplasticity, improve motor control, and regain functional independence. In-home physiotherapy provides a familiar, supportive environment where therapy can directly target everyday movements. Rehabilitation focuses on bed mobility, sitting and standing balance, gait re-education, muscle tone management, and targeted strength training designed to help individuals regain confidence and functional mobility at a safe, steady pace."
  },
  "back-pain": {
    headingSuffix: "Back Pain",
    slides: [
      {
        image: "/conditions/back-pain/back-pain-1.webp",
        description:
          "Targeted assessment and gentle spinal mobilization provide immediate relief from acute and chronic lower back pain. In-home physiotherapy identifies muscle spasms, postural strain, or disc irritation, delivering gentle manual techniques and safe movement patterns directly in your comfort zone."
      },
      {
        image: "/conditions/back-pain/back-pain-2.webp",
        description:
          "Core stabilization and spinal muscular reconditioning build a protective natural brace around your spine. Customized exercises activate deep abdominal and lumbar stabilizer muscles, helping reduce mechanical stress on your lower back during standing and lifting."
      },
      {
        image: "/conditions/back-pain/back-pain-3.webp",
        description:
          "Targeted flexibility routines and neural mobilization address sciatica, tight hip flexors, and hamstring stiffness. Restoring healthy pelvis and lumbar mobility takes pressure off irritated spinal nerves, enabling smooth, pain-free daily bending and walking."
      },
      {
        image: "/conditions/back-pain/back-pain-4.webp",
        description:
          "Progressive functional rehabilitation and ergonomic posture training ensure long-lasting recovery. Learn safe lifting techniques, workstation adjustments, and personalized maintenance exercises designed to keep your back strong and prevent recurring flare-ups."
      }
    ]
  },
  "frozen-shoulder": {
    headingSuffix: "Frozen Shoulder",
    image: "/conditions/frozen_shoulder.webp",
    description:
      "Frozen shoulder (adhesive capsulitis) causes progressive stiffness, persistent discomfort, and severe restrictions in arm movement. Home physiotherapy provides guided, stage-appropriate therapeutic exercises to gently restore glenohumeral joint mobility and alleviate muscular tension. Sessions focus on gentle stretching, scapular stabilization, passive and active-assisted range of motion, and posture correction to gradually improve shoulder function and ease daily tasks."
  }
};

// 1. Header Component with CLICK-based Conditions Dropdown
const Header = memo(({ onNavigate, onSectionClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setConditionsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setConditionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleConditionSelect = (slug) => {
    setConditionsOpen(false);
    setMenuOpen(false);
    onNavigate(`/conditions/${slug}`);
  };

  const handleLogoClick = () => {
    closeMenu();
    onNavigate("/");
  };

  return (
    <header>
      <nav aria-label="Main Navigation">
        <div className="logo" onClick={handleLogoClick} role="button" tabIndex={0}>
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
          <a href="#services" onClick={(e) => { e.preventDefault(); closeMenu(); onSectionClick("services"); }}>
            Services
          </a>
          <a href="#why" onClick={(e) => { e.preventDefault(); closeMenu(); onSectionClick("why"); }}>
            Why Us
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); closeMenu(); onSectionClick("contact"); }}>
            Book My Appointment
          </a>
          
          <div className="nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={(e) => {
                e.stopPropagation();
                setConditionsOpen((prev) => !prev);
              }}
              aria-expanded={conditionsOpen}
              aria-haspopup="true"
            >
              Conditions
            </button>
            {conditionsOpen && (
              <ul className="conditions-dropdown" role="menu">
                {conditionsNavItems.map((item, index) => (
                  <li 
                    key={index} 
                    role="menuitem" 
                    onClick={() => handleConditionSelect(item.slug)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="#contact" onClick={(e) => { e.preventDefault(); closeMenu(); onSectionClick("contact"); }}>
            Contact
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); closeMenu(); onSectionClick("about"); }}>
            About
          </a>
        </div>
      </nav>
    </header>
  );
});
Header.displayName = "Header";

// 2. Hero Section with WHITE phone icon inside Green Call Button
const Hero = memo(() => {
  return (
    <section className="hero fade-in" aria-label="Introduction">
      <div>
        <h1><span>Physiotherapy At Home</span> In Hyderabad</h1>
        <p>Get personalized physiotherapy at your doorstep for pain management, post-surgery rehabilitation, neurological conditions and mobility recovery.</p>
        <div className="hero-cta-container">
          <a
            className="btn btn-call"
            href="tel:+919014063048"
            aria-label="Call Now - Book Home Visit"
          >
            <FaPhoneAlt className="btn-call-icon" aria-hidden="true" /> Call Now - Book Home Visit
          </a>
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

// 3. Specialized Services Section — Single Card Auto-Looping Carousel
const Services = memo(({ triggerRef }) => {
  const [serviceIndex, setServiceIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % services.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setServiceIndex((prev) => (prev - 1 + services.length) % services.length);
    startTimer();
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setServiceIndex((prev) => (prev + 1) % services.length);
    startTimer();
  }, [startTimer]);

  const currentService = services[serviceIndex];

  return (
    <section id="services" ref={triggerRef} className="services-section" aria-labelledby="services-heading">
      <div className="section-title">
        <p>What I Offer</p>
        <h2 id="services-heading">Our Specialized Home Physiotherapy Services in Hyderabad</h2>
      </div>

      <div className="services-carousel-wrapper">
        <button
          type="button"
          className="service-arrow service-arrow-left"
          onClick={handlePrev}
          aria-label="Previous Service"
        >
          <FaChevronLeft />
        </button>

        <div className="service-carousel-card-wrap">
          <article className="card fade-in" key={serviceIndex} aria-labelledby={`service-title-${serviceIndex}`}>
            <img
              src={currentService.img}
              alt={`${currentService.title} Home Physiotherapy Service in Hyderabad`}
              width="350"
              height="250"
              loading="lazy"
              decoding="async"
            />
            <div className="card-content">
              <h3 id={`service-title-${serviceIndex}`}>{currentService.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#334155' }}>
                {currentService.description}
              </p>
            </div>
          </article>

          <div className="services-carousel-dots">
            {services.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`service-dot ${idx === serviceIndex ? "active" : ""}`}
                onClick={() => {
                  setServiceIndex(idx);
                  startTimer();
                }}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="service-arrow service-arrow-right"
          onClick={handleNext}
          aria-label="Next Service"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
});
Services.displayName = "Services";

// 4. Patient Success Stories — YouTube Shorts Video Carousel with Auto-Slide & Correct Mobile Layout
const PatientSuccessVideos = memo(() => {
  const [videoIndex, setVideoIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setVideoIndex((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
    startTimer();
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setVideoIndex((prev) => (prev + 1) % carouselVideos.length);
    startTimer();
  }, [startTimer]);

  const currentVideo = carouselVideos[videoIndex];

  return (
    <section id="testimonials" className="video-carousel-section" aria-labelledby="testimonials-heading">
      <div className="section-title">
        <p>Real Patient Results</p>
        <h2 id="testimonials-heading">Patient Success Stories</h2>
      </div>

      <div className="video-carousel-wrapper">
        <button
          type="button"
          className="video-arrow video-arrow-left"
          onClick={handlePrev}
          aria-label="Previous Patient Video"
        >
          <FaChevronLeft />
        </button>

        <div className="video-card-container">
          <p className="video-title-badge">{currentVideo.title}</p>
          <div className="video-frame-wrap">
            <iframe
              key={currentVideo.title}
              src={getYouTubeEmbedUrl(currentVideo.url)}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="video-carousel-dots">
            {carouselVideos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`video-dot ${idx === videoIndex ? "active" : ""}`}
                onClick={() => {
                  setVideoIndex(idx);
                  startTimer();
                }}
                aria-label={`Go to video ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="video-arrow video-arrow-right"
          onClick={handleNext}
          aria-label="Next Patient Video"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
});
PatientSuccessVideos.displayName = "PatientSuccessVideos";

// 5. Back Pain 4-Image Slider Component
const BackPainSlider = memo(({ condition }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = condition.slides;
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  }, [slides.length, startTimer]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    startTimer();
  }, [slides.length, startTimer]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="slider-container">
      <button
        type="button"
        className="slider-arrow slider-arrow-left"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </button>

      <div className="condition-content slider-card">
        <div className="condition-image-wrap">
          <img
            key={currentSlide.image}
            src={currentSlide.image}
            alt={`Physiotherapy At Home for Back Pain - Step ${currentIndex + 1}`}
            className="condition-img"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="condition-details">
          <p>{currentSlide.description}</p>
          <div className="condition-cta">
            <a
              className="btn btn-call"
              href="tel:+919014063048"
              aria-label="Call Now - Book Home Visit"
            >
              <FaPhoneAlt className="btn-call-icon" aria-hidden="true" /> Call Now - Book Home Visit
            </a>
          </div>

          <div className="slider-pagination">
            <span className="slider-counter">
              {currentIndex + 1} / {slides.length}
            </span>
            <div className="slider-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slider-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    startTimer();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="slider-arrow slider-arrow-right"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
});
BackPainSlider.displayName = "BackPainSlider";

// 6. Condition Detail Page Component
const ConditionPage = memo(({ conditionKey }) => {
  const condition = conditionsData[conditionKey];

  if (!condition) {
    return (
      <section className="condition-page">
        <h1 className="condition-heading">Condition Not Found</h1>
      </section>
    );
  }

  return (
    <section className="condition-page fade-in" aria-labelledby="condition-title">
      <h1 id="condition-title" className="condition-heading">
        <span>Physiotherapy At Home</span> for {condition.headingSuffix}
      </h1>

      {condition.slides ? (
        <BackPainSlider condition={condition} />
      ) : (
        <>
          <div className="condition-content">
            <div className="condition-image-wrap">
              <img
                src={condition.image}
                alt={`Physiotherapy At Home for ${condition.headingSuffix}`}
                className="condition-img"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="condition-details">
              <p>{condition.description}</p>
              <div className="condition-cta">
                <a
                  className="btn btn-call"
                  href="tel:+919014063048"
                  aria-label="Call Now - Book Home Visit"
                >
                  <FaPhoneAlt className="btn-call-icon" aria-hidden="true" /> Call Now - Book Home Visit
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Video for Total Knee Replacement Page */}
          {conditionKey === "total-knee-replacement" && (
            <div className="condition-video-section">
              <h2 className="condition-video-heading">Patient Recovery Story</h2>
              <div className="condition-video-card">
                <div className="video-frame-wrap">
                  <iframe
                    src={getYouTubeEmbedUrl(PATIENT_VIDEOS.tkr.url)}
                    title="Patient Review after Total knee Replacement"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* Embedded Video for Stroke Page */}
          {conditionKey === "stroke" && (
            <div className="condition-video-section">
              <h2 className="condition-video-heading">Patient Recovery Story</h2>
              <div className="condition-video-card">
                <div className="video-frame-wrap">
                  <iframe
                    src={getYouTubeEmbedUrl(PATIENT_VIDEOS.stroke.url)}
                    title="Patient Review after Stroke (Paralysis)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* Exclusive 3-Step Recovery Journey for Total Knee Replacement */}
          {conditionKey === "total-knee-replacement" && (
            <div className="tkr-journey-section">
              <h2 className="tkr-journey-heading">
                Your 3-Step Recovery Journey At Home
              </h2>
              <div className="tkr-journey-grid">
                {tkrRecoverySteps.map((step, idx) => (
                  <div className="tkr-phase-card" key={idx}>
                    <h3>{step.phase}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
});
ConditionPage.displayName = "ConditionPage";

// 7. WhyChooseUs Section
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

// 8. Contact Form Component
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({ name: "", phone: "", problem: "" });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

// 9. Contact Section
const ContactSection = memo(() => {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-section-heading">
      <div className="contact-container">
        <div className="contact-info">
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '10px' }}>GET IN TOUCH</p>
          <h2 id="contact-section-heading" style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '800', color:'#0F172A' }}>Book an Appointment</h2>
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

// 10. Coverage Areas Section
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

// 11. About Expert Section
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

// 12. FAQ Section
const FAQSection = memo(() => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  const toggleFaq = useCallback((idx) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
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

// 13. Footer Component
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

// Main Application with Client-Side Routing and Dynamic Scrolling
export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [lazyLoaded, setLazyLoaded] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
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
      { rootMargin: "400px" }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  preload(asli, { as: "image", fetchPriority: "high" });

  const handleNavigate = useCallback((path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  const handleSectionClick = useCallback((sectionId) => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const conditionMatch = currentPath.match(/^\/conditions\/([a-z0-9-]+)$/);
  const activeConditionSlug = conditionMatch ? conditionMatch[1] : null;

  return (
    <>
      <div className="call-wrapper">
        <span className="call-text">WhatsApp us</span>
        <a
          href="https://wa.me/919014063048?text=Hello%20PhysioCure%20Home%20Care,%0A%0AI%20am%20interested%20in%20booking%20a%20home%20physiotherapy%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="float-wa"
          aria-label="Contact PhysioCure Home Care on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>

      <Header onNavigate={handleNavigate} onSectionClick={handleSectionClick} />

      <main id="main-content">
        {activeConditionSlug ? (
          <ConditionPage conditionKey={activeConditionSlug} />
        ) : (
          <>
            <Hero />
            <Services triggerRef={triggerRef} />
            
            {/* Patient Success Stories Video Carousel DIRECTLY AFTER Services */}
            <PatientSuccessVideos />

            <WhyChooseUs />
            <ContactSection />
            <CoverageAreas />

            {lazyLoaded ? (
              <>
                <AboutExpert />
                <FAQSection />
              </>
            ) : (
              <div style={{ minHeight: "1500px" }} />
            )}
          </>
        )}

        <Footer />
      </main>
    </>
  );
}