
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet, FileText, Calendar } from 'lucide-react';

const Finance: React.FC<{ store: any }> = ({ store }) => {
  const { cashFlow, currentBalance, config } = store;

  const totalIn = cashFlow.filter((c: any) => c.tipo === 'entrada').reduce((acc: number, c: any) => acc + c.valor, 0);
  const totalOut = cashFlow.filter((c: any) => c.tipo === 'saída').reduce((acc: number, c: any) => acc + c.valor, 0);

  return (
    <div className="space-y-8">
      {/* Finance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Wallet size={32} className="opacity-80" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Saldo Atual</span>
          </div>
          <p className="text-4xl font-black">{config.moeda} {currentBalance.toLocaleString()}</p>
          <div className="mt-8 flex items-center gap-2 text-blue-100 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Em tempo real
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <ArrowUpCircle size={24} />
            <span className="font-bold text-sm uppercase tracking-wider text-slate-500">Total Entradas</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{config.moeda} {totalIn.toLocaleString()}</p>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-3/4"></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <ArrowDownCircle size={24} />
            <span className="font-bold text-sm uppercase tracking-wider text-slate-500">Total Saídas</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{config.moeda} {totalOut.toLocaleString()}</p>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 w-1/4"></div>
          </div>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-800">Fluxo de Caixa</h3>
          <button className="text-sm font-bold text-blue-600 hover:underline">Exportar Extrato</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b">
                <th className="px-8 py-4">Data / Hora</th>
                <th className="px-8 py-4">Origem / Descrição</th>
                <th className="px-8 py-4">Método</th>
                <th className="px-8 py-4">Valor</th>
                <th className="px-8 py-4">Saldo Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cashFlow.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">Sem movimentações registradas no período.</td></tr>
              ) : (
                cashFlow.slice().reverse().map((entry: any) => (
                  <tr key={entry.caixa_id} className="hover:bg-slate-50/30">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{new Date(entry.data).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          entry.tipo === 'entrada' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {entry.tipo === 'entrada' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{entry.origem.toUpperCase()}</p>
                          <p className="text-xs text-slate-400">{entry.descricao}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">
                        {entry.forma_pagamento}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`font-black text-lg ${entry.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {entry.tipo === 'entrada' ? '+' : '-'} {config.moeda} {entry.valor.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-400">{config.moeda} {entry.saldo_atual.toLocaleString()}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
