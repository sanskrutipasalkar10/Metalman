---
name: Industrial Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#5a4139'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#8e7067'
  outline-variant: '#e2bfb4'
  surface-tint: '#ac3400'
  primary: '#a83300'
  on-primary: '#ffffff'
  primary-container: '#d04408'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59d'
  secondary: '#4c6078'
  on-secondary: '#ffffff'
  secondary-container: '#cde1fe'
  on-secondary-container: '#51647d'
  tertiary: '#006a35'
  on-tertiary: '#ffffff'
  tertiary-container: '#008645'
  on-tertiary-container: '#f6fff4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390b00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#b4c8e4'
  on-secondary-fixed: '#061d32'
  on-secondary-fixed-variant: '#35485f'
  tertiary-fixed: '#6bfe9c'
  tertiary-fixed-dim: '#4ae183'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  max-width-desktop: 1440px
---

## Brand & Style

The design system is engineered for the high-stakes environment of Tier-1 manufacturing and aerospace engineering. It balances the raw, technical nature of the factory floor with the sophisticated, AI-driven automation of the modern engineering suite. The aesthetic is **Corporate / Modern** with a **Technical** edge, evoking reliability, structural integrity, and absolute precision.

The target audience consists of NPD (New Product Development) engineers, procurement specialists, and quality managers. The UI must feel like a high-trust tool—utilitarian enough for complex data density, yet refined enough to guide users through automated AI workflows without friction.

Key visual pillars:
- **Structural Integrity:** Heavy use of defined containers and logical grouping.
- **Automated Intelligence:** Subtle glowing accents and progress indicators for live engineering processes.
- **Operational Clarity:** High-contrast status colors to ensure critical manufacturing errors or approvals are never missed.

## Colors

The palette is anchored by a deep **Industrial Navy** (#1A2E44) for authority and a vibrant **Safety Orange** (#F05A22) for action and primary branding. 

- **Primary (Safety Orange):** Used for primary calls to action, progress bars, and critical branding elements. It signifies energy and movement.
- **Secondary (Industrial Navy):** Used for headers, navigation, and text to provide a grounded, professional foundation.
- **Success (Precision Green):** A bright, high-trust green (#2ECC71) specifically for "Ready" statuses, compliance approvals, and completed AI generations.
- **Neutral (Steel Gray):** A range of grays used for borders, secondary text, and technical data table backgrounds.

For dark-mode contexts (e.g., CAD viewers or dashboard widgets), the Navy deepens to #0F172A to maintain contrast with the primary orange.

## Typography

The typography strategy prioritizes legibility in data-dense environments while maintaining a modern, tech-forward character.

- **Headlines (Hanken Grotesk):** Chosen for its sharp, contemporary geometry. It feels engineered and precise.
- **Body (Inter):** The workhorse for the platform. Its neutral profile ensures that long-form engineering documentation and data remain highly readable.
- **Technical Labels (JetBrains Mono):** Used for all system-generated data, CAD part numbers, cell IDs, and status tags. The monospaced nature emphasizes the technical accuracy of the platform.

All headlines should use a tight tracking (-0.02em) to feel cohesive, while monospaced labels should have expanded tracking (+0.05em) for distinct visual separation in complex UI.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid** grid. Marketing and landing pages use a fixed 12-column grid centered in the viewport, while dashboard and engineering interfaces use a fluid model with a fixed sidebar and flexible content canvas.

- **Grid System:** 12 columns with 16px gutters for desktop.
- **Density:** High density is favored for data tables (rows at 32px height), while "Flow" interfaces (wizard steps, document selection) use generous padding (32px-48px) to reduce cognitive load during sequential tasks.
- **Breakpoints:**
  - **Mobile (<768px):** Single column, 16px margins. Stack all card-based actions.
  - **Tablet (768px - 1024px):** 8-column grid, compact margins.
  - **Desktop (>1024px):** 12-column grid, 24px margins.

## Elevation & Depth

To maintain an "industrial" and "structured" feel, depth is achieved through **Tonal Layering** rather than heavy shadows.

- **Base Layer:** A light gray surface (#F8FAFC) used as the application background.
- **Surface Layer:** Pure white cards with a subtle 1px border (#E2E8F0) for primary content containers.
- **Interaction Depth:** A very soft, low-opacity shadow (4% opacity, 8px blur, Industrial Navy tint) is reserved for hovering over actionable items like document cards or input fields.
- **Active State:** Items currently being processed by AI (e.g., a document generating) utilize a "soft glow" effect using the primary orange at 10% opacity as a backdrop.

## Shapes

The shape language reflects the precision of machined parts. 

- **Primary UI Elements:** Buttons, cards, and input fields use a consistent 0.5rem (8px) radius. This provides a professional balance between modern software and industrial sturdiness.
- **Document Icons:** Use a slightly tighter radius (4px) to mimic the feel of physical paper or technical spec sheets.
- **Status Pills:** Utilize the "Pill" shape (fully rounded) to distinguish them from actionable buttons, ensuring users can quickly scan for "Ready" or "Processing" states without confusing them for interaction points.

## Components

### Buttons
- **Primary:** Solid Safety Orange with white text. 8px radius.
- **Secondary:** White background, Industrial Navy border (1px), Navy text.
- **Ghost/Tertiary:** No background, Navy text, used for "Back" or "Cancel" actions.

### Technical Data Tables
- Header background: #F1F5F9.
- Header text: JetBrains Mono, Bold, 11px, All-caps.
- Row borders: 1px solid #E2E8F0.
- Cell padding: 12px horizontal, 8px vertical.

### Input Fields
- Labeled with bold Inter (14px).
- Help text/Error text: 12px Inter.
- Placeholder text: #94A3B8.
- Border color: #CBD5E1. Focus state: 2px border in Safety Orange.

### Status Indicators (High-Trust)
- **Ready:** Green pill with checkmark icon.
- **Processing:** Pulsing Orange pill with a spinner.
- **Pending:** Gray dashed-border pill.

### AI Review Interfaces
- Use a split-screen view: Source CAD/Document on the left, AI feedback/Correction form on the right.
- Highlighted AI suggestions should use a subtle orange background tint (#FFF7ED) to draw focus without being alarming.