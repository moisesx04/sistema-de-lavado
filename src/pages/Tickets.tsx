
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { Zap, Sparkles, Wind, Layers, Droplets, ArrowRight, Printer, MessageCircle, DollarSign, Wallet, X } from 'lucide-react';
import { format } from 'date-fns';

export default function Tickets() {
  const { washers, services, addWash } = useApp();
  const [selectedWasher, setSelectedWasher] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customPrice, setCustomPrice] = useState<number | ''>('');
  const [customPay, setCustomPay] = useState<number | ''>('');
  
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [lastTicket, setLastTicket] = useState<any>(null);

  const clientTicketRef = useRef<HTMLDivElement>(null);
  const washerTicketRef = useRef<HTMLDivElement>(null);

  // Update default prices when service changes
  useEffect(() => {
    if (selectedService) {
      const s = services.find(sv => sv.id === selectedService);
      if (s) {
        setCustomPrice(s.clientPrice);
        setCustomPay(s.washerPay);
      }
    } else {
      setCustomPrice('');
      setCustomPay('');
    }
  }, [selectedService, services]);

  const handleAddWash = () => {
    if (!selectedWasher || !selectedService) {
      alert('Por favor selecciona un lavador y un servicio');
      return;
    }
    const record = addWash(
      selectedWasher, 
      selectedService, 
      customPrice === '' ? undefined : Number(customPrice),
      customPay === '' ? undefined : Number(customPay)
    );

    if (record) {
      setLastTicket({
        ...record,
        washerName: washers.find(w => w.id === selectedWasher)?.name,
        serviceName: services.find(s => s.id === selectedService)?.name
      });
      setShowPrintModal(true);
      setSelectedService('');
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

  const sendWhatsApp = (type: 'client' | 'washer') => {
    const isClient = type === 'client';
    const text = isClient 
      ? `*🧾 COMPROBANTE DE PAGO*
-----------------------------------
🏷️ *Ticket:* #${lastTicket.id.slice(0, 8).toUpperCase()}
📅 *Fecha:* ${format(lastTicket.timestamp, 'dd/MM/yyyy HH:mm')}
-----------------------------------
👷 *Lavador:* ${lastTicket.washerName.toUpperCase()}
🧼 *Servicio:* ${lastTicket.serviceName.toUpperCase()}
-----------------------------------
💰 *TOTAL A PAGAR:* $${lastTicket.clientPrice.toLocaleString()}.00
-----------------------------------
*¡Gracias por su preferencia!*`
      : `*🔌 VALE DE PAGO LAVADOR*
-----------------------------------
🆔 *ID Lavador:* #${lastTicket.washerId.slice(0, 5).toUpperCase()}
👷 *Lavador:* ${lastTicket.washerName.toUpperCase()}
🧼 *Servicio:* ${lastTicket.serviceName.toUpperCase()}
-----------------------------------
💵 *TU PAGO:* $${lastTicket.washerPay.toLocaleString()}.00
-----------------------------------
_Conserva este ticket para tu liquidación diaria_`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = (type: 'client' | 'washer') => {
    const content = type === 'client' ? clientTicketRef.current : washerTicketRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Ticket</title>
          <style>
            body { font-family: monospace; padding: 20px; color: black; }
            .ticket { width: 300px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; }
            h3 { text-align: center; margin: 0 0 10px 0; }
            p { text-align: center; font-size: 12px; margin: 5px 0; }
            .divider { border-bottom: 2px dashed black; margin: 15px 0; }
            .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .total { font-size: 20px; font-weight: bold; margin-top: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${content.innerHTML}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>NUEVA VENTA</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: '800' }}>SELECCIONAR LAVADOR</label>
              <select className="select" value={selectedWasher} onChange={(e) => setSelectedWasher(e.target.value)}>
                <option value="">-- Elige un lavador --</option>
                {washers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>

            {selectedService && (
              <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '1rem', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.65rem', fontWeight: '800' }}>PRECIO CLIENTE ($)</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input type="number" className="input" style={{ paddingLeft: '2.25rem', height: '40px', fontSize: '0.9rem' }} value={customPrice} onChange={e => setCustomPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.65rem', fontWeight: '800' }}>PAGO LAVADOR ($)</label>
                  <div style={{ position: 'relative' }}>
                    <Wallet size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input type="number" className="input" style={{ paddingLeft: '2.25rem', height: '40px', fontSize: '0.9rem' }} value={customPay} onChange={e => setCustomPay(e.target.value === '' ? '' : Number(e.target.value))} />
                  </div>
                </div>
              </div>
            )}
            
            <button onClick={handleAddWash} className="btn btn-primary" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              REGISTRAR TICKET <ArrowRight size={20} />
            </button>
          </div>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1.5rem', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '900' }}>COMPROBANTES GENERADOS</h2>
              <button onClick={() => setShowPrintModal(false)} style={{ background: 'transparent', color: 'var(--text-muted)' }}><X /></button>
            </div>

            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1, overflowY: 'auto' }}>
              {/* Client Ticket Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>COPIA PARA CLIENTE</div>
                <div ref={clientTicketRef} style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '0.5rem', fontFamily: 'monospace', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  <h3>COMPROBANTE CLIENTE</h3>
                  <p>Santo Domingo, RD</p>
                  <div className="divider"></div>
                  <div className="row"><span>Ticket:</span> <b>#{lastTicket.id.slice(0, 8).toUpperCase()}</b></div>
                  <div className="row"><span>Fecha:</span> <span>{format(lastTicket.timestamp, 'dd/MM/yyyy HH:mm')}</span></div>
                  <div className="divider"></div>
                  <div className="row"><span>Servicio:</span> <b>{lastTicket.serviceName.toUpperCase()}</b></div>
                  <div className="row"><span>Lavador:</span> <span>{lastTicket.washerName.toUpperCase()}</span></div>
                  <div className="total">TOTAL: $${lastTicket.clientPrice}.00</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button onClick={() => handlePrint('client')} className="btn" style={{ background: '#e2e8f0', color: 'black' }}><Printer size={16} /> Imprimir</button>
                  <button onClick={() => sendWhatsApp('client')} className="btn" style={{ background: '#25D366', color: 'white' }}><MessageCircle size={16} /> Enviar</button>
                </div>
              </div>

              {/* Washer Ticket Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>COPIA PARA LAVADOR</div>
                <div ref={washerTicketRef} style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '0.5rem', fontFamily: 'monospace', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  <h3>VALE DE PAGO</h3>
                  <p>SISTEMA DE TICKETS INTERNAL</p>
                  <div className="divider"></div>
                  <div className="row"><span>ID Lavador:</span> <b>#{lastTicket.washerId.slice(0, 5).toUpperCase()}</b></div>
                  <div className="row"><span>Lavador:</span> <b>{lastTicket.washerName.toUpperCase()}</b></div>
                  <div className="divider"></div>
                  <div className="row"><span>Servicio:</span> <span>{lastTicket.serviceName.toUpperCase()}</span></div>
                  <div className="row"><span>Fecha:</span> <span>{format(lastTicket.timestamp, 'dd/MM HH:mm')}</span></div>
                  <div className="total">GANANCIA: $${lastTicket.washerPay}.00</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button onClick={() => handlePrint('washer')} className="btn" style={{ background: '#e2e8f0', color: 'black' }}><Printer size={16} /> Imprimir</button>
                  <button onClick={() => sendWhatsApp('washer')} className="btn" style={{ background: '#25D366', color: 'white' }}><MessageCircle size={16} /> Enviar</button>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
              <button onClick={() => setShowPrintModal(false)} className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}>Listo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
