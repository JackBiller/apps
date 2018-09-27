
<?php 
require_once "../classe/conexao.php";

class jogadoresDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}
	function cadastraJogadores(Jogadores $entidadeJogadores){
		try{
			$param = array(
				':nome_jogadores'=>$entidadeJogadores->get('nome_jogadores'), 
				':foto_jogadores'=>$entidadeJogadores->get('foto_jogadores'), 
				':telefone_jogadores'=>$entidadeJogadores->get('telefone_jogadores'), 
				':usuario_id'=>$entidadeJogadores->get('usuario_id'), 
				':bool_ativo_jogadores'=>$entidadeJogadores->get('bool_ativo_jogadores')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO jogadores (nome_jogadores, foto_jogadores, telefone_jogadores, usuario_id, bool_ativo_jogadores) VALUES (:nome_jogadores, :foto_jogadores, :telefone_jogadores, :usuario_id, :bool_ativo_jogadores);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Jogadores ".$ex->getMessage();
		}
	}
	function atualizaJogadores(Jogadores $entidadeJogadores, $id){
		try{
			$param = array(
				':nome_jogadores'=>$entidadeJogadores->get('nome_jogadores'), 
				':foto_jogadores'=>$entidadeJogadores->get('foto_jogadores'), 
				':telefone_jogadores'=>$entidadeJogadores->get('telefone_jogadores'), 
				':usuario_id'=>$entidadeJogadores->get('usuario_id'), 
				':bool_ativo_jogadores'=>$entidadeJogadores->get('bool_ativo_jogadores')
			);

			$stmt = $this->pdo->prepare("UPDATE jogadores SET nome_jogadores = :nome_jogadores, foto_jogadores = :foto_jogadores, telefone_jogadores = :telefone_jogadores, usuario_id = :usuario_id, bool_ativo_jogadores = :bool_ativo_jogadores WHERE id_jogadores = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Jogadores ".$ex->getMessage();
		}
	}
}
?>