# Figma Integration Guide

This guide explains how to work with Figma designs using the Model Context Protocol (MCP) in this portfolio project.

## Overview

The portfolio landing page is integrated with Figma via Code Connect mappings. This allows for bidirectional synchronization between design decisions in Figma and implementation in React/TypeScript.

### Related Files
- `DESIGN_SYSTEM.md` - Complete design system documentation
- `config/figma.config.ts` - Figma MCP configuration and component mappings
- `index.html` - Contains capture script for Figma HTML import

---

## Quick Start

### 1. View the Figma Design File
🔗 [Portfolio Landing Page in Figma](https://www.figma.com/design/9W4njGh1dj62MaFaEuIOlC)

### 2. Sync Design Changes to Code

When making design changes in Figma:

1. Update the corresponding CSS variables in `src/index.css`
   ```css
   :root {
     --color-primary: #NEW_COLOR;
     /* Other adjustments */
   }
   ```

2. Update React component props if structure changes:
   ```tsx
   const { title, description, imageUrl } = props
   ```

3. Test responsive behavior on mobile and desktop

### 3. Create New Components

To add a new component:

1. **Design in Figma**
   - Create component with clear states and variants
   - Document interactions and animations

2. **Implement in React**
   ```tsx
   // src/components/NewComponent.tsx
   function NewComponent(props) {
     return (
       <section className="new-component">
         {/* Implementation */}
       </section>
     )
   }
   ```

3. **Add CSS Styling**
   ```css
   .new-component { /* styles */ }
   .new-component:hover { /* hover states */ }
   ```

4. **Create Code Connect Link** (manual setup)
   - See "Code Connect Setup" below

---

## Design System Guidelines

### Color Usage

**Light Theme (Default)**
```css
--color-primary: #780000      /* Buttons, links, accents */
--color-text: #1f2937         /* Body text */
--color-bg: #ffffff           /* Background */
```

**Dark Theme**
```css
--color-primary: #c1121f      /* Brighter for visibility */
--color-text: #f9fafb         /* Off-white */
--color-bg: #111827           /* Dark background */
```

Always use CSS variables instead of hardcoding colors:
```tsx
/* ✅ Good */
<button style={{ background: 'var(--color-primary)' }}>Action</button>

/* ❌ Bad */
<button style={{ background: '#780000' }}>Action</button>
```

### Component Patterns

#### Sections
```tsx
function SectionName() {
  return (
    <section className="section-name">
      <div className="container">
        {/* content */}
      </div>
    </section>
  )
}
```

#### Animations
```tsx
// Option 1: Scroll-triggered with useScrollFrame
const { frame, fps, ref } = useScrollFrame({ totalFrames: 120 })

// Option 2: Declarative with AOS
<h1 data-aos="fade-up" data-aos-delay="700">Title</h1>
```

### Responsive Design

Mobile-first approach with CSS media queries:
```css
/* Mobile default (0-767px) */
.section { padding: 1rem; }

/* Tablet and up (768px+) */
@media (min-width: 768px) {
  .section { padding: 2rem; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .section { padding: 3rem; }
}
```

---

## Code Connect Setup

### What is Code Connect?

Code Connect is a Figma feature that links design components to source code, allowing developers to see actual component code while viewing Figma designs.

### Setting Up Code Connect for a Component

1. **In Figma**
   - Select a component
   - Copy its node ID from the URL (e.g., `1:234`)

2. **In Your Code**
   - Create the React component in appropriate file
   - Add JSDoc comments for documentation

3. **Generate Code Connect**
   ```bash
   # Command to add a mapping
   figma-code-connect add \
     --file-key 9W4njGh1dj62MaFaEuIOlC \
     --node-id 1:234 \
     --component-name MyComponent \
     --source src/components/MyComponent.tsx
   ```

4. **Verify Link**
   - Open component in Figma
   - Check "Code Connect" tab to see linked code

### Example Code Connect Mapping

```typescript
// In src/components/Header.tsx with JSDoc
/**
 * @figma-component Header
 * 
 * Responsive navigation header with theme toggle.
 * 
 * @prop theme - 'light' | 'dark'
 * @prop sticky - Whether header stays at top when scrolling
 */
export function Header(props: HeaderProps) {
  return (/* implementation */)
}
```

---

## Working with Design Changes

### Scenario: Color Change

1. **Designer updates primary color in Figma** → #c1121f to #d42426

2. **Steps to apply**:
   ```css
   /* src/index.css - dark theme section */
   [data-theme="dark"] {
     --color-primary: #d42426;  /* Updated */
   }
   ```

3. **Test changes**:
   ```bash
   npm run dev
   # Check if buttons, links, accents are correctly colored
   ```

### Scenario: New Section Component

1. **Designer creates new section in Figma**

2. **Developer creates React component**:
   ```tsx
   // src/components/NewSection.tsx
   function NewSection() {
     const { frame, fps, ref } = useScrollFrame({ totalFrames: 120 })
     
     return (
       <section className="new-section" ref={ref}>
         <div className="container">
           {/* Responsive layout */}
         </div>
       </section>
     )
   }
   ```

3. **Add CSS and animations**:
   ```css
   .new-section { /* styling */ }
   
   @media (max-width: 768px) {
     .new-section { /* mobile adjustments */ }
   }
   ```

4. **Create Code Connect mapping** or add to config

---

## Animation Guidelines

### Using Data Attributes (AOS)

```tsx
// Simple entrance animations
<div data-aos="fade-up">Content</div>
<div data-aos="slide-left" data-aos-delay="300">Content</div>
<div data-aos="zoom-in" data-aos-duration="1000">Content</div>
```

**Supported animations**: fade-up, fade-in, slide-left, slide-right, zoom, flip, etc.

### Using Custom Animations (useScrollFrame)

```tsx
function AnimatedComponent() {
  const { frame, fps, ref } = useScrollFrame({ totalFrames: 100 })
  
  const springValue = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50, mass: 1 }
  })

  return (
    <div
      ref={ref}
      style={{
        opacity: springValue,
        transform: `translateY(${interpolate(springValue, [0, 1], [40, 0])}px)`
      }}
    >
      Content
    </div>
  )
}
```

---

## Asset Management

### Adding Images

1. **Save to public directory**:
   ```
   public/images/external-logo/new-logo.jpg
   ```

2. **Use in components**:
   ```tsx
   <img src="/images/external-logo/new-logo.jpg" alt="Logo" />
   ```

3. **Preferred formats**:
   - WebP for photos
   - JPG for fallback
   - SVG for icons and logos

### Using Icons

Icons via Font Awesome 6.5.1:
```tsx
<i className="fas fa-github"></i>      {/* GitHub icon */}
<i className="fas fa-linkedin"></i>    {/* LinkedIn icon */}
<i className="fas fa-envelope"></i>    {/* Email icon */}
```

Browse available icons: https://fontawesome.com/icons

---

## Accessibility Checklist

Before finalizing designs in Figma:

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Interactive elements have clear focus states
- [ ] Semantic HTML structure (h1 > h2 > h3)
- [ ] Alt text for all images
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Text remains readable on mobile (min 16px)

---

## Troubleshooting

### Issue: Figma capture not working

**Solution**:
1. Ensure `index.html` has the capture script:
   ```html
   <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
   ```
2. Start dev server: `npm run dev`
3. Open correct port (usually 5173 or 5174)

### Issue: Animations not syncing with design

**Solution**:
1. Check `AOS.init()` config in `src/App.tsx`
2. Verify `data-aos` attributes on elements
3. Test with `npm run dev` before building

### Issue: Color changes not reflecting

**Solution**:
1. Always update CSS variables in `src/index.css`
2. Check both light and dark theme sections
3. Clear browser cache if using Firefox/Chrome
4. Verify component uses `var(--color-name)`

---

## Team Collaboration

### For Designers
- ✅ Create components with clear variants
- ✅ Document responsive behavior
- ✅ Use consistent naming with code team
- ⚠️ Avoid hardcoding colors - reference design tokens

### For Developers
- ✅ Keep component names aligned with Figma
- ✅ Update CSS variables when design tokens change
- ✅ Test all animations on actual devices
- ✅ Maintain Code Connect links

---

## Additional Resources

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete token and pattern documentation
- [config/figma.config.ts](./config/figma.config.ts) - Figma configuration reference
- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Remotion Spring Docs](https://www.remotion.dev/docs/animation)

---

Last Updated: March 24, 2026
