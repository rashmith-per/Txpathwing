import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const faqData = [
  {
    question: "Is this an LMS or a marketplace?",
    answer:
      "Both, and that is the point. The LMS runs the delivery — courses, cohorts, assessments, certificates. The marketplace runs the commerce — catalogue, pricing, payment, revenue split. A college can use the LMS on its own tenant and never touch the public catalogue; an independent instructor can use only the marketplace.",
  },
  {
    question: "How is a certificate actually verified?",
    answer:
      "Each certificate is issued with a unique ID and a QR pointing at a public verification URL. The page resolves the ID to the course, completion date, the assessment score and the issuing tenant. Certificates can carry an expiry where the programme requires recertification.",
  },
  {
    question: "What stops course videos being downloaded and resold?",
    answer:
      "Video is delivered through DRM with short-lived tokenised URLs generated per session after an authorisation check, and a dynamic watermark carrying the viewer's email is composited over playback. Basic screen-recording deterrence is applied. No unprotected source file is exposed at any point.",
  },
  {
    question: "Can an institution keep its own branding and domain?",
    answer:
      "Yes. Tenant onboarding provisions a data boundary, an admin account, custom branding and a custom domain. Students see the institution's identity; the platform runs underneath.",
  },
  {
    question: "How does payment and revenue sharing work?",
    answer:
      "Checkout runs through Razorpay or Stripe. On webhook confirmation the enrolment activates, a GST-compliant invoice is generated, and the revenue split between platform and instructor is recorded against the transaction. Refunds reverse the split on the same record.",
  },
  {
    question: "Is proctoring going to fail honest students?",
    answer:
      "No — proctoring produces flags, not verdicts. Face-presence gaps, additional people in frame, tab switches and audio anomalies are timestamped into an incident report attached to the attempt. A human evaluator reviews anything flagged before a result is withheld.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        
        <div className="faq-header">
          <p className="faq-tag">
            Common Questions
          </p>
          <h2 className="faq-title">
            Before you ask sales
          </h2>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-item"
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question-row">
                <h3 className="faq-question-text">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`faq-chevron ${
                    openIndex === index ? "open" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="faq-answer-text">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
