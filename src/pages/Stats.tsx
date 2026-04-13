
import { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useApp } from '../hooks/useApp';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';
import { format, startOfDay, startOfWeek, startOfMonth, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const COLORS = ['#3b82f6', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#06b6d4'];

export default function Stats() {
  const { records, services } = useApp();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  const filteredRecords = useMemo(() => {
    const now = new Date();
    let start: Date;
    if (timeRange === 'day') start = startOfDay(now);
    else if (timeRange === 'week') start = startOfWeek(now, { weekStartsOn: 1 });
    else start = startOfMonth(now);

    return records.filter(r => r.timestamp >= start.getTime());
  }, [records, timeRange]);

  const chartData = useMemo(() => {
    // Generate last 7 days for trend
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date).getTime();
      const dayEnd = dayStart + 86400000;
      
      const dayRecords = records.filter(r => r.timestamp >= dayStart && r.timestamp < dayEnd);
      data.push({
        name: format(date, 'EEE', { locale: es }),
        ingresos: dayRecords.reduce((acc, r) => acc + r.clientPrice, 0),
        ganancia: dayRecords.reduce((acc, r) => acc + r.clientPrice - r.washerPay, 0)
      });
    }
    return data;
  }, [records]);

  const serviceDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    filteredRecords.forEach(r => {
      const name = services.find(s => s.id === r.serviceId)?.name || 'Otro';
      dist[name] = (dist[name] || 0) + 1;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  }, [filteredRecords, services]);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', gap: '0.5rem' }}>
        {(['day', 'week'] as const).map(range => (
          <button 
            key={range}
            onClick={() => setTimeRange(range)}
            className={`btn ${timeRange === range ? 'btn-primary' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: timeRange === range ? '' : 'var(--surface)' }}
          >
            {range === 'day' ? 'Hoy' : 'Semana'}
          </button>
        ))}
      </div>

      <div className="stats-grid">
        <div className="card glass stat-card stat-blue">
          <div><p className="stat-label">Ingresos ({timeRange})</p><h3 className="stat-value">${filteredRecords.reduce((a, b) => a + b.clientPrice, 0).toLocaleString()}</h3></div>
          <div className="stat-icon bg-blue-light"><TrendingUp size={24} /></div>
        </div>
        <div className="card glass stat-card stat-green">
          <div><p className="stat-label">Ganancia ({timeRange})</p><h3 className="stat-value" style={{ color: 'var(--success)' }}>${filteredRecords.reduce((a, b) => a + (b.clientPrice - b.washerPay), 0).toLocaleString()}</h3></div>
          <div className="stat-icon bg-green-light"><DollarSign size={24} /></div>
        </div>
        <div className="card glass stat-card stat-rose">
          <div><p className="stat-label">Servicios</p><h3 className="stat-value" style={{ color: 'var(--accent)' }}>{filteredRecords.length}</h3></div>
          <div className="stat-icon bg-rose-light"><Clock size={24} /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '800' }}>TENDENCIA DE INGRESOS (7 DÍAS)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="ingresos" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" dataKey="ganancia" stroke="var(--success)" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '800' }}>DISTRIBUCIÓN</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {serviceDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
