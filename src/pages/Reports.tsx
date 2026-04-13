
import { useState, useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { Calculator, Download, FileText, Users, Printer, Calendar, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function Reports() {
  const { washers, records, services } = useApp();
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('month');

  const range = useMemo(() => {
    const now = new Date();
    if (timeFilter === 'day') return { start: startOfDay(now), end: new Date() };
    if (timeFilter === 'week') return { start: startOfWeek(now, { weekStartsOn: 1 }), end: new Date() };
    return { start: startOfMonth(now), end: endOfMonth(now) };
  }, [timeFilter]);

  const payrollData = useMemo(() => {
    return washers.map(w => {
      const filteredRecords = records.filter(r => 
        r.washerId === w.id && 
        r.timestamp >= range.start.getTime() && 
        r.timestamp <= range.end.getTime()
      );
      return {
        id: w.id,
        name: w.name,
        phone: w.phone,
        servicesCount: filteredRecords.length,
        totalEarned: filteredRecords.reduce((acc, r) => acc + r.washerPay, 0),
        totalRevenue: filteredRecords.reduce((acc, r) => acc + r.clientPrice, 0),
        records: filteredRecords
      };
    });
  }, [washers, records, range]);

  const exportExcel = () => {
    const data = payrollData.map(({ records, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nomina");
    XLSX.writeFile(wb, `Nomina_${timeFilter}_${format(new Date(), 'dd_MM_yyyy')}.xlsx`);
  };

  const exportPDF = () => {
    const doc = new jsPDF() as any;
    doc.text(`Reporte General de Nómina - ${timeFilter.toUpperCase()}`, 14, 15);
    doc.autoTable({
      head: [['Lavador', 'Servicios', 'Ingresos Generados', 'Pago Total']],
      body: payrollData.map(d => [d.name, d.servicesCount, `$${d.totalRevenue}`, `$${d.totalEarned}`]),
      startY: 20
    });
    doc.save(`Nomina_General_${timeFilter}.pdf`);
  };

  const printWasherReport = (washerData: any) => {
    const doc = new jsPDF() as any;
    doc.setFontSize(18);
    doc.text('WASHFLOW PRO - COMPROBANTE DE PAGO', 14, 20);
    doc.setFontSize(12);
    doc.text(`Lavador: ${washerData.name.toUpperCase()}`, 14, 30);
    doc.text(`Periodo: ${timeFilter.toUpperCase()} (${format(range.start, 'dd/MM')} al ${format(range.end, 'dd/MM')})`, 14, 37);
    
    const tableBody = washerData.records.map((r: any) => {
      const sName = services.find(s => s.id === r.serviceId)?.name || 'Servicio';
      return [format(r.timestamp, 'dd/MM HH:mm'), sName, `$${r.washerPay}`];
    });

    doc.autoTable({
      head: [['Fecha', 'Servicio', 'Pago']],
      body: tableBody,
      startY: 45,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`TOTAL A PAGAR: $${washerData.totalEarned.toLocaleString()}`, 14, finalY);
    
    doc.save(`Ticket_${washerData.name}_${timeFilter}.pdf`);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', gap: '0.5rem' }}>
        {(['day', 'week', 'month'] as const).map(f => (
          <button 
            key={f}
            onClick={() => setTimeFilter(f)}
            className={`btn ${timeFilter === f ? 'btn-primary' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: timeFilter === f ? '' : 'var(--surface)' }}
          >
            {f === 'day' ? 'Hoy' : f === 'week' ? 'Semana' : 'Mes'}
          </button>
        ))}
      </div>

      <div className="card glass" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>NÓMINA ({timeFilter.toUpperCase()})</h2>
            <p style={{ color: 'var(--text-muted)' }}>Manejo de pagos para el personal</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={exportExcel} className="btn" style={{ background: 'var(--surface-hover)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Download size={18} /> Excel
            </button>
            <button onClick={exportPDF} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <FileText size={18} /> PDF General
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Lavador</th>
                <th>Servicios</th>
                <th>Total Lavador</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
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
                    <span className="badge badge-purple">{item.servicesCount} lavados</span>
                  </td>
                  <td style={{ color: 'var(--success)', fontWeight: '900', fontSize: '1.25rem' }}>${item.totalEarned.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => printWasherReport(item)}
                      className="btn" 
                      style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.5rem' }}
                      title="Imprimir Ticket de Pago"
                    >
                      <Printer size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <Calculator size={20} color="var(--primary)" /> Cierres Rápidos
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Filtra por día o semana para cierres parciales de caja.</p>
        </div>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <Clock size={20} color="var(--primary)" /> Última Actividad
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Control de puntualidad y volumen de trabajo.</p>
        </div>
      </div>
    </div>
  );
}
