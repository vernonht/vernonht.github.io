# Portfolio Landing Page

A modern, animated portfolio landing page built with React, TypeScript, and Vite. Features scroll-based animations powered by Remotion and a responsive design showcasing professional experience and projects.

## Features

- **Smooth Scroll Animations** - Scroll-triggered animations using Remotion for engaging visual transitions
- **Responsive Design** - Fully responsive layout that works across all device sizes
- **Dynamic Experience Calculation** - Automatically calculates years of experience from a start date
- **Component-Based Architecture** - Modular React components for easy maintenance and updates
- **TypeScript Support** - Full type safety across the codebase
- **Modern Tech Stack** - Built with latest versions of React 18, Vite, and related tools

## Project Structure

```
src/
├── components/
│   ├── About.tsx                   # About section
│   ├── Contact.tsx                 # Contact section
│   ├── Experience.tsx              # Experience/timeline section
│   ├── Footer.tsx                  # Footer
│   ├── Header.tsx                  # Navigation header
│   ├── Hero.tsx                    # Hero/landing section
│   ├── Masonry.tsx                 # Highlights/masonry grid
│   └── Projects.tsx                # Projects showcase
├── hooks/
│   └── useScrollFrame.ts           # Custom hook for scroll-based animations
├── utils/
│   └── helper.ts                   # Helpers
├── App.tsx                         # Main app component
├── index.css                       # Global styles
└── main.tsx                        # React DOM entry point
public/
└── images/                         # Static images folder
```

## Tech Stack

- **React 18.3** - UI framework
- **TypeScript 5.5** - Type-safe JavaScript
- **Vite 5.4** - Next-generation frontend toolkit
- **Remotion 4.0** - Motion graphics library for React
- **CSS3** - Modern styling with animations and transitions

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <folder-bane>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build for production (TypeScript check + Vite build)
- **`npm run preview`** - Preview the production build locally

## Key Components

### Hero
The landing section with animated title, subtitle, and call-to-action buttons. Dynamically displays years of experience calculated from May 2017.

### Masonry
Grid layout showcasing key achievements and expertise areas. Includes skills, metrics, and project highlights with staggered animations.

### Experience
Timeline view of professional experience and roles.

### Projects
Showcase of notable projects and contributions.

### Custom Hooks

**`useScrollFrame`** - Provides scroll position awareness for triggering frame-based animations using Remotion's spring physics.

### Utilities

**`calculateYearsOfExperience(year, month, day?)`** - Calculates the number of full years between a start date and today. Used throughout the site to maintain up-to-date experience duration.

## Styling

Global styles are defined in `src/index.css`. The site features:
- Fluid typography
- Responsive grid layouts
- CSS animations and transitions
- Light/dark mode support (if implemented)

## Animation System

Animations are powered by Remotion's spring physics and interpolation:
- Scroll-aware triggers using the `useScrollFrame` hook
- Staggered animations for lists and grids
- Smooth spring configurations for natural motion

## Static Assets

Place images in the `public/images/` folder. They'll be served at `/images/<filename>` in your components:
```tsx
<img src="/images/profile.jpg" alt="Profile" />
```

## Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Bundle and optimize with Vite
3. Output to the `dist/` folder

The production build is ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Performance Optimizations

- Lazy loading of components
- Optimized animations using `will-change` CSS
- Memoized calculations with `useMemo`
- Efficient scroll event handling

## Future Enhancements

- [ ] Add contact form with email integration
- [ ] Implement dark mode toggle
- [ ] Add blog section
- [ ] Integrate with GitHub API for live project data
- [ ] Add i18n for multiple languages

## License

This project is open source and available under the MIT License.

## Author

**Jian Hao** - Full Stack Software Engineer
- 8+ years of experience with modern web technologies
- Expertise in frontend frameworks, backend APIs, and DevOps

---

For questions or feedback, feel free to get in touch through the contact section of the portfolio or open an issue in the repository.
