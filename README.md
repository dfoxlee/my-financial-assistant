# My Financial Assistant

A modern, interactive financial tracking application built with React and TypeScript. Upload your transaction data, categorize expenses, and gain insights through comprehensive charts and summaries.

## Features

- **CSV Upload**: Import transactions from CSV files with an easy-to-use template
- **Transaction Management**: View all transactions in an organized table
- **Category Management**: Create, edit, and assign categories to transactions
- **Smart Categorization**: Auto-complete suggestions for quick category assignment
- **Visual Analytics**: 
  - Pie charts for spending by category and transaction name
  - Line charts for spending trends over time
  - Bar charts for transaction frequency analysis
- **Multiple Views**: Switch between transaction list, summary tables, and charts
- **Data Persistence**: Categories and transactions stored in local state management

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Charts**: Chart.js & react-chartjs-2
- **CSV Parsing**: PapaParse
- **Date Handling**: date-fns
- **UI Icons**: Lucide React
- **Notifications**: React Toastify
- **File Upload**: React Dropzone
- **Validation**: Zod
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-financial-assistant
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. **Upload Transactions**: Click the upload button and select a CSV file or download the template first
2. **View Transactions**: Switch to the Transactions view to see all imported transactions
3. **Assign Categories**: Use the category assignment modal to categorize uncategorized transactions
4. **Manage Categories**: Edit existing categories or create new ones
5. **View Analytics**: Check the Charts view for visual spending insights
6. **View Summary**: Review summary tables organized by category, date, or transaction name

## Project Structure

```
src/
├── components/          # React components
│   ├── header/         # Header with file upload
│   ├── transactions/   # Transaction list view
│   ├── summary/        # Summary tables view
│   ├── charts/         # Charts and analytics view
│   ├── shared/         # Reusable UI components
│   └── modals/         # Category management modals
├── hooks/              # Custom React hooks
├── services/           # Business logic
├── stores/             # Zustand state stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # Application constants
```

## CSV Template

Download the transaction template from the application to ensure proper format. The template includes:
- Date
- Name
- Amount

## License

This project is private and not licensed for public use.
