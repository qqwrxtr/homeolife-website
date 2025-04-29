// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;