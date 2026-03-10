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
const totalItensEl = document.getElementById("totalItens");
const resumoVendasEl = document.getElementById("resumoVendas");
const taxaPainelEl = document.getElementById("taxaPainel");
const comissaoValorEl = document.getElementById("comissaoValor");
const valorFinalEl = document.getElementById("valorFinal");
const modoPrecoEl = document.getElementById("modoPreco");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderItens() {
  listaItens.innerHTML = "";

  itens.forEach((item, index) => {
    const precoAtual = parceria ? item.parceria : item.normal;

    const row = document.createElement("div");
    row.className = "linha tabela-itens";
    row.innerHTML = `
      <span><input type="checkbox" class="check-item" data-index="${index}"></span>
      <span>${item.nome}</span>
      <span class="preco">${formatarMoeda(precoAtual)}</span>
      <span><input type="number" min="0" value="0" class="qtd-item" data-index="${index}"></span>
    `;

    listaItens.appendChild(row);
  });

  modoPrecoEl.textContent = parceria ? "• COM PARCERIA" : "• SEM PARCERIA";
  atualizarTotais();
}

function atualizarTotais() {
  let totalVendas = 0;

  document.querySelectorAll(".check-item").forEach((checkbox, index) => {
    const qtdInput = document.querySelector(`.qtd-item[data-index="${index}"]`);
    const qtd = Number(qtdInput.value) || 0;

    if (checkbox.checked && qtd > 0) {
      const precoAtual = parceria ? itens[index].parceria : itens[index].normal;
      totalVendas += precoAtual * qtd;
    }
  });

  const valorPainel = totalVendas * 0.60;
  const valorComissao = totalVendas * 0.40;
  const valorTotal = totalVendas;

  totalItensEl.textContent = formatarMoeda(totalVendas);
  resumoVendasEl.textContent = formatarMoeda(totalVendas);
  taxaPainelEl.textContent = formatarMoeda(valorPainel);
  comissaoValorEl.textContent = formatarMoeda(valorComissao);
  valorFinalEl.textContent = formatarMoeda(valorTotal);
}

function trocarParceria() {
  parceria = !parceria;
  renderItens();
}

document.addEventListener("change", (event) => {
  if (
    event.target.classList.contains("check-item") ||
    event.target.classList.contains("qtd-item")
  ) {
    atualizarTotais();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.classList.contains("qtd-item")) {
    atualizarTotais();
  }
});

renderItens();
