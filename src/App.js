import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import './i18n';
import HomeopathyBenefitsTable from './components/HomeopathyBenefitsTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <AboutSection />
      <HomeopathyBenefitsTable/>
    </div>
  );
}

export default App;
