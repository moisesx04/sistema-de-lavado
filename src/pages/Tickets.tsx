
import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { Zap, Sparkles, Wind, Layers, Droplets, ArrowRight, Printer, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function Tickets() {
  const { washers, services, addWash } = useApp();
  const [selectedWasher, setSelectedWasher] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [lastTicket, setLastTicket] = useState<any>(null);

  const handleAddWash = () => {
    if (!selectedWasher || !selectedService) {
      alert('Por favor selecciona un lavador y un servicio');
      return;
    }
    const record = addWash(selectedWasher, selectedService);
    if (record) {
      setLastTicket({
        ...record,
        washerName: washers.find(w => w.id === selectedWasher)?.name,
        serviceName: services.find(s => s.id === selectedService)?.name
      });
      setShowPrintModal(true);
    }
  };

  const getServiceIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('motor')) return <Zap size={32} />;
    if (n.includes('detailing')) return <Sparkles size={32} />;
    if (n.includes('ozono')) return <Wind size={32} />;
    if (n.includes('pintura')) return <Layers size={32} />;
    if (n.includes('interior')) return <Layers size={32} />;
    if (n.includes('grafito')) return <Droplets size={32} />;
    return <Sparkles size={32} />;
  };

  const sendToWhatsApp = () => {
    const text = `*🧾 WASHFLOW PRO - RECIBO*
-----------------------------------
🏷️ *Ticket:* #${lastTicket.id.slice(0, 8).toUpperCase()}
📅 *Fecha:* ${format(lastTicket.timestamp, 'dd/MM/yyyy HH:mm')}
-----------------------------------
👷 *Lavador:* ${lastTicket.washerName.toUpperCase()}
🧼 *Servicio:* ${lastTicket.serviceName.toUpperCase()}
-----------------------------------
💰 *TOTAL CLIENTE:* $${lastTicket.clientPrice}.00
-----------------------------------
*¡Gracias por su preferencia!*
_Vuelva pronto_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div className="card" style={{ height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>NUEVA VENTA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: '800' }}>SELECCIONAR LAVADOR</label>
            <select className="select" value={selectedWasher} onChange={(e) => setSelectedWasher(e.target.value)}>
              <option value="">-- Elige un lavador --</option>
              {washers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>
          
          <button onClick={handleAddWash} className="btn btn-primary" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            REGISTRAR TICKET <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>SELECCIONA EL SERVICIO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {services.map(service => (
            <button 
              key={service.id} 
              onClick={() => setSelectedService(service.id)}
              className={`vehicle-btn ${selectedService === service.id ? 'active' : ''}`}
              style={{ height: '150px' }}
            >
              <div style={{ marginBottom: '1rem' }}>{getServiceIcon(service.name)}</div>
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>{service.name}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>RD${service.clientPrice}</span>
            </button>
          ))}
        </div>
      </div>

      {showPrintModal && lastTicket && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', color: 'black', padding: '2.5rem', borderRadius: '1rem', width: '100%', maxWidth: '350px', fontFamily: 'monospace' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px dashed black', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>WASHFLOW PRO</h3>
              <p style={{ fontSize: '0.75rem', margin: '0.5rem 0' }}>Santo Domingo, RD</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ticket:</span> <b>#{lastTicket.id.slice(0, 8).toUpperCase()}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Fecha:</span> <span>{format(lastTicket.timestamp, 'dd/MM/yyyy HH:mm')}</span></div>
            </div>
            <div style={{ borderBottom: '2px dashed black', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Servicio:</span> <b>{lastTicket.serviceName}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lavador:</span> <span>{lastTicket.washerName}</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900' }}>
              <span>TOTAL:</span>
              <span>${lastTicket.clientPrice}.00</span>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => window.print()} className="btn" style={{ background: '#e2e8f0', color: 'black', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Printer size={18} /> Imprimir Comprobante
              </button>
              <button onClick={sendToWhatsApp} className="btn" style={{ background: '#25D366', color: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <MessageCircle size={18} /> Compartir WhatsApp
              </button>
              <button onClick={() => { setShowPrintModal(false); setLastTicket(null); }} className="btn" style={{ background: 'black', color: 'white', width: '100%', border: 'none' }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
