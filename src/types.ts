
export interface Washer {
  id: string;
  name: string;
  phone: string;
  createdAt: number;
}

export interface Service {
  id: string;
  name: string;
  clientPrice: number;
  washerPay: number;
}

export interface WashRecord {
  id: string;
  washerId: string;
  serviceId: string; // Changed from vehicleType
  clientPrice: number;
  washerPay: number;
  timestamp: number;
}

export const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Lavado Normal', clientPrice: 200, washerPay: 60 },
  { id: '2', name: 'Detailing', clientPrice: 1500, washerPay: 500 },
  { id: '3', name: 'Lavado Motor', clientPrice: 350, washerPay: 100 },
  { id: '4', name: 'Grafito', clientPrice: 500, washerPay: 150 },
  { id: '5', name: 'Interior', clientPrice: 800, washerPay: 250 },
  { id: '6', name: 'Tratado de Pintura', clientPrice: 2500, washerPay: 800 },
  { id: '7', name: 'Brillado', clientPrice: 1200, washerPay: 400 },
  { id: '8', name: 'Ozono Profundo', clientPrice: 600, washerPay: 200 }
];
