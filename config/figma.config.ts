// Figma MCP Configuration
// This file provides metadata for Code Connect mappings between Figma designs and React components

export const figmaConfig = {
  projectName: 'Portfolio Landing Page',
  fileKey: '9W4njGh1dj62MaFaEuIOlC',

  // Component mappings from Figma to source code
  componentMappings: {
    Header: {
      source: 'src/components/Header.tsx',
      label: 'React',
      description: 'Navigation header with theme toggle and mobile menu',
    },
    Hero: {
      source: 'src/components/Hero.tsx',
      label: 'React',
      description: 'Hero section with introduction and CTA buttons',
    },
    About: {
      source: 'src/components/About.tsx',
      label: 'React',
      description: 'About section with skill categories',
    },
    Projects: {
      source: 'src/components/Projects.tsx',
      label: 'React',
      description: 'Project showcase with cards',
    },
    Experience: {
      source: 'src/components/Experience.tsx',
      label: 'React',
      description: 'Experience/timeline section',
    },
    Masonry: {
      source: 'src/components/Masonry.tsx',
      label: 'React',
      description: 'Masonry grid layout',
    },
    Footer: {
      source: 'src/components/Footer.tsx',
      label: 'React',
      description: 'Footer with links and information',
    },
  },

  // Design tokens mapping
  designTokens: {
    colors: {
      light: {
        primary: '#780000',
        primaryDark: '#4b0000',
        text: '#1f2937',
        textLight: '#6b7280',
        bg: '#ffffff',
        bgAlt: '#f9fafb',
        border: '#e5e7eb',
      },
      dark: {
        primary: '#c1121f',
        primaryDark: '#780000',
        text: '#f9fafb',
        textLight: '#9ca3af',
        bg: '#111827',
        bgAlt: '#1f2937',
        border: '#374151',
      },
    },
    typography: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      lineHeight: 1.6,
    },
    spacing: {
      xs: '0.25rem', // 4px
      sm: '0.5rem', // 8px
      md: '0.75rem', // 12px
      base: '1rem', // 16px
      lg: '1.5rem', // 24px
      xl: '2rem', // 32px
    },
  },

  // Animation presets
  animations: {
    springSmooth: { damping: 20, stiffness: 50, mass: 1 },
    springSnappy: { damping: 15, stiffness: 100 },
    aosDuration: 800,
    aosEasing: 'ease-in-out',
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    maxWidth: '1100px',
  },

  // Asset paths
  assetPaths: {
    images: '/images/external-logo/',
    icons: 'Font Awesome 6.5.1 (CDN)',
  },

  // Code Connect best practices
  bestPractices: {
    naming: 'Use React component names matching Figma component names',
    styling: 'Reference CSS variables from src/index.css, never hardcode colors',
    animations: 'Use useScrollFrame hook or data-aos attributes for triggers',
    props: 'Document component props that control variants or state',
    accessibility: 'Ensure WCAG AA color contrast (4.5:1 for text)',
  },
}
