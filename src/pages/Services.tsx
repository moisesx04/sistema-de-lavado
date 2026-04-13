
import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { Plus, Trash2, Settings, Droplet, Edit2, Check, X } from 'lucide-react';

export default function Services() {
  const { services, addService, deleteService, updateService } = useApp();
  const [name, setName] = useState('');
  const [clientPrice, setClientPrice] = useState<number>(0);
  const [washerPay, setWasherPay] = useState<number>(0);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editClientPrice, setEditClientPrice] = useState<number>(0);
  const [editWasherPay, setEditWasherPay] = useState<number>(0);

  const startEditing = (s: any) => {
    setEditingId(s.id);
    setEditName(s.name);
    setEditClientPrice(s.clientPrice);
    setEditWasherPay(s.washerPay);
  };

  const saveEdit = () => {
    if (editingId) {
      updateService(editingId, {
        name: editName,
        clientPrice: editClientPrice,
        washerPay: editWasherPay
      });
      setEditingId(null);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>CONFIGURAR SERVICIO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>NOMBRE DEL SERVICIO</label>
            <input type="text" className="input" placeholder="Ej. Lavado de Ozono" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>PRECIO CLIENTE ($)</label>
            <input type="number" className="input" value={clientPrice} onChange={(e) => setClientPrice(Number(e.target.value))} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>PAGO LAVADOR ($)</label>
            <input type="number" className="input" value={washerPay} onChange={(e) => setWasherPay(Number(e.target.value))} />
          </div>
          <button 
            onClick={() => { if (name) { addService(name, clientPrice, washerPay); setName(''); setClientPrice(0); setWasherPay(0); } }} 
            className="btn btn-primary" 
            style={{ height: '52px', padding: '0 1.5rem' }}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Settings size={20} color="var(--primary)" />
          CATÁLOGO DE SERVICIOS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {services.map(service => (
            <div key={service.id} className="card glass" style={{ border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative' }}>
              {editingId === service.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input className="input" value={editName} onChange={e => setEditName(e.target.value)} style={{ fontSize: '1rem', fontWeight: '800' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>CLIENTE</label>
                      <input type="number" className="input" value={editClientPrice} onChange={e => setEditClientPrice(Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>PAGO</label>
                      <input type="number" className="input" value={editWasherPay} onChange={e => setEditWasherPay(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button onClick={saveEdit} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}><Check size={18} /></button>
                    <button onClick={() => setEditingId(null)} className="btn" style={{ flex: 1, background: 'var(--border)', padding: '0.5rem' }}><X size={18} /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div className="bg-blue-light" style={{ padding: '0.75rem', borderRadius: '1rem' }}>
                      <Droplet size={20} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button onClick={() => startEditing(service)} className="btn" style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.25rem' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deleteService(service.id)} className="btn" style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '900' }}>{service.name}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Cobra al Cliente</span>
                      <b style={{ color: 'var(--success)' }}>${service.clientPrice}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Paga al Lavador</span>
                      <b style={{ color: 'var(--accent)' }}>${service.washerPay}</b>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
