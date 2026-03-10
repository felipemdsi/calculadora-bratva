let parceria = true;

const itens = [
  { nome: "C4", parceria: 15000, normal: 20000 },
  { nome: "Colete", parceria: 20000, normal: 25000 },
  { nome: "Capuz", parceria: 3000, normal: 5000 },
  { nome: "USB Hacker", parceria: 15000, normal: 20000 },
  { nome: "Algema", parceria: 8000, normal: 9000 },
  { nome: "Drogas (unidade)", parceria: 600, normal: 700 }
];

const listaItens = document.getElementById("listaItens");

function formatar(valor){
  return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function renderItens(){

  listaItens.innerHTML = "";

  itens.forEach((item,index)=>{

    const preco = parceria ? item.parceria : item.normal;

    const linha = document.createElement("div");

    linha.className="linha";

    linha.innerHTML = `
      <input type="checkbox" class="checkItem" data-index="${index}">
      <span>${item.nome}</span>
      <span class="preco">${formatar(preco)}</span>
      <input type="number" value="0" min="0" class="qtdItem" data-index="${index}">
    `;

    listaItens.appendChild(linha);

  });

}

function calcular(){

  let total = 0;

  document.querySelectorAll(".checkItem").forEach((box,index)=>{

    if(box.checked){

      const qtd = document.querySelector(`.qtdItem[data-index="${index}"]`).value;

      const preco = parceria ? itens[index].parceria : itens[index].normal;

      total += preco * qtd;

    }

  });

  document.getElementById("totalItens").innerText = formatar(total);

}

document.addEventListener("change",calcular);
document.addEventListener("input",calcular);

renderItens();
