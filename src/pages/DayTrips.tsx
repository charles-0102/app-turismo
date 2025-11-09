import { useNavigate } from 'react-router-dom';
import { dayTrips } from '../data/dayTrips';
import './DayTrips.css';

export default function DayTrips() {
  const navigate = useNavigate();

  return (
    <div className="day-trips">
      <div className="day-trips-content">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Voltar
        </button>

        <h1 className="day-trips-title">Bate e Volta saindo de Salvador</h1>
        <p className="day-trips-subtitle">
          Explore destinos incríveis próximos a Salvador para um passeio de um dia
        </p>

        <div className="trips-grid">
          {dayTrips.map((trip, index) => (
            <div key={index} className="trip-card">
              <h3 className="trip-name">{trip.name}</h3>
              <div className="trip-info">
                <div className="trip-detail">
                  <span className="trip-label">⏱️ Tempo:</span>
                  <span className="trip-value">{trip.tempo}</span>
                </div>
                <div className="trip-detail">
                  <span className="trip-label">🚌 Como chegar:</span>
                  <span className="trip-value">{trip.como_chegar}</span>
                </div>
              </div>
              <a
                href={trip.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="trip-maps-link"
              >
                📍 Ver no Google Maps
              </a>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/questionario')}
        >
          Criar Roteiro em Salvador
        </button>
      </div>
    </div>
  );
}
