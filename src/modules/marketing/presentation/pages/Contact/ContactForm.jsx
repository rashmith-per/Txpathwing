import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ContactForm.css";

const ContactForm = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  // Read ?type=student / organization / company from URL
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");

    if (
      type === "student" ||
      type === "organization" ||
      type === "company"
    ) {
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleContactClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowOptions(false);
  };

  /* =========================
     STUDENT FORM
  ========================= */

  const renderStudentForm = () => (
    <form className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Course</label>

          <select name="course" defaultValue="">
            <option value="" disabled>
              Select your course
            </option>

            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="mern">MERN</option>
            <option value="aws">AWS</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
      </div>

      <div className="address-section">
        <h3>Address</h3>

        <div className="form-row">
          <div className="form-group">
            <label>H.No</label>

            <input
              type="text"
              name="houseNumber"
              placeholder="Enter house number"
            />
          </div>

          <div className="form-group">
            <label>Area</label>

            <input
              type="text"
              name="area"
              placeholder="Enter area"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Landmark</label>

            <input
              type="text"
              name="landmark"
              placeholder="Enter landmark"
            />
          </div>

          <div className="form-group">
            <label>District</label>

            <input
              type="text"
              name="district"
              placeholder="Enter district"
            />
          </div>
        </div>

        <div className="form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );

  /* =========================
     ORGANIZATION FORM
  ========================= */

  const renderOrganizationForm = () => (
    <form className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label>Organization Name</label>

          <input
            type="text"
            name="organizationName"
            placeholder="Enter organization name"
          />
        </div>

        <div className="form-group">
          <label>Contact Person</label>

          <input
            type="text"
            name="contactPerson"
            placeholder="Enter contact person"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter organization email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Organization Type</label>

          <select name="organizationType" defaultValue="">
            <option value="" disabled>
              Select organization type
            </option>

            <option value="college">
              College
            </option>

            <option value="university">
              University
            </option>

            <option value="training-institute">
              Training Institute
            </option>

            <option value="educational-organization">
              Educational Organization
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Website</label>

          <input
            type="url"
            name="website"
            placeholder="Enter website"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Purpose of Enquiry</label>

        <select name="purpose" defaultValue="">
          <option value="" disabled>
            Select purpose
          </option>

          <option value="training">
            Training Collaboration
          </option>

          <option value="internship">
            Internship Program
          </option>

          <option value="placement">
            Placement Collaboration
          </option>

          <option value="partnership">
            Institutional Partnership
          </option>

          <option value="other">
            Other
          </option>
        </select>
      </div>

      <div className="address-section">
        <h3>Address</h3>

        <div className="form-row">
          <div className="form-group">
            <label>H.No</label>

            <input
              type="text"
              name="houseNumber"
              placeholder="Enter house number"
            />
          </div>

          <div className="form-group">
            <label>Area</label>

            <input
              type="text"
              name="area"
              placeholder="Enter area"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Landmark</label>

            <input
              type="text"
              name="landmark"
              placeholder="Enter landmark"
            />
          </div>

          <div className="form-group">
            <label>District</label>

            <input
              type="text"
              name="district"
              placeholder="Enter district"
            />
          </div>
        </div>

        <div className="form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );

  /* =========================
     COMPANY FORM
  ========================= */

  const renderCompanyForm = () => (
    <form className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Contact Person</label>

          <input
            type="text"
            name="contactPerson"
            placeholder="Enter contact person"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter company email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Industry</label>

          <select name="industry" defaultValue="">
            <option value="" disabled>
              Select industry
            </option>

            <option value="it">
              IT / Software
            </option>

            <option value="finance">
              Finance
            </option>

            <option value="education">
              Education
            </option>

            <option value="healthcare">
              Healthcare
            </option>

            <option value="manufacturing">
              Manufacturing
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Website</label>

          <input
            type="url"
            name="website"
            placeholder="Enter website"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Purpose of Enquiry</label>

        <select name="purpose" defaultValue="">
          <option value="" disabled>
            Select purpose
          </option>

          <option value="hiring">
            Hiring / Recruitment
          </option>

          <option value="internship">
            Internship Opportunities
          </option>

          <option value="training">
            Employee Training
          </option>

          <option value="partnership">
            Business Partnership
          </option>

          <option value="collaboration">
            Industry Collaboration
          </option>

          <option value="other">
            Other
          </option>
        </select>
      </div>

      <div className="address-section">
        <h3>Address</h3>

        <div className="form-row">
          <div className="form-group">
            <label>H.No</label>

            <input
              type="text"
              name="houseNumber"
              placeholder="Enter house number"
            />
          </div>

          <div className="form-group">
            <label>Area</label>

            <input
              type="text"
              name="area"
              placeholder="Enter area"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Landmark</label>

            <input
              type="text"
              name="landmark"
              placeholder="Enter landmark"
            />
          </div>

          <div className="form-group">
            <label>District</label>

            <input
              type="text"
              name="district"
              placeholder="Enter district"
            />
          </div>
        </div>

        <div className="form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );

  /* =========================
     MAIN CONTACT SECTION
  ========================= */

  return (
    <section className="contact-section">

      <div className="contact-heading">

        <span className="section-label">
          GET IN TOUCH
        </span>

        <h2>
          Let&apos;s Build
          <br />
          <span>Something Together</span>
        </h2>

        <p>
          Whether you are a student, organization, or company,
          connect with TX Pathwing and explore meaningful
          opportunities.
        </p>

      </div>

      <div className="contact-action">

        <button
          type="button"
          className="contact-button"
          onClick={handleContactClick}
        >
          Contact Us
        </button>

        {showOptions && (
          <div className="contact-options">

            <button
              type="button"
              onClick={() => handleTypeSelect("student")}
            >
              Students
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect("organization")}
            >
              Organization
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect("company")}
            >
              Company
            </button>

          </div>
        )}

      </div>

      {selectedType && (
        <div className="contact-form-area">

          <div className="selected-type">

            <span>CONTACTING AS</span>

            <h3>
              {selectedType === "student" && "Student"}
              {selectedType === "organization" && "Organization"}
              {selectedType === "company" && "Company"}
            </h3>

          </div>

          {selectedType === "student" &&
            renderStudentForm()}

          {selectedType === "organization" &&
            renderOrganizationForm()}

          {selectedType === "company" &&
            renderCompanyForm()}

        </div>
      )}

    </section>
  );
};

export default ContactForm;