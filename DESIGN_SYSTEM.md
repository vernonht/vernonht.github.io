# Figma MCP Design System Rules

This document defines design system rules and integration guidelines for syncing Figma designs with the portfolio landing page codebase using Model Context Protocol (MCP).

---

## 1. Design Token Definitions

### Color Palette

All colors are defined as CSS custom properties in `src/index.css`:

#### Light Theme

```css
--color-primary: #780000; /* Dark red - primary action color */
--color-primary-dark: #4b0000; /* Darker red - hover states */
--color-text: #1f2937; /* Dark gray - primary text */
--color-text-light: #6b7280; /* Medium gray - secondary text */
--color-bg: #ffffff; /* White - background */
--color-bg-alt: #f9fafb; /* Light gray - alternate backgrounds */
--color-border: #e5e7eb; /* Light border color */
```

#### Dark Theme

```css
--color-primary: #c1121f; /* Bright red - primary action */
--color-primary-dark: #780000; /* Dark red - hover states */
--color-text: #f9fafb; /* Off-white - primary text */
--color-text-light: #9ca3af; /* Light gray - secondary text */
--color-bg: #111827; /* Dark background */
--color-bg-alt: #1f2937; /* Darker gray - alternate backgrounds */
--color-border: #374151; /* Dark border color */
```

#### Usage in Figma

- Map all design colors to these CSS variables
- Use light theme colors as default in Figma mockups
- Indicate dark theme variants for key components
- Document color contrast ratios for accessibility (WCAG AA minimum: 4.5:1)

### Typography

**Font Family**: System stack (Segoe UI, Roboto, Ubuntu fallbacks)

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
```

**Default Line Height**: `1.6`

**Heading Styles** (from CSS):

- `h1`: Default font size from CSS (scales with `.hero h1`)
- `h2`: Section titles
- `h3`: Subsection titles
- `p`: Body text with `line-height: 1.6`

### Spacing Scale

Spacing follows an 8px base unit (0.5rem):

- `0.25rem` (4px) - Extra small gaps
- `0.5rem` (8px) - Small gaps
- `0.75rem` (12px) - Medium gaps
- `1rem` (16px) - Standard gaps
- `1.5rem` (24px) - Large gaps
- `2rem` (32px) - Extra large gaps

---

## 2. Component Library

### Component Structure

Components are located in `src/components/`:

```
src/components/
├── About.tsx        # About section with skills
├── Contact.tsx      # Contact form component
├── Experience.tsx   # Experience/timeline section
├── Footer.tsx       # Footer with links
├── Header.tsx       # Navigation header
├── Hero.tsx         # Hero section with intro
├── Masonry.tsx      # Masonry grid layout
└── Projects.tsx     # Project cards showcase
```

### Component Patterns

#### Pattern 1: Page Sections

All major sections follow this structure:

```tsx
function SectionName() {
  return (
    <section className="section-name">
      <div className="container">{/* Content */}</div>
    </section>
  )
}
```

#### Pattern 2: Animation Integration

Components use the `useScrollFrame` hook for scroll-triggered animations:

```tsx
import { useScrollFrame } from '../hooks/useScrollFrame'

const { frame, fps, ref } = useScrollFrame({ totalFrames: 120 })
// Use frame for animation calculations
```

#### Pattern 3: CSS Class Naming

BEM-inspired naming with section prefixes:

- `.header`, `.header .logo`, `.header-mobile-controls`
- `.hero`, `.hero h1`, `.cta-buttons`
- `.about`, `.skill-categories`
- `.projects`, `.project-card`

### Reusable UI Elements

#### Buttons

```css
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}
```

#### Grid Utils

- `.container`: Max-width 1100px, centered, padding 1.5rem sides
- Flexbox for layouts throughout

---

## 3. Frameworks & Libraries

### Core Stack

- **Framework**: React 19.2.4
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 7.3.1
- **Module**: ESM (type: "module" in package.json)

### Animation Libraries

- **Remotion** (^4.0.434): Keyframe-based animations (`spring`, `interpolate`)
- **AOS** (^2.3.4): Scroll trigger animations via `data-aos` attributes
- **Custom Hook**: `useScrollFrame` - Custom scroll-based animation driver

### Styling Approach

- **CSS**: Vanilla CSS with custom properties (CSS variables)
- **Methodology**: BEM-inspired class naming
- **Philosophy**: No CSS-in-JS, single source of truth in `src/index.css`
- **Theme**: CSS custom properties for light/dark mode support

### Relevant Dependencies

```json
{
  "aos": "^2.3.4",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "remotion": "^4.0.434"
}
```

---

## 4. Asset Management

### Image Storage

- **Public images**: `public/images/external-logo/`
- **Naming convention**: Lowercase, dash-separated (e.g., `oviato.jpg`, `jurifytepro.webp`)
- **Formats**: JPG, WebP, SVG supported
- **Reference in code**: Relative paths from public root
  ```tsx
  imageUrl: '/images/external-logo/oviato.jpg'
  ```

### Asset Optimization

- WebP format preferred for modern browsers
- Images lazy-loaded in `Projects` section
- SVG icons from Font Awesome 6.5.1

### Icon System

- **Icon Library**: Font Awesome 6.5.1 (via CDN in `index.html`)
- **Usage**: `<i className="fas fa-icon-name"></i>`
- **Import**: Link to CDNJS in head

---

## 5. Responsive Design

### Breakpoints

Mobile-first approach with breakpoints defined in `src/index.css`:

```css
/* Mobile: 0px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px+ */
```

Key breakpoints:

- **768px**: Tablet and header responsive adjustments
- **1024px**: Full desktop layout
- **1100px**: Container max-width

### Responsive Patterns

```css
@media (max-width: 768px) {
  .nav {
    gap: 1rem;
  } /* Reduced gap on mobile */
  .header-mobile-controls {
    display: flex;
  } /* Show mobile menu */
}
```

---

## 6. Project Structure

```
portfolio-landing-page/
├── public/
│   └── images/external-logo/     # Project logos
├── src/
│   ├── components/               # React components
│   │   ├── animated/             # Animation wrapper
│   │   └── [section-components]
│   ├── hooks/
│   │   └── useScrollFrame.ts      # Scroll animation hook
│   ├── utils/
│   │   ├── helpers.ts            # Utility functions
│   │   └── gtm.ts                # Google Tag Manager
│   ├── App.tsx                   # Root component
│   ├── index.css                 # Global styles
│   └── main.tsx                  # Entry point
├── index.html                    # HTML template
├── vite.config.ts                # Vite config
└── tsconfig.json                 # TypeScript config
```

---

## 7. Figma to Code Mapping Guidelines

### Adding Code Connect Mappings

When creating new components in Figma:

1. **Component Naming** in Figma should match React component names
   - `Header` → `src/components/Header.tsx`
   - `ProjectCard` → `src/components/Projects.tsx` (subcomponent)

2. **Create Code Connect Link**

   ```javascript
   // Map Figma node to code component
   source: 'src/components/ComponentName.tsx'
   componentName: 'ComponentName'
   label: 'React'
   ```

3. **Document Prop Patterns**

- Pass component props that map to CSS classes, content variants, or AOS attributes

### Design Pattern Rules

- **Sections**: Use full-width `.section-name` class
- **Containers**: Wrap content in `.container` for max-width
- **Animations**: Use `data-aos` attributes or `useScrollFrame` hook
- **Buttons**: Apply `.btn` base + `.btn-primary` or `.btn-secondary`
- **Colors**: Always reference CSS variables, never hardcode hex

### Documentation in Figma

For each component, document:

- Default state
- Hover/active states
- Dark theme variant
- Mobile responsive behavior
- Animation triggers and timing

---

## 8. Animation Guidelines

### Scroll-Triggered Animations

#### Method 1: useScrollFrame Hook

```tsx
const { frame, fps, ref } = useScrollFrame({ totalFrames: 120 })
const springValue = spring({ frame, fps, config: { damping: 20, stiffness: 50 } })
```

**Config options**:

- `smooth`: damping: 20, stiffness: 50, mass: 1
- `snappy`: damping: 15, stiffness: 100

#### Method 2: AOS (Animate On Scroll)

```tsx
<h1 data-aos="fade-up" data-aos-delay="700">
  Title
</h1>
```

**Available animations**: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `zoom`, etc.

**AOS Config** (in `App.tsx`):

```javascript
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false,
  offset: 50,
})
```

### Google Tag Manager Integration

Analytics initialization via `src/utils/gtm.ts`:

- GTM ID: `G-1W1Y24C3JE`
- Track custom events: `trackEvent(eventName, params)`
- Track page views: `trackPageView(path, title)`

---

## 9. Accessibility Considerations

- **Color Contrast**: Maintain WCAG AA (4.5:1 for text)
- **Semantic HTML**: Use proper heading hierarchy (h1 > h2 > h3)
- **ARIA Labels**: Add for icon buttons and navigation
- **Focus States**: All interactive elements have visible focus indicators
- **Responsive Text**: Ensure readability on mobile (min 16px base font)

---

## 10. Performance Optimization

- **Code Splitting**: Components loaded via React
- **Image Optimization**: WebP format, lazy loading
- **CSS Efficiency**: Single CSS file with custom properties
- **Animation Performance**: GPU-accelerated transforms (`transform`, `opacity`)
- **Bundle Size**: Minimal dependencies (Remotion + AOS only)

---

## 11. Version Control

- **Current React**: 19.2.4 (with React 19-compatible types)
- **Node**: Requires 20.19+ or 22.12+
- **Build Output**: `dist/` directory
- **Source Maps**: Generated for development debugging

---

## 12. Design Decisions

1. **CSS-First Approach**: Vanilla CSS preferred over CSS-in-JS for:
   - Simpler maintenance
   - Better performance
   - Easier Figma mapping
2. **Scroll-Driven Animations**: Custom `useScrollFrame` enables:
   - Synchronization with user scroll
   - Smooth easing with Remotion
   - Independent from AOS library

3. **Dual Animation Systems**:
   - `AOS` for simple, declarative animations
   - `useScrollFrame` + Remotion for complex choreography

4. **Theme System**: CSS variables allow:
   - Zero JavaScript overhead
   - Instant theme switching
   - Figma design synchronization

---

## Contributing to Figma Design System

1. **Always sync component naming** between Figma and code
2. **Update CSS variables first** before changing design tokens
3. **Test animations** in both light and dark themes
4. **Document responsive behavior** for all components
5. **Maintain Code Connect links** when components change

---

Generated: March 24, 2026
