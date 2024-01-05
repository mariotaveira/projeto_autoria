/**
 * Renderiza o formulário para criar uma nova Genero.
 * @return {string} HTML do formulário de criação de Genero.
 */ 
//renderizarFormulario
// título para NomeGenero
function renderizarFormularioGenero() {
    return `
            <form class="mt-3" id="formulario_Genero">
                <div class="form-group">
                    <label for="Genero_NomeGenero">Título do Genero:</label>
                    <input type="text" class="form-control" id="Genero_NomeGenero_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma Genero existente.
   * @param {Object} Genero - A Genero a ser atualizado.
   * @return {string} HTML do formulário de atualização de Genero.
   */
  function renderizarFormularioGeneroAtualizar(Genero) {
      return `
              <form class="mt-3" id="formulario_Genero_atualizar">
                  <input type="hidden" class="form-control" id="Genero_id_formulario" value="${Genero.id}">
                  <div class="form-group">
                      <label for="Genero_NomeGenero">Título do Genero:</label>
                      <input type="text" class="form-control" id="Genero_NomeGenero_formulario" value="${Genero.NomeGenero}">
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de Genero.
   * @param {Array} Genero - Lista de Genero a serem exibidos.
   * @return {string} HTML do tabela de Genero.
   */
  //renderizarTabela
  function renderizarTabelaGenero(Generos) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Título do Gênero</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Generos.forEach((Genero) => {
      tabela += `
                <tr>
                    <td>${Genero.NomeGenero}</td>
                    <td>
                      <button class="excluir-btn" Genero-id=${Genero.id}>Excluir</button>
                      <button class="atualizar-btn" Genero-atualizar-id=${Genero.id}>Atualizar</button>
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
  
  const GeneroView = {
      renderizarFormularioGenero,
      renderizarTabelaGenero,
      renderizarFormularioGeneroAtualizar
  };
  
  export default GeneroView;
  