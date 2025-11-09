import { useNavigate } from 'react-router-dom';
import { Palmtree, CalendarDays, Zap, Ship, Target, DollarSign, Map, UtensilsCrossed, Check } from 'lucide-react';
import Navigation from '../components/shared/Navigation';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-new theme-light">
      <Navigation />

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <Palmtree size={48} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Explore Salvador do seu jeito
          </h1>
          <p className="hero-subtitle">
            Roteiros personalizados para descobrir o melhor da Bahia
          </p>
        </div>
      </div>

      <div className="home-container">
        <section className="options-section">
          <h2 className="section-title-home">Como você quer explorar Salvador?</h2>

          <div className="options-grid">
            <div className="option-card featured" onClick={() => navigate('/planejar-viagem')}>
              <div className="option-icon"><CalendarDays size={64} /></div>
              <h3 className="option-title">Planejar Viagem Completa</h3>
              <p className="option-description">
                Crie um roteiro detalhado de 2 a 4 dias com horários, regiões e sugestões de alimentação
              </p>
              <div className="option-features">
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Multi-dias</span>
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Personalizado</span>
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Completo</span>
              </div>
              <button className="btn-bahia-primary option-btn">
                Começar Planejamento
              </button>
            </div>

            <div className="option-card" onClick={() => navigate('/questionario')}>
              <div className="option-icon"><Zap size={64} /></div>
              <h3 className="option-title">Roteiro Rápido</h3>
              <p className="option-description">
                Perfeito para quem tem algumas horas e quer explorar uma região específica
              </p>
              <div className="option-features">
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> 1-4 horas</span>
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Rápido</span>
              </div>
              <button className="btn-bahia-secondary option-btn">
                Criar Roteiro Rápido
              </button>
            </div>

            <div className="option-card" onClick={() => navigate('/bate-e-volta')}>
              <div className="option-icon"><Ship size={64} /></div>
              <h3 className="option-title">Bate e Volta</h3>
              <p className="option-description">
                Destinos incríveis próximos a Salvador para passeios de um dia
              </p>
              <div className="option-features">
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Praias</span>
                <span className="feature-tag"><Check size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Ilhas</span>
              </div>
              <button className="btn-bahia-secondary option-btn">
                Ver Destinos
              </button>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title-home">Por que usar nosso planejador?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon"><Target size={48} /></div>
              <h4>Personalizado</h4>
              <p>Roteiros adaptados ao seu tempo, estilo e preferências</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><DollarSign size={48} /></div>
              <h4>Estimativa de Custos</h4>
              <p>Saiba quanto vai gastar em cada dia da viagem</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Map size={48} /></div>
              <h4>Mapas Integrados</h4>
              <p>Links diretos para Google Maps em cada atração</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><UtensilsCrossed size={48} /></div>
              <h4>Dicas Gastronômicas</h4>
              <p>Sugestões de onde comer em cada período do dia</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
