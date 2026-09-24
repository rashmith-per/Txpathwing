import React from "react";
import "./ContactCompanyForm.css";

const CompanyForm = ({ onSuccess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Add API submission here later
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="company-form" onSubmit={handleSubmit}>
      <div className="company-form-grid">

        {/* Company Name */}
        <div className="company-field">
          <label htmlFor="company-name">Company Name</label>
          <input
            id="company-name"
            type="text"
            name="companyName"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Contact Person */}
        <div className="company-field">
          <label htmlFor="company-contact">Contact Person</label>
          <input
            id="company-contact"
            type="text"
            name="contactPerson"
            placeholder="Enter contact person"
            required
          />
        </div>

        {/* Email */}
        <div className="company-field">
          <label htmlFor="company-email">Email Address</label>
          <input
            id="company-email"
            type="email"
            name="email"
            placeholder="Enter company email"
            required
          />
        </div>

        {/* Phone */}
        <div className="company-field">
          <label htmlFor="company-phone">Phone Number</label>
          <input
            id="company-phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Industry */}
        <div className="company-field">
          <label htmlFor="company-industry">Industry</label>
          <select
            id="company-industry"
            name="industry"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select industry
            </option>
            <option value="it">IT / Software</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Website */}
        <div className="company-field">
          <label htmlFor="company-website">Website</label>
          <input
            id="company-website"
            type="url"
            name="website"
            placeholder="https://example.com"
          />
        </div>

        {/* Purpose */}
        <div className="company-field">
          <label htmlFor="company-purpose">Purpose of Enquiry</label>
          <select
            id="company-purpose"
            name="purpose"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select purpose
            </option>
            <option value="hiring">Hiring / Recruitment</option>
            <option value="internship">Internship Opportunities</option>
            <option value="training">Employee Training</option>
            <option value="partnership">Business Partnership</option>
            <option value="collaboration">Industry Collaboration</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* House / Office */}
        <div className="company-field">
          <label htmlFor="company-house">House / Office No.</label>
          <input
            id="company-house"
            type="text"
            name="houseNumber"
            placeholder="Enter house / office number"
          />
        </div>

        {/* Area */}
        <div className="company-field">
          <label htmlFor="company-area">Area</label>
          <input
            id="company-area"
            type="text"
            name="area"
            placeholder="Enter area"
          />
        </div>

        {/* Landmark */}
        <div className="company-field">
          <label htmlFor="company-landmark">Landmark</label>
          <input
            id="company-landmark"
            type="text"
            name="landmark"
            placeholder="Enter landmark"
          />
        </div>

        {/* District */}
        <div className="company-field">
          <label htmlFor="company-district">District</label>
          <input
            id="company-district"
            type="text"
            name="district"
            placeholder="Enter district"
          />
        </div>

        {/* State */}
        <div className="company-field">
          <label htmlFor="company-state">State</label>
          <input
            id="company-state"
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>

      </div>

      <div className="company-form-footer">
        <button type="submit" className="company-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;