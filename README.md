# Star Wars Character Explorer

This project is a React application that allows users to explore Star Wars characters. It uses TypeScript, React Query, and Vite for a fast and efficient development experience.

## Features

- **Character List**: Browse a list of Star Wars characters with pagination.
- **Character Search**: Search for characters by name.
- **Character Details**: View detailed information about each character, including their homeworld, films, and starships.
- **Favorites**: Add characters to your favorites list.
- **Theme Toggle**: Switch between light and dark themes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **React Router**: A library for routing in React applications.
- **Jest**: A testing framework for JavaScript.
- **React Testing Library**: A library for testing React components.

## Why Use These Technologies?

- **React**: Provides a component-based architecture that makes it easy to build and maintain complex user interfaces.
- **TypeScript**: Adds static typing to JavaScript, which helps catch errors early and improves code quality.
- **Vite**: Offers a fast development experience with hot module replacement and optimized builds.
- **React Query**: Simplifies data fetching and caching, making it easy to manage server state in your application.
- **React Router**: Provides a declarative way to handle routing in your React application.
- **Jest** and **React Testing Library**: Provide a robust testing environment to ensure your application works as expected.

## How to Scale Using the Existing Tech Stack

1. **Component Reusability**: Break down the UI into reusable components to make it easier to manage and scale.
2. **State Management**: Use React Query for server state and consider using a state management library like Redux or Zustand for client state.
3. **Code Splitting**: Use dynamic imports and React's `Suspense` to load components only when needed, reducing the initial load time.
4. **Performance Optimization**: Use memoization techniques like `React.memo` and `useMemo` to prevent unnecessary re-renders.
5. **Testing**: Write comprehensive tests for our components and hooks to ensure they work correctly as your application grows.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/varsha297/Star_Wars.git
   cd Star_Wars
   npm i
   npm run dev
   npm run test
   npm run test:coverage
   ```
