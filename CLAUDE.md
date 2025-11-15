# Sabzi Website - Technical Documentation

> **Purpose**: This document contains comprehensive technical information about the Sabzi landing page for future development and AI assistance.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [Styling System](#styling-system)
6. [Current Animations](#current-animations)
7. [Color Scheme](#color-scheme)
8. [Configuration Files](#configuration-files)
9. [Development Workflow](#development-workflow)
10. [Enhancement Opportunities](#enhancement-opportunities)

---

## Project Overview

**Project Name**: Sabzi
**Type**: Landing Page for Construction Industry Tech Agency
**Language**: French
**Target Audience**: Construction Companies
**Design Aesthetic**: Modern dark theme with glassmorphism

**Working Directory**: `/Users/Syamak/Code/nextjs/sabzi/`

**Git Status**:
- Current branch: `test-branch`
- Status: Clean (no uncommitted changes)
- Recent commits focus on responsive design and video updates

---

## Technology Stack

### Core Framework
- **Next.js**: 15.5.0
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Build Tool**: Turbopack (via `--turbopack` flag)

### Key Dependencies
```json
{
  "next": "15.5.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "three": "^0.180.0",
  "tailwindcss": "^4.0.0"
}
```

### Development Tools
- **ESLint**: Next.js config for code quality
- **PostCSS**: v4 with Tailwind plugin
- **TypeScript Config**: ES2017 target with path aliases

### Fonts
- **Arvo** (serif) - Google Font for headings (H1, H2, H4)
- **Inter** (sans-serif) - Google Font for body text and UI

---

## Project Structure

```
/sabzi
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Main landing page (client component)
│   │   └── globals.css         # Global styles & custom animations
│   └── components/
│       ├── Header.tsx          # Logo + social media links
│       ├── HeroSection.tsx     # Main hero with video embed
│       ├── CTAButton.tsx       # Reusable CTA button
│       ├── ThreeBackground.tsx # Three.js animated 3D background
│       ├── ExpectedResults.tsx # 6 accordion cards with modals
│       ├── ProcessSection.tsx  # 4-step process timeline
│       ├── TestimonialSection.tsx # Testimonials carousel
│       ├── ProjectManagementSection.tsx # 6-step project workflow
│       └── PricingSection.tsx  # Pricing card
├── public/
│   ├── logos/                  # Logo files
│   ├── images/                 # Various images
│   └── *.svg                   # SVG icons
├── package.json
├── tsconfig.json               # TypeScript config with @ alias
├── postcss.config.mjs          # PostCSS with Tailwind
├── next.config.ts              # Next.js configuration
├── eslint.config.mjs           # ESLint rules
└── CLAUDE.md                   # This file

```

### Path Aliases
- `@/*` → `./src/*` (configured in tsconfig.json)

**Example import**:
```typescript
import Header from '@/components/Header'
```

---

## Component Architecture

### Page Structure (page.tsx)

The landing page is a **client component** ("use client") with the following hierarchy:

```
<Root Div> (relative container)
├── <ThreeBackground />      # Three.js animated 3D particles & shapes
├── <Gradient Overlay />     # Dark green gradient for depth
├── <Header />
├── <HeroSection />
├── <ExpectedResults />
├── <ProcessSection />
├── <TestimonialSection />
├── <ProjectManagementSection />
├── <PricingSection />
└── <footer>
```

### Component Details

#### 0. ThreeBackground (`ThreeBackground.tsx`) **[NEW]**
**Purpose**: Dynamic 3D animated background
**Features**:
- 1,500 animated particles in 3D space
- 15 floating wireframe geometric shapes (tetrahedron, octahedron, icosahedron, torus)
- Mouse-responsive camera movement
- Color palette matching site theme (dark greens, whites)
- Additive blending for glow effects
- Continuous rotation and floating animations
- Fully responsive and performance-optimized

**File Path**: `src/components/ThreeBackground.tsx`

**Key Technologies**:
- Three.js PerspectiveCamera with FOV 75
- BufferGeometry for efficient particle rendering
- PointsMaterial with vertex colors and additive blending
- WebGL renderer with alpha transparency
- RequestAnimationFrame for smooth 60fps animation

**Performance**:
- Pixel ratio capped at 2 for mobile optimization
- Proper cleanup on unmount (disposes geometries, materials, renderer)
- Fixed positioning with `-z-10` to stay behind content
- Pointer events disabled to allow interaction with content above

**Animation Details**:
- Particles rotate slowly on Y-axis (0.05 rad/s)
- Shapes have individual random rotation speeds
- Floating motion using sine wave calculations
- Camera follows mouse with smooth easing (0.02 factor)

---

#### 1. Header (`Header.tsx`)
**Purpose**: Navigation and branding
**Features**:
- Responsive logo display
- Social media links (LinkedIn, YouTube)
- Hover scale effects (`hover:scale-110`)
- Fixed positioning option available

**File Path**: `src/components/Header.tsx`

---

#### 2. HeroSection (`HeroSection.tsx`)
**Purpose**: Main pitch and video showcase
**Features**:
- YouTube Shorts embed with lazy loading
- Play button overlay
- Responsive iframe sizing
- Gradient text effects

**File Path**: `src/components/HeroSection.tsx`

**Key Code**:
```typescript
<iframe
  loading="lazy"
  src="https://www.youtube.com/embed/..."
  allowFullScreen
/>
```

---

#### 3. CTAButton (`CTAButton.tsx`)
**Purpose**: Reusable call-to-action button
**Features**:
- Gradient shine animation on hover
- Links to Cal.com booking
- Skewed gradient sweep effect
- 700ms transition duration

**File Path**: `src/components/CTAButton.tsx`

**Animation**:
```css
.hover\:translate-x-full {
  transform: translateX(100%);
}
```

---

#### 4. ExpectedResults (`ExpectedResults.tsx`)
**Purpose**: Service showcase with expandable cards
**Features**:
- 6 expandable cards
- Modal popups with image lightbox
- Scroll lock when modal open
- Tag system for categorization
- Green accent borders

**File Path**: `src/components/ExpectedResults.tsx`

**Data Structure**:
```typescript
{
  title: string;
  description: string;
  tags: string[];
  details: {
    subtitle: string;
    content: string;
    image?: string;
  };
}
```

---

#### 5. ProcessSection (`ProcessSection.tsx`)
**Purpose**: 4-step service methodology
**Features**:
- Numbered step indicators
- Connecting lines between steps
- Responsive grid layout
- Icon placeholders

**File Path**: `src/components/ProcessSection.tsx`

**Steps**:
1. Analyse
2. Conception
3. Développement
4. Livraison

---

#### 6. TestimonialSection (`TestimonialSection.tsx`)
**Purpose**: Social proof via testimonials
**Features**:
- Featured testimonial spotlight
- 5-card grid layout
- Expandable "Voir plus" functionality
- Star ratings with yellow-400 color
- Horizontal scroll animation

**File Path**: `src/components/TestimonialSection.tsx`

**Animation**: 20s continuous scroll with pause on hover

---

#### 7. ProjectManagementSection (`ProjectManagementSection.tsx`)
**Purpose**: Project workflow explanation
**Features**:
- 6-step vertical timeline
- Connecting lines
- Detailed descriptions
- Glassmorphism cards

**File Path**: `src/components/ProjectManagementSection.tsx`

**Steps**:
1. Cahier des charges
2. Design et architecture
3. Développement itératif
4. Tests et validation
5. Mise en production
6. Support et évolution

---

#### 8. PricingSection (`PricingSection.tsx`)
**Purpose**: Pricing display
**Features**:
- Centered pricing box
- Gradient glow effect
- "À partir de" pricing model
- CTA button integration

**File Path**: `src/components/PricingSection.tsx`

---

## Styling System

### Tailwind CSS v4

**Configuration**: `postcss.config.mjs`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Custom CSS Classes

**File**: `src/app/globals.css`

#### Typography Classes

| Class | Font Size (Mobile) | Font Size (Desktop) | Font Family |
|-------|-------------------|---------------------|-------------|
| `.heading-1` | 1.875rem (30px) | 3rem (48px) | Arvo (serif) |
| `.heading-2` | 1.5rem (24px) | 2.25rem (36px) | Arvo (serif) |
| `.heading-3` | 1.25rem (20px) | 1.5rem (24px) | Arvo (serif) |
| `.heading-4` | 1.125rem (18px) | 1.25rem (20px) | Arvo (serif) |
| `.text-description` | 1.125rem (18px) | 1.25rem (20px) | Inter (sans-serif) |
| `.text-subdescription` | 1rem (16px) | 1rem (16px) | Inter (sans-serif) |

**Common Properties**:
- All headings: `font-weight: 700`
- Text descriptions: `font-weight: 400`, `opacity: 0.9`
- Text subdescriptions: `font-weight: 300`, `opacity: 0.7`

#### Background Classes

**`.bg-dual-diagonal`**:
```css
background: linear-gradient(
  135deg,
  #000000 0%,
  #0f2112 50%,
  #000000 100%
);
background-size: 200% 200%;
animation: gradient-organic 10s ease-in-out infinite;
```

#### Custom Scrollbar

**`.custom-scrollbar`**:
- Width: 8px
- Track: `rgba(255, 255, 255, 0.1)`
- Thumb: `rgba(255, 255, 255, 0.3)` with hover at `0.5`
- Border radius: 4px

---

## Current Animations

### 1. Gradient Background Animation

**Name**: `gradient-organic`
**Duration**: 10 seconds
**Timing**: `ease-in-out infinite`

```css
@keyframes gradient-organic {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
```

**Applied to**: Main page background via `.bg-dual-diagonal`

---

### 2. CTA Button Shine Effect

**Trigger**: Hover
**Duration**: 700ms
**Effect**: Diagonal gradient sweep

```css
.group:hover .shine-effect {
  transform: translateX(100%) skewX(-12deg);
}
```

**Transition**: `cubic-bezier(0.4, 0, 0.2, 1)`

---

### 3. Testimonial Scroll Animation

**Name**: `scroll-left`
**Duration**: 20 seconds
**Timing**: `linear infinite`

```css
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**Features**:
- Pauses on hover
- Seamless loop with duplicated content

---

### 4. Modal Animations

**Fade In** (Modals):
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Duration: 0.4s, cubic-bezier(0.4, 0, 0.2, 1) */
```

**Scale In** (Cards):
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
/* Duration: 0.4s, cubic-bezier(0.4, 0, 0.2, 1) */
```

---

### 5. Hover Effects (Tailwind)

Common hover states used throughout:
- `hover:scale-105` - Slight zoom (105%)
- `hover:scale-110` - Medium zoom (110%)
- `hover:bg-white/15` - Brightness increase
- `hover:bg-white/30` - Stronger brightness
- `transition-all duration-300` - Smooth transitions

---

### 6. Three.js 3D Background Animation **[NEW]**

**Implementation**: Real-time WebGL rendering via Three.js

**Visual Elements**:

1. **Particle System (1,500 particles)**:
   - Random 3D positions in 100x100x50 space
   - Vertex coloring from green palette
   - Additive blending for luminous effect
   - Size: 0.15 units with 80% opacity
   - Continuous Y-axis rotation (0.05 rad/s)
   - Subtle X-axis oscillation using sine wave

2. **Geometric Shapes (15 wireframe meshes)**:
   - Types: Tetrahedron, Octahedron, Icosahedron, Torus
   - Wireframe rendering with 30% opacity
   - Individual random rotation speeds
   - Floating animation using sine calculations
   - Distributed across 60x60x40 space

3. **Interactive Camera**:
   - Mouse-responsive parallax effect
   - Smooth easing (2% interpolation factor)
   - Perspective field of view: 75°
   - Always looks at scene center

**Performance Optimizations**:
- BufferGeometry for efficient memory usage
- Pixel ratio capped at 2x for mobile devices
- Alpha transparency for seamless blending
- Antialiasing enabled for smooth edges
- Proper resource disposal on unmount

**Color Palette** (matches site theme):
```javascript
#0f2112  // Dark green (primary)
#125514  // Medium green
#1a7a1a  // Lighter green
#22a022  // Bright green
#ffffff  // White accents
```

**Integration**:
- Fixed position with z-index `-10`
- Pointer events disabled (non-interactive)
- Gradient overlay on top for depth (`z-index -5`)
- Responsive to window resize events

---

## Color Scheme

### Primary Colors

| Element | Color Code | Usage |
|---------|-----------|-------|
| **Background Start** | `#000000` | Black base |
| **Background Mid** | `#0f2112` | Dark green midpoint |
| **Background End** | `#000000` | Black endpoint |
| **Primary Text** | `#ffffff` | All headings & main content |
| **Secondary Text** | `rgba(255, 255, 255, 0.9)` | Descriptions |
| **Tertiary Text** | `rgba(255, 255, 255, 0.7)` | Subdescriptions |

### Accent Colors

| Purpose | Tailwind Class | Hex/RGBA |
|---------|---------------|----------|
| **Dark Green (Accent)** | Custom | `#125514` |
| **Success Tags** | `green-500/20` bg, `green-300` text | - |
| **Border Default** | `white/20` | `rgba(255, 255, 255, 0.2)` |
| **Border Hover** | `white/30` | `rgba(255, 255, 255, 0.3)` |
| **Card Background** | `white/10` | `rgba(255, 255, 255, 0.1)` |
| **Card Background Hover** | `white/15` | `rgba(255, 255, 255, 0.15)` |
| **Star Rating** | `yellow-400` | - |
| **Close Button** | `red-500/20` bg | - |

### Glassmorphism Effect

Combination of:
- `backdrop-blur-sm` / `backdrop-blur-md` / `backdrop-blur-lg`
- `bg-white/10` to `bg-white/20`
- `border border-white/20` to `border-white/30`

**Example**:
```html
<div class="backdrop-blur-md bg-white/10 border border-white/20">
  <!-- Glass card content -->
</div>
```

---

## Configuration Files

### 1. TypeScript Configuration (`tsconfig.json`)

**Key Settings**:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2. Next.js Configuration (`next.config.ts`)

**Current**: Minimal configuration (default settings)

### 3. PostCSS Configuration (`postcss.config.mjs`)

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 4. ESLint Configuration (`eslint.config.mjs`)

Uses Next.js recommended ESLint configuration.

---

## Development Workflow

### Running the Development Server

```bash
npm run dev
# Runs on http://localhost:3000
# Uses Turbopack for fast builds
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

### Package Manager

**npm** is used for dependency management.

---

## Enhancement Opportunities

### Animation Enhancements

1. **Scroll-Based Animations**
   - Add Intersection Observer for entrance animations
   - Staggered card reveals in ExpectedResults
   - Progressive step reveals in ProcessSection
   - Parallax effects on HeroSection

2. **Interactive Animations**
   - Number count-up animations for statistics
   - Loading skeleton states
   - Micro-interactions on buttons and links
   - Smooth page transitions

3. **Three.js Integration** ✅ **IMPLEMENTED**
   - ✅ 3D background with particle system (1,500 particles)
   - ✅ Floating wireframe geometric shapes (15 meshes)
   - ✅ Mouse-responsive camera movement
   - ✅ WebGL rendering with performance optimization
   - Future: Custom shader effects for advanced visuals
   - Future: Interactive 3D models on scroll

### Color Enhancements

1. **Gradient Variations**
   - Multi-color gradients for depth
   - Animated gradient borders
   - Radial gradients for focal points

2. **Accent Color Expansion**
   - Secondary accent color (e.g., blue or teal)
   - Color-coded sections
   - Dynamic color themes based on scroll position

3. **Advanced Hover States**
   - Gradient shift on hover
   - Color transitions with multiple stops
   - Glow effects with colored shadows

### Performance Considerations

**Current Optimizations**:
- Next.js Image optimization with `fill` and `object-contain`
- Lazy loading on iframe embeds (`loading="lazy"`)
- Tailwind's automatic CSS tree-shaking
- Component-based architecture for code splitting
- ✅ Three.js performance: BufferGeometry, capped pixel ratio, proper cleanup
- ✅ WebGL renderer with alpha transparency for efficient blending

**Future Optimizations**:
- Implement React.lazy() for heavy components
- Add loading states and Suspense boundaries
- Use dynamic imports for modals
- Consider reducing particle count on mobile devices for better performance
- Add optional "reduced motion" mode for accessibility

---

## File Reference Paths

### Source Files

| Type | Path |
|------|------|
| **Layout** | `src/app/layout.tsx` |
| **Main Page** | `src/app/page.tsx` |
| **Global Styles** | `src/app/globals.css` |
| **Components** | `src/components/*.tsx` |

### Configuration Files

| File | Path |
|------|------|
| **TypeScript** | `tsconfig.json` |
| **PostCSS** | `postcss.config.mjs` |
| **Next.js** | `next.config.ts` |
| **ESLint** | `eslint.config.mjs` |
| **Dependencies** | `package.json` |

### Asset Directories

| Type | Path |
|------|------|
| **Public Assets** | `public/` |
| **Logos** | `public/logos/` |
| **Images** | `public/images/` |
| **SVG Icons** | `public/*.svg` |

---

## Key Technical Decisions

### Why Next.js 15?
- Latest features and performance improvements
- Built-in image optimization
- App Router for better routing and layouts
- React Server Components support

### Why Tailwind CSS v4?
- Utility-first approach for rapid development
- Smaller bundle size with tree-shaking
- Consistent design system
- Easy responsive design

### Why TypeScript?
- Type safety for better code quality
- Better IDE support and autocomplete
- Easier refactoring and maintenance
- Catches errors at compile time

### Why "use client" on Main Page?
- Interactive features require client-side JavaScript
- Modal state management
- Scroll animations and interactions
- Video embed controls

---

## Common Development Patterns

### Component Structure

```typescript
// Standard component pattern
import React from 'react';

export default function ComponentName() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="heading-2 mb-8 text-center">
        Title
      </h2>
      {/* Component content */}
    </section>
  );
}
```

### Responsive Design Pattern

```typescript
// Mobile-first approach
<div className="
  px-4          // Mobile: 1rem padding
  sm:px-6       // Small screens: 1.5rem padding
  lg:px-8       // Large screens: 2rem padding
">
```

### Glassmorphism Card Pattern

```typescript
<div className="
  backdrop-blur-md        // Blur effect
  bg-white/10            // Semi-transparent white
  border border-white/20 // Subtle border
  rounded-lg             // Rounded corners
  p-6                    // Padding
  transition-all duration-300  // Smooth transitions
  hover:bg-white/15      // Hover state
">
```

---

## External Resources

### Booking Integration
- **Cal.com**: Used for appointment scheduling
- Link embedded in CTAButton component

### Social Media
- **LinkedIn**: Company profile linked in Header
- **YouTube**: Video content embedded in HeroSection

### Fonts
- **Google Fonts**: Arvo and Inter loaded in layout.tsx

---

## Future Development Notes

### Recently Implemented ✅
- **Three.js 3D Background** (November 2025)
  - Animated particle system with 1,500 particles
  - 15 floating wireframe geometric shapes
  - Mouse-responsive camera movement
  - Performance-optimized WebGL rendering

### Planned Features
- Advanced scroll animations with Intersection Observer
- Enhanced color palette with additional accent colors
- Additional interactive elements
- Custom shader effects for Three.js background

### Known Limitations
- Limited color variety (mostly monochromatic with green accents)
- Static content (no CMS integration)
- French language only (no i18n)
- Three.js background may need reduced particle count on low-end devices

### Recommended Tools for Enhancement
- **Framer Motion**: For advanced React animations
- **GSAP**: For complex timeline animations
- **React Spring**: For physics-based animations
- **Lottie**: For vector animations

---

## Conclusion

This document provides a comprehensive overview of the Sabzi landing page architecture, styling, and current implementation. Use this as a reference for future development, AI assistance, or onboarding new developers.

**Last Updated**: 2025-11-15
**Version**: 1.1 (Added Three.js 3D Background)
**Maintained by**: Development Team

---

*For questions or updates to this documentation, please commit changes with clear descriptions.*
