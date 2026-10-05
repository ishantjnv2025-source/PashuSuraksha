import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    appName: "PashuSuraksha",
    tagline: "Smart Livestock Health & Early-Warning Platform",
    navHome: "Home",
    navFarmerDashboard: "Farmer Portal",
    navVetDashboard: "Veterinary Portal",
    navOfficialDashboard: "Govt Surveillance",
    navEmergency: "1962 Emergency Hotline",
    login: "Log In",
    register: "Register",
    logout: "Log Out",
    welcome: "Welcome",
    quickRoleSwitch: "Switch Demo Role",
    reportSymptom: "Report Sick Animal",
    myCases: "My Case History",
    highRisk: "High Risk",
    mediumRisk: "Medium Risk",
    lowRisk: "Low Risk",
    triageScore: "Triage Severity",
    suspectedDisease: "Suspected Disease",
    assignedDoctor: "Assigned Veterinarian",
    statusReported: "Reported",
    statusReviewed: "Reviewed",
    statusAssigned: "Doctor Assigned",
    statusTreated: "Under Treatment",
    statusResolved: "Resolved",
    vaccinationHistory: "Vaccination & Health History",
    call1962: "Call Toll-Free 1962",
    mobileUnit: "Mobile Veterinary Unit",
    outbreakMap: "Outbreak Hotspot Map",
    surveillanceTitle: "District Disease Surveillance"
  },
  hi: {
    appName: "पशु सुरक्षा",
    tagline: "स्मार्ट पशु स्वास्थ्य एवं प्रारंभिक चेतावनी प्रणाली",
    navHome: "होम",
    navFarmerDashboard: "किसान पोर्टल",
    navVetDashboard: "पशु चिकित्सक पोर्टल",
    navOfficialDashboard: "सरकारी निगरानी",
    navEmergency: "1962 आपातकालीन सेवा",
    login: "लॉग इन",
    register: "पंजीकरण करें",
    logout: "लॉग आउट",
    welcome: "स्वागत है",
    quickRoleSwitch: "डेमो भूमिका बदलें",
    reportSymptom: "बीमार पशु की रिपोर्ट करें",
    myCases: "मेरे दर्ज मामले",
    highRisk: "उच्च जोखिम",
    mediumRisk: "मध्यम जोखिम",
    lowRisk: "कम जोखिम",
    triageScore: "गंभीरता स्कोर",
    suspectedDisease: "संभावित बीमारी",
    assignedDoctor: "नियुक्त पशु चिकित्सक",
    statusReported: "दर्ज किया गया",
    statusReviewed: "समीक्षित",
    statusAssigned: "डॉक्टर नियुक्त",
    statusTreated: "उपचार जारी",
    statusResolved: "समाधान हुआ",
    vaccinationHistory: "टीकाकरण एवं स्वास्थ्य इतिहास",
    call1962: "टोल-फ्री 1962 पर कॉल करें",
    mobileUnit: "मोबाइल वेटरनरी यूनिट",
    outbreakMap: "प्रकोप हॉटस्पॉट मानचित्र",
    surveillanceTitle: "जिला रोग निगरानी"
  },
  mr: {
    appName: "पशूसुरक्षा",
    tagline: "स्मार्ट पशुधन आरोग्य व पूर्वसूचना व्यासपीठ",
    navHome: "मुख्यपृष्ठ",
    navFarmerDashboard: "शेतकरी दालन",
    navVetDashboard: "पशुवैद्यकीय दालन",
    navOfficialDashboard: "शासकीय देखरेख",
    navEmergency: "1962 आपत्कालीन सेवा",
    login: "लॉग इन",
    register: "नोंदणी करा",
    logout: "बाहेर पडा",
    welcome: "स्वागत आहे",
    quickRoleSwitch: "डेमो भूमिका बदला",
    reportSymptom: "आजारी जनावराची तक्रार नोंदवा",
    myCases: "माझे नोंदवलेले खटले",
    highRisk: "उच्च धोका",
    mediumRisk: "मध्यम धोका",
    lowRisk: "कमी धोका",
    triageScore: "गंभीरता गुण",
    suspectedDisease: "संभाव्य आजार",
    assignedDoctor: "नेमलेले पशुवैद्यकीय अधिकारी",
    statusReported: "नोंदणी झाली",
    statusReviewed: "तपासणी झाली",
    statusAssigned: "डॉक्टर नेमले",
    statusTreated: "उपचार सुरू",
    statusResolved: "निकाली काढले",
    vaccinationHistory: "लसीकरण व आरोग्य नोंदवही",
    call1962: "टोल-फ्री 1962 वर संपर्क करा",
    mobileUnit: "फिरते पशुवैद्यकीय पथक",
    outbreakMap: "रोगप्रसार हॉटस्पॉट नकाशा",
    surveillanceTitle: "जिल्हास्तरीय रोगनिगराणी"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
