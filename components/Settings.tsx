
import React from 'react';
import { Save, Shield, Bell, Database, Globe } from 'lucide-react';

const Settings: React.FC<{ store: any }> = ({ store }) => {
  const { config, setConfig } = store;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-800">Configurações do Sistema</h2>
          <p className="text-slate-500">Personalize o Nexus ERP para as necessidades do seu negócio.</p>
        </div>

        <div className="p-10 space-y-10">
          {/* General Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-blue-600">
              <Globe size={20} />
              <h3 className="font-black uppercase tracking-widest text-xs">Informações Gerais</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nome da Empresa</label>
                <input 
                  value={config.nome_empresa}
                  onChange={e => setConfig({...config, nome_empresa: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Moeda Local</label>
                <input 
                  value={config.moeda}
                  onChange={e => setConfig({...config, moeda: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Margem de Lucro Padrão (%)</label>
                <input 
                  type="number"
                  value={config.margem_lucro_padrao}
                  onChange={e => setConfig({...config, margem_lucro_padrao: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Investimento Inicial ({config.moeda})</label>
                <input 
                  type="number"
                  value={config.valor_investimento_inicial}
                  onChange={e => setConfig({...config, valor_investimento_inicial: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          </section>

          {/* Feature Toggles */}
          <section className="space-y-6 pt-10 border-t border-slate-50">
            <div className="flex items-center gap-3 text-indigo-600">
              <Bell size={20} />
              <h3 className="font-black uppercase tracking-widest text-xs">Preferências & Notificações</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Notificar estoque baixo automaticamente', desc: 'Receba alertas quando produtos atingirem limite crítico.' },
                { label: 'Enviar recibo por WhatsApp para clientes', desc: 'Integração direta com API do WhatsApp Business.' },
                { label: 'Backup diário em nuvem', desc: 'Proteja seus dados contra perdas acidentais.' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all">
            <Save size={20} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
