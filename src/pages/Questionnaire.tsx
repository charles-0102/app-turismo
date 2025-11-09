import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="questionnaire">
      <div className="questionnaire-content">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Voltar
        </button>

        <h1 className="questionnaire-title">Monte seu roteiro</h1>
        <p className="questionnaire-subtitle">
          Responda algumas perguntas para receber o roteiro perfeito
        </p>

        <form onSubmit={handleSubmit} className="questionnaire-form">
          <div className="form-group">
            <label htmlFor="duration">Quantas horas você tem?</label>
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
            <label htmlFor="region">Qual região vai visitar?</label>
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
            <label htmlFor="vibe">Qual vibe da viagem?</label>
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

          <button type="submit" className="btn btn-primary">
            Ver Roteiro
          </button>
        </form>
      </div>
    </div>
  );
}
