import ProdutoraView from "../view/ProdutoraView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */ //renderizarProdutoraFormulario
function renderizarProdutoraFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = ProdutoraView.renderizarFormularioProdutora();
  document.getElementById("formulario_Produtora").addEventListener("submit", cadastrarProdutora);
}
/**
 
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarProdutora(event) {
  event.preventDefault();
  const ProdutoraValor = document.getElementById("Produtora_NomeProdutora_formulario");
  const novaProdutora = { Nome_Produtora: ProdutoraValor};

  try {
    await fetch(`${API_BASE_URL}/produtora`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaProdutora),
    }); //renderizarListaProdutora
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaProdutoras(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Produtora:", error);
  }
}
/**
 
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaProdutoras(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/produtora");
    const produtoraBD = await response.json(); 

    const produtora = produtoraBD.map((row) => {
      return {
        id: row.cod_produtora,
        Nome_Produtora: row.noprodutora,
      };
    });
    componentePrincipal.innerHTML = ProdutoraView.renderizarTabelaProdutora(produtora);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar produtora:", error);
  }
}

/**

 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const ProdutoraId = this.getAttribute("produtora-id");
      excluirProdutora(ProdutoraId);
    });
  });
}

/**
 
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const ProdutoraId = this.getAttribute("produtora-atualizar-id");
      buscarProdutora(ProdutoraId);
    });
  });
}

/**

 * @param {string} id - 
 */
async function excluirProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtora/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a Produtora");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutoras(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Produtora:", error);
  }
}

/**
 
 * @param {string} id - 
 */
async function buscarProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtora/${id}`);
    const produtoraBD = await response.json();
    if (produtoraBD.length <= 0) return;

    const produtora = produtoraBD.map(row => ({
      id: row.cod_produtora,
      Nome_Produtora: row.noprodutora,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = ProdutoraView.renderizarFormularioProdutoraAtualizar(produtora);
    document.getElementById("formulario_produtora_atualizar").addEventListener("submit", atualizarProdutora);
  } catch (error) {
    console.error("Erro ao buscar produtora:", error);
  }
}

/**

 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarProdutora(event) {
  event.preventDefault();

  const idValor = document.getElementById("produtora_id_formulario").value;
  const ProdutoraValor = document.getElementById("Produtora_NomeProdutora_formulario");
  const produtora = {id: idValor, Nome_Produtora: ProdutoraValor};

  try {
    const response = await fetch(`${API_BASE_URL}/produtora`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(produtora),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a produtora");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutoras(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar produtora:", error);
  }
}

const ProdutoraController = {
  renderizarProdutoraFormulario,
  cadastrarProdutora,
  renderizarListaProdutoras,
  excluirProdutora,
};

export default ProdutoraController;