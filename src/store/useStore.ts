
import { useState, useEffect } from 'react';
import type { Washer, WashRecord, Service } from '../types';
import { INITIAL_SERVICES } from '../types';

export const useStore = () => {
  const [washers, setWashers] = useState<Washer[]>(() => {
    const saved = localStorage.getItem('cw_washers');
    return saved ? JSON.parse(saved) : [];
  });

  const [records, setRecords] = useState<WashRecord[]>(() => {
    const saved = localStorage.getItem('cw_records');
    return saved ? JSON.parse(saved) : [];
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('cw_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  useEffect(() => {
    localStorage.setItem('cw_washers', JSON.stringify(washers));
  }, [washers]);

  useEffect(() => {
    localStorage.setItem('cw_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('cw_services', JSON.stringify(services));
  }, [services]);

  const addWasher = (name: string, phone: string) => {
    const newWasher: Washer = {
      id: crypto.randomUUID(),
      name,
      phone,
      createdAt: Date.now(),
    };
    setWashers([...washers, newWasher]);
  };

  const deleteWasher = (id: string) => {
    setWashers(washers.filter(w => w.id !== id));
    setRecords(records.filter(r => r.washerId !== id));
  };

  const addService = (name: string, clientPrice: number, washerPay: number) => {
    const newService: Service = {
      id: crypto.randomUUID(),
      name,
      clientPrice,
      washerPay,
    };
    setServices([...services, newService]);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addWash = (washerId: string, serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return null;

    const newRecord: WashRecord = {
      id: crypto.randomUUID(),
      washerId,
      serviceId,
      clientPrice: service.clientPrice,
      washerPay: service.washerPay,
      timestamp: Date.now(),
    };
    setRecords([newRecord, ...records]);
    return newRecord;
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const getTotalStats = () => {
    const totalRevenue = records.reduce((acc, curr) => acc + curr.clientPrice, 0);
    const totalPayout = records.reduce((acc, curr) => acc + curr.washerPay, 0);
    const totalProfit = totalRevenue - totalPayout;
    return { totalRevenue, totalPayout, totalProfit, count: records.length };
  };

  return {
    washers,
    records,
    services,
    addWasher,
    deleteWasher,
    addService,
    updateService,
    deleteService,
    addWash,
    deleteRecord,
    getTotalStats,
  };
};
