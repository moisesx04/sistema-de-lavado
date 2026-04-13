# 🏎️ Sistema de Lavado Inteligente: Gestión Ejecutiva

**Sistema de Lavado Inteligente** es un sistema de gestión de alto rendimiento y diseño minimalista diseñado para negocios modernos de lavado de vehículos. Enfocado en la velocidad, visualización de datos y eficiencia operativa.

![Project Preview](https://via.placeholder.com/1200x600?text=Sistema+de+Lavado+Dashboard+Preview)

## 🌟 Funciones Clave

- **📊 Análisis Ejecutivo**: Gráficos interactivos de tendencias de ingresos y distribución de servicios (Vistas por Día/Semana).
- **👷 Control de Nómina**: Cálculos automatizados de pagos basados en comisiones específicas por servicio realizado.
- **🧼 Servicios Dinámicos**: Gestión completa (CRUD) de tipos de lavado, detallado y tratamientos especiales.
- **🧾 Tickets Digitales**: Comprobantes profesionales listos para compartir vía WhatsApp con un solo clic.
- **📄 Sistema de Exportación**: Generación de reportes profesionales en PDF y hojas de datos Excel.
- **⚡ Rendimiento Superior**: Interfaz de usuario sin latencia construida con React, Vite y Framer Motion.
- **📱 100% Responsivo**: Diseño adaptable a cualquier pantalla con márgenes fluidos.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: Vanilla CSS (Modern Minimalist System).
- **Visualization**: Recharts.
- **Animations**: Framer Motion.
- **Backend Ready**: Listo para sincronizar con **Supabase** (PostgreSQL).
- **Utilities**: date-fns, jsPDF, XLSX, Lucide React.

## 🚀 Quick Start / Deployment

### 1. Requirements
- Node.js (v18+)
- npm / yarn

### 2. Installation
```bash
npm install
```

### 3. Usage
```bash
npm run dev
```

### 4. Deploy to Vercel
Connect your GitHub repository to [Vercel](https://vercel.com) for automatic CI/CD. The project is optimized for high-performance edge deployment.

### 5. Supabase Integration (Optional)
The code is pre-configured to use Supabase. Simply add your environment variables to a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the SQL schema provided in `src/lib/supabase.ts` via the Supabase SQL Editor to initialize your database.

---

## 👨‍💻 Author
[Tu Nombre Aquí] - *Portfolio Project*

---

## 📄 License
This project is licensed under the MIT License.
