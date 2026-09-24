import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import ContactForm from "./ContactForm";

const Organization = () => {
  return (
    <main className="organization-page">

      {/* Hero Section */}
      <section className="organization-hero">
        <div className="organization-hero-content">

          <span className="organization-label">
            LEARNERS, ORGANIZATIONS & COMPANY PATHWAY
          </span>

          <h1>
            Partner with <span>TX Pathwing</span>
          </h1>

          <p>
            Build meaningful connections between your organization,
            emerging talent, and the future of technology.
          </p>

          <div className="organization-hero-actions">

            {/* Goes directly to Organization form */}
            <Link
              to="/contact?type=organization"
              className="primary-action"
            >
              Partner With Us
            </Link>

            {/* Goes directly to Company/Enquiry form */}
            <Link
              to="/contact?type=company"
              className="secondary-action"
            >
              Make an Enquiry
            </Link>

          </div>
        </div>

        <div className="organization-hero-visual">
          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>

          <div className="hero-people-card">

            <div className="hero-person">
              <span>👨‍💻</span>
            </div>

            <div className="hero-person hero-person-middle">
              <span>👩‍💼</span>
            </div>

            <div className="hero-person">
              <span>👨‍🎓</span>
            </div>

            <div className="hero-connection-line"></div>

          </div>

          <div className="hero-floating-card hero-company-card">
            <strong>Companies</strong>
            <span>Industry Connections</span>
          </div>

          <div className="hero-floating-card hero-talent-card">
            <strong>Talent</strong>
            <span>Skilled Learners</span>
          </div>

        </div>
      </section>

      {/* Organization Information */}
      <section className="organization-information">

        <div className="organization-section-heading">

          <span className="organization-section-label">
            WHO WE CONNECT
          </span>

          <h2>
            Connecting Organizations
            <br />
            with <span>Emerging Talent</span>
          </h2>

          <p>
            TX Pathwing creates a bridge between learners, organizations,
            and industry. Organizations can connect with skilled students
            and graduates, participate in training and internship
            initiatives, and explore meaningful opportunities for
            collaboration.
          </p>

        </div>

        <div className="organization-information-grid">

          <article className="information-card">
            <div className="information-icon">01</div>

            <h3>Learners</h3>

            <p>
              Collaborate on industry-oriented learning, training,
              internships, and career opportunities.
            </p>
          </article>

          <article className="information-card">
            <div className="information-icon">02</div>

            <h3>Organizations</h3>

            <p>
              Connect with a growing talent and learning ecosystem
              through meaningful institutional opportunities.
            </p>
          </article>

          <article className="information-card">
            <div className="information-icon">03</div>

            <h3>Companies</h3>

            <p>
              Discover opportunities to engage with emerging
              technology professionals and skilled learners.
            </p>
          </article>

          <article className="information-card">
            <div className="information-icon">04</div>

            <h3>Industry Partners</h3>

            <p>
              Create meaningful training, mentoring, internship,
              and hiring connections.
            </p>
          </article>

        </div>
      </section>

      {/* Institutional Pathway */}
      <section className="institutional-pathway">

        <div className="organization-section-heading centered-heading">

          <span className="organization-section-label">
            INDUSTRIAL PATHWAY
          </span>

          <h2>
            A Pathway from Learning
            <br />
            to <span>Industry</span>
          </h2>

          <p>
            Connect organizations with learners through a structured
            journey from collaboration to real-world industry exposure.
          </p>

        </div>

        <div className="pathway-full">

          <div className="pathway-line"></div>

          <div className="pathway-step">
            <div className="pathway-number">01</div>
            <h3>Organization</h3>
            <p>
              Connect your organization with TX Pathwing.
            </p>
          </div>

          <div className="pathway-step">
            <div className="pathway-number">02</div>
            <h3>Collaboration</h3>
            <p>
              Identify meaningful areas for partnership.
            </p>
          </div>

          <div className="pathway-step">
            <div className="pathway-number">03</div>
            <h3>Training</h3>
            <p>
              Support industry-focused learning initiatives.
            </p>
          </div>

          <div className="pathway-step">
            <div className="pathway-number">04</div>
            <h3>Internship</h3>
            <p>
              Create opportunities for practical exposure.
            </p>
          </div>

          <div className="pathway-step">
            <div className="pathway-number">05</div>
            <h3>Talent</h3>
            <p>
              Connect with developing technology professionals.
            </p>
          </div>

          <div className="pathway-step">
            <div className="pathway-number">06</div>
            <h3>Industry</h3>
            <p>
              Build lasting industry connections.
            </p>
          </div>

        </div>
      </section>

      {/* Contact / Enquiry */}
      <section className="organization-contact" id="enquiry">

        <div className="contact-content">

          <span className="organization-section-label">
            LET'S CONNECT
          </span>

          <h2>
            Let's Build the
            <br />
            <span>Connection</span>
          </h2>

          <p>
            Are you an organization, company, institution, or industry
            professional looking to collaborate with TX Pathwing?
          </p>

          <p>
            Let's explore how we can work together.
          </p>

          <div className="contact-actions">

            {/* General contact */}
            <Link to="/contact?type=student">
              Contact Us
            </Link>

            {/* Organization */}
            <Link to="/contact?type=organization">
              Partner With Us
            </Link>

            {/* Company enquiry */}
            <Link to="/contact?type=company">
              Make an Enquiry
            </Link>

          </div>

        </div>

        <div className="contact-side">

          <div className="contact-side-circle"></div>

          <div className="contact-message-card">

            <span className="contact-message-icon">
              ✦
            </span>

            <h3>
              Have an idea
              <br />
              for collaboration?
            </h3>

            <p>
              Tell us about your organization and let's
              explore the possibilities together.
            </p>

            <Link to="/contact?type=organization">
              Start a Conversation →
            </Link>

          </div>

        </div>

      </section>
      <ContactForm />

    </main>
  );
};

export default Organization;