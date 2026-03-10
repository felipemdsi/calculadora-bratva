const Itens Sem Parceria = [
  { nome: "C4", preco: 20000 },
  { nome: "Colete", preco: 25000 },
  { nome: "Capuz", preco: 5000 },
  { nome: "USB Hacker", preco: 20000 },
  { nome: "Algema", preco: 9000 },
  { nome: "Externo", Drogas: 700 },
  { nome: "Externo Norte", LSD: 700 }
];

const itens na Parceria = [
  { nome: "C4 (PARCERIA)", preco: 15000 },
  { nome: "Colete", preco: 20000 },
  { nome: "Capuz", preco: 3000 },
  { nome: "USB Hacker", preco: 15000 },
  { nome: "Algema", preco: 8000 },
  { nome: "Drogas", preco: 600 },
  { nome: "LSD", preco: 600 },
  { nome: "---r", preco: 0 },
  { nome: "C---", preco: 0 }
];

const listaConsertos = document.getElementById("listaConsertos");
const listaItens = document.getElementById("listaItens");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function criarConsertos() {
  consertos.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "linha tabela-consertos";
    row.innerHTML = `
      <input type="checkbox" class="check-conserto" data-index="${index}">
      <span>${item.nome}</span>
      <span class="preco">${formatarMoeda(item.preco)}</span>
    `;
    listaConsertos.appendChild(row);
  });
}

function criarItens() {
  itens.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "linha tabela-itens";
    row.innerHTML = `
      <input type="checkbox" class="check-item" data-index="${index}">
      <span>${item.nome}</span>
      <span class="preco">${formatarMoeda(item.preco)}</span>
      <input type="number" min="0" value="0" class="qtd-item" data-index="${index}">
    `;
    listaItens.appendChild(row);
  });
}

function atualizarTotais() {
  let totalConsertos = 0;
  let totalItens = 0;

  document.querySelectorAll(".check-conserto").forEach((checkbox, index) => {
    if (checkbox.checked) {
      totalConsertos += consertos[index].preco;
    }
  });

  document.querySelectorAll(".check-item").forEach((checkbox, index) => {
    const qtdInput = document.querySelector(`.qtd-item[data-index="${index}"]`);
    const qtd = Number(qtdInput.value) || 0;

    if (checkbox.checked && qtd > 0) {
      totalItens += itens[index].preco * qtd;
    }
  });

  const taxaPainel = totalItens * 0.20;
  const valorFinal = totalConsertos + totalItens + taxaPainel;

  document.getElementById("totalConsertos").textContent = formatarMoeda(totalConsertos);
  document.getElementById("totalItens").textContent = formatarMoeda(totalItens);
  document.getElementById("resumoConsertos").textContent = formatarMoeda(totalConsertos);
  document.getElementById("resumoVendas").textContent = formatarMoeda(totalItens);
  document.getElementById("taxaPainel").textContent = formatarMoeda(taxaPainel);
  document.getElementById("valorFinal").textContent = formatarMoeda(valorFinal);
}

criarConsertos();
criarItens();

document.addEventListener("change", atualizarTotais);
document.addEventListener("input", atualizarTotais);

atualizarTotais();
