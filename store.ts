
import { useState, useCallback, useMemo } from 'react';
import { 
  User, Product, Sale, Purchase, CashEntry, 
  Client, Appointment, FixedExpense, Config 
} from './types';

export function useNexusStore() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useState<Config>({
    nome_empresa: 'Minha Empresa Ltda',
    margem_lucro_padrao: 30,
    moeda: 'R$',
    valor_investimento_inicial: 10000
  });

  const [products, setProducts] = useState<Product[]>([
    {
      produto_id: '1',
      nome_produto: 'Smartphone X',
      categoria: 'Eletrônicos',
      unidade: 'un',
      quantidade_estoque: 15,
      custo_unitario: 1200,
      preco_venda: 1800,
      fornecedor: 'Tech Global',
      data_entrada: '2024-01-10',
      data_validade: 'N/A',
      status: 'disponível'
    }
  ]);

  const [sales, setSales] = useState<Sale[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [cashFlow, setCashFlow] = useState<CashEntry[]>([]);
  const [clients, setClients] = useState<Client[]>([
    {
      cliente_id: 'c1',
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123',
      data_cadastro: '2024-01-15'
    }
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expenses, setExpenses] = useState<FixedExpense[]>([]);

  // Helpers
  const currentBalance = useMemo(() => {
    return cashFlow.length > 0 ? cashFlow[cashFlow.length - 1].saldo_atual : config.valor_investimento_inicial;
  }, [cashFlow, config.valor_investimento_inicial]);

  const addCashEntry = useCallback((entry: Omit<CashEntry, 'caixa_id' | 'saldo_anterior' | 'saldo_atual'>) => {
    setCashFlow(prev => {
      const lastBalance = prev.length > 0 ? prev[prev.length - 1].saldo_atual : config.valor_investimento_inicial;
      const newValue = entry.tipo === 'entrada' ? entry.valor : -entry.valor;
      const newEntry: CashEntry = {
        ...entry,
        caixa_id: Math.random().toString(36).substr(2, 9),
        saldo_anterior: lastBalance,
        saldo_atual: lastBalance + newValue
      };
      return [...prev, newEntry];
    });
  }, [config.valor_investimento_inicial]);

  const updateProductStock = useCallback((productId: string, qtyChange: number) => {
    setProducts(prev => prev.map(p => {
      if (p.produto_id === productId) {
        const newQty = p.quantidade_estoque + qtyChange;
        let status: Product['status'] = 'disponível';
        if (newQty <= 0) status = 'esgotado';
        else if (newQty < 5) status = 'baixo estoque';
        return { ...p, quantidade_estoque: newQty, status };
      }
      return p;
    }));
  }, []);

  const registerSale = useCallback((saleData: Omit<Sale, 'venda_id' | 'lucro' | 'valor_total'>) => {
    const product = products.find(p => p.produto_id === saleData.produto_id);
    if (!product) return;

    const total = saleData.quantidade * saleData.valor_unitario;
    const profit = total - (saleData.quantidade * product.custo_unitario);
    
    const newSale: Sale = {
      ...saleData,
      venda_id: Math.random().toString(36).substr(2, 9),
      valor_total: total,
      lucro: profit
    };

    setSales(prev => [newSale, ...prev]);
    updateProductStock(saleData.produto_id, -saleData.quantidade);
    addCashEntry({
      data: saleData.data_venda,
      tipo: 'entrada',
      origem: 'venda',
      descricao: `Venda #${newSale.venda_id} - ${product.nome_produto}`,
      valor: total,
      forma_pagamento: saleData.forma_pagamento
    });
  }, [products, updateProductStock, addCashEntry]);

  const registerPurchase = useCallback((purchaseData: Omit<Purchase, 'compra_id' | 'custo_total'>) => {
    const product = products.find(p => p.produto_id === purchaseData.produto_id);
    if (!product) return;

    const total = purchaseData.quantidade * purchaseData.custo_unitario;
    const newPurchase: Purchase = {
      ...purchaseData,
      compra_id: Math.random().toString(36).substr(2, 9),
      custo_total: total
    };

    setPurchases(prev => [newPurchase, ...prev]);
    updateProductStock(purchaseData.produto_id, purchaseData.quantidade);
    addCashEntry({
      data: purchaseData.data_compra,
      tipo: 'saída',
      origem: 'compra',
      descricao: `Compra #${newPurchase.compra_id} - ${product.nome_produto}`,
      valor: total,
      forma_pagamento: purchaseData.forma_pagamento
    });
  }, [products, updateProductStock, addCashEntry]);

  const addAppointment = useCallback((app: Omit<Appointment, 'agendamento_id'>) => {
    setAppointments(prev => [{ ...app, agendamento_id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  }, []);

  const addProduct = useCallback((p: Omit<Product, 'produto_id' | 'status'>) => {
    setProducts(prev => [
      { 
        ...p, 
        produto_id: Math.random().toString(36).substr(2, 9),
        status: p.quantidade_estoque > 5 ? 'disponível' : p.quantidade_estoque > 0 ? 'baixo estoque' : 'esgotado'
      }, 
      ...prev
    ]);
  }, []);

  return {
    activeTab, setActiveTab,
    config, setConfig,
    products, addProduct,
    sales, registerSale,
    purchases, registerPurchase,
    cashFlow, currentBalance,
    clients, setClients,
    appointments, addAppointment,
    expenses, setExpenses
  };
}
