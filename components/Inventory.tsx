
import React, { useState } from 'react';
import { Package, Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';

const Inventory: React.FC<{ store: any }> = ({ store }) => {
  const { products, addProduct, config } = store;
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nome_produto: '',
    categoria: '',
    unidade: 'un',
    quantidade_estoque: 0,
    custo_unitario: 0,
    preco_venda: 0,
    fornecedor: '',
    data_entrada: new Date().toISOString().split('T')[0],
    data_validade: 'N/A'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setShowForm(false);
    setNewProduct({
      nome_produto: '',
      categoria: '',
      unidade: 'un',
      quantidade_estoque: 0,
      custo_unitario: 0,
      preco_venda: 0,
      fornecedor: '',
      data_entrada: new Date().toISOString().split('T')[0],
      data_validade: 'N/A'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar produtos, categorias ou fornecedores..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filtrar
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Plus size={18} />
            Novo Produto
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Produto</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Nome do Produto</label>
              <input 
                required
                value={newProduct.nome_produto}
                onChange={e => setNewProduct({...newProduct, nome_produto: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Categoria</label>
              <input 
                required
                value={newProduct.categoria}
                onChange={e => setNewProduct({...newProduct, categoria: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Unidade</label>
              <select 
                value={newProduct.unidade}
                onChange={e => setNewProduct({...newProduct, unidade: e.target.value as any})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="un">Unidade (un)</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="cx">Caixa (cx)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Qtd Inicial</label>
              <input 
                type="number"
                required
                value={newProduct.quantidade_estoque}
                onChange={e => setNewProduct({...newProduct, quantidade_estoque: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Custo Unitário</label>
              <input 
                type="number"
                required
                value={newProduct.custo_unitario}
                onChange={e => setNewProduct({...newProduct, custo_unitario: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Preço Venda</label>
              <input 
                type="number"
                required
                value={newProduct.preco_venda}
                onChange={e => setNewProduct({...newProduct, preco_venda: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-4">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 text-slate-600 font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Produto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estoque</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Preços</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Valor Total</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((p: any) => (
              <tr key={p.produto_id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{p.nome_produto}</p>
                      <p className="text-xs text-slate-500">{p.categoria}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-700">{p.quantidade_estoque} {p.unidade}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs space-y-0.5">
                    <p className="text-slate-400">Custo: <span className="text-slate-600 font-medium">{config.moeda} {p.custo_unitario}</span></p>
                    <p className="text-slate-400">Venda: <span className="text-blue-600 font-bold">{config.moeda} {p.preco_venda}</span></p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{config.moeda} {(p.quantidade_estoque * p.preco_venda).toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    p.status === 'disponível' ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'baixo estoque' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
