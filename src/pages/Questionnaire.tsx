import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import Navigation from '../components/shared/Navigation';
import type { Duration, Region, Vibe } from '../types';
import './Questionnaire.css';

export default function Questionnaire() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState<Duration>('2h');
  const [region, setRegion] = useState<Region>('Pelourinho');
  const [vibe, setVibe] = useState<Vibe>('Cultural');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/roteiro?duration=${duration}&region=${region}&vibe=${vibe}`);
  };

  return (
    <div className="questionnaire theme-light">
      <Navigation />

      <div className="questionnaire-header">
        <h1 className="questionnaire-title">Monte seu roteiro rápido</h1>
        <p className="questionnaire-subtitle">
          Responda algumas perguntas para receber o roteiro perfeito
        </p>
      </div>

      <div className="questionnaire-container">
        <form onSubmit={handleSubmit} className="questionnaire-form">
          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              <Clock size={20} />
              Quantas horas você tem?
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value as Duration)}
              className="form-select"
            >
              <option value="1h">1 hora</option>
              <option value="2h">2 horas</option>
              <option value="3h">3 horas</option>
              <option value="4h">4 horas</option>
              <option value="Dia inteiro">Dia inteiro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="region" className="form-label">
              <MapPin size={20} />
              Qual região vai visitar?
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="form-select"
            >
              <option value="Pelourinho">Pelourinho</option>
              <option value="Carmo">Carmo</option>
              <option value="Rio Vermelho">Rio Vermelho</option>
              <option value="Farol da Barra">Farol da Barra</option>
              <option value="Cidade Baixa">Cidade Baixa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vibe" className="form-label">
              <Sparkles size={20} />
              Qual vibe da viagem?
            </label>
            <select
              id="vibe"
              value={vibe}
              onChange={(e) => setVibe(e.target.value as Vibe)}
              className="form-select"
            >
              <option value="Cultural">Cultural</option>
              <option value="Gastronomia">Gastronomia</option>
              <option value="Fotos / Instagram">Fotos / Instagram</option>
              <option value="Caminhada leve">Caminhada leve</option>
            </select>
          </div>

          <button type="submit" className="btn-bahia-primary submit-btn">
            Ver Roteiro
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
