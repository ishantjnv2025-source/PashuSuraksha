import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { 
  ShieldAlert, 
  PhoneCall, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  Activity, 
  Stethoscope, 
  Building2, 
  Home as HomeIcon,
  ChevronDown
} from "lucide-react";

export default function Navbar({ onNavigate, currentPage }) {
  const { user, logout, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
      {/* 1962 Emergency Notification Bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-semibold tracking-wide">
              DAHD & Maharashtra 1962 Toll-Free Mobile Veterinary Emergency Service Active
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-white/90">SIH 2026 | PS ID: 26128 | Team Webflux</span>
            <a 
              href="tel:1962" 
              className="bg-white text-red-700 hover:bg-red-50 font-bold px-2.5 py-0.5 rounded-full text-[11px] inline-flex items-center gap-1 shadow-xs transition"
            >
              <PhoneCall className="w-3 h-3" /> Dial 1962
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNav("home")} 
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                {t("appName")}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Smart Livestock Health & Early-Warning
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav("home")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              currentPage === "home"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            {t("navHome")}
          </button>

          <button
            onClick={() => handleNav("farmer")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              currentPage === "farmer"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Activity className="w-4 h-4" />
            {t("navFarmerDashboard")}
          </button>

          <button
            onClick={() => handleNav("vet")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              currentPage === "vet"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            {t("navVetDashboard")}
          </button>

          <button
            onClick={() => handleNav("official")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              currentPage === "official"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Building2 className="w-4 h-4" />
            {t("navOfficialDashboard")}
          </button>
        </div>

        {/* Right Section: Language + Role Switcher + Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded ${language === "en" ? "bg-white text-emerald-700 shadow-xs font-bold" : "hover:text-slate-900"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2 py-0.5 rounded ${language === "hi" ? "bg-white text-emerald-700 shadow-xs font-bold" : "hover:text-slate-900"}`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-2 py-0.5 rounded ${language === "mr" ? "bg-white text-emerald-700 shadow-xs font-bold" : "hover:text-slate-900"}`}
            >
              MR
            </button>
          </div>

          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-semibold hover:bg-amber-100 transition"
              title="Quickly test between Farmer, Vet, and Govt views"
            >
              <span>Role: <strong className="capitalize">{user?.role || "Guest"}</strong></span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Demo Persona
                </div>
                <button
                  onClick={() => { switchRole("farmer"); onNavigate("farmer"); setRoleDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                >
                  <span>👨‍🌾 Farmer (Ramesh)</span>
                  {user?.role === "farmer" && <span className="text-emerald-600 font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { switchRole("veterinarian"); onNavigate("vet"); setRoleDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                >
                  <span>🩺 Veterinarian (Dr. Ananya)</span>
                  {user?.role === "veterinarian" && <span className="text-emerald-600 font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { switchRole("official"); onNavigate("official"); setRoleDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                >
                  <span>🏛️ Govt Officer (Rajesh IAS)</span>
                  {user?.role === "official" && <span className="text-emerald-600 font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[110px]">
                  {user.name}
                </p>
                <span className="text-[10px] text-slate-500 capitalize">{user.role}</span>
              </div>
              <button
                onClick={logout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav("login")}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
              >
                {t("login")}
              </button>
              <button
                onClick={() => handleNav("register")}
                className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition"
              >
                {t("register")}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:1962"
            className="bg-red-600 text-white p-2 rounded-lg shadow-xs flex items-center justify-center"
            title="Call 1962 Helpline"
          >
            <PhoneCall className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNav("home")}
              className={`p-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                currentPage === "home" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700"
              }`}
            >
              <HomeIcon className="w-4 h-4" /> {t("navHome")}
            </button>
            <button
              onClick={() => handleNav("farmer")}
              className={`p-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                currentPage === "farmer" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700"
              }`}
            >
              <Activity className="w-4 h-4" /> {t("navFarmerDashboard")}
            </button>
            <button
              onClick={() => handleNav("vet")}
              className={`p-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                currentPage === "vet" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700"
              }`}
            >
              <Stethoscope className="w-4 h-4" /> {t("navVetDashboard")}
            </button>
            <button
              onClick={() => handleNav("official")}
              className={`p-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                currentPage === "official" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4" /> {t("navOfficialDashboard")}
            </button>
          </div>

          {/* Language selector in mobile */}
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 font-medium">Language:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage("en")} 
                className={`px-2 py-1 rounded ${language === "en" ? "bg-emerald-600 text-white font-bold" : "bg-slate-100 text-slate-700"}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage("hi")} 
                className={`px-2 py-1 rounded ${language === "hi" ? "bg-emerald-600 text-white font-bold" : "bg-slate-100 text-slate-700"}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => setLanguage("mr")} 
                className={`px-2 py-1 rounded ${language === "mr" ? "bg-emerald-600 text-white font-bold" : "bg-slate-100 text-slate-700"}`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Mobile Role Switcher */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs font-bold text-amber-900 mb-2">Switch Demo Role:</p>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { switchRole("farmer"); onNavigate("farmer"); setMobileMenuOpen(false); }}
                className={`text-[11px] py-1 px-1.5 rounded font-medium ${user?.role === "farmer" ? "bg-amber-600 text-white" : "bg-white text-slate-700 border"}`}
              >
                Farmer
              </button>
              <button
                onClick={() => { switchRole("veterinarian"); onNavigate("vet"); setMobileMenuOpen(false); }}
                className={`text-[11px] py-1 px-1.5 rounded font-medium ${user?.role === "veterinarian" ? "bg-amber-600 text-white" : "bg-white text-slate-700 border"}`}
              >
                Veterinarian
              </button>
              <button
                onClick={() => { switchRole("official"); onNavigate("official"); setMobileMenuOpen(false); }}
                className={`text-[11px] py-1 px-1.5 rounded font-medium ${user?.role === "official" ? "bg-amber-600 text-white" : "bg-white text-slate-700 border"}`}
              >
                Official
              </button>
            </div>
          </div>

          {/* User Auth Buttons in Mobile */}
          {user ? (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="text-xs text-red-600 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleNav("login")}
                className="py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                {t("login")}
              </button>
              <button
                onClick={() => handleNav("register")}
                className="py-2 text-center text-xs font-bold text-white bg-emerald-600 rounded-lg"
              >
                {t("register")}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
