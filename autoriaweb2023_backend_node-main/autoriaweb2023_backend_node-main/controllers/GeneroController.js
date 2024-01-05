const express = require('express');
const router = express.Router();
const db = require('../util/db');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsultaGenero(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as gêneros       //executarConsulta
router.get('/', (req, res) => {
  executarConsultaGenero('SELECT * FROM genero', [], res, "Erro na consulta de gêneros");
});

// Rota para buscar uma gênero específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaGenero('SELECT * FROM genero WHERE  cod_genero = ?', [id], res, "Erro na consulta de gênero");
});

// Rota para criar uma nova gênero
router.post('/', (req, res) => {
  const { NomeGenero} = req.body;
  executarConsultaGenero('INSERT INTO genero (nogenero) VALUES ( ?)', [NomeGenero], res, "Erro no cadastro de gênero!");
});

// Rota para deletar uma gênero
router.delete("/:id", (req, res) => {
  const gêneroId = req.params.id;
  executarConsultaGenero('DELETE FROM genero WHERE cod_genero = ?', [gêneroId], res, 'Erro ao deletar gênero');
});

// Rota para atualizar uma gênero
router.put('/', (req, res) => {
  const { id, NomeGenero} = req.body;
  executarConsultaGenero('UPDATE genero SET nogenero = ? WHERE cod_Genero = ?', [NomeGenero, id], res, "Erro ao atualizar gênero");
});

module.exports = router;