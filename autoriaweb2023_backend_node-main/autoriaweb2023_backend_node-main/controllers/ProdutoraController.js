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
function executarConsultaProdutora(sql, params, res, erroMsg) {
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
  executarConsultaProdutora('SELECT * FROM produtora', [], res, "Erro na consulta de produtoras");
});

// Rota para buscar uma gênero específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaProdutora('SELECT * FROM produtora WHERE  cod_produtora = ?', [id], res, "Erro na consulta de produtoras");
});

// Rota para criar uma nova gênero
router.post('/', (req, res) => {
  const { NomeProdutora} = req.body;
  executarConsultaProdutora('INSERT INTO produtora (noprodutora) VALUES ( ?)', [NomeProdutora], res, "Erro no cadastro da produtora!");
});

// Rota para deletar uma gênero
router.delete("/:id", (req, res) => {
  const produtoraId = req.params.id;
  executarConsultaProdutora('DELETE FROM produtora WHERE cod_produtora = ?', [produtoraId], res, 'Erro ao deletar produtora');
});

// Rota para atualizar uma gênero
router.put('/', (req, res) => {
  const { id, NomeProdutora} = req.body;
  executarConsultaProdutora('UPDATE produtora SET noprodutora = ? WHERE cod_produtora = ?', [NomeProdutora, id], res, "Erro ao atualizar produtora");
});

module.exports = router;