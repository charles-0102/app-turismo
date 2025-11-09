import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Zap, Ship, Menu, X, Palmtree } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Início', Icon: Home },
    { path: '/planejar-viagem', label: 'Planejar Viagem', Icon: Calendar },
    { path: '/questionario', label: 'Roteiro Rápido', Icon: Zap },
    { path: '/bate-e-volta', label: 'Bate e Volta', Icon: Ship },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <Palmtree size={24} />
          Salvador Explorer
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item) => {
            const Icon = item.Icon;
            return (
              <li key={item.path}>
                <button
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
