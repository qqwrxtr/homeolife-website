import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Pages/Home';
import './i18n';

// Import your page components
// import MyApproach from './components/Pages/MyApproach';
// import WhatIsHomeopathy from './components/Pages/WhatIsHomeopathy';
// import HowIWork from './components/Pages/HowIWork';
// import Consultations from './components/Pages/Consultations';
// import Reviews from './components/Pages/Reviews';
// import Contacts from './components/Pages/Contacts';
// import UsefulInfo from './components/Pages/UsefulInfo';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsConditions from './components/Pages/TermsConditions';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/my-approach" element={<MyApproach />} />
          <Route path="/what-is-homeopathy" element={<WhatIsHomeopathy />} />
          <Route path="/how-i-work" element={<HowIWork />} />
          <Route path="/usefulInfo" element={<UsefulInfo />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/#reviews" element={<Reviews />} />
          <Route path="/#contacts" element={<Contacts />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;