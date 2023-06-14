import React from "react";
import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./ApiResponsesTypes";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adpotedPet = useState(null as Pet | null);
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adpotedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                {" "}
                <h2 className="loader">🐶</h2>
              </div>
            }
          >
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
if (!container) throw new Error("No container to render to");
const root = createRoot(container);
root.render(<App />);
