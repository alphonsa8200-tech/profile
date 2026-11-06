# Alphonsa Jaison — Personal Portfolio Website

A modern, high-performance, responsive personal portfolio website for **Alphonsa Jaison**, Computer Science & Engineering student and aspiring Full Stack Developer from Kerala, India.

Built with **Vite**, **React**, **Tailwind CSS**, and **Framer Motion**, adhering to a custom-designed, minimal, and elegant light-theme aesthetic.

---

## 🎨 Design Philosophy & Brand Identity

- **Theme:** Premium, modern, minimal light-theme interface with an editorial touch.
- **Palette:**
  - Main Background: `#FAFAF8`
  - Secondary Background: `#F3F5F7`
  - Primary Text: `#171717`
  - Secondary Text: `#737373`
  - Accent Color: `#4263EB` (Indigo / Royal Blue)
  - Card Background: `#FFFFFF`
  - Border: `#E8E8E8`
- **Typography:** Plus Jakarta Sans, Inter, Manrope.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will run locally at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory ready for deployment on Vercel, Netlify, or GitHub Pages.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   └── favicon.svg           # Custom AJ monogram SVG favicon
├── src/
│   ├── assets/
│   │   ├── documents/        # Place your Alphonsa_Jaison_Resume.pdf here
│   │   ├── icons/            # Additional custom SVGs / icons
│   │   └── images/           # Profile photos and project preview screenshots
│   ├── components/
│   │   ├── Button.jsx        # Polymorphic, accessible button component
│   │   ├── Footer.jsx        # Brand footer with navigation and back-to-top
│   │   ├── Navbar.jsx        # Sticky glassmorphism header with active spy
│   │   ├── ProjectCard.jsx   # Interactive project showcase card
│   │   ├── ProjectModal.jsx  # Detailed dialog for deep project view
│   │   ├── ResumeModal.jsx   # Candidate resume viewer and download modal
│   │   ├── SectionHeading.jsx# Consistent typographic section headers
│   │   ├── SkillCard.jsx     # Categorized skill cards with levels
│   │   └── SocialLinks.jsx   # Accessible GitHub, LinkedIn & Email links
│   ├── data/
│   │   └── portfolio.js      # ★ Centralized data configuration file
│   ├── sections/
│   │   ├── Hero.jsx          # Hero section with headline, badges & editorial card
│   │   ├── About.jsx         # "Beyond the Code" narrative & 4 strength cards
│   │   ├── Skills.jsx        # "My Technical Toolkit" across 6 disciplines
│   │   ├── Projects.jsx      # "Things I've Built" responsive showcase
│   │   ├── Education.jsx     # "My Academic Journey" vertical timeline
│   │   ├── Achievements.jsx  # "Learning Beyond the Classroom" credentials
│   │   └── Contact.jsx       # Interactive contact form & direct reach-out
│   ├── App.jsx               # Main application layout
│   ├── index.css             # Tailwind base styles and custom utilities
│   └── main.jsx              # React DOM entry point
├── index.html                # SEO meta tags, Open Graph & Google Fonts
├── tailwind.config.js        # Design tokens, custom colors, animations
└── vite.config.js            # Vite bundler configuration
```

---

## ⚙️ How to Personalize Your Portfolio

All personal data is centralized in **`src/data/portfolio.js`**. You do not need to hunt through individual JSX components to update your information:

1. **Personal Information:** Edit `personalInfo` in `src/data/portfolio.js` to update social links (GitHub, LinkedIn), tagline, location, or email.
2. **Technical Skills:** Modify `skillCategories` to adjust your programming languages, frontend/backend tools, or design stacks.
3. **Projects:** Update `projectsData` with your real repository links, live demos, and project screenshots.
4. **Academics & College:** Fill in your college name, graduation year, and GPA/marks in `educationData`.
5. **Certifications:** Update `achievementsData` with your earned certificates, hackathon titles, or workshop completions.
6. **Resume:** Add your official PDF file to `src/assets/documents/Alphonsa_Jaison_Resume.pdf`.

---

## 🌐 Deployment Options

- **Vercel:** Connect your GitHub repo and select Vite default settings (Build command: `npm run build`, Output directory: `dist`).
- **Netlify:** Drag and drop the `dist/` folder or link your repository.
- **GitHub Pages:** Use `gh-pages` or a GitHub Action to deploy the `dist/` directory.

---
Crafted with curiosity & care for **Alphonsa Jaison**.
