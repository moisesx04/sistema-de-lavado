import { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { Calculator, Download, FileText, Users } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function Reports() {
  const { washers, records } = useApp();

  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const payrollData = useMemo(() => {
    return washers.map(w => {
      const monthRecords = records.filter(r => 
        r.washerId === w.id && 
        r.timestamp >= currentMonthStart.getTime() && 
        r.timestamp <= currentMonthEnd.getTime()
      );
      return {
        id: w.id,
        name: w.name,
        phone: w.phone,
        servicesCount: monthRecords.length,
        totalEarned: monthRecords.reduce((acc, r) => acc + r.washerPay, 0),
        totalRevenue: monthRecords.reduce((acc, r) => acc + r.clientPrice, 0)
      };
    });
  }, [washers, records, currentMonthStart, currentMonthEnd]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(payrollData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nomina");
    XLSX.writeFile(wb, `Nomina_${format(new Date(), 'MMMM_yyyy', { locale: es })}.xlsx`);
  };

  const exportPDF = () => {
    const doc = new jsPDF() as any;
    doc.text(`Reporte de Nómina - ${format(new Date(), 'MMMM yyyy', { locale: es })}`, 14, 15);
    doc.autoTable({
      head: [['Lavador', 'Servicios', 'Ingresos Generados', 'Pago Total']],
      body: payrollData.map(d => [d.name, d.servicesCount, `$${d.totalRevenue}`, `$${d.totalEarned}`]),
      startY: 20
    });
    doc.save(`Nomina_${format(new Date(), 'MMMM_yyyy', { locale: es })}.pdf`);
  };

  return (
    <div className="animate-fade-in">
      <div className="card glass" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>NÓMINA MENSUAL</h2>
            <p style={{ color: 'var(--text-muted)' }}>{format(new Date(), 'MMMM yyyy', { locale: es }).toUpperCase()}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={exportExcel} className="btn" style={{ background: 'var(--surface-hover)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Download size={18} /> Excel
            </button>
            <button onClick={exportPDF} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <FileText size={18} /> PDF
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Lavador</th>
                <th>Servicios Realizados</th>
                <th>Ingresos Generados</th>
                <th>Total a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '800' }}>
                    {item.name}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{item.phone}</div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{item.servicesCount} servicios</span>
                  </td>
                  <td style={{ fontWeight: '700' }}>${item.totalRevenue.toLocaleString()}</td>
                  <td style={{ color: 'var(--success)', fontWeight: '900', fontSize: '1.25rem' }}>${item.totalEarned.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <Calculator size={20} color="var(--primary)" /> Historial de Cierres
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Aquí se guardarán los cierres mensuales una vez confirmados.</p>
        </div>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <Users size={20} color="var(--primary)" /> Desempeño General
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ver tabla de posiciones y bonificaciones por rendimiento.</p>
        </div>
      </div>
    </div>
  );
}
