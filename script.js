const metas = {
  EZT1B45: [7, 8],
  TLA3H49: [8.6, 9.4],
  GIS4F97: [8.7, 9.4],
  GFP9C05: [15, 17],
  FKJ9G76: [14, 17]
};

function registrarAbastecimentos() {
  const placa = document.getElementById("placa").value.toUpperCase().trim();
  const abastecimentos = [];

  for (let i = 1; i <= 3; i++) {
    const data = document.getElementById(`data${i}`).value;
    const litros = parseFloat(document.getElementById(`litros${i}`).value);
    const km = parseInt(document.getElementById(`km${i}`).value);

    if (!data || isNaN(litros) || isNaN(km)) {
      alert(`Preencha todos os campos do abastecimento ${i}.`);
      return;
    }

    abastecimentos.push({ data, litros, km });
  }

  abastecimentos.sort((a, b) => a.km - b.km); // Ordena por KM crescente

  const penultimo = abastecimentos[1];
  const ultimo = abastecimentos[2];

  const kmRodado = ultimo.km - penultimo.km;
  const mediaFinal = (kmRodado / ultimo.litros).toFixed(2);

  const faixa = metas[placa];
  let status = "";

  if (faixa) {
    if (mediaFinal < faixa[0]) {
      status = `⚠️ Abaixo da média (${faixa[0]})`;
    } else if (mediaFinal > faixa[1]) {
      status = `✅ Acima da média (${faixa[1]})`;
    } else {
      status = `✔️ Dentro da média (${faixa[0]}–${faixa[1]})`;
    }
  } else {
    status = "❓ Placa não cadastrada na meta.";
  }

  const resultado = `
${placa}
${ultimo.data} – ${ultimo.km.toLocaleString("pt-BR")} km
Penúltimo KM: ${penultimo.km.toLocaleString("pt-BR")} km
Rodou: ${kmRodado} km
Litros: ${ultimo.litros.toFixed(2)} L
Média: ${mediaFinal} km/L
${status}
  `;

  document.getElementById("resultado").innerText = resultado.trim();
}
