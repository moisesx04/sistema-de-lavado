
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Ticket, 
  Settings, 
  Calculator, 
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useApp } from '../hooks/useApp';

export default function DashboardLayout() {
  const { resetData } = useApp();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p || (p !== '/dashboard' && path.startsWith(p));

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>WASHFLOW <span className="gradient-text">PRO</span></h1>
          <p>Gestión de Lavado</p>
        </div>
        
        <nav className="nav-links">
          <Link to="/dashboard" className={`nav-item ${path === '/dashboard' ? 'active' : ''}`}>
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard/tickets" className={`nav-item ${isActive('/dashboard/tickets') ? 'active' : ''}`}>
            <Ticket size={20} />
            <span>Ventas</span>
          </Link>
          <Link to="/dashboard/washers" className={`nav-item ${isActive('/dashboard/washers') ? 'active' : ''}`}>
            <Users size={20} />
            <span>Lavadores</span>
          </Link>
          <Link to="/dashboard/services" className={`nav-item ${isActive('/dashboard/services') ? 'active' : ''}`}>
            <Settings size={20} />
            <span>Servicios</span>
          </Link>
          <Link to="/dashboard/reports" className={`nav-item ${isActive('/dashboard/reports') ? 'active' : ''}`}>
            <Calculator size={20} />
            <span>Nómina</span>
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <div style={{ background: 'rgba(37, 99, 235, 0.05)', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 12px var(--primary)' }}></div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--primary)' }}>MODO DEMO ACTIVA</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Los datos se limpian automáticamente cada 20 min.
            </p>
          </div>
          <button 
            onClick={() => { if(confirm('¿Deseas resetear todos los datos de la demo?')) resetData(); }} 
            className="nav-item" 
            style={{ color: 'var(--accent)', background: 'transparent' }}
          >
            <Calculator size={20} />
            <span>Resetear Demo</span>
          </button>
        </div>

        {/* Logout removed as per user request */}
      </aside>

      <main className="main-content">
        <header className="header-content">
          <div>
            <h2>Panel de Control</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Monitoreo inteligente de operaciones</p>
          </div>
          <div className="date-badge">
            <Calendar size={16} color="var(--primary)" />
            <span>{format(new Date(), 'eeee, dd MMMM', { locale: es })}</span>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
