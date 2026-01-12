
import React from 'react';
import { Calendar, Clock, User, CheckCircle2, XCircle } from 'lucide-react';

const Appointments: React.FC<{ store: any }> = ({ store }) => {
  const { appointments, addAppointment, config, products } = store;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-700';
      case 'concluído': return 'bg-emerald-100 text-emerald-700';
      case 'cancelado': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Agenda de Serviços</h2>
          <p className="text-slate-500">Gerencie horários e entregas programadas.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2">
          <Calendar size={20} />
          Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Simple Calendar Placeholder / Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Filtrar por Data</h3>
            <div className="space-y-2">
              <div className="p-3 bg-blue-600 text-white rounded-xl font-bold text-center">Hoje, 24 Mai</div>
              <div className="p-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-center hover:bg-slate-100 cursor-pointer">Amanhã, 25 Mai</div>
              <div className="p-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-center hover:bg-slate-100 cursor-pointer">Seg, 27 Mai</div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wider">Status da Agenda</h3>
            <div className="flex items-center justify-between text-indigo-700 font-bold mb-1">
              <span>Ocupação</span>
              <span>45%</span>
            </div>
            <div className="h-2 w-full bg-indigo-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[45%]"></div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3 space-y-4">
          {appointments.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border border-dashed border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-400">Nenhum compromisso agendado</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">Agendamentos de entrega ou serviços aparecerão aqui para sua equipe gerenciar.</p>
            </div>
          ) : (
            appointments.map((app: any) => {
              const product = products.find((p: any) => p.produto_id === app.produto_id);
              return (
                <div key={app.agendamento_id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl min-w-[100px]">
                    <span className="text-[10px] font-black uppercase text-slate-400">{new Date(app.data).toLocaleDateString('pt-BR', {weekday: 'short'})}</span>
                    <span className="text-2xl font-black text-slate-800">{app.hora}</span>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-800 text-lg">{app.cliente}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-blue-500" />
                          {product?.nome_produto || 'Serviço'}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <User size={12} className="text-slate-400" />
                          Responsável: Admin
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400">Valor Estimado</p>
                        <p className="text-lg font-black text-slate-800">{config.moeda} {app.valor.toLocaleString()}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
