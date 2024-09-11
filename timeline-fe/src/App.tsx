import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Home from './Home';
import TimelinePage from './TimelinePage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Me</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
