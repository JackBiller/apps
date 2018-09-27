
<?php 
require_once "../classe/conexao.php";

class jogo_atualDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraJogo_atual(Jogo_atual $entidadeJogo_atual){
		try{
			$param = array(
				':resultado_jogo_atual'=>$entidadeJogo_atual->get('resultado_jogo_atual'), 
				':usuario_id'=>$entidadeJogo_atual->get('usuario_id'), 
				':bool_ativo_jogo_atual'=>$entidadeJogo_atual->get('bool_ativo_jogo_atual')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO jogo_atual (resultado_jogo_atual, usuario_id, bool_ativo_jogo_atual) VALUES (:resultado_jogo_atual, :usuario_id, :bool_ativo_jogo_atual);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Jogo_atual ".$ex->getMessage();
		}
	}
	function atualizaJogo_atual(Jogo_atual $entidadeJogo_atual, $id){
		try{
			$param = array(
				':resultado_jogo_atual'=>$entidadeJogo_atual->get('resultado_jogo_atual'), 
				':usuario_id'=>$entidadeJogo_atual->get('usuario_id'), 
				':bool_ativo_jogo_atual'=>$entidadeJogo_atual->get('bool_ativo_jogo_atual')
			);

			$stmt = $this->pdo->prepare("UPDATE jogo_atual SET resultado_jogo_atual = :resultado_jogo_atual, usuario_id = :usuario_id, bool_ativo_jogo_atual = :bool_ativo_jogo_atual WHERE id_jogo_atual = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Jogo_atual ".$ex->getMessage();
		}
	}
}
?>