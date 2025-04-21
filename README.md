# Modern Portfolio Website

A dark-themed, interactive, and responsive personal portfolio website inspired by Rasul Akhundov's design philosophy. This site showcases a modern web development approach with smooth animations, 3D graphics, and immersive user experience.

## Features

- **Responsive Design:** Fully responsive across all device sizes
- **Dark Theme:** Sleek dark design with high contrast elements
- **Smooth Scrolling:** Implemented with Lenis for buttery-smooth scroll experience
- **Animated UI:** GSAP-powered animations triggered on scroll and user interaction
- **3D Graphics:** Three.js integration for interactive background elements
- **Custom Cursor:** Unique cursor that responds dynamically to user interactions
- **Parallax Effects:** Creating depth through varying element movement speeds

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:**
  - GSAP (GreenSock Animation Platform)
  - Framer Motion
- **3D Graphics:** Three.js
- **Smooth Scrolling:** Lenis
  
## Sections

1. **Hero:** Dynamic introduction with animated text and interactive background
2. **About:** Personal overview with scrolling animations
3. **Skills:** Visual representation of technical proficiencies
4. **Projects:** Filterable gallery of selected works
5. **Experience:** Timeline of professional journey
6. **Core Stack:** Showcase of primary technologies
7. **Contact:** Form and personal contact information

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Changing Personal Information

- Edit text content in each component file to reflect your personal information
- Update project showcase in `src/components/ProjectsSection.tsx`
- Modify skills in `src/components/SkillsSection.tsx`
- Change experience details in `src/components/ExperienceSection.tsx`

### Styling

- Core design values are set in `src/app/globals.css`
- Color scheme can be modified in the CSS variables
- Tailwind theme extends these variables in `tailwind.config.ts`

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## Credits

- Design inspiration: [Rasul Akhundov](https://rasulakhundov.com/)
- 3D graphics and animations: Three.js and GSAP
- Smooth scrolling: Lenis

## License

MIT
