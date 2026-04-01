# Finance Dashboard UI

A frontend-only finance dashboard built for the Zorvyn Frontend Developer Intern assignment.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Recharts
- Context API for state management

## Features

### 1) Dashboard Overview

- Summary cards: Total Balance, Total Income, Total Expenses
- Time-based visualization: monthly balance trend (income vs expenses)
- Category-based visualization: spending breakdown by category

### 2) Transactions Section

- Transaction list with: date, amount, category, type
- Add/Edit/Delete transactions (Admin only)
- Filtering by category/type
- Search by description/category
- Sorting by date and amount
- Reset filters

### 3) Role-Based UI (frontend simulation)

- Viewer: read-only mode
- Admin: can add/edit/delete transactions
- Role switcher in sidebar
- Role badge in topbar

### 4) Insights Section

- Highest spending category
- Month-over-month expense comparison
- Dynamic observations derived from current data
- Empty state when no data exists

### 5) State Management

Global app state is managed in `AppContext`:

- `transactions`
- `filters`
- `role`

Data and role persist in `localStorage`.

## Project Structure

- `src/app`: routes and root layout
- `src/components/layout`: sidebar and topbar
- `src/components/dashboard`: summary cards and dashboard charts
- `src/components/transactions`: list, filters, and add/edit modal
- `src/components/insights`: insights panel and page wrapper
- `src/components/ui`: shared UI elements (empty state, role badge)
- `src/context`: global app context
- `src/data`: mock transactions dataset
- `src/utils`: calculation and filtering helpers

## Setup & Run

1. Install dependencies:

```bash
npm install
```

1. Run development server:

```bash
npm run dev
```

1. Open:

`http://localhost:3000`

## Assignment Requirement Mapping

- Dashboard summary + 2 charts: implemented
- Transaction exploration + filter/search/sort: implemented
- Role-based UI behavior: implemented
- Insights from data: implemented
- State handling (transactions/filters/role): implemented
- Responsive + empty states: implemented

## Notes

- This is frontend-only and uses mock/static data.
- No backend or authentication logic is included.
