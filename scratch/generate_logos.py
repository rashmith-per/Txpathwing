import os

OUTPUT_DIR = r"c:\Users\LENOVO\Desktop\tx_pa\TX\src\assets\cardImages"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Full Stack (React Atom)
full_stack_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <ellipse rx="240" ry="92" fill="none" stroke="#00d8ff" stroke-width="26"/>
    <ellipse rx="240" ry="92" fill="none" stroke="#00d8ff" stroke-width="26" transform="rotate(60)"/>
    <ellipse rx="240" ry="92" fill="none" stroke="#00d8ff" stroke-width="26" transform="rotate(120)"/>
    <circle r="46" fill="#00d8ff"/>
  </g>
</svg>"""

# 2. Python
python_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(175, 175) scale(0.85)">
    <!-- Blue Snake (Top-Left) -->
    <path fill="#3776AB" d="M264.4 0c-132.8 0-124.6 57.6-124.6 57.6l.2 59.7h126.7v18H93.3S0 120.7 0 253.9c0 133.2 81.3 128.8 81.3 128.8h48.5v-68.2s-2.6-81.3 79.9-81.3h125.7s77.3 1.3 77.3-76.1V80.3S419.8 0 264.4 0zm-68.2 39.1a25.2 25.2 0 1 1 0 50.4 25.2 25.2 0 0 1 0-50.4z"/>
    <!-- Yellow Snake (Bottom-Right) -->
    <path fill="#FFD438" d="M265.6 530c132.8 0 124.6-57.6 124.6-57.6l-.2-59.7H263.3v-18h173.4s93.3 14.6 93.3-118.6c0-133.2-81.3-128.8-81.3-128.8h-48.5v68.2s2.6 81.3-79.9 81.3H194.6s-77.3-1.3-77.3 76.1v75.8s-7.1 80.3 148.3 80.3zm68.2-39.1a25.2 25.2 0 1 1 0-50.4 25.2 25.2 0 0 1 0 50.4z"/>
  </g>
</svg>"""

# 3. Java
java_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(190, 140) scale(0.95)">
    <!-- Red steam lines -->
    <path fill="#ea2d2e" d="M250 40c-35 45 30 90-15 130-10 10-25 15-35 15 25-20 40-40 25-65-20-30-50-60 25-80z"/>
    <path fill="#ea2d2e" d="M200 70c-25 35 20 70-10 100-8 8-20 12-28 12 20-15 30-30 20-50-15-25-40-45 18-62z"/>
    <path fill="#ea2d2e" d="M290 85c-20 28 18 55-8 80-6 6-16 10-22 10 15-12 24-24 16-40-12-20-32-36 14-50z"/>
    <!-- Blue cup curves -->
    <path fill="#007396" d="M120 280c40-15 150-15 190 0 10 5 15 15 10 25-15 25-60 45-105 45s-90-20-105-45c-5-10 0-20 10-25zm225 30c-10 60-80 110-135 110-55 0-125-50-135-110h270z"/>
    <!-- Saucer / base curve -->
    <path fill="#007396" d="M90 410c65-20 215-20 280 0 15 5 20 18 10 28-35 32-105 48-150 48s-115-16-150-48c-10-10-5-23 10-28z"/>
    <!-- Bottom stroke -->
    <path fill="#5382a1" d="M140 470c40-8 140-8 180 0 10 2 12 10 5 14-25 16-65 24-95 24s-70-8-95-24c-7-4-5-12 5-14z"/>
  </g>
</svg>"""

# 4. AWS DevOps
aws_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(140, 180) scale(1.0)">
    <!-- AWS Cloud Body -->
    <path fill="#232F3E" d="M410 200c0-66-54-120-120-120-48 0-90 28-109 70-13-7-28-10-44-10-50 0-90 40-90 90 0 6 1 12 2 18-28 11-49 39-49 72 0 44 36 80 80 80h310c55 0 100-45 100-100 0-50-37-92-80-99v-1z"/>
    <!-- AWS Smile Arrow -->
    <path fill="#FF9900" d="M80 340c110 55 240 55 350 0 10-5 18 5 12 13-115 65-260 65-375 0-7-6-1-17 13-13z"/>
    <!-- Arrow Head -->
    <path fill="#FF9900" d="M435 325l25 35-40 10 15-45z"/>
  </g>
</svg>"""

# 5. Kubernetes
k8s_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Outer Blue Wheel -->
    <circle r="250" fill="#326CE5"/>
    <circle r="185" fill="#ffffff"/>
    <circle r="150" fill="#326CE5"/>
    <!-- Hub -->
    <circle r="75" fill="#ffffff"/>
    <circle r="50" fill="#326CE5"/>
    <!-- 7 Spokes -->
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(51.4)"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(102.8)"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(154.2)"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(205.6)"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(257)"/>
    <rect x="-14" y="-235" width="28" height="170" fill="#ffffff" rx="10" transform="rotate(308.4)"/>
  </g>
</svg>"""

# 6. Cloud Security & DevSecOps
security_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Shield Outer -->
    <path fill="#2563eb" d="M0 -250 L200 -170 C200 60 120 200 0 260 C-120 200 -200 60 -200 -170 Z"/>
    <!-- Shield Inner Contrast -->
    <path fill="#1d4ed8" d="M0 -220 L170 -150 C170 45 100 170 0 225 Z"/>
    <path fill="#3b82f6" d="M0 -220 L-170 -150 C-170 45 -100 170 0 225 Z"/>
    <!-- Padlock Body -->
    <rect x="-70" y="-30" width="140" height="110" rx="20" fill="#ffffff"/>
    <!-- Padlock Shackle -->
    <path fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round" d="M-45 -30 V-80 C-45 -115 45 -115 45 -80 V-30"/>
    <!-- Keyhole -->
    <circle cx="0" cy="15" r="14" fill="#2563eb"/>
    <path fill="#2563eb" d="M-6 15 L-10 50 L10 50 L6 15 Z"/>
  </g>
</svg>"""

# 7. Machine Learning with Python
ml_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Synapse Connection Lines -->
    <line x1="-180" y1="-140" x2="-20" y2="-180" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="-140" x2="-20" y2="-40" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="0" x2="-20" y2="-180" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="0" x2="-20" y2="-40" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="0" x2="-20" y2="100" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="140" x2="-20" y2="-40" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="140" x2="-20" y2="100" stroke="#93c5fd" stroke-width="8"/>
    <line x1="-180" y1="140" x2="-20" y2="200" stroke="#93c5fd" stroke-width="8"/>

    <line x1="-20" y1="-180" x2="160" y2="-80" stroke="#38bdf8" stroke-width="8"/>
    <line x1="-20" y1="-40" x2="160" y2="-80" stroke="#38bdf8" stroke-width="8"/>
    <line x1="-20" y1="-40" x2="160" y2="80" stroke="#38bdf8" stroke-width="8"/>
    <line x1="-20" y1="100" x2="160" y2="80" stroke="#38bdf8" stroke-width="8"/>
    <line x1="-20" y1="200" x2="160" y2="80" stroke="#38bdf8" stroke-width="8"/>

    <!-- Layer 1 Nodes (Input) -->
    <circle cx="-180" cy="-140" r="34" fill="#2563eb"/>
    <circle cx="-180" cy="0" r="34" fill="#2563eb"/>
    <circle cx="-180" cy="140" r="34" fill="#2563eb"/>

    <!-- Layer 2 Nodes (Hidden) -->
    <circle cx="-20" cy="-180" r="32" fill="#0284c7"/>
    <circle cx="-20" cy="-40" r="32" fill="#0284c7"/>
    <circle cx="-20" cy="100" r="32" fill="#0284c7"/>
    <circle cx="-20" cy="200" r="32" fill="#0284c7"/>

    <!-- Layer 3 Nodes (Output) -->
    <circle cx="160" cy="-80" r="38" fill="#f59e0b"/>
    <circle cx="160" cy="80" r="38" fill="#f59e0b"/>

    <!-- Central Glowing Core -->
    <circle cx="-20" cy="-40" r="16" fill="#ffffff"/>
  </g>
</svg>"""

# 8. Agentic AI Platform Engineering
agentic_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Circuit Base Badge -->
    <circle r="220" fill="#7c3aed"/>
    <!-- Head Box -->
    <rect x="-140" y="-120" width="280" height="220" rx="55" fill="#ffffff"/>
    <!-- Antenna -->
    <line x1="0" y1="-120" x2="0" y2="-170" stroke="#ffffff" stroke-width="20" stroke-linecap="round"/>
    <circle cx="0" cy="-185" r="24" fill="#06b6d4"/>
    <!-- Glowing Eyes (Visor) -->
    <rect x="-95" y="-55" width="190" height="65" rx="30" fill="#0f172a"/>
    <circle cx="-45" cy="-22" r="18" fill="#06b6d4"/>
    <circle cx="45" cy="-22" r="18" fill="#06b6d4"/>
    <!-- Cheerful Smile -->
    <path d="M-40 45 Q0 75 40 45" fill="none" stroke="#7c3aed" stroke-width="12" stroke-linecap="round"/>
    <!-- Ears -->
    <rect x="-165" y="-30" width="25" height="50" rx="12" fill="#ffffff"/>
    <rect x="140" y="-30" width="25" height="50" rx="12" fill="#ffffff"/>
  </g>
</svg>"""

# 9. SQL & Data Modelling
sql_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Database Cylinder 3 (Bottom) -->
    <path fill="#0284c7" d="M-180 80 C-180 140 180 140 180 80 V150 C180 210 -180 210 -180 150 Z"/>
    <ellipse cx="0" cy="80" rx="180" ry="50" fill="#0369a1"/>
    
    <!-- Database Cylinder 2 (Middle) -->
    <path fill="#0ea5e9" d="M-180 -30 C-180 30 180 30 180 -30 V40 C180 100 -180 100 -180 40 Z"/>
    <ellipse cx="0" cy="-30" rx="180" ry="50" fill="#0284c7"/>

    <!-- Database Cylinder 1 (Top) -->
    <path fill="#38bdf8" d="M-180 -140 C-180 -80 180 -80 180 -140 V-70 C180 -10 -180 -10 -180 -70 Z"/>
    <ellipse cx="0" cy="-140" rx="180" ry="50" fill="#7dd3fc"/>
    <ellipse cx="0" cy="-140" rx="150" ry="38" fill="#e0f2fe"/>
  </g>
</svg>"""

# 10. Selenium Automation Testing
selenium_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Selenium Green Rounded Box -->
    <rect x="-210" y="-210" width="420" height="420" rx="60" fill="#43B02A"/>
    <!-- Big White Checkmark -->
    <path d="M-110 -10 L-30 80 L130 -90" fill="none" stroke="#ffffff" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 'Se' Typography Badge -->
    <text x="-60" y="160" font-family="Arial, sans-serif" font-size="140" font-weight="900" fill="#ffffff">Se</text>
  </g>
</svg>"""

# 11. API & Performance Testing (Postman)
postman_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Postman Orange Circle -->
    <circle r="220" fill="#FF6C37"/>
    <!-- Stylized Spaceman Paper Plane Silhouette -->
    <g fill="#ffffff" transform="scale(1.1) translate(-5, 0)">
      <path d="M-120 -40 L90 -120 L20 70 L-25 15 Z"/>
      <path d="M20 70 L75 125 L90 -120 Z"/>
      <circle cx="-50" cy="-80" r="22"/>
    </g>
  </g>
</svg>"""

# 12. Interview Preparation & Resume Lab
interview_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Briefcase Main Body -->
    <rect x="-200" y="-90" width="400" height="260" rx="35" fill="#1e293b"/>
    <!-- Handle -->
    <path d="M-80 -90 V-155 C-80 -185 80 -185 80 -155 V-90" fill="none" stroke="#0ea5e9" stroke-width="24" stroke-linecap="round"/>
    <!-- Contrast Band -->
    <rect x="-200" y="-10" width="400" height="40" fill="#0ea5e9"/>
    <!-- Gold Star Clasp -->
    <circle cx="0" cy="10" r="45" fill="#f59e0b"/>
    <path fill="#ffffff" d="M0 -15 L4.6 -2.6 L18.4 -2.6 L7.3 5.5 L11.5 18.5 L0 10.4 L-11.5 18.5 L-7.3 5.5 L-18.4 -2.6 L-4.6 -2.6 Z"/>
  </g>
</svg>"""

# 13. Aptitude & Communication
aptitude_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#f8f9fa"/>
  <g transform="translate(400, 400)">
    <!-- Central Brain Gear -->
    <circle r="180" fill="#0d9488"/>
    <!-- Gear Cogs -->
    <g fill="#0d9488">
      <rect x="-25" y="-220" width="50" height="440" rx="15"/>
      <rect x="-25" y="-220" width="50" height="440" rx="15" transform="rotate(45)"/>
      <rect x="-25" y="-220" width="50" height="440" rx="15" transform="rotate(90)"/>
      <rect x="-25" y="-220" width="50" height="440" rx="15" transform="rotate(135)"/>
    </g>
    <!-- White Brain/Dialogue Core -->
    <circle r="130" fill="#ffffff"/>
    <!-- Speech Dialogue Dots -->
    <circle cx="-50" cy="0" r="18" fill="#0d9488"/>
    <circle cx="0" cy="0" r="18" fill="#0d9488"/>
    <circle cx="50" cy="0" r="18" fill="#0d9488"/>
  </g>
</svg>"""

files = {
    "reactLogo.svg": full_stack_svg,
    "pythonLogo.svg": python_svg,
    "javaLogo.svg": java_svg,
    "awsLogo.svg": aws_svg,
    "kubernetesLogo.svg": k8s_svg,
    "cloudSecurityLogo.svg": security_svg,
    "machineLearningLogo.svg": ml_svg,
    "agenticAiLogo.svg": agentic_svg,
    "sqlLogo.svg": sql_svg,
    "seleniumLogo.svg": selenium_svg,
    "postmanLogo.svg": postman_svg,
    "interviewPrepLogo.svg": interview_svg,
    "campusAptitudeLogo.svg": aptitude_svg,
}

for filename, content in files.items():
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"Created: {filename}")
