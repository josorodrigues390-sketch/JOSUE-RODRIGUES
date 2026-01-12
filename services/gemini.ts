
import { GoogleGenAI } from "@google/genai";

export async function getBusinessInsights(data: {
  sales: any[],
  inventory: any[],
  finance: any[],
  config: any
}) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const prompt = `
    Como consultor de negócios especializado em análise de dados, analise o seguinte estado da empresa e forneça recomendações práticas:
    
    ESTADO ATUAL:
    - Vendas Totais: ${data.sales.length} transações
    - Lucro Total Estimado: R$ ${data.sales.reduce((acc, s) => acc + s.lucro, 0).toFixed(2)}
    - Itens em Baixo Estoque: ${data.inventory.filter(i => i.status === 'baixo estoque').length}
    - Saldo Atual: R$ ${data.finance.length > 0 ? data.finance[data.finance.length - 1].saldo_atual : 'N/A'}
    
    Responda em formato Markdown, focando em:
    1. Análise de ROI.
    2. Alertas de estoque.
    3. Oportunidades de crescimento baseadas nas vendas.
    4. Sugestões de fluxo de caixa.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao obter insights da IA:", error);
    return "Não foi possível gerar insights no momento. Verifique sua conexão ou chave de API.";
  }
}
