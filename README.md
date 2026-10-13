# Campus Cafeteria POS

A simple point-of-sale prototype for the IT 415 practical exam. This project uses Vue 3 and Vite and focuses on the Campus Cafeteria scenario.

## Run locally

1. Install [Node.js](https://nodejs.org/).
2. In the project folder, run `npm install` once.
3. Run `npm run dev` and open the local address shown in the terminal.

## Current progress

- **Phase 2 (interface):** The app has four pages. **Menu** and **Order** are in the navbar. **Cash payment** opens from the Order page, and **Receipt** opens after confirming payment.
- The Menu shows the six Campus Cafeteria items with peso prices and an **Add to order** button for each.
- The Order page supports quantity changes and item removal, with centavo-based subtotals and totals.
- Cash payment validates the amount, calculates change, and creates a digital receipt with a transaction reference. **Start new transaction** clears the sale and returns to the menu.
