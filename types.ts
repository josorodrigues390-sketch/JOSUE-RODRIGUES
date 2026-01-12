
export type UserProfile = 'admin' | 'operador';
export type TransactionType = 'entrada' | 'saída';
export type TransactionOrigin = 'venda' | 'compra' | 'despesa' | 'investimento';
export type ItemUnidade = 'un' | 'kg' | 'cx';
export type StatusGeral = 'ativo' | 'inativo' | 'pendente' | 'pago' | 'cancelado' | 'concluído' | 'agendado';

export interface User {
  user_id: string;
  nome: string;
  email: string;
  perfil: UserProfile;
  data_criacao: string;
  status: 'ativo' | 'inativo';
}

export interface CashEntry {
  caixa_id: string;
  data: string;
  tipo: TransactionType;
  origem: TransactionOrigin;
  descricao: string;
  valor: number;
  forma_pagamento: string;
  saldo_anterior: number;
  saldo_atual: number;
}

export interface Product {
  produto_id: string;
  nome_produto: string;
  categoria: string;
  unidade: ItemUnidade;
  quantidade_estoque: number;
  custo_unitario: number;
  preco_venda: number;
  fornecedor: string;
  data_entrada: string;
  data_validade: string;
  status: 'disponível' | 'baixo estoque' | 'esgotado';
}

export interface Purchase {
  compra_id: string;
  data_compra: string;
  fornecedor: string;
  produto_id: string;
  quantidade: number;
  custo_unitario: number;
  custo_total: number;
  forma_pagamento: string;
  status: 'pago' | 'aberto';
}

export interface Sale {
  venda_id: string;
  data_venda: string;
  cliente: string;
  produto_id: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  forma_pagamento: string;
  status: 'paga' | 'pendente';
  lucro: number;
}

export interface Client {
  cliente_id: string;
  nome: string;
  telefone: string;
  endereco: string;
  data_cadastro: string;
}

export interface Appointment {
  agendamento_id: string;
  data: string;
  hora: string;
  cliente: string;
  produto_id: string;
  quantidade: number;
  valor: number;
  status: 'agendado' | 'concluído' | 'cancelado';
}

export interface FixedExpense {
  despesa_id: string;
  descricao: string;
  categoria: string;
  valor: number;
  vencimento: string;
  status: 'pago' | 'pendente';
}

export interface Config {
  nome_empresa: string;
  margem_lucro_padrao: number;
  moeda: string;
  valor_investimento_inicial: number;
}
