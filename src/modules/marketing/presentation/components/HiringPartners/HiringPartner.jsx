import React from "react";
import "./HiringPartners.css";
 

import infosysLogo from "../assets/infosys.png";
import wiproLogo from "../assets/wipro.png";
import googleLogo from "../assets/google.png";
import amazonLogo from "../assets/amazon.png";
import techMahindraLogo from "../assets/techmahindra.png";
import zohoLogo from "../assets/zoho.png";
import cyientLogo from "../assets/cyient.png";
import qualcommLogo from "../assets/qualcomm.png";
import darwinboxLogo from "../assets/darwinbox.png";
import freshworksLogo from "../assets/freshworks.png";
import valuelabsLogo from "../assets/valuelabs.png";
import oracleLogo from "../assets/oracle.png";
import microsoftLogo from "../assets/microsoft.png";
 
const row1 = [
  { name: "Infosys", src: infosysLogo },
  { name: "Wipro", src: wiproLogo },
  { name: "Google", src: googleLogo },
  { name: "Amazon", src: amazonLogo },
  { name: "Tech Mahindra", src: techMahindraLogo },
  { name: "Zoho", src: zohoLogo },
  { name: "Cyient", src: cyientLogo },
];
 
const row2 = [
  { name: "Qualcomm", src: qualcommLogo },
  { name: "Darwinbox", src: darwinboxLogo },
  { name: "Freshworks", src: freshworksLogo },
  { name: "ValueLabs", src: valuelabsLogo },
  { name: "Oracle", src: oracleLogo },
  { name: "Microsoft", src: microsoftLogo },
];
 
const HiringPartners = () => {
  // Triple for seamless infinite scroll
  const row1Triple = [...row1, ...row1, ...row1];
  const row2Triple = [...row2, ...row2, ...row2];
 
  return (
    <section className="hiring-section">
      <div className="hiring-bg" />
 
      <div className="hiring-container">
        {/* Badge */}
        <div className="hiring-badge">
          <span className="green-dot" />
          HIRING PARTNERS ON THE PLACEMENT NETWORK
        </div>
 
        {/* Heading - exact as you wanted */}
        <h2 className="hiring-heading">
          Trusted by teams who <span className="gradient-text">hire for skill</span>
        </h2>
 
        <p className="hiring-subtitle">
          Trusted by fast-growing startups and Fortune 500s — interviews every week
        </p>
 
        {/* Row 1 - Scroll LEFT */}
        <div className="marquee-wrapper">
          <div className="marquee marquee-left">
            {row1Triple.map((logo, i) => (
              <div key={`r1-${i}`} className="logo-item">
                <img src={logo.src} alt={logo.name} className="logo-img" />
              </div>
            ))}
          </div>
        </div>
 
        {/* Row 2 - Scroll RIGHT */}
        <div className="marquee-wrapper">
          <div className="marquee marquee-right">
            {row2Triple.map((logo, i) => (
              <div key={`r2-${i}`} className="logo-item">
                <img src={logo.src} alt={logo.name} className="logo-img" />
              </div>
            ))}
          </div>
        </div>
 
        <div className="hiring-footer">
          13+ ACTIVE HIRING PARTNERS • UPDATED WEEKLY
        </div>
      </div>
    </section>
  );
};
 
export default HiringPartners;
 
 