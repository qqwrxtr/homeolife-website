import './App.css';
import CombinedHeroAbout from './components/CombineHeroAbout';
import ContactForm from './components/ContactForm';
import Header from './components/Header';

import HomeopathyBenefitsTable from './components/HomeopathyBenefitsTable';
import TestimonialsPreview from './components/Testimonials';
import './i18n';

function App() {
  return (
    <div className="App">
      <Header />
      <CombinedHeroAbout/>
      <HomeopathyBenefitsTable />
      <TestimonialsPreview/>
      <ContactForm/>
    </div>
  );
}

export default App;
