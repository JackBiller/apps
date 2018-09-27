
<?php 
require_once "../classe/conexao.php";

class jogosDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraJogos(Jogos $entidadeJogos){
		try{
			$param = array(
				':descricao_jogos'=>$entidadeJogos->get('descricao_jogos'), 
				':jogador_1_jogos'=>$entidadeJogos->get('jogador_1_jogos'), 
				':jogador_2_jogos'=>$entidadeJogos->get('jogador_2_jogos'), 
				':resultado_jogos'=>$entidadeJogos->get('resultado_jogos'), 
				':usuario_id'=>$entidadeJogos->get('usuario_id'), 
				':bool_ativo_jogos'=>$entidadeJogos->get('bool_ativo_jogos')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO jogos (descricao_jogos, jogador_1_jogos, jogador_2_jogos, resultado_jogos, usuario_id, bool_ativo_jogos) VALUES (:descricao_jogos, :jogador_1_jogos, :jogador_2_jogos, :resultado_jogos, :usuario_id, :bool_ativo_jogos);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Jogos ".$ex->getMessage();
		}
	}
	function atualizaJogos(Jogos $entidadeJogos, $id){
		try{
			$param = array(
				':descricao_jogos'=>$entidadeJogos->get('descricao_jogos'), 
				':jogador_1_jogos'=>$entidadeJogos->get('jogador_1_jogos'), 
				':jogador_2_jogos'=>$entidadeJogos->get('jogador_2_jogos'), 
				':resultado_jogos'=>$entidadeJogos->get('resultado_jogos'), 
				':usuario_id'=>$entidadeJogos->get('usuario_id'), 
				':bool_ativo_jogos'=>$entidadeJogos->get('bool_ativo_jogos')
			);

			$stmt = $this->pdo->prepare("UPDATE jogos SET descricao_jogos = :descricao_jogos, jogador_1_jogos = :jogador_1_jogos, jogador_2_jogos = :jogador_2_jogos, resultado_jogos = :resultado_jogos, usuario_id = :usuario_id, bool_ativo_jogos = :bool_ativo_jogos WHERE id_jogos = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Jogos ".$ex->getMessage();
		}
	}
}
?>