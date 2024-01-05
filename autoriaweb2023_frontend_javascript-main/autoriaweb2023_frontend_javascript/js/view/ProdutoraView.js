/**
 
 * @return {string} 
 */ 

function renderizarFormularioProdutora() {
    return `
            <form class="mt-3" id="formulario_Produtora">
                <div class="form-group">
                    <label for="Produtora_Nome_Produtora">Nome da Produtora:</label>
                    <input type="text" class="form-control" id="Produtora_Nome_Produtora_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   
   * @param {Object} Produtora 
   * @return {string} 
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

    @param {Array} Produtora 
    @return {string} 
   */
  //renderizarTabela
  function renderizarTabelaProdutora(Produtoras) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nome da produtora</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Produtoras.forEach((Produtora) => {
      tabela += `
                <tr>
                    <td>${Produtora.Nome_Produtora}</td>
                    <td>
                      <button class="excluir-btn" produtora-id=${produtora.id}>Excluir</button>
                      <button class="atualizar-btn" produtora-atualizar-id=${produtora.id}>Atualizar</button>
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
  