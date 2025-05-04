import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CombinedHeroAbout from '.././CombineHeroAbout';
import ContactForm from '.././/ContactForm';

import HomeopathyBenefitsTable from '.././HomeopathyBenefitsTable';
import TestimonialsPreview from '.././Testimonials';

function Home() {

  const location = useLocation();
  
  // Handle scrolling to sections when navigating
  useEffect(() => {
    // Function to scroll to element by ID
    const scrollToElement = (id) => {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 500); // Longer delay for more reliable scrolling
      }
    };

    // Check for hash in URL (e.g., /#reviews)
    if (location.hash) {
      // Remove the # character
      const id = location.hash.substring(1);
      scrollToElement(id);
    } 
    // Check for state passed during navigation
    else if (location.state && location.state.scrollTo) {
      scrollToElement(location.state.scrollTo);
    } 
    // If no specific section requested, scroll to top
    else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div>
      <CombinedHeroAbout/>
      <HomeopathyBenefitsTable />
      <div id='reviews'>
        <TestimonialsPreview/>
      </div>
      <ContactForm/>
    </div>
  );
}

export default Home;
