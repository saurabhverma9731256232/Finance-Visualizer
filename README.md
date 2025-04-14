This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Key Features Implemented in Stage 1:
Add/Edit/Delete Transactions: Users can add new transactions, edit existing ones, or delete transactions.

Transaction List View: A list displaying all the transactions with their details (amount, date, description).

Monthly Expenses Bar Chart: A bar chart that displays the total expenses per month.

Basic Form Validation: Ensures correct input for transaction amount, date, and description.

Tech Stack
Next.js: Framework for building the app.

React: JavaScript library for building the user interface.

shadcn/ui: UI component library for building modern and accessible components.

Recharts: Library for creating charts, used here for the monthly expenses bar chart.

MongoDB: Database for storing transactions.

Features
Transaction Tracking:

Ability to add, edit, and delete transactions.

Each transaction includes an amount, description, and date.

Transaction List View:

A list view displaying the transaction details (amount, description, date).

Monthly Expenses Bar Chart:

A bar chart that visualizes monthly expenses, making it easy to understand the overall spending trend.

Form Validation:

Basic form validation for ensuring that the amount, date, and description fields are filled out correctly.