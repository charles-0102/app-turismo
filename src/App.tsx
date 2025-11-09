import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import RouteResult from './pages/RouteResult';
import DayTrips from './pages/DayTrips';
import TripPlanner from './pages/TripPlanner';
import MultiDayItinerary from './pages/MultiDayItinerary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planejar-viagem" element={<TripPlanner />} />
        <Route path="/itinerario" element={<MultiDayItinerary />} />
        <Route path="/questionario" element={<Questionnaire />} />
        <Route path="/roteiro" element={<RouteResult />} />
        <Route path="/bate-e-volta" element={<DayTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
