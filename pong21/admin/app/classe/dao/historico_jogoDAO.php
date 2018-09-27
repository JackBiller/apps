
<?php 
require_once "../classe/conexao.php";

class historico_jogoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraHistorico_jogo(Historico_jogo $entidadeHistorico_jogo){
		try{
			$param = array(
				':sequencia_historico_jogo'=>$entidadeHistorico_jogo->get('sequencia_historico_jogo'), 
				':placar_historico_jogo'=>$entidadeHistorico_jogo->get('placar_historico_jogo'), 
				':jogos_id'=>$entidadeHistorico_jogo->get('jogos_id'), 
				':usuario_id'=>$entidadeHistorico_jogo->get('usuario_id'), 
				':bool_ativo_historico_jogo'=>$entidadeHistorico_jogo->get('bool_ativo_historico_jogo')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO historico_jogo (sequencia_historico_jogo, placar_historico_jogo, jogos_id, usuario_id, bool_ativo_historico_jogo) VALUES (:sequencia_historico_jogo, :placar_historico_jogo, :jogos_id, :usuario_id, :bool_ativo_historico_jogo);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Historico_jogo ".$ex->getMessage();
		}
	}
	function atualizaHistorico_jogo(Historico_jogo $entidadeHistorico_jogo, $id){
		try{
			$param = array(
				':sequencia_historico_jogo'=>$entidadeHistorico_jogo->get('sequencia_historico_jogo'), 
				':placar_historico_jogo'=>$entidadeHistorico_jogo->get('placar_historico_jogo'), 
				':jogos_id'=>$entidadeHistorico_jogo->get('jogos_id'), 
				':usuario_id'=>$entidadeHistorico_jogo->get('usuario_id'), 
				':bool_ativo_historico_jogo'=>$entidadeHistorico_jogo->get('bool_ativo_historico_jogo')
			);

			$stmt = $this->pdo->prepare("UPDATE historico_jogo SET sequencia_historico_jogo = :sequencia_historico_jogo, placar_historico_jogo = :placar_historico_jogo, jogos_id = :jogos_id, usuario_id = :usuario_id, bool_ativo_historico_jogo = :bool_ativo_historico_jogo WHERE id_historico_jogo = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Historico_jogo ".$ex->getMessage();
		}
	}
}
?>