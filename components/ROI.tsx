
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Target, Landmark, Percent } from 'lucide-react';

const ROI: React.FC<{ store: any }> = ({ store }) => {
  const { sales, purchases, config } = store;

  const totalSales = sales.reduce((acc: number, s: any) => acc + s.valor_total, 0);
  const totalCostOfSales = sales.reduce((acc: number, s: any) => {
    const product = store.products.find((p: any) => p.produto_id === s.produto_id);
    return acc + (s.quantidade * (product?.custo_unitario || 0));
  }, 0);

  const netProfit = totalSales - totalCostOfSales;
  const initialInvestment = config.valor_investimento_inicial;
  const roiPercent = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;

  const pieData = [
    { name: 'Custo de Mercadoria', value: totalCostOfSales, color: '#94a3b8' },
    { name: 'Lucro Bruto', value: netProfit, color: '#3b82f6' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Target size={24} /></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Investimento Inicial</span>
          </div>
          <p className="text-3xl font-black text-slate-800">{config.moeda} {initialInvestment.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><TrendingUp size={24} /></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Lucro Líquido Acum.</span>
          </div>
          <p className="text-3xl font-black text-emerald-600">{config.moeda} {netProfit.toLocaleString()}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl flex flex-col justify-between h-40 overflow-hidden relative">
          <div className="flex justify-between items-start relative z-10">
            <span className="p-3 bg-slate-800 rounded-2xl text-blue-400"><Percent size={24} /></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">ROI Percentual</span>
          </div>
          <p className="text-4xl font-black text-white relative z-10">{roiPercent.toFixed(1)}%</p>
          <div className="absolute -bottom-4 -right-4 opacity-10 scale-150 rotate-12">
            <TrendingUp size={120} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-purple-50 rounded-2xl text-purple-600"><Landmark size={24} /></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Payback Time</span>
          </div>
          <p className="text-2xl font-black text-slate-800">
            {roiPercent >= 100 ? 'Investimento Recuperado!' : `${(100 - roiPercent).toFixed(1)}% para Break-even`}
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-black text-slate-800 mb-2">Composição de Receita</h3>
          <p className="text-slate-500 mb-8 max-w-md">Visualize a proporção entre o custo dos produtos vendidos e o lucro real gerado pela sua operação comercial.</p>
          
          <div className="space-y-6">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="font-black text-slate-900">{config.moeda} {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ROI;
