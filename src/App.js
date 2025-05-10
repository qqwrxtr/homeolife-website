import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Pages/Home';
import ScrollToTop from './components/ScrollToTop';
import './i18n';

// Import your page components
import MyApproach from './components/Pages/MyAproach';
import WhatIsHomeopathy from './components/Pages/WhatIsHomeopathy';
import HowIWork from './components/Pages/HowIWork';
import Consultations from './components/Pages/Consultations';
import UsefulInfo from './components/Pages/UsefulInfo';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsConditions from './components/Pages/TermsConditions';
import Blog_1 from './components/Pages/Blogs/Blog_1';
import Blog_2 from './components/Pages/Blogs/Blog_2';
import Blog_3 from './components/Pages/Blogs/Blog_3';
import Blog_4 from './components/Pages/Blogs/Blog_4';
import Blog_5 from './components/Pages/Blogs/Blog_5';
import Blog_6 from './components/Pages/Blogs/Blog_6';
import Blog_7 from './components/Pages/Blogs/Blog_7';
import Blog_8 from './components/Pages/Blogs/Blog_8';
import Blog_9 from './components/Pages/Blogs/Blog_9';
import Blog_10 from './components/Pages/Blogs/Blog_10';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-approach" element={<MyApproach />} />
          <Route path="/what-is-homeopathy" element={<WhatIsHomeopathy />} />
          <Route path="/howIwork" element={<HowIWork />} />
          <Route path="/usefullInfo" element={<UsefulInfo />} />
          <Route path='/usefullInfo/1' element={<Blog_1/>} />
          <Route path='/usefullInfo/2' element={<Blog_2/>} />
          <Route path='/usefullInfo/3' element={<Blog_3/>} />
          <Route path='/usefullInfo/4' element={<Blog_4/>} />
          <Route path='/usefullInfo/5' element={<Blog_5/>} />
          <Route path='/usefullInfo/6' element={<Blog_6/>} />
          <Route path='/usefullInfo/7' element={<Blog_7/>} />
          <Route path='/usefullInfo/8' element={<Blog_8/>} />
          <Route path='/usefullInfo/9' element={<Blog_9/>} />
          <Route path='/usefullInfo/10' element={<Blog_10/>} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;