# 🍲 FE Recipes App

A frontend application for browsing, filtering, liking, and adding recipes using React, Vite, and TanStack tools.

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **UI Components**: Radix UI + Custom Components

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:HaidaDaniel/recipes.git
cd recipes
```

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env` file based on the `.env.example`:

```
VITE_API_BASE_URL=
```

### 4. Run the app in development

```bash
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Features

- Infinite scroll of recipes (masonry-style layout)
- Filtering recipes via modal (search, max cooking time, min ingredients)
- Likes with optimistic UI and login check
- Auth flow: sign up / login with JWT handling
- Add recipe (with dynamic ingredients input) — auth protected
- Clear navigation and protected routes
- Persistent filters across pagination
- Loader spinners and toast notifications for feedback
- Clean structure, reusable components, proper error handling

---

## 🧪 Optional Tests

Tests are not implemented in this task, but the structure can be expanded using:

- `React Testing Library` for UI components
- `Vitest` or `Jest` for unit/integration tests

---

## 🗂️ Project Structure

```
src/
├── api/              # Axios requests
├── components/       # Shared UI components (Button, FormInput, etc.)
├── context/          # Auth provider
├── layout/           # Main layout with navbar, auth UI
├── lib/              # Utilities and helpers
├── pages/            # Page-level components (Home, Login, SignUp, AddRecipe)
├── types/            # Zod schemas and form types
```
