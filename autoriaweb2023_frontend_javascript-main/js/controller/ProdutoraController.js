import ProdutoraView from "../view/ProdutoraView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Diretor.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */ //renderizarDiretorFormulario
function renderizarProdutoraFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = ProdutoraView.renderizarFormularioProdutora();
  document.getElementById("formulario_Produtora").addEventListener("submit", cadastrarProdutora);
}
//descricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricao
/**
 * Cadastra uma nova Diretor.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarProdutora(event) {
  event.preventDefault();
  const ProdutoraValor = document.getElementById("Produtora_Nome_Produtora_formulario").value;
  const novaPordutora = { Nome_Produtora: ProdutoraValor};
 //diretor
  try {
    await fetch(`${API_BASE_URL}/produtora`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPordutora),
    }); //renderizarListaDiretor
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar produtora:", error);
  }
}
/**
 * Renderiza a lista de diretor.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaProdutora(componentePrincipal) {
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
 * Adiciona eventos de clique aos botões de exclusão de Diretor.
 * Cada botão, quando clicado, aciona a função de exclusão de Diretor correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const produtoraId = this.getAttribute("produtora-id");
      excluirProdutora(produtoraId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Diretor.
 * Cada botão, quando clicado, aciona a função de buscar a Diretor específica para atualização.
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
 * Exclui uma Diretor específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de diretor é atualizada.
 * @param {string} id - ID da Diretor a ser excluída.
 */
async function excluirProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtora/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a produtora");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a produtora:", error);
  }
}

/**
 * Busca uma Diretor específica para atualização, com base no ID.
 * Após encontrar a Diretor, renderiza o formulário de atualização.
 * @param {string} id - ID da Diretor a ser buscada.
 */
async function buscarProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtora/${id}`);
    const produtoraBD = await response.json();
    if (produtoraBD.length <= 0) return;

    const Produtora = produtoraBD.map(row => ({
      id: row.cod_produtora,
      Nome_Produtora: row.noprodutora,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = ProdutoraView.renderizarFormularioProdutoraAtualizar(Produtora);
    document.getElementById("formulario_Produtora_atualizar").addEventListener("submit", atualizarProdutora);
  } catch (error) {
    console.error("Erro ao buscar produtora:", error);
  }
}

/**
 * Atualiza uma Diretor específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarDiretor(event) {
  event.preventDefault();

  const codValor = document.getElementById("Produtora_id_formulario").value;
  const ProdutoraValor = document.getElementById("Produtora_Nome_Produtora_formulario").value;
  const Produtora = {cod: codValor, Nome_Produtora: ProdutoraValor};

  try {
    const response = await fetch(`${API_BASE_URL}/produtora`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Produtora),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a produtora");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar produtora:", error);
  }
}

const DiretorController = {
  renderizarProdutoraFormulario,
  cadastrarProdutora,
  renderizarListaProdutora,
  excluirProdutora,
};

export default ProdutoraController;
