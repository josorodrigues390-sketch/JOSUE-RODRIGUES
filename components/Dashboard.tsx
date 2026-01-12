
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Package, AlertCircle, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard: React.FC<{ store: any }> = ({ store }) => {
  const { products, sales, purchases, cashFlow, config } = store;

  const totalSales = sales.reduce((acc: number, s: any) => acc + s.valor_total, 0);
  const totalProfit = sales.reduce((acc: number, s: any) => acc + s.lucro, 0);
  const lowStockCount = products.filter((p: any) => p.status !== 'disponível').length;
  const currentBalance = cashFlow.length > 0 ? cashFlow[cashFlow.length - 1].saldo_atual : config.valor_investimento_inicial;

  const chartData = [
    { name: 'Jan', sales: 400, costs: 240 },
    { name: 'Fev', sales: 300, costs: 139 },
    { name: 'Mar', sales: 200, costs: 980 },
    { name: 'Abr', sales: 278, costs: 390 },
    { name: 'Mai', sales: 189, costs: 480 },
    { name: 'Jun', sales: 239, costs: 380 },
  ];

  const StatCard = ({ title, value, icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Faturamento Total" 
          value={`${config.moeda} ${totalSales.toLocaleString()}`} 
          icon={<DollarSign className="text-blue-600" />} 
          color="bg-blue-50"
          trend={12}
        />
        <StatCard 
          title="Lucro Líquido" 
          value={`${config.moeda} ${totalProfit.toLocaleString()}`} 
          icon={<TrendingUp className="text-emerald-600" />} 
          color="bg-emerald-50"
          trend={8}
        />
        <StatCard 
          title="Saldo em Caixa" 
          value={`${config.moeda} ${currentBalance.toLocaleString()}`} 
          icon={<ShoppingCart className="text-purple-600" />} 
          color="bg-purple-50"
          trend={-2}
        />
        <StatCard 
          title="Alertas de Estoque" 
          value={lowStockCount} 
          icon={<AlertCircle className="text-rose-600" />} 
          color="bg-rose-50"
          trend={0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Desempenho de Vendas</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm px-3 py-1 font-medium focus:ring-2 focus:ring-blue-500">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Atenção ao Estoque</h3>
          <div className="space-y-4">
            {products.filter((p: any) => p.status !== 'disponível').length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">Tudo em ordem com seu estoque! ✅</p>
            ) : (
              products.filter((p: any) => p.status !== 'disponível').map((p: any) => (
                <div key={p.produto_id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{p.nome_produto}</p>
                    <p className="text-xs text-slate-500">{p.quantidade_estoque} {p.unidade} restantes</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                    p.status === 'esgotado' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status}
                  </span>
                </div>
              ))
            )}
          </div>
          <button 
            onClick={() => store.setActiveTab('inventory')}
            className="w-full mt-6 py-2 text-blue-600 text-sm font-bold border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Ver Todo Estoque
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
