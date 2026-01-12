
import React from 'react';
import { useNexusStore } from './store';
import { NAV_ITEMS } from './constants';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import SalesPurchases from './components/SalesPurchases';
import Finance from './components/Finance';
import Appointments from './components/Appointments';
import ROI from './components/ROI';
import NexusAI from './components/NexusAI';
import Clients from './components/Clients';
import Settings from './components/Settings';
import { LogOut, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const store = useNexusStore();
  const { activeTab, setActiveTab, config } = store;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard store={store} />;
      case 'inventory': return <Inventory store={store} />;
      case 'sales': return <SalesPurchases mode="sales" store={store} />;
      case 'purchases': return <SalesPurchases mode="purchases" store={store} />;
      case 'finance': return <Finance store={store} />;
      case 'appointments': return <Appointments store={store} />;
      case 'clients': return <Clients store={store} />;
      case 'roi': return <ROI store={store} />;
      case 'ai': return <NexusAI store={store} />;
      case 'settings': return <Settings store={store} />;
      default: return <Dashboard store={store} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
          <span className="font-bold text-xl tracking-tight">Nexus ERP</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2 text-slate-400">
            <UserIcon size={20} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Admin User</span>
              <span className="text-xs">Nexus Cloud</span>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-900/20 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-slate-800">
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">Empresa</p>
              <p className="text-sm font-bold text-slate-800">{config.nome_empresa}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
              <UserIcon size={20} className="text-slate-500" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
