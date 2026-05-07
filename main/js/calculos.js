export const calcularSaldo = (dados) => {

  return dados.reduce((total, item) => {

    return item.tipo === "receita"
      ? total + item.valor
      : total - item.valor;

  }, 0);

};

export const gerarInsights = (dados) => {

  const insights = [];

  const totalGasto = dados
    .filter(item => item.tipo === "gasto")
    .reduce((acc, item) => acc + item.valor, 0);

  if (totalGasto > 1000) {
    insights.push("Seus gastos estão altos.");
  }

  return insights;

};