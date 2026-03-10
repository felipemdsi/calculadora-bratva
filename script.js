let parceria = true;

const itens = [
  { nome: "C4", parceria: 15000, normal: 20000 },
  { nome: "Colete", parceria: 20000, normal: 25000 },
  { nome: "Capuz", parceria: 3000, normal: 5000 },
  { nome: "USB Hacker", parceria: 15000, normal: 20000 },
  { nome: "Algema", parceria: 8000, normal: 9000 },
  { nome: "Drogas (Unidade)", parceria: 600, normal: 700 }
];

const listaItens = document.getElementById("listaItens");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderItens() {
  listaItens.innerHTML = "";

  itens.forEach((item, index) => {
    const preco = parceria ? item.parceria : item.normal;

    const row = document.createElement("div");
    row.className = "linha tabela-itens";
    row.innerHTML = `
      <input type="checkbox" class="check-item" data-index="${index}">
      <span>${item.nome}</span>
      <span class="preco">${formatarMoeda(preco)}</span>
      <input type="number" min="0" value="0" class="qtd-item" data-index="${index}">
    `;

    listaItens.appendChild(row);
  });

  const modoPreco = document.getElementById("modoPreco");
  modoPreco.textContent = parceria ? "• PARCERIA ATIVA" : "• SEM PARCERIA";
}

function atualizarTotais() {
  let totalItens = 0;

  document.querySelectorAll(".check-item").forEach((checkbox, index) => {
    const qtdInput = document.querySelector(`.qtd-item[data-index="${index}"]`);
    const qtd = Number(qtdInput.value) || 0;

    if (checkbox.checked && qtd > 0) {
      const preco = parceria ? itens[index].parceria : itens[index].normal;
      totalItens += preco * qtd;
    }
  });

  const taxaPainel = totalItens * 0.60;
  const valorFinal = totalItens + taxaPainel;

  document.getElementById("totalItens").textContent = formatarMoeda(totalItens);
  document.getElementById("resumoVendas").textContent = formatarMoeda(totalItens);
  document.getElementById("taxaPainel").textContent = formatarMoeda(taxaPainel);
  document.getElementById("valorFinal").textContent = formatarMoeda(valorFinal);
}

function trocarParceria() {
  parceria = !parceria;
  renderItens();
  atualizarTotais();
}

document.addEventListener("change", atualizarTotais);
document.addEventListener("input", atualizarTotais);

renderItens();
atualizarTotais();
