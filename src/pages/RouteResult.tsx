import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, MapPin, UtensilsCrossed, Map, ArrowLeft } from 'lucide-react';
import Navigation from '../components/shared/Navigation';
import { routes } from '../data/routes';
import type { Route } from '../types';
import './RouteResult.css';

export default function RouteResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  const duration = searchParams.get('duration');
  const region = searchParams.get('region');
  const vibe = searchParams.get('vibe');

  useEffect(() => {
    // Determine current time of day for food suggestions
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) setCurrentTime('manha');
    else if (hour >= 11 && hour < 15) setCurrentTime('almoco');
    else if (hour >= 15 && hour < 18) setCurrentTime('tarde');
    else if (hour >= 18 && hour < 21) setCurrentTime('jantar');
    else setCurrentTime('noite');

    // Find matching route
    const matchedRoute = routes.find(
      (route) =>
        route.region === region &&
        route.duration === duration &&
        route.vibe === vibe
    );

    if (matchedRoute) {
      setSelectedRoute(matchedRoute);
    } else {
      // If no exact match, try to find a route with same region and duration
      const partialMatch = routes.find(
        (route) => route.region === region && route.duration === duration
      );
      setSelectedRoute(partialMatch || routes[0]);
    }
  }, [duration, region, vibe]);

  if (!selectedRoute) {
    return (
      <div className="route-result theme-light">
        <Navigation />
        <div className="route-content">
          <p className="loading-text">Carregando roteiro...</p>
        </div>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
    selectedRoute.region + ', Salvador, Bahia'
  )}&zoom=15`;

  const getFoodSuggestion = () => {
    const suggestions = selectedRoute.food_suggestions;
    if (currentTime === 'manha' && suggestions.manha) return suggestions.manha;
    if (currentTime === 'almoco' && suggestions.almoco) return suggestions.almoco;
    if (currentTime === 'tarde' && suggestions.tarde) return suggestions.tarde;
    if (currentTime === 'jantar' && suggestions.jantar) return suggestions.jantar;
    if (currentTime === 'noite' && suggestions.noite) return suggestions.noite;

    // Fallback to any available suggestion
    return suggestions.almoco || suggestions.tarde || suggestions.noite || 'Consulte os restaurantes locais';
  };

  const getTimeLabel = () => {
    if (currentTime === 'manha') return 'Café da manhã';
    if (currentTime === 'almoco') return 'Almoço';
    if (currentTime === 'tarde') return 'Lanche da tarde';
    if (currentTime === 'jantar') return 'Jantar';
    return 'Noite';
  };

  return (
    <div className="route-result theme-light">
      <Navigation />

      <div className="route-result-header">
        <h1 className="route-result-title">
          Roteiro: {selectedRoute.region} - {selectedRoute.vibe}
        </h1>
        <div className="route-meta">
          <span className="meta-badge">
            <Clock size={18} />
            {selectedRoute.duration}
          </span>
          <span className="meta-badge">
            <MapPin size={18} />
            {selectedRoute.region}
          </span>
        </div>
      </div>

      <div className="route-container">
        <div className="route-steps">
          <h2 className="section-title-route">Passos do Roteiro</h2>
          {selectedRoute.steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h3 className="step-name">{step.name}</h3>
                <p className="step-description">{step.description}</p>
                <div className="step-footer">
                  <span className="step-time">
                    <Clock size={16} />
                    {step.time}
                  </span>
                  <a
                    href={step.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="step-maps-link"
                  >
                    <MapPin size={16} />
                    Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="map-section">
          <h2 className="section-title-route">
            <Map size={24} />
            Mapa da Região
          </h2>
          <div className="map-container">
            <iframe
              title="Mapa da região"
              src={mapUrl}
              className="map-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="food-section">
          <h2 className="section-title-route">
            <UtensilsCrossed size={24} />
            Sugestão de onde comer
          </h2>
          <div className="food-card">
            <div className="food-time">{getTimeLabel()}</div>
            <div className="food-suggestion">{getFoodSuggestion()}</div>
          </div>
        </div>

        <button
          className="btn-bahia-secondary back-btn-bottom"
          onClick={() => navigate('/questionario')}
        >
          <ArrowLeft size={20} />
          Voltar e escolher outro roteiro
        </button>
      </div>
    </div>
  );
}
