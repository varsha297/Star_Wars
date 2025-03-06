//import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { BrowserRouter as Router, Routes, Route, createBrowserRouter, Outlet } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { FavouritesProvider } from "./context/FavoritesContext";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FavouritesProvider>
            <Navbar />
            <Outlet />
          </FavouritesProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

// return (
//   <QueryClientProvider client={queryClient}>
//     <FavouritesProvider>
//       <Routes>
//         <Route path="/" element={<CharacterList page={page} setPage={setPage} />} />
//         <Route path="/character/:id" element={<CharacterDetails />} />
//         <Route path="/favourites" element={<Favourites />} />
//       </Routes>
//     </FavouritesProvider>
//   </QueryClientProvider>
// );
export default App;



