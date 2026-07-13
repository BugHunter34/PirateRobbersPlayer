import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PlayerPage from './pages/Player';
import NotFoundPage from './pages/404page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;