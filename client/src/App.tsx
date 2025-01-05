import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CountryDetails from "./Pages/CountryDetails";

const Countries = lazy(() => import("./Pages/Countries"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:code" element={<CountryDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
