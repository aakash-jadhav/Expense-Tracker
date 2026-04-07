# Expense Tracker

A personal budgeting app built with React and Vite. Create a local “account” with your name, add budgets, log expenses, and review spending—all stored in your browser via `localStorage` (no backend).

**Live site:** [https://expense-info.netlify.app/](https://expense-info.netlify.app/)

## Features

- Dashboard with welcome flow and budget overview
- Create, view, and delete budgets
- Add expenses and tie them to budgets
- Recent expenses table and dedicated expenses page
- Logout clears local profile and data for this app

## Tech stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/) (loaders, actions, nested routes)
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [Heroicons](https://heroicons.com/) for UI icons

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build to `dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint               |

## Data storage

Budgets, expenses, and your display name are stored under keys in **browser localStorage**. Clearing site data or using another device or browser will not carry your data over.

## License

Private project (`"private": true` in `package.json`).
