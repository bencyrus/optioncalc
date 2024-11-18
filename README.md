# Options Price Calculator

A powerful web application for calculating and visualizing potential returns on options trades based on different price scenarios and expiration dates.

## Features

- **Multiple Price Scenarios**: Test different stock price predictions simultaneously
- **Time Analysis**: Compare different expiration dates for options contracts
- **Real-time Data**: Integration with Polygon.io API for live market data
- **Profit Calculator**: Instantly calculate potential returns based on your predictions
- **Call and Put Options**: Analysis for both types of options contracts

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Docker
- Polygon.io API

## Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (optional)
- Polygon.io API key

## Installation

### Local Development

1. Clone the repository:

```bash
git clone <https://github.com/bencyrus/optioncalc.git>
cd optioncalc
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your Polygon.io API key:

```bash
NEXT_PUBLIC_POLYGON_API_KEY=<your-api-key>
```

4. Start the development server:

```bash
npm run dev
```

### Docker Deployment

1. Build and run using Docker Compose:

```bash
docker compose up --build
```

The application will be available at `http://localhost:3535`

## Environment Variables

- `NEXT_PUBLIC_POLYGON_API_KEY`: Your Polygon.io API key (required)

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: React components
- `/data`: API integration and data fetching logic
- `/hooks`: Custom React hooks
- `/types`: TypeScript type definitions
- `/utils`: Utility functions and helpers

## Usage

1. Visit the homepage and click "Try Calculator Now"
2. Select a ticker symbol from the dropdown
3. Choose an expiration date and contract type (call/put)
4. Enter your price predictions in the three scenario fields
5. View the calculated potential returns for each strike price

## Acknowledgments

- Polygon.io for providing market data
- Next.js team for the framework
