
<?php 
	require_once "../classe/entidade/Jogo_atual.php";
	require_once "../classe/dao/jogo_atualDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";

	

	if ($gravar) {
		$entidadeJogo_atual = new Jogo_atual();
		$jogo_atualDAO = new jogo_atualDAO();
		
		$entidadeJogo_atual->set($_POST['resultado_jogo_atual'], 'resultado_jogo_atual');
		$entidadeJogo_atual->set($_POST['data_atualizacao_jogo_atual'], 'data_atualizacao_jogo_atual');
		$entidadeJogo_atual->set($_POST['usuario_id'], 'usuario_id');

		$bool_ativo_jogo_atual = $_POST['bool_ativo_jogo_atual'] == '' ? 0 : $_POST['bool_ativo_jogo_atual'];
		$entidadeJogo_atual->set($bool_ativo_jogo_atual, 'bool_ativo_jogo_atual');


		$retorno = $jogo_atualDAO->atualizaJogo_atual($entidadeJogo_atual, $_POST['id_jogo_atual']);
		echo $retorno;
	}
	else echo $saida;
?>
