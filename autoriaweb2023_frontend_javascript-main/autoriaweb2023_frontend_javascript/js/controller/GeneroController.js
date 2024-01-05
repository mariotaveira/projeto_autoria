import generoView from "../view/GeneroView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de genero.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarGeneroFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = generoView.renderizarFormularioGenero();
  document.getElementById("formulario_Genero").addEventListener("submit", cadastrarGenero);
}

/**
 * Cadastra uma nova genero.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarGenero(event) {
  event.preventDefault();
  const GeneroValor = document.getElementById("Genero_NomeGenero_formulario").value;
  const novaGenero = { NomeGenero: GeneroValor };

  try {
    await fetch(`${API_BASE_URL}/genero`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaGenero),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaGeneros(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar genero:", error);
  }
}
/**
 * Renderiza a lista de generos.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaGeneros(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/genero");
    const generoBD = await response.json(); 

    const generos = generoBD.map((row) => {
      return {
        id: row.cod_genero,
        NomeGenero: row.nogenero,
      };
    });
    componentePrincipal.innerHTML = generoView.renderizarTabelaGenero(generos);
    inserirEventosExcluir1();
    inserirEventosAtualizar1();
  } catch (error) {
    console.error("Erro ao buscar generos:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de genero.
 * Cada botão, quando clicado, aciona a função de exclusão de genero correspondente.
 */
function inserirEventosExcluir1() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const generoId = this.getAttribute("genero-id");
      excluirGenero(generoId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de genero.
 * Cada botão, quando clicado, aciona a função de buscar a genero específica para atualização.
 */
function inserirEventosAtualizar1() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const generoId = this.getAttribute("genero-atualizar-id");
      buscarGenero(generoId);
    });
  });
}

/**
 * Exclui uma genero específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de generos é atualizada.
 * @param {string} id - ID da genero a ser excluída.
 */
async function excluirGenero(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/genero/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a genero");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaGeneros(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a genero:", error);
  }
}

/**
 * Busca uma genero específica para atualização, com base no ID.
 * Após encontrar a genero, renderiza o formulário de atualização.
 * @param {string} id - ID da genero a ser buscada.
 */
async function buscarGenero(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/genero/${id}`);
    const generoBD = await response.json();
    if (generoBD.length <= 0) return;

    const genero = generoBD.map(row => ({
      id: row.cod_genero,
      NomeGenero: row.nogenero,

    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = generoView.renderizarFormularioGeneroAtualizar(genero);
    document.getElementById("formulario_Genero_atualizar").addEventListener("submit", atualizarGenero);
  } catch (error) {
    console.error("Erro ao buscar generos:", error);
  }
}

/**
 * Atualiza uma genero específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarGenero(event) {
  event.preventDefault();

  const idValor = document.getElementById("Genero_id_formulario").value;
  const GeneroValor = document.getElementById("Genero_NomeGenero_formulario").value;
  const genero = {id: idValor, NomeGenero: GeneroValor};

  try {
    const response = await fetch(`${API_BASE_URL}/genero`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(genero),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a genero");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaGeneros(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar genero:", error);
  }
}

const GeneroController = {
  renderizarGeneroFormulario,
  cadastrarGenero,
  renderizarListaGeneros,
  excluirGenero,
};

export default GeneroController;
