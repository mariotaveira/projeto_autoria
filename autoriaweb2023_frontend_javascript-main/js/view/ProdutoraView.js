/**
 * Renderiza o formulário para criar uma nova Diretor.
 * @return {string} HTML do formulário de criação de Diretor.
 */ 
//renderizarFormulario
// título para Nome_Diretor
function renderizarFormularioProdutora() {
    return `
            <form class="mt-3" id="formulario_Produtora">
                <div class="form-group">
                    <label for="Produtora_Nome_Produtora">Título da Produtora:</label>
                    <input type="text" class="form-control" id="Produtora_Nome_Produtora_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma Diretor existente.
   * @param {Object} Produtora - A Diretor a ser atualizado.
   * @return {string} HTML do formulário de atualização de Diretor.
   */
  function renderizarFormularioProdutoraAtualizar(Produtora) {
      return `
              <form class="mt-3" id="formulario_Produtora_atualizar">
                  <input type="hidden" class="form-control" id="Produtora_id_formulario" value="${Produtora.id}">
                  <div class="form-group">
                      <label for="Produtora_Nome_Produtora">Nome da Produtora:</label>
                      <input type="text" class="form-control" id="Produtora_Nome_Produtora_formulario" value="${Produtora.Nome_Produtora}">
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de Diretor.
   * @param {Array} Produtora - Lista de Diretor a serem exibidos.
   * @return {string} HTML do tabela de Diretor.
   */
  //renderizarTabela
  function renderizarTabelaProdutora(Produtoras) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Título do Diretor</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Diretores.forEach((Produtora) => {
      tabela += `
                <tr>
                    <td>${Produtora.Nome_Produtora}</td>
                    <td>
                      <button class="excluir-btn" produtora-id=${Produtora.id}>Excluir</button>
                      <button class="atualizar-btn" produtora-atualizar-id=${Produtora.id}>Atualizar</button>
                    </td>
                </tr>
            `;
    });
  
    tabela += `
                </tbody>
            </table>
        `;
  
    return tabela;
  }
  
  const ProdutoraView = {
      renderizarFormularioProdutora,
      renderizarTabelaProdutora,
      renderizarFormularioProdutoraAtualizar
  };
  
  export default ProdutoraView;
  