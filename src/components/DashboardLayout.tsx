
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

export default function DashboardLayout() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p || (p !== '/dashboard' && path.startsWith(p));

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo text-center">
          <h1 style={{ textAlign: 'center' }}>WASHFLOW <span className="gradient-text">PRO</span></h1>
          <p style={{ textAlign: 'center' }}>Executive Analytics</p>
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

        {/* Logout removed as per user request */}
      </aside>

      <main className="main-content">
        <header className="header-content">
          <div>
            <h2 style={{ textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: '2rem' }}>Panel de Control</h2>
            <p>Monitoreo inteligente de operaciones</p>
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
