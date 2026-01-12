
import React, { useState } from 'react';
import { ShoppingCart, Plus, Search, Calendar, User, FileText } from 'lucide-react';

interface Props {
  mode: 'sales' | 'purchases';
  store: any;
}

const SalesPurchases: React.FC<Props> = ({ mode, store }) => {
  const { products, sales, purchases, registerSale, registerPurchase, config } = store;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    produto_id: '',
    quantidade: 1,
    valor: 0,
    entidade: '', // Cliente p/ venda, Fornecedor p/ compra
    forma_pagamento: 'Dinheiro'
  });

  const dataList = mode === 'sales' ? sales : purchases;
  const isSale = mode === 'sales';

  const handleProductChange = (id: string) => {
    const product = products.find((p: any) => p.produto_id === id);
    if (product) {
      setFormData({
        ...formData,
        produto_id: id,
        valor: isSale ? product.preco_venda : product.custo_unitario
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSale) {
      registerSale({
        data_venda: new Date().toISOString().split('T')[0],
        cliente: formData.entidade,
        produto_id: formData.produto_id,
        quantidade: formData.quantidade,
        valor_unitario: formData.valor,
        forma_pagamento: formData.forma_pagamento,
        status: 'paga'
      });
    } else {
      registerPurchase({
        data_compra: new Date().toISOString().split('T')[0],
        fornecedor: formData.entidade,
        produto_id: formData.produto_id,
        quantidade: formData.quantidade,
        custo_unitario: formData.valor,
        forma_pagamento: formData.forma_pagamento,
        status: 'pago'
      });
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          {isSale ? 'Histórico de Vendas' : 'Histórico de Compras'}
        </h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-2 ${isSale ? 'bg-emerald-600' : 'bg-blue-600'} text-white font-bold rounded-xl shadow-lg transition-all`}
        >
          <Plus size={18} />
          Registrar {isSale ? 'Venda' : 'Compra'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-xl max-w-2xl">
          <h3 className="text-xl font-bold mb-6">Novo Registro de {isSale ? 'Venda' : 'Compra'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Produto</label>
                <select 
                  required
                  value={formData.produto_id}
                  onChange={e => handleProductChange(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="">Selecione um produto</option>
                  {products.map((p: any) => (
                    <option key={p.produto_id} value={p.produto_id}>{p.nome_produto} ({p.quantidade_estoque} em estoque)</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">{isSale ? 'Cliente' : 'Fornecedor'}</label>
                <input 
                  required
                  value={formData.entidade}
                  onChange={e => setFormData({...formData, entidade: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder={isSale ? "Nome do cliente" : "Nome do fornecedor"}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Quantidade</label>
                <input 
                  type="number"
                  required
                  min="1"
                  value={formData.quantidade}
                  onChange={e => setFormData({...formData, quantidade: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Valor Unitário ({config.moeda})</label>
                <input 
                  type="number"
                  required
                  value={formData.valor}
                  onChange={e => setFormData({...formData, valor: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="pt-4 flex justify-between items-center border-t">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Total Geral</p>
                <p className="text-2xl font-black text-slate-800">{config.moeda} {(formData.quantidade * formData.valor).toLocaleString()}</p>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 font-bold text-slate-400">Cancelar</button>
                <button type="submit" className={`px-10 py-3 rounded-xl text-white font-bold shadow-lg ${isSale ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                  Confirmar {isSale ? 'Venda' : 'Compra'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Data</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{isSale ? 'Cliente' : 'Fornecedor'}</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Produto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Qtd</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total</th>
              {isSale && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lucro</th>}
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Pagamento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {dataList.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-20 text-center text-slate-400">Nenhum registro encontrado.</td></tr>
            ) : (
              dataList.map((item: any) => {
                const product = products.find((p: any) => p.produto_id === item.produto_id);
                return (
                  <tr key={isSale ? item.venda_id : item.compra_id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {new Date(isSale ? item.data_venda : item.data_compra).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="font-bold text-slate-800">{isSale ? item.cliente : item.fornecedor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{product?.nome_produto || 'Produto Removido'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-500">{item.quantidade}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${isSale ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {config.moeda} {(isSale ? item.valor_total : item.custo_total).toLocaleString()}
                      </span>
                    </td>
                    {isSale && (
                      <td className="px-6 py-4">
                        <span className="text-blue-600 font-bold">+{config.moeda} {item.lucro.toLocaleString()}</span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">{item.forma_pagamento}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPurchases;
