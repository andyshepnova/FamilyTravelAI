# Travel After Kids - Design Guidelines

## Design Approach
**Hybrid Approach**: Combining travel industry references (Airbnb, Booking.com) with clean design system principles. The platform balances travel inspiration (experience-focused) with practical itinerary planning (utility-focused), requiring both emotional appeal and functional clarity.

**Key Design Principles:**
- Family-first accessibility and trust-building
- Dual-mode flexibility for inspiration vs. planning workflows  
- Clear information hierarchy for complex travel data
- Mobile-responsive foundation for future app integration

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Blue: 210 65% 45% (trustworthy, travel-friendly)
- Deep Navy: 215 25% 15% (headers, primary text)

**Supporting Colors:**
- Warm Orange: 25 85% 55% (accent for CTAs and highlights)
- Soft Green: 140 35% 50% (success states, family-friendly activities)
- Light backgrounds: 210 15% 98% (light mode), 215 20% 8% (dark mode)

### Typography
**Font Stack:** Inter from Google Fonts
- Headings: Inter 600-700 (sizes 24px-48px)
- Body text: Inter 400-500 (14px-16px)
- UI elements: Inter 500 (12px-14px)

### Layout System
**Spacing Units:** Tailwind 3, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: mb-8, mb-12
- Card spacing: gap-4, gap-6
- Container margins: mx-4, mx-6

### Component Library

**Core Components:**
- **Workflow Selector:** Toggle between "Find Inspiration" and "Plan Itinerary" modes
- **Parameter Cards:** Clean input forms with family-friendly icons
- **Results Display:** Card-based layout with clear visual hierarchy
- **Interactive Maps:** Embedded Google Maps with custom styling
- **Refinement Panel:** Collapsible sidebar for iterative improvements
- **Link Validation Indicators:** Subtle status badges for verified links

**Navigation:** 
- Primary: Sticky header with workflow toggle
- Secondary: Breadcrumb navigation for multi-step processes

**Forms:**
- Rounded corners (rounded-lg)
- Clear labels and helper text
- Family member selector with age ranges
- Date pickers optimized for travel planning

**Data Displays:**
- **Itinerary Cards:** Day-by-day timeline with time slots
- **Inspiration Grid:** Image-rich destination cards
- **Activity Lists:** Age-appropriate filtering and icons

**Overlays:**
- Modal dialogs for refinement options
- Toast notifications for link validation status
- Loading states for AI processing

## Images
**Hero Section:** Large hero image (full viewport height) featuring diverse families traveling together. Use variant="outline" buttons with blurred backgrounds over the hero image.

**Destination Cards:** High-quality travel photography showcasing family-friendly destinations and activities.

**Activity Icons:** Consistent icon set representing different activity types (parks, museums, restaurants, etc.) using Heroicons.

## Animations
**Minimal Implementation:**
- Subtle loading spinners during AI processing
- Smooth transitions between workflow modes
- Gentle hover effects on interactive cards
- No distracting or excessive animations

## Mobile Considerations
- Touch-friendly button sizes (minimum 44px)
- Swipeable card interfaces
- Collapsible sections for complex itineraries  
- One-thumb navigation patterns

## Trust & Safety Design
- Clear data usage messaging
- Verified link indicators with green checkmarks
- Family safety badges for activities
- Transparent pricing information for booking links