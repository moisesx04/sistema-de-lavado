import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { Plus, Users, Trash2, Phone } from 'lucide-react';

export default function Washers() {
  const { washers, addWasher, deleteWasher } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>AGREGAR TALENTO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>NOMBRE COMPLETO</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Ej. Juan Pérez" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>TELÉFONO</label>
            <input 
              type="text" 
              className="input" 
              placeholder="809-000-0000" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { if (name && phone) { addWasher(name, phone); setName(''); setPhone(''); } }} 
            className="btn btn-primary" 
            style={{ height: '52px', padding: '0 1.5rem' }}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users size={20} color="var(--primary)" />
          PLANTILLA DE LAVADORES ({washers.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {washers.map(washer => (
            <div key={washer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1.25rem', background: 'var(--surface-hover)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <div style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>
                   {washer.name[0].toUpperCase()}
                 </div>
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                     <p style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem' }}>{washer.name}</p>
                     <span style={{ fontSize: '0.65rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontWeight: '800' }}>ID: {washer.id.slice(0, 5).toUpperCase()}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                     <Phone size={12} /> {washer.phone}
                   </div>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => deleteWasher(washer.id)} className="btn" style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {washers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.3 }}>
              <Users size={48} style={{ margin: '0 auto 1rem' }} />
              <p>No hay lavadores registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
