
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class cardsDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCards(Cards $entidadeCards, $area){

		// Configuração de notificação
		/* $area = 'cards'; */
		 
		$descricaoNotificacao = 'Titulo => '.$entidadeCards->get('titulo_cards').'<br>';
		$descricaoNotificacao .= 'Descrição => '.$entidadeCards->get('descricao_cards').'<br>';
		$descricaoNotificacao .= 'Imagem => '.$entidadeCards->get('imagem_cards').'<br>';
		$descricaoNotificacao .= 'Configurar Site => /%/SELECT * FROM configurar_site WHERE id_configurar_site = '.$entidadeCards->get('configurar_site_id').'/%/<br>';
		$descricaoBool = $entidadeCards->get('bool_ativo_cards') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':titulo_cards'=>$entidadeCards->get('titulo_cards'), 
				':descricao_cards'=>$entidadeCards->get('descricao_cards'), 
				':imagem_cards'=>$entidadeCards->get('imagem_cards'), 
				':configurar_site_id'=>$entidadeCards->get('configurar_site_id'), 
				':bool_ativo_cards'=>$entidadeCards->get('bool_ativo_cards')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cards (titulo_cards, descricao_cards, imagem_cards, configurar_site_id, bool_ativo_cards) VALUES (:titulo_cards, :descricao_cards, :imagem_cards, :configurar_site_id, :bool_ativo_cards);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cards ".$ex->getMessage();
		}
	}


	function atualizaCards(Cards $entidadeCards, $id, $area){

		// Configuração de notificação
		/* $area = 'cards'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		 
		$sql = "SELECT * FROM cards WHERE id_cards = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['titulo_cards'] != $entidadeCards->get('titulo_cards')) {
				$descricaoNotificacao .= '<b style="color: red">Titulo: '.$dados['titulo_cards'].' => '.$entidadeCards->get('titulo_cards').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Titulo => '.$entidadeCards->get('titulo_cards').'<br>';
			}
			if ($dados['descricao_cards'] != $entidadeCards->get('descricao_cards')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_cards'].' => '.$entidadeCards->get('descricao_cards').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeCards->get('descricao_cards').'<br>';
			}
			if ($dados['imagem_cards'] != $entidadeCards->get('imagem_cards')) {
				$descricaoNotificacao .= '<b style="color: red">Imagem: '.$dados['imagem_cards'].' => '.$entidadeCards->get('imagem_cards').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Imagem => '.$entidadeCards->get('imagem_cards').'<br>';
			}
			if ($dados['configurar_site_id'] != $entidadeCards->get('configurar_site_id')) {
				$descricaoNotificacao .= '<b style="color: red">Configurar Site: /%/SELECT * FROM configurar_site WHERE id_configurar_site = '.$dados['configurar_site_id'].'/%/ => /%/SELECT * FROM configurar_site WHERE id_configurar_site = '.$entidadeCards->get('configurar_site_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Configurar Site => /%/SELECT * FROM configurar_site WHERE id_configurar_site = '.$entidadeCards->get('configurar_site_id').'/%/<br>';
			}
			if ($dados['bool_ativo_cards'] != $entidadeCards->get('bool_ativo_cards')) {
				$descricaoBool = $entidadeCards->get('bool_ativo_cards') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_cards'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCards->get('bool_ativo_cards') == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
			}
		}
		$tipo_alteracao_notificacoes = 'u';
		if($descricaoNotificacao != "" && $controleAteracao != 0){
			registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);
		}

		// Tenta atualizar um registro exitente
		try{
			$param = array(
				':titulo_cards'=>$entidadeCards->get('titulo_cards'), 
				':descricao_cards'=>$entidadeCards->get('descricao_cards'), 
				':imagem_cards'=>$entidadeCards->get('imagem_cards'), 
				':configurar_site_id'=>$entidadeCards->get('configurar_site_id'), 
				':bool_ativo_cards'=>$entidadeCards->get('bool_ativo_cards')
			);

			$stmt = $this->pdo->prepare("UPDATE cards SET titulo_cards = :titulo_cards, descricao_cards = :descricao_cards, imagem_cards = :imagem_cards, configurar_site_id = :configurar_site_id, bool_ativo_cards = :bool_ativo_cards WHERE id_cards = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cards ".$ex->getMessage();
		}
	}
}
?>