import React, { useState } from "react";
import { X } from "lucide-react";
import "./ContactForm.css";

import StudentForm from "./ContactStudentForm";
import CompanyForm from "./ContactCompanyForm";
import OrganizationForm from "./ContactOrganization";

const ContactForm = () => {
  const [selectedType, setSelectedType] = useState(null);

  const openForm = (type) => {
    setSelectedType(type);
  };

  const closeForm = () => {
    setSelectedType(null);
  };

  return (
    <section className="contact-section">


      <div className="contact-heading">

        <span className="section-label">
          ENQUIRY
        </span>

        <h2>
        
        Choose your field

        </h2>

        <p>
          Select the option that best describes you
          and fill out the relevant enquiry form.
        </p>

      </div>



      <div className="inquiry-options">

        {/* Student */}

        <button
          type="button"
          className="inquiry-option"
          onClick={() => openForm("student")}
        >
          <span className="inquiry-radio">
            <span className="inquiry-radio-dot"></span>
          </span>

          <span className="inquiry-content">
            <strong>Student</strong>

            <small>
              Course, training or career enquiry
            </small>
          </span>

          <span className="inquiry-arrow">
            →
          </span>
        </button>

        {/* Organization */}

        <button
          type="button"
          className="inquiry-option"
          onClick={() => openForm("organization")}
        >
          <span className="inquiry-radio">
            <span className="inquiry-radio-dot"></span>
          </span>

          <span className="inquiry-content">
            <strong>Organization</strong>

            <small>
              Partnership, placement or collaboration
            </small>
          </span>

          <span className="inquiry-arrow">
            →
          </span>
        </button>


        {/* Company */}

        <button
          type="button"
          className="inquiry-option"
          onClick={() => openForm("company")}
        >
          <span className="inquiry-radio">
            <span className="inquiry-radio-dot"></span>
          </span>

          <span className="inquiry-content">
            <strong>Company</strong>

            <small>
              Hiring, training or business enquiry
            </small>
          </span>

          <span className="inquiry-arrow">
            →
          </span>
        </button>

      </div>


      {/* ================================
          Popup
      ================================= */}

      {selectedType && (
        <div
          className="contact-modal-overlay"
          onMouseDown={closeForm}
        >

          <div
            className="contact-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="contact-modal-header">

              <div>

                <span className="modal-label">
                  {selectedType === "student" && "STUDENT ENQUIRY"}

                  {selectedType === "organization" &&"ORGANIZATION ENQUIRY"}

                  {selectedType === "company" && "COMPANY ENQUIRY"}

                 
                </span>

                <h3>
                  {selectedType === "student" && "Student Enquiry"}

                  {selectedType === "organization" &&"Organization Enquiry"}

                  {selectedType === "company" && "Company Enquiry"}

                  
                </h3>

                <p>
                  Please provide your details and we will
                  get back to you.
                </p>

              </div>


              <button
                type="button"
                className="modal-close-button"
                onClick={closeForm}
                aria-label="Close form"
              >
                <X size={20} />
              </button>

            </div>


            {/* Modal Form */}

            <div className="contact-modal-body">

              {selectedType === "student" && (
                <StudentForm onSuccess={closeForm} />
              )}

              {selectedType === "company" && (
                <CompanyForm onSuccess={closeForm} />
              )}

              {selectedType === "organization" && (
                <OrganizationForm onSuccess={closeForm} />
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default ContactForm;