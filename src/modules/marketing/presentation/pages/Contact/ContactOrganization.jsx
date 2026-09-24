import React from "react";
import "./ContactOrganization.css";

const OrganizationForm = ({ onSuccess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Add API submission here later
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="organization-form" onSubmit={handleSubmit}>
      <div className="organization-form-grid">

        {/* Organization Name */}
        <div className="organization-field">
          <label htmlFor="organization-name">
            Organization Name
          </label>
          <input
            id="organization-name"
            type="text"
            name="organizationName"
            placeholder="Enter organization name"
            required
          />
        </div>

        {/* Contact Person */}
        <div className="organization-field">
          <label htmlFor="organization-contact">
            Contact Person
          </label>
          <input
            id="organization-contact"
            type="text"
            name="contactPerson"
            placeholder="Enter contact person"
            required
          />
        </div>

        {/* Email */}
        <div className="organization-field">
          <label htmlFor="organization-email">
            Email Address
          </label>
          <input
            id="organization-email"
            type="email"
            name="email"
            placeholder="Enter organization email"
            required
          />
        </div>

        {/* Phone */}
        <div className="organization-field">
          <label htmlFor="organization-phone">
            Phone Number
          </label>
          <input
            id="organization-phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Organization Type */}
        <div className="organization-field">
          <label htmlFor="organization-type">
            Organization Type
          </label>
          <select
            id="organization-type"
            name="organizationType"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select organization type
            </option>
            <option value="college">College</option>
            <option value="university">University</option>
            <option value="training-institute">
              Training Institute
            </option>
            <option value="educational-organization">
              Educational Organization
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Website */}
        <div className="organization-field">
          <label htmlFor="organization-website">
            Website
          </label>
          <input
            id="organization-website"
            type="url"
            name="website"
            placeholder="https://example.com"
          />
        </div>

        {/* Purpose */}
        <div className="organization-field">
          <label htmlFor="organization-purpose">
            Purpose of Enquiry
          </label>
          <select
            id="organization-purpose"
            name="purpose"
            defaultValue=""
            required
          >
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
            <option value="collaboration">
              Academic Collaboration
            </option>
            <option value="other">
              Other
            </option>
          </select>
        </div>

        {/* House / Office */}
        <div className="organization-field">
          <label htmlFor="organization-house">
            House / Office No.
          </label>
          <input
            id="organization-house"
            type="text"
            name="houseNumber"
            placeholder="Enter house / office number"
          />
        </div>

        {/* Area */}
        <div className="organization-field">
          <label htmlFor="organization-area">
            Area
          </label>
          <input
            id="organization-area"
            type="text"
            name="area"
            placeholder="Enter area"
          />
        </div>

        {/* Landmark */}
        <div className="organization-field">
          <label htmlFor="organization-landmark">
            Landmark
          </label>
          <input
            id="organization-landmark"
            type="text"
            name="landmark"
            placeholder="Enter landmark"
          />
        </div>

        {/* District */}
        <div className="organization-field">
          <label htmlFor="organization-district">
            District
          </label>
          <input
            id="organization-district"
            type="text"
            name="district"
            placeholder="Enter district"
          />
        </div>

        {/* State */}
        <div className="organization-field">
          <label htmlFor="organization-state">
            State
          </label>
          <input
            id="organization-state"
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>

      </div>

      <div className="organization-form-footer">
        <button type="submit" className="organization-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrganizationForm;