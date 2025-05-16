# Mock Dashboard

A modern product management dashboard built with Next.js, showcasing a responsive interface for managing product inventory.

**Deployed URL:** [mock.demoversion.xyz](https://mock.demoversion.xyz)

## Project Overview

This project is a mock product management dashboard that allows users to view, create, edit, and delete products. It features a responsive design with both list and grid views for products, filtering capabilities, and a clean user interface.

## Key Features

- Product listing with pagination
- Grid and list view options
- Product filtering by category and search
- Create, edit, and delete product functionality
- Responsive design for various screen sizes

## Folder Structure

```
mock-dashboard/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── products/         # Product API endpoints
│   │   │   ├── [id]/         # Product-specific operations (GET, PATCH, DELETE)
│   │   │   └── route.ts      # Product collection operations (GET, POST, PUT)
├── components/               # Reusable UI components
├── constants/                # Application constants
├── hooks/                    # Custom React hooks
│   └── useProductActions.ts  # Product CRUD operations hook
├── http/                     # HTTP clients
│   └── clients/              # API client implementations
│       └── products.client.ts # Product API client
├── lib/                      # Utility libraries
├── modules/                  # Feature modules
│   └── products/             # Product management module
│       ├── create-product-dialog/ # Create product components
│       ├── edit-product-dialog/   # Edit product components
│       ├── delete-product-dialog/ # Delete product components
│       └── products-dashboard.tsx # Main dashboard component
├── public/                   # Static assets
├── schemas/                  # Validation schemas
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Frontend

- **Next.js:** Framework for server-rendered React applications
- **React:** UI library for building component-based interfaces
- **TanStack Query:** Data fetching and state management
- **React Hook Form:** Form handling with validation
- **Radix UI:** Accessible UI components
- **Tailwind CSS:** Utility-first CSS framework

### API

- **Next.js API Routes:** Serverless functions for backend logic
- **Mock Data:** In-memory data storage for demonstration purposes

## Data Flow

1. **UI Components:** User interacts with components in the modules directory
2. **Hooks:** Custom hooks handle business logic and API calls
3. **HTTP Clients:** API clients make requests to the backend
4. **API Routes:** Process requests and return responses
5. **Mock Data:** Simulates a database for storing product information

## Implementation Details

### API Routes

The application uses Next.js API routes to handle product operations:

- `/api/products`: GET (list), POST (create), PUT (update)
- `/api/products/[id]`: GET (single), PATCH (partial update), DELETE

### State Management

- React Query is used for server state management
- Local React state for UI state

### Mock Data Storage

- Products are stored in memory using an array
- **Important Note:** Since data is stored in memory, all changes will be lost when the browser is refreshed

## Assumptions Made

1. **In-memory Storage:** The application uses in-memory storage instead of a persistent database, which means all data is lost on page refresh or server restart.
2. **Authentication:** No authentication system is implemented.
3. **Image Handling:** Product images are pre-defined based on categories rather than allowing custom image uploads.
4. **Validation:** Basic validation is implemented on the frontend, assuming more robust validation would be added in a production environment.
5. **Error Handling:** Simple error handling is implemented, assuming more comprehensive error handling would be added in production.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sample-tayo/mock-dashboard
cd mock-dashboard

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```