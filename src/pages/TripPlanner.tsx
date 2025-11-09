import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';
import type { TravelStyle, TravelPace, RegionHours } from '../types/multiday';
import './TripPlanner.css';

const REGIONS = [
  { name: 'Pelourinho', description: 'Centro histórico e cultura' },
  { name: 'Rio Vermelho', description: 'Gastronomia e vida noturna' },
  { name: 'Farol da Barra', description: 'Praias e pôr do sol' },
  { name: 'Cidade Baixa', description: 'Comércio e história' },
  { name: 'Carmo', description: 'Arquitetura colonial' },
];

export default function TripPlanner() {
  const navigate = useNavigate();
  const [tripDays, setTripDays] = useState<number>(3);
  const [selectedRegions, setSelectedRegions] = useState<RegionHours[]>([]);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Misto');
  const [travelPace, setTravelPace] = useState<TravelPace>('Moderado');

  const toggleRegion = (regionName: string) => {
    const exists = selectedRegions.find((r) => r.region === regionName);

    if (exists) {
      setSelectedRegions(selectedRegions.filter((r) => r.region !== regionName));
    } else {
      setSelectedRegions([
        ...selectedRegions,
        { region: regionName, hours: 4, selected: true },
      ]);
    }
  };

  const updateRegionHours = (regionName: string, hours: number) => {
    setSelectedRegions(
      selectedRegions.map((r) =>
        r.region === regionName ? { ...r, hours } : r
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRegions.length < 2) {
      alert('Selecione pelo menos 2 regiões');
      return;
    }

    // Navegar para página de itinerário com dados
    const params = new URLSearchParams({
      days: tripDays.toString(),
      regions: JSON.stringify(selectedRegions),
      style: travelStyle,
      pace: travelPace,
    });

    navigate(`/itinerario?${params.toString()}`);
  };

  const isFormValid = selectedRegions.length >= 2;

  return (
    <div className="trip-planner theme-light">
      <Navigation />

      <div className="planner-hero">
        <h1 className="planner-title">✈️ Planeje sua Viagem Completa</h1>
        <p className="planner-subtitle">
          Crie um roteiro personalizado de 2 a 4 dias explorando o melhor de Salvador
        </p>
      </div>

      <div className="planner-container">
        <form onSubmit={handleSubmit} className="planner-form">
          {/* PASSO 1: Duração */}
          <section className="form-section">
            <h2 className="section-title">📅 Passo 1: Duração da Viagem</h2>
            <div className="days-selector">
              {[2, 3, 4].map((days) => (
                <button
                  key={days}
                  type="button"
                  className={`day-option ${tripDays === days ? 'selected' : ''}`}
                  onClick={() => setTripDays(days)}
                >
                  <span className="day-number">{days}</span>
                  <span className="day-label">dias</span>
                </button>
              ))}
            </div>
          </section>

          {/* PASSO 2: Regiões */}
          <section className="form-section">
            <h2 className="section-title">🗺️ Passo 2: Regiões de Interesse</h2>
            <p className="section-hint">Selecione pelo menos 2 regiões</p>

            <div className="regions-grid">
              {REGIONS.map((region) => {
                const isSelected = selectedRegions.some((r) => r.region === region.name);
                const regionData = selectedRegions.find((r) => r.region === region.name);

                return (
                  <div key={region.name} className="region-card">
                    <div
                      className={`region-header ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleRegion(region.name)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRegion(region.name)}
                        className="region-checkbox"
                      />
                      <div className="region-info">
                        <h3 className="region-name">{region.name}</h3>
                        <p className="region-description">{region.description}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="region-hours">
                        <label htmlFor={`hours-${region.name}`}>
                          Horas nesta região: <strong>{regionData?.hours}h</strong>
                        </label>
                        <input
                          id={`hours-${region.name}`}
                          type="range"
                          min="2"
                          max="8"
                          value={regionData?.hours || 4}
                          onChange={(e) =>
                            updateRegionHours(region.name, parseInt(e.target.value))
                          }
                          className="hours-slider"
                        />
                        <div className="hours-labels">
                          <span>2h</span>
                          <span>8h</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* PASSO 3: Estilo */}
          <section className="form-section">
            <h2 className="section-title">🎭 Passo 3: Estilo da Viagem</h2>
            <div className="style-grid">
              {(['Cultural', 'Gastronomia', 'Fotos / Instagram', 'Caminhada leve', 'Misto'] as TravelStyle[]).map(
                (style) => (
                  <button
                    key={style}
                    type="button"
                    className={`style-card ${travelStyle === style ? 'selected' : ''}`}
                    onClick={() => setTravelStyle(style)}
                  >
                    <span className="style-icon">
                      {style === 'Cultural' && '🏛️'}
                      {style === 'Gastronomia' && '🍽️'}
                      {style === 'Fotos / Instagram' && '📸'}
                      {style === 'Caminhada leve' && '🚶'}
                      {style === 'Misto' && '🌟'}
                    </span>
                    <span className="style-name">{style}</span>
                  </button>
                )
              )}
            </div>
          </section>

          {/* PASSO 4: Ritmo */}
          <section className="form-section">
            <h2 className="section-title">⏱️ Passo 4: Ritmo da Viagem</h2>
            <div className="pace-options">
              {(['Relaxado', 'Moderado', 'Intenso'] as TravelPace[]).map((pace) => (
                <label key={pace} className={`pace-option ${travelPace === pace ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="pace"
                    value={pace}
                    checked={travelPace === pace}
                    onChange={() => setTravelPace(pace)}
                  />
                  <div className="pace-content">
                    <span className="pace-icon">
                      {pace === 'Relaxado' && '🐢'}
                      {pace === 'Moderado' && '🚶'}
                      {pace === 'Intenso' && '🏃'}
                    </span>
                    <span className="pace-name">{pace}</span>
                    <span className="pace-description">
                      {pace === 'Relaxado' && 'Mais tempo, menos lugares'}
                      {pace === 'Moderado' && 'Equilíbrio perfeito'}
                      {pace === 'Intenso' && 'Conhecer o máximo possível'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Botão Submit */}
          <button
            type="submit"
            className="btn-bahia-primary submit-btn"
            disabled={!isFormValid}
          >
            🎯 Gerar Meu Roteiro Personalizado
          </button>

          {!isFormValid && (
            <p className="form-error">⚠️ Selecione pelo menos 2 regiões para continuar</p>
          )}
        </form>
      </div>
    </div>
  );
}
