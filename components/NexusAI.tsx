
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, MessageSquare, Loader2, RefreshCw } from 'lucide-react';
import { getBusinessInsights } from '../services/gemini';

const NexusAI: React.FC<{ store: any }> = ({ store }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    const report = await getBusinessInsights({
      sales: store.sales,
      inventory: store.products,
      finance: store.cashFlow,
      config: store.config
    });
    setInsights(report || "Ocorreu um erro ao gerar o relatório.");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-amber-300" />
            Inteligência Artificial Ativa
          </div>
          <h2 className="text-4xl font-black">Nexus Business Intelligence</h2>
          <p className="text-blue-100 text-lg max-w-xl">Transforme seus dados em estratégias. Nossa IA analisa seu estoque, fluxo de caixa e histórico de vendas para sugerir o próximo passo ideal.</p>
          <button 
            onClick={generateReport}
            disabled={loading}
            className="mt-6 px-10 py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <BrainCircuit size={24} />}
            {loading ? 'Analisando dados...' : 'Gerar Relatório Estratégico'}
          </button>
        </div>
        
        {/* Background blobs for aesthetics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {insights ? (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">Relatório da Nexus AI</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gerado em {new Date().toLocaleString()}</p>
              </div>
            </div>
            <button onClick={generateReport} className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
          
          <div className="prose prose-slate prose-indigo max-w-none prose-headings:font-black prose-p:text-slate-600 prose-strong:text-slate-800">
            {/* Simple markdown-ish rendering */}
            {insights.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <h3 key={i} className="text-lg font-black mt-6 mb-3 text-slate-800">{line.replace('###', '')}</h3>;
              if (line.startsWith('##')) return <h2 key={i} className="text-xl font-black mt-8 mb-4 text-slate-800 border-b pb-2">{line.replace('##', '')}</h2>;
              if (line.startsWith('-')) return <li key={i} className="ml-4 mb-2 text-slate-600 list-disc">{line.replace('-', '')}</li>;
              return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
            })}
          </div>
        </div>
      ) : !loading && (
        <div className="text-center py-20 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
            <BrainCircuit size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-400">Clique acima para processar seus dados</h3>
          <p className="text-slate-400 text-sm mt-2">A análise leva cerca de 10-15 segundos dependendo do volume de transações.</p>
        </div>
      )}
    </div>
  );
};

export default NexusAI;
