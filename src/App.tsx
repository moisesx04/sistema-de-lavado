import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';
import Stats from './pages/Stats';
import Tickets from './pages/Tickets';
import Washers from './pages/Washers';
import Services from './pages/Services';
import Reports from './pages/Reports';
import { AppProvider } from './hooks/useApp';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Stats />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="washers" element={<Washers />} />
            <Route path="services" element={<Services />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
