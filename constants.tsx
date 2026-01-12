
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Receipt, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  TrendingUp,
  AlertTriangle,
  LogOut,
  BrainCircuit,
  PieChart
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Painel', icon: <LayoutDashboard size={20} /> },
  { id: 'inventory', label: 'Estoque', icon: <Package size={20} /> },
  { id: 'sales', label: 'Vendas', icon: <Receipt size={20} /> },
  { id: 'purchases', label: 'Compras', icon: <ShoppingCart size={20} /> },
  { id: 'finance', label: 'Financeiro', icon: <DollarSign size={20} /> },
  { id: 'appointments', label: 'Agendamentos', icon: <Calendar size={20} /> },
  { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
  { id: 'roi', label: 'ROI & Investimento', icon: <PieChart size={20} /> },
  { id: 'ai', label: 'Nexus AI', icon: <BrainCircuit size={20} /> },
  { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> },
];
