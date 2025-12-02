# HubSpot CMS React Components - Technical Challenge

A collection of production-grade, interactive components built for HubSpot CMS using React, demonstrating advanced concepts including islands architecture, progressive hydration, CRM integration, and performance optimization.

## Live Demos

- **[Events Grid Template](https://50734382.hs-sites.com/react-components-events-grid)** - Full page template demo
- **[Module Component Demo](https://50734382.hs-sites.com/react-components-demos)** - Interactive module showcase

## Component

### Events & Webinars Grid

Upcoming events display with countdown timers, event type filtering, and registration links. Fetches data from HubSpot CRM custom objects.

## Features

- **Event Type Filtering**: Filter by webinar, workshop, conference, meetup
- **Fully Responsive**: Adaptive grid layouts for mobile, tablet, and desktop
- **Countdown Timers**: Live countdown to event start times
- **Registration Links**: Direct links to event registration
- **Date Formatting**: Automatic past/future event handling
- **Custom Accent Colors**: Configurable theme colors

## Technical Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe component development
- **CSS Modules**: Scoped, maintainable styling
- **HubSpot CMS Components**: Islands architecture, field definitions
- **GraphQL**: CRM data fetching

## Architecture Overview

### Islands Architecture

This project uses HubSpot's **islands architecture** for optimal performance. The EventsGrid component hydrates on load for immediate interactivity.

### Component Structure

```
src/theme/challenge-theme/
├── components/
│   ├── islands/                    # Client-side interactive components
│   │   └── EventsGrid.tsx
│   └── modules/
│       └── EventsGrid/
│           └── index.tsx
├── data-queries/
│   └── EventsGrid.graphql          # GraphQL query for CRM data
├── styles/
│   ├── common.module.css
│   └── EventsGrid.module.css
└── utils/
    └── colorUtils.ts
```

## Setup Instructions

### Prerequisites

- Node.js >= 20.0.0
- HubSpot Developer Account
- HubSpot CLI installed (`npm install -g @hubspot/cli`)

### Installation

1. **Clone and install**
   ```bash
   git clone <your-repo-url>
   cd hubspot-react-challenge
   npm install
   cd src/theme/challenge-theme
   npm install
   ```

2. **Authenticate with HubSpot**
   ```bash
   hs auth
   ```

3. **Start development server**
   ```bash
   cd src/theme/challenge-theme
   npm start -- --generateFieldTypes
   ```

4. **Deploy to HubSpot**
   ```bash
   hs project upload
   ```

## HubSpot Data Setup

This project fetches data from HubSpot CRM. See [docs/HUBSPOT_DATA_INTEGRATION.md](docs/HUBSPOT_DATA_INTEGRATION.md) for detailed setup instructions.

**Events**: Create a custom "Event" object with properties:
- Event Title, Description, Event Date, Event Time, Event Type
- Location, Is Virtual, Registration URL, Speakers, Capacity


## References

- [HubSpot CMS React Documentation](https://developers.hubspot.com/docs/cms/start-building/introduction/react-plus-hubl/overview)
- [Islands Architecture](https://developers.hubspot.com/docs/cms/reference/react/islands)
- [CSS Modules](https://github.com/css-modules/css-modules)

## Author

SWARM - HubSpot Front-End Developer Challenge

## License

This project is created as part of a technical assessment for HubSpot.
