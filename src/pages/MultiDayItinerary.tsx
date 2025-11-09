import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Hourglass, Sparkles, Calendar, MapPin, Palette, Clock, BarChart,
  ChevronDown, ChevronRight, Sunrise, Sun, Moon,
  Timer, DollarSign, Utensils, Car, UtensilsCrossed, Wine,
  Ticket, Banknote, Lightbulb, Droplet, Smartphone, ShieldAlert,
  RefreshCw, Map as MapIcon
} from 'lucide-react';
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
    if (period === 'morning') return <Sunrise size={20} />;
    if (period === 'afternoon') return <Sun size={20} />;
    return <Moon size={20} />;
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
          <div className="loading-spinner"><Hourglass size={48} /></div>
          <p>Gerando seu roteiro personalizado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-page theme-light">
      <Navigation />

      <div className="itinerary-header">
        <h1 className="itinerary-title">
          <Sparkles size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Seu Roteiro Personalizado
        </h1>
        <div className="itinerary-meta">
          <span className="meta-item">
            <Calendar size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {trip.totalDays} dias em Salvador
          </span>
          <span className="meta-item">
            <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {trip.regions.join(' • ')}
          </span>
          <span className="meta-item">
            <Palette size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {trip.style}
          </span>
          <span className="meta-item">
            <Clock size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Ritmo {trip.pace}
          </span>
        </div>
      </div>

      <div className="itinerary-container">
        {/* Visão geral */}
        <section className="overview-section">
          <h2 className="section-heading">
            <BarChart size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Visão Geral
          </h2>
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
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
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
                              <Clock size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">
                                <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.name}
                              </h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">
                                  <Timer size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.duration}
                                </span>
                                {activity.entryFee && activity.entryFee > 0 && (
                                  <span className="activity-fee">
                                    <DollarSign size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {formatCurrency(activity.entryFee)}
                                  </span>
                                )}
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  <MapIcon size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.morning.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">
                            <Utensils size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Café da Manhã / Brunch
                          </h5>
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
                          <Car size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Deslocamento: {day.afternoon.travelTimeFromPrevious}
                        </div>
                      )}

                      <div className="activities-list">
                        {day.afternoon.activities.map((activity) => (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              <Clock size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">
                                <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.name}
                              </h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">
                                  <Timer size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.duration}
                                </span>
                                {activity.entryFee && activity.entryFee > 0 && (
                                  <span className="activity-fee">
                                    <DollarSign size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {formatCurrency(activity.entryFee)}
                                  </span>
                                )}
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  <MapIcon size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.afternoon.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">
                            <UtensilsCrossed size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Almoço
                          </h5>
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
                        <div className="weather-tip">
                          <Sun size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {day.afternoon.weatherTip}
                        </div>
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
                          <Car size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Deslocamento: {day.evening.travelTimeFromPrevious}
                        </div>
                      )}

                      <div className="activities-list">
                        {day.evening.activities.map((activity) => (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              <Clock size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="activity-content">
                              <h5 className="activity-name">
                                <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.name}
                              </h5>
                              <p className="activity-description">{activity.description}</p>
                              <div className="activity-footer">
                                <span className="activity-duration">
                                  <Timer size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {activity.duration}
                                </span>
                                <a
                                  href={activity.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="activity-maps"
                                >
                                  <MapIcon size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Ver no Maps
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.evening.foodSuggestion && (
                        <div className="food-card">
                          <h5 className="food-title">
                            <Wine size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Jantar
                          </h5>
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
          <h2 className="section-heading">
            <DollarSign size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Estimativa de Custos
          </h2>
          <div className="cost-grid">
            <div className="cost-item">
              <span className="cost-label">
                <Utensils size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Alimentação
              </span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.food)}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">
                <Car size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Transporte
              </span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.transport)}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">
                <Ticket size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Entradas
              </span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.entries)}</span>
            </div>
            <div className="cost-item total">
              <span className="cost-label">
                <Banknote size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Total
              </span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.total)}</span>
            </div>
            <div className="cost-item per-day">
              <span className="cost-label">
                <BarChart size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Por dia
              </span>
              <span className="cost-value">{formatCurrency(trip.estimatedCost.perDay)}</span>
            </div>
          </div>
        </section>

        {/* Dicas gerais */}
        <section className="tips-section">
          <h2 className="section-heading">
            <Lightbulb size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Dicas Gerais
          </h2>
          <ul className="tips-list">
            <li>
              <Sun size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Use protetor solar! O sol de Salvador é forte o ano todo
            </li>
            <li>
              <Droplet size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Mantenha-se sempre hidratado, especialmente no verão
            </li>
            <li>
              <Banknote size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Tenha dinheiro em espécie - nem todos os lugares aceitam cartão
            </li>
            <li>
              <Smartphone size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Salve este roteiro ou tire prints para acessar offline
            </li>
            <li>
              <ShieldAlert size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Evite exibir objetos de valor em locais muito movimentados
            </li>
            <li>
              <Clock size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Salvador tem horário de Brasília (GMT-3)
            </li>
          </ul>
        </section>

        {/* Ações */}
        <div className="actions">
          <button
            onClick={() => navigate('/planejar-viagem')}
            className="btn-bahia-secondary"
          >
            <RefreshCw size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Criar Novo Roteiro
          </button>
        </div>
      </div>
    </div>
  );
}
