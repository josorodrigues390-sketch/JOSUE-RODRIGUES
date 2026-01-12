
import React from 'react';
import { Search, UserPlus, Phone, MapPin, MoreHorizontal } from 'lucide-react';

const Clients: React.FC<{ store: any }> = ({ store }) => {
  const { clients } = store;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-800">Base de Clientes</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou telefone..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
            <UserPlus size={18} />
            Cadastrar Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client: any) => (
          <div key={client.cliente_id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-100">
                {client.nome.charAt(0)}
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-500 rounded-lg">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-black text-slate-800">{client.nome}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Desde {new Date(client.data_cadastro).toLocaleDateString()}</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">{client.telefone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={16} className="text-indigo-400" />
                <span className="text-sm font-medium truncate">{client.endereco}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <button className="flex-1 py-2 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors">Histórico</button>
              <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors">Agendar</button>
            </div>

            {/* Aesthetic flourish */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
