# 🏎️ WashFlow Pro: Executive Car Wash Management

**WashFlow Pro** is a high-performance, minimalist management system designed for modern car wash businesses. Built with a focus on speed, data visualization, and operational efficiency.

![Project Preview](https://via.placeholder.com/1200x600?text=WashFlow+Pro+Dashboard+Preview)

## 🌟 Key Features

- **📊 Executive Analytics**: Interactive charts showing revenue trends, profit margins, and service distribution (Day/Week/Month views).
- **👷 Advanced Payroll**: Automated monthly payroll calculations based on specific commissions per service.
- **🧼 Dynamic Services**: Full CRUD for wash services, detailing, and special treatments with asymmetric pricing (Client Price vs. Washer Pay).
- **🧾 WhatsApp Receipts**: Professional "facturita-style" ticket sharing with one-click integration.
- **📄 Export System**: Generation of professional PDF reports and Excel data sheets.
- **⚡ Performance First**: Zero-latency UI built with React, Vite, and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: Vanilla CSS (Modern Minimalist System).
- **Visualization**: Recharts.
- **Animations**: Framer Motion.
- **Backend Ready**: Ready to sync with **Supabase** (PostgreSQL).
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
