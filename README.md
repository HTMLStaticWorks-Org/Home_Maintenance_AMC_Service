# VestaCare Home AMC — Premium Residential Maintenance Website Template

A complete, responsive, ThemeForest & Creative Market standard HTML5/CSS3/JS website template built for **Residential Annual Maintenance Contract (AMC) Service Providers**.

---

## 1. Project Overview & Included Pages

This template is engineered around clarity, trust, preventive property care, customer portal convenience, and high-converting AMC quote enquiries.

| Page | File | Purpose & Key Sections |
| :--- | :--- | :--- |
| **Home 1 (Classic AMC)** | `index.html` | Primary value proposition hero, 7 covered maintenance categories with distinct relatable imagery, 4-step AMC onboarding journey, 3-tier sample INR pricing preview, Why Choose Us, 3-stage service request workflow, labelled sample testimonials, FAQ accordion, and CTA banner. |
| **Home 2 (Editorial & Interactive)** | `home-2.html` | Distinct editorial split hero with live **Interactive AMC Plan Finder**, 6-tab **Interactive Technical Trade Explorer**, **Q1–Q4 Seasonal Preventive Maintenance Timeline**, Included vs. Billed Separately comparison cards, and horizontal plan summary. |
| **About Company** | `about.html` | Centered uniform hero, company profile, mission & service philosophy, 4-pillar preventive maintenance methodology, quality & safety commitments, and 4 editable sample technician/team profiles. |
| **Services Catalogue** | `services.html` | Centered uniform hero, interactive category filter bar, and detailed scope breakdown for **Electrical**, **Plumbing**, **AC Maintenance**, **Carpentry**, **Painting & Civil**, and **General Home Inspections**, contrasting AMC-covered labour vs. separately chargeable work. |
| **AMC Plans & Pricing** | `amc-plans.html` | Centered uniform hero, **Basic Care**, **Standard Care**, and **Premium Care** cards with property-scale switcher, sample INR pricing, visit allowances, coverage limits, exclusions, a 14-row responsive side-by-side comparison matrix, and contract FAQs. |
| **Contact & Quote Desk** | `contact.html` | Centered uniform hero, direct phone/email channels, WhatsApp consultation trigger, social media links, embedded interactive map, and a validated **AMC Quote Enquiry Form** with URL parameter pre-filling (`?plan=...&service=...`). |
| **Customer Dashboard** | `dashboard.html` | Full-height left sidebar (`top: 0` to `bottom: 0`) with pinned **Logout** button, active AMC plan details & allowance counters, interactive **Schedule a Service Visit** booking form, upcoming/past visits table, and **Contract Renewal / Upgrade** module. |
| **Customer Login** | `login.html` | Standalone centered authentication card (no navbar/footer) with top-center brand logo & name, single-line inputs, password show/hide toggle, Forgot Password recovery box, and **Google & Apple** social login buttons. |
| **Customer Sign Up** | `signup.html` | Standalone centered registration card (no navbar/footer) with top-center brand logo & name, separate-line inputs (Full Name, Email, Phone, Password + strength meter, Confirm Password, Property Type, City, Consent), and **Google & Apple** social sign-up buttons. |

---

## 2. Folder Structure

```text
Home_Maintenance_AMC_Service/
├── index.html                  # Home 1 — Classic AMC Homepage
├── home-2.html                 # Home 2 — Editorial & Interactive Homepage
├── about.html                  # Company Profile & Sample Team
├── services.html               # Detailed Service Catalogue
├── amc-plans.html              # Pricing Tiers & Side-by-Side Comparison Matrix
├── contact.html                # AMC Quote Enquiry Form, Social Links & Interactive Map
├── dashboard.html              # Customer Dashboard (Plan Details, Schedule Visits, Renewals)
├── login.html                  # Standalone Customer Login Card
├── signup.html                 # Standalone Customer Registration Card
├── README.md                   # Customization & Technical Documentation
└── assets/
    ├── css/
    │   └── styles.css          # Design System, Light/Dark & RTL Support, Responsive Tablet/1024px Grid Rules
    ├── js/
    │   └── main.js             # Theme & RTL Toggles, Dropdowns, Mobile Menu, Tabs, Estimator, Forms & Dashboard
    └── images/
        ├── favicon.svg         # Exact Brand Icon Favicon
        ├── hero-home1.jpg      # Home 1 Hero — Technician inspecting residential electrical panel
        ├── hero-home2.jpg      # Home 2 Hero — Modern apartment interior & split AC maintenance
        └── service-*.jpg       # Local fallback service photography
```

---

## 3. Customization Guide

### A. Brand Colors, Light Mode White Footer & Dark Mode (`assets/css/styles.css`)
All visual tokens are centralized inside `:root` and `[data-theme="dark"]` at the top of `assets/css/styles.css`:
- In Light Mode, `--bg-footer` is set to `#FFFFFF` with high-contrast navy headings and social icon hover animations.
- In Dark Mode (`[data-theme="dark"]`), `--bg-footer` switches to `--navy-950` (`#091322`).
- Clicking the **RTL** button in the navbar toggles `dir="rtl"` / `dir="ltr"` across the entire layout and persists via `localStorage`.
