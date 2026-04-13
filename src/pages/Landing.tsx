
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart3, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="landing-page" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '2rem' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40vw', height: '40vw', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, borderRadius: 'full' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30vw', height: '30vw', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.1, borderRadius: 'full' }} />
        
        <div className="main-content" style={{ textAlign: 'center', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 'bold', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              Next-Gen Management for Car Wash
            </span>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: 1, margin: '1.5rem 0' }}>
              WashFlow <span className="gradient-text">Pro</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Optimiza tu nómina, gestiona servicios dinámicos y visualiza tus ganancias en tiempo real con la plataforma de car wash más potente del mercado.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 2rem', fontSize: '1.1rem' }}>
                Empezar Ahora <ArrowRight size={20} />
              </Link>
              <a href="#features" className="btn" style={{ padding: '1.25rem 2rem', border: '1px solid var(--border)', background: 'transparent' }}>
                Ver Funciones
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '8rem 2rem', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div className="main-content">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Potencia tu Negocio</h2>
            <p style={{ color: 'var(--text-muted)' }}>Todo lo que necesitas para escalar tu operación</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <BarChart3 size={32} />, title: "Análisis en Vivo", desc: "Gráficos interactivos de ingresos diarios, semanales y mensuales para decisiones basadas en datos." },
              { icon: <Shield size={32} />, title: "Control de Nómina", desc: "Cálculo preciso de comisiones por cada lavador basado en servicios realizados." },
              { icon: <Zap size={32} />, title: "Servicios Dinámicos", desc: "Configura infinitos tipos de lavados, detallado y tratamientos de pintura con un clic." },
              { icon: <Sparkles size={32} />, title: "Tickets Pro", desc: "Simulación de impresión térmica y compartir vía WhatsApp para un servicio de lujo." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card"
                style={{ height: '100%' }}
              >
                <div className="bg-blue-light" style={{ width: 'fit-content', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>© 2026 WashFlow Pro. Diseñado para la Excelencia Operativa.</p>
      </footer>
    </div>
  );
}
