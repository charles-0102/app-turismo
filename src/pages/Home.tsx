import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">Explore Salvador do seu jeito</h1>
        <p className="home-subtitle">
          Selecione sua rota ideal para explorar Salvador
        </p>
        <p className="home-description">
          Descubra os melhores roteiros personalizados de acordo com o tempo
          que você tem disponível, a região que deseja visitar e o estilo da
          sua viagem.
        </p>
        <div className="home-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/questionario')}
          >
            Criar Roteiro Agora
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/bate-e-volta')}
          >
            Ver Bate e Volta
          </button>
        </div>
      </div>
    </div>
  );
}
