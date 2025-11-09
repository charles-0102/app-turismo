import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';
import type { MultiDayTrip, RegionHours, TravelStyle, TravelPace } from '../types/multiday';
import { generateItinerary } from '../utils/itineraryGenerator';
import { formatCurrency } from '../utils/costEstimator';
import './MultiDayItinerary.css';

export default function MultiDayItinerary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<MultiDayTrip | null>(null);
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const days = parseInt(searchParams.get('days') || '3');
      const regions: RegionHours[] = JSON.parse(searchParams.get('regions') || '[]');
      const style = (searchParams.get('style') || 'Misto') as TravelStyle;
      const pace = (searchParams.get('pace') || 'Moderado') as TravelPace;

      if (regions.length < 2) {
        navigate('/planejar-viagem');
        return;
      }

      const generatedTrip = generateItinerary(days, regions, style, pace);
      setTrip(generatedTrip);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao gerar itinerário:', error);
      navigate('/planejar-viagem');
    }
  }, [searchParams, navigate]);

  const toggleDay = (dayNumber: number) => {
    if (expandedDays.includes(dayNumber)) {
      setExpandedDays(expandedDays.filter((d) => d !== dayNumber));
    } else {
      setExpandedDays([...expandedDays, dayNumber]);
    }
  };

  const getPeriodIcon = (period: 'morning' | 'afternoon' | 'evening') => {
    if (period === 'morning') return '🌅';
    if (period === 'afternoon') return '☀️';
    return '🌙';
  };

  const getPeriodLabel = (period: 'morning' | 'afternoon' | 'evening') => {
    if (period === 'morning') return 'Manhã (9h - 12h)';
    if (period === 'afternoon') return 'Tarde (13h - 18h)';
    return 'Noite (19h - 22h)';
  };

  if (isLoading || !trip) {
    return (
      <div className="itinerary-page theme-light">
        <Navigation />
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Gerando seu roteiro personalizado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-page theme-light">
      <Navigation />

      <div className="itinerary-header">
        <h1 className="itinerary-title">🎉 Seu Roteiro Personalizado</h1>
        <div className="itinerary-meta">
          <span className="meta-item">📅 {trip.totalDays} dias em Salvador</span>
          <span className="meta-item">📍 {trip.regions.join(' • ')}</span>
          <span className="meta-item">🎭 {trip.style}</span>
          <span className="meta-item">⏱️ Ritmo {trip.pace}</span>
        </div>
      </div>

      <div className="itinerary-container">
        {/* Visão geral */}
        <section className="overview-section">
          <h2 className="section-heading">📊 Visão Geral</h2>
          <div className="overview-days">
            {trip.dailyItinerary.map((day) => (
              <div key={day.dayNumber} className="overview-day">
                <div className="overview-day-number">Dia {day.dayNumber}</div>
                <div className="overview-day-region">{day.mainRegion}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerário por dia */}
        {trip.dailyItinerary.map((day) => {
          const isExpanded = expandedDays.includes(day.dayNumber);

          return (
            <div key={day.dayNumber} className="day-card">
              <div
                className="day-card-header"
                onClick={() => toggleDay(day.dayNumber)}
              >
                <div className="day-header-left">
                  <span className="day-badge">Dia {day.dayNumber}</span>
                  <h3 className="day-title">{day.mainRegion}</h3>
                </div>
                <button className="expand-btn" aria-label="Expandir dia">
                  {isExpanded ? '▼' : '▶'}
                </button>
              </div>

              {isExpanded && (
                <div className="day-card-content">
                  {/* Manhã */}
                  {day.morning.activities.length > 0 && (
                    <div className="period-section morning">
                      <h4 className="period-title">
                        {getPeriodIcon('morning')} {getPeriodLabel('morning')}
                      </h4>

                      <div className="activities-list">
                        {day.morning.activities.map((activity) => (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              ⏰ {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">📍 {activity.name}</h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">⏱️ {activity.duration}</span>
                                {activity.entryFee && activity.entryFee > 0 && (
                                  <span className="activity-fee">
                                    💰 {formatCurrency(activity.entryFee)}
                                  </span>
                                )}
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  📍 Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.morning.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">🍴 Café da Manhã / Brunch</h5>
                          <p className="food-place">{day.morning.foodSuggestion.placeName}</p>
                          <p className="food-description">{day.morning.foodSuggestion.description}</p>
                          <div className="food-details">
                            <span>{day.morning.foodSuggestion.cuisine}</span>
                            <span>•</span>
                            <span>{day.morning.foodSuggestion.priceRange}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tarde */}
                  {day.afternoon.activities.length > 0 && (
                    <div className="period-section afternoon">
                      <h4 className="period-title">
                        {getPeriodIcon('afternoon')} {getPeriodLabel('afternoon')}
                      </h4>

                      {day.afternoon.travelTimeFromPrevious && (
                        <div className="travel-notice">
                          🚕 Deslocamento: {day.afternoon.travelTimeFromPrevious}
                        </div>
                      )}

                      <div className="activities-list">
                        {day.afternoon.activities.map((activity) => (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              ⏰ {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">📍 {activity.name}</h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">⏱️ {activity.duration}</span>
                                {activity.entryFee && activity.entryFee > 0 && (
                                  <span className="activity-fee">
                                    💰 {formatCurrency(activity.entryFee)}
                                  </span>
                                )}
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  📍 Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.afternoon.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">🍽️ Almoço</h5>
                          <p className="food-place">{day.afternoon.foodSuggestion.placeName}</p>
                          <p className="food-description">{day.afternoon.foodSuggestion.description}</p>
                          <div className="food-details">
                            <span>{day.afternoon.foodSuggestion.cuisine}</span>
                            <span>•</span>
                            <span>{day.afternoon.foodSuggestion.priceRange}</span>
                          </div>
                        </div>
                      )}

                      {day.afternoon.weatherTip && (
                        <div className="weather-tip">☀️ {day.afternoon.weatherTip}</div>
                      )}
                    </div>
                  )}

                  {/* Noite */}
                  {day.evening.activities.length > 0 && (
                    <div className="period-section evening">
                      <h4 className="period-title">
                        {getPeriodIcon('evening')} {getPeriodLabel('evening')}
                      </h4>

                      {day.evening.travelTimeFromPrevious && (
                        <div className="travel-notice">
                          🚕 Deslocamento: {day.evening.travelTimeFromPrevious}
                        </div>
                      )}

                      <div className="activities-list">
                        {day.evening.activities.map((activity) => (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              ⏰ {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">📍 {activity.name}</h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">⏱️ {activity.duration}</span>
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  📍 Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.evening.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">🍷 Jantar</h5>
                          <p className="food-place">{day.evening.foodSuggestion.placeName}</p>
                          <p className="food-description">{day.evening.foodSuggestion.description}</p>
                          <div className="food-details">
                            <span>{day.evening.foodSuggestion.cuisine}</span>
                            <span>•</span>
                            <span>{day.evening.foodSuggestion.priceRange}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Resumo de custos */}
        <section className="cost-section">
          <h2 className="section-heading">💰 Estimativa de Custos</h2>
          <div className="cost-grid">
            <div className="cost-item">
              <span className="cost-label">🍴 Alimentação</span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.food)}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">🚕 Transporte</span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.transport)}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">🎫 Entradas</span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.entries)}</span>
            </div>
            <div className="cost-item total">
              <span className="cost-label">💵 Total</span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.total)}</span>
            </div>
            <div className="cost-item per-day">
              <span className="cost-label">📊 Por dia</span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.perDay)}</span>
            </div>
          </div>
        </section>

        {/* Dicas gerais */}
        <section className="tips-section">
          <h2 className="section-heading">💡 Dicas Gerais</h2>
          <ul className="tips-list">
            <li>🌞 Use protetor solar! O sol de Salvador é forte o ano todo</li>
            <li>💧 Mantenha-se sempre hidratado, especialmente no verão</li>
            <li>💵 Tenha dinheiro em espécie - nem todos os lugares aceitam cartão</li>
            <li>📱 Salve este roteiro ou tire prints para acessar offline</li>
            <li>👮 Evite exibir objetos de valor em locais muito movimentados</li>
            <li>🕐 Salvador tem horário de Brasília (GMT-3)</li>
          </ul>
        </section>

        {/* Ações */}
        <div className="actions">
          <button
            onClick={() => navigate('/planejar-viagem')}
            className="btn-bahia-secondary"
          >
            🔄 Criar Novo Roteiro
          </button>
        </div>
      </div>
    </div>
  );
}
