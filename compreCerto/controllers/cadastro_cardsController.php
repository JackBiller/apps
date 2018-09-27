<?php 
	require_once "../classe/entidade/Cards.php";
	require_once "../classe/dao/cardsDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCards = new Cards();
		$cardsDAO = new cardsDAO();
		
		$entidadeCards->set($_POST['titulo_cards'], 'titulo_cards');
		$entidadeCards->set($_POST['descricao_cards'], 'descricao_cards');
		$entidadeCards->set($_POST['imagem_cards'], 'imagem_cards');

		$configurar_site_id = $_POST['configurar_site_id'] == '' ? 0 : $_POST['configurar_site_id'];
		$entidadeCards->set($configurar_site_id, 'configurar_site_id');

		$entidadeCards->set($_POST['data_atualizacao_cards'], 'data_atualizacao_cards');

		$bool_ativo_cards = $_POST['bool_ativo_cards'] == '' ? 0 : $_POST['bool_ativo_cards'];
		$entidadeCards->set($bool_ativo_cards, 'bool_ativo_cards');


		$retorno = $cardsDAO->cadastraCards($entidadeCards, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>