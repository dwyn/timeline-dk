import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import TimelinePage from './pages/Timeline/TimelinePage';
import { ComplexNavbar } from './components/ComplexNavbar/ComplexNavbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <ComplexNavbar className="fixed top-0 left-0 right-0 z-50" />
        <div className="container mx-auto pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/timeline" element={<TimelinePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
