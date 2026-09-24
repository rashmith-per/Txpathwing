import React from "react";
import "./ContactStudentForm.css";

const StudentForm = ({ onSuccess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your API submission here

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>

      <div className="student-form-grid">

        <div className="student-field">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="student-field">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="student-field">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="student-field">
          <label>Course</label>

          <select defaultValue="" required>
            <option value="" disabled>
              Select your course
            </option>

            <option>Java</option>
            <option>Python</option>
            <option>React</option>
            <option>Full Stack Development</option>
            <option>Testing</option>
            <option>Data Science</option>
            <option>AI / ML</option>
            <option>DevOps</option>
          </select>
        </div>

      </div>


      <div className="student-address">

        <div className="student-section-title">
        </div>

        <div className="student-form-grid">

          <div className="student-field">
            <label>Instution Name</label>
            <input
              type="text"
              placeholder="Instution Name"
            />
          </div>

          <div className="student-field">
            <label>Streem</label>
            <input
              type="text"
              placeholder="Enter Your Streem"
            />
          </div>

          <div className="student-field">
            <label>Pass Out Year</label>
            <input
              type="text"
              placeholder="Pass Out year"
            />
          </div>

          <div className="student-field">
            <label>CGPA/Parsentage</label>
            <input
              type="text"
              placeholder="CGPA/Parsentage"
            />
          </div>

        </div>

      </div>


      <div className="student-form-footer">

        <button
          type="submit"
          className="student-submit"
        >
          Submit
        </button>

      </div>

    </form>
  );
};

export default StudentForm;