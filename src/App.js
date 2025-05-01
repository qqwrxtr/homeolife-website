import './App.css';
import CombinedHeroAbout from './components/CombineHeroAbout';
import Header from './components/Header';

import HomeopathyBenefitsTable from './components/HomeopathyBenefitsTable';
import './i18n';

function App() {
  return (
    <div className="App">
      <Header />
      <CombinedHeroAbout/>
      <HomeopathyBenefitsTable />
      <div className='h-screen'></div>
    </div>
  );
}

export default App;
