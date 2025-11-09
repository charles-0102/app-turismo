import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import RouteResult from './pages/RouteResult';
import DayTrips from './pages/DayTrips';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionario" element={<Questionnaire />} />
        <Route path="/roteiro" element={<RouteResult />} />
        <Route path="/bate-e-volta" element={<DayTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
