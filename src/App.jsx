import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import FarmerDashboard from "./pages/FarmerDashboard";
import VetDashboard from "./pages/VetDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CaseDetails from "./pages/CaseDetails";
import "./App.css";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeCaseId, setActiveCaseId] = useState(null);

  const handleNavigate = (page, param = null) => {
    if (page === "case-details" && param) {
      setActiveCaseId(param);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Global Responsive Navigation Bar */}
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {currentPage === "home" && <Home onNavigate={handleNavigate} />}
        {currentPage === "farmer" && (
          <FarmerDashboard 
            onNavigate={handleNavigate} 
            onSelectCase={(id) => handleNavigate("case-details", id)} 
          />
        )}
        {currentPage === "vet" && (
          <VetDashboard 
            onNavigate={handleNavigate} 
            onSelectCase={(id) => handleNavigate("case-details", id)} 
          />
        )}
        {currentPage === "official" && <OfficialDashboard onNavigate={handleNavigate} />}
        {currentPage === "login" && <Login onNavigate={handleNavigate} />}
        {currentPage === "register" && <Register onNavigate={handleNavigate} />}
        {currentPage === "case-details" && (
          <CaseDetails 
            caseId={activeCaseId} 
            onBack={() => handleNavigate("farmer")} 
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
