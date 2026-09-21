import React, { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Clock,
  Train,
  Car,
  Building2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import "./Contact.css";
import heroStudents from "../../../../../assets/contact-students.png";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    path: "",
    interests: [],
    message: "",
  });

  const faqs = [
    {
      question: "Can I visit the Hyderabad campus without an appointment?",
      answer:
        "Yes. You can visit our Hyderabad campus during working hours. However, booking an appointment in advance is recommended so our admissions team can give you dedicated guidance.",
    },
    {
      question: "How soon will your admissions team respond to my message?",
      answer:
        "Our admissions team generally responds as soon as possible during working hours. You can also contact us directly by phone or WhatsApp for faster assistance.",
    },
    {
      question: "Do you offer both Online and Offline batches in Hyderabad?",
      answer:
        "Yes. We provide flexible learning options depending on the course and batch. Contact our admissions team to know the currently available modes.",
    },
    {
      question: "What are the course fees and payment options?",
      answer:
        "Course fees vary depending on the selected learning path. Contact our team for the latest course fee and available payment options.",
    },
    {
      question: "Is there visitor parking available at the campus?",
      answer:
        "Yes. Dedicated visitor parking is available for both two-wheelers and four-wheelers on the premises.",
    },
    {
      question: "Can I get a demo class before joining?",
      answer:
        "Yes. Contact our admissions team to check demo-session availability for your preferred learning path.",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    // Connect your existing API submission here
  };

  const campusAddress =
    "3rd Floor, Plot No: 25, 305, Ayyappa Society Main Rd, opposite The Pickle Yard, SBH Officers Colony, Mega Hills, Madhapur, Hyderabad, Telangana 500081";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(campusAddress);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy address:", error);
    }
  };

  const openMaps = () => {
    const encodedAddress = encodeURIComponent(campusAddress);

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  const callUs = () => {
    window.location.href = "tel:+919676507387";
  };

  const whatsappUs = () => {
    window.open(
      "https://wa.me/919676507387?text=Hi%20TX%20Pathwing,%20I%20would%20like%20to%20know%20more%20about%20your%20courses.",
      "_blank"
    );
  };

  const emailUs = () => {
    window.location.href = "mailto:info@txpathwing.com";
  };

  return (
    <main className="contact-page-container">

      {/* =====================================================
          1. HERO SECTION
      ====================================================== */}

      <section className="contact-hero-section">

        <div className="contact-hero-glow-1" />
        <div className="contact-hero-glow-2" />
        <div className="contact-hero-grid-pattern" />

        <div className="contact-hero-content">

          <div className="contact-hero-grid">

            {/* LEFT CONTENT */}

            <div className="contact-hero-left">

              <div className="contact-hero-badge">
                <Sparkles size={14} />
                Contact TX Pathwing
              </div>

              <h1 className="contact-hero-title">
                Let's Build Your
                <br />

                <span className="contact-hero-title-gradient">
                  Career Path
                </span>
              </h1>

              <p className="contact-hero-desc">
                Talk to our team, get guidance, or visit our campus.
                We're here to help you take the right step toward your
                technology career.
              </p>

              <div className="contact-hero-actions">

                <button
                  className="contact-submit-btn hero-contact-btn"
                  onClick={whatsappUs}
                >
                  <MessageCircle size={18} />
                  Talk to a Mentor
                  <ArrowRight size={18} />
                </button>

              </div>

              <div className="contact-hero-badges-row">

                <div className="contact-info-pill">
                  <span className="contact-pill-dot" />
                  Quick response
                </div>

                <div className="contact-info-pill">
                  <ShieldCheck size={16} />
                  Trusted by learners
                </div>

              </div>

            </div>


            {/* RIGHT HERO IMAGE */}

            <div className="contact-hero-right">

              <div className="contact-hero-image-wrapper">

                <img
                  src={heroStudents}
                  alt="TX Pathwing students learning"
                  className="contact-hero-image"
                />

                <div className="contact-image-note">
                  <span>Your Success</span>
                  <strong>Our Mission</strong>
                  <ArrowRight size={16} />
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
     <section className="contact-quick-actions">

        <div className="contact-content-wrapper">

          <div className="contact-quick-grid">

            <div
              className="contact-quick-card"
              onClick={whatsappUs}
            >
              <div className="contact-quick-icon purple">
                <MessageCircle size={24} />
              </div>

              <div className="contact-quick-content">

                <h3>Talk to a Mentor</h3>

                <p>
                  Get career guidance and course assistance.
                </p>

                <button>
                  Chat Now
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>


            <div
              className="contact-quick-card"
              onClick={openMaps}
            >
              <div className="contact-quick-icon blue">
                <MapPin size={24} />
              </div>

              <div className="contact-quick-content">

                <h3>Visit Our Campus</h3>

                <p>
                  Madhapur, Hyderabad
                  <br />
                  3rd Floor
                </p>

                <button>
                  Get Directions
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>
            <div
              className="contact-quick-card"
              onClick={callUs}
            >
              <div className="contact-quick-icon indigo">
                <Phone size={24} />
              </div>

              <div className="contact-quick-content">

                <h3>Call Admissions</h3>

                <p>
                  +91 9676507387
                  <br />
                  Mon–Fri, 9 AM – 7 PM
                </p>

                <button>
                  Call Now
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>

          </div>

        </div>

      </section>

      <section className="contact-form-section">

        <div className="contact-content-wrapper">

          <div className="contact-main-grid">

            <div className="contact-form-card contact-form-column">

              <div className="contact-form-header">

                <div>

                  <span className="contact-section-label">
                    Get in touch
                  </span>

                  <h2 className="contact-form-title">
                    Send us a message
                  </h2>

                  <p className="contact-form-subtitle">
                    Fill in the form and our team will get back to you
                    as soon as possible.
                  </p>

                </div>

                <div className="contact-live-badge">
                  <span />
                  LIVE
                </div>

              </div>


              <form onSubmit={handleSubmit}>

                {/* NAME + EMAIL */}

                <div className="contact-form-grid-2">

                  <div className="contact-field">

                    <label className="contact-field-label">
                      Your Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="contact-input"
                      required
                    />

                  </div>


                  <div className="contact-field">

                    <label className="contact-field-label">
                      Email Address <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="contact-input"
                      required
                    />

                  </div>

                </div>

                <div className="contact-form-grid-2">

                  <div className="contact-field">

                    <label className="contact-field-label">
                      Phone Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="contact-input"
                      required
                    />

                  </div>


                  <div className="contact-field">

                    <label className="contact-field-label">
                      Interested In <span>*</span>
                    </label>

                    <select
                      name="path"
                      value={formData.path}
                      onChange={handleChange}
                      className="contact-input contact-select"
                      required
                    >
                      <option value="">
                        Select a learning path
                      </option>

                      <option value="software-development">
                        Software Development
                      </option>

                      <option value="testing">
                        Software Testing
                      </option>

                      <option value="data-science">
                        Data Science
                      </option>

                      <option value="ai-ml">
                        AI / ML
                      </option>

                      <option value="devops">
                        DevOps
                      </option>

                      <option value="soft-skills">
                        Soft Skills
                      </option>

                    </select>

                  </div>

                </div>
                <div className="contact-field contact-interest-field">

                  <label className="contact-field-label">
                    What are you looking for? <span>*</span>
                  </label>

                  <div className="contact-interest-options">

                    {[
                      "Course Information",
                      "Career Guidance",
                      "Admission Support",
                      "Other",
                    ].map((interest) => (

                      <label
                        key={interest}
                        className="contact-checkbox-label"
                      >

                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() =>
                            handleInterestChange(interest)
                          }
                        />

                        <span>{interest}</span>

                      </label>

                    ))}

                  </div>

                </div>

                <div className="contact-field">

                  <label className="contact-field-label">
                    Message <span>*</span>
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you'd like to know..."
                    className="contact-input contact-textarea"
                    rows="5"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  <Send size={18} />
                  Send Message
                  <ArrowRight size={18} />
                </button>

              </form>

            </div>
            <div className="contact-info-cards-col">

              <div className="contact-info-heading">

                <span className="contact-section-label">
                  Contact Information
                </span>

                <h2>
                  We're here for you
                </h2>

              </div>

              <div className="contact-info-card">

                <div className="contact-info-icon purple">
                  <MapPin size={21} />
                </div>

                <div>

                  <h3>Visit Us</h3>

                  <p>
                    3rd Floor, Plot No: 25, 305, Ayyappa Society
                    Main Rd, opposite The Pickle Yard, SBH Officers
                    Colony, Mega Hills, Madhapur, Hyderabad,
                    Telangana 500081
                  </p>

                  <button
                    className="contact-info-link"
                    onClick={openMaps}
                  >
                    Open in Maps
                    <ExternalLink size={14} />
                  </button>

                </div>

              </div>
              <div
                className="contact-info-card contact-clickable-card"
                onClick={callUs}
              >

                <div className="contact-info-icon blue">
                  <Phone size={21} />
                </div>

                <div>

                  <h3>Call Us</h3>

                  <a
                    href="tel:+919676507387"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +91 9676507387
                  </a>

                  <p>
                    Mon–Fri, 9 AM – 7 PM IST
                  </p>

                </div>

              </div>

              <div className="contact-info-card">

                <div className="contact-info-icon whatsapp">
                  <MessageCircle size={21} />
                </div>

                <div className="contact-whatsapp-content">

                  <h3>WhatsApp Us</h3>

                  <p>
                    Chat with us for quick assistance
                  </p>

                  <button
                    className="contact-whatsapp-btn"
                    onClick={whatsappUs}
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </button>

                </div>

              </div>

              <div
                className="contact-info-card contact-clickable-card"
                onClick={emailUs}
              >

                <div className="contact-info-icon indigo">
                  <Mail size={21} />
                </div>

                <div>

                  <h3>Email Us</h3>

                  <a
                    href="mailto:info@txpathwing.com"
                    onClick={(e) => e.stopPropagation()}
                  >
                    info@txpathwing.com
                  </a>

                  <p>
                    We'll respond within 24 hours.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="contact-map-section">

        <div className="contact-content-wrapper">

          <div className="contact-map-grid">

            <div className="contact-map-wrapper">

              <div className="contact-map-topbar">

                <div>
                  <span className="map-status-dot" />
                  Madhapur Hub · 17.447° N, 78.3882° E
                </div>

                <button onClick={openMaps}>
                  Full Map
                  <ExternalLink size={14} />
                </button>

              </div>


              <div className="contact-map-image-container">

                <iframe
                  title="TX Pathwing Hyderabad Campus Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    campusAddress
                  )}&output=embed`}
                  className="contact-google-map"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />


                <div className="contact-map-location-card">

                  <div className="contact-map-location-icon">
                    <MapPin size={19} />
                  </div>

                  <div>

                    <strong>
                      TX Pathwing Learning Campus
                    </strong>

                    <span>
                      Opposite The Pickle Yard, Madhapur
                    </span>

                  </div>

                  <button onClick={openMaps}>
                    Directions
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            </div>

            <div className="contact-location-content">

              <span className="contact-section-label">
                <MapPin size={14} />
                Visit Our Campus
              </span>

              <h2>
                Come See Where
                <br />

                <span className="contact-title-gradient">
                  Your Journey Begins
                </span>
              </h2>

              <p>
                Our Hyderabad campus is designed to give you an
                immersive learning experience, with modern
                facilities and expert guidance.
              </p>


              <div className="contact-location-features">

                <div className="contact-location-feature">

                  <Train size={20} />

                  <div>
                    <strong>5–7 min from Metro</strong>
                    <span>Durgam Cheruvu / HITEC City</span>
                  </div>

                </div>


                <div className="contact-location-feature">

                  <Car size={20} />

                  <div>
                    <strong>Visitor Parking</strong>
                    <span>2 & 4 wheeler parking</span>
                  </div>

                </div>


                <div className="contact-location-feature">

                  <Building2 size={20} />

                  <div>
                    <strong>3rd Floor</strong>
                    <span>TX Pathwing Learning Campus</span>
                  </div>

                </div>


                <div className="contact-location-feature">

                  <Clock size={20} />

                  <div>
                    <strong>Mon–Sat · 9 AM – 7 PM</strong>
                    <span>Campus visiting hours</span>
                  </div>

                </div>

              </div>


              <div className="contact-location-buttons">

                <button
                  className="contact-location-primary"
                  onClick={openMaps}
                >
                  Get Directions
                  <ExternalLink size={16} />
                </button>


                <button
                  className="contact-location-secondary"
                  onClick={copyAddress}
                >

                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Address
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="contact-faq-section">

        <div className="contact-content-wrapper">

          <div className="contact-faq-header">

            <span className="contact-section-label">
              <Sparkles size={14} />
              Quick Answers
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Everything you need to know before reaching out
              or visiting.
            </p>

          </div>


          <div className="contact-faq-grid">

            {faqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className={`contact-faq-item ${
                    isOpen ? "active" : ""
                  }`}
                >

                  <button
                    className="contact-faq-question"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                  >
                    <span>
                      {faq.question}
                    </span>
                    <span className="contact-faq-icon">
                      <ChevronDown
                        size={18}
                        className={isOpen ? "rotate" : ""}
                      />
                    </span>
                  </button>
                  <div
                    className={`contact-faq-answer ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <p>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="contact-final-cta">
        <div className="contact-final-cta-content">
          <div className="contact-final-cta-icon">
            <Send size={25} />
          </div>
          <div>
            <span>
              Still have questions?
            </span>
            <h2>
              Let's talk about your future.
            </h2>
            <p>
              Our mentors are ready to help you choose
              the right learning path.
            </p>
          </div>
          <div className="contact-final-cta-buttons">
            <button
              className="contact-final-cta-primary"
              onClick={whatsappUs}
            >
              Talk to a Mentor
              <ArrowRight size={17} />
            </button>
            <button
              className="contact-final-cta-secondary"
              onClick={whatsappUs}
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Contact;