
<?php 
	require_once "../classe/entidade/Historico_jogo.php";
	require_once "../classe/dao/historico_jogoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";

	

	if ($gravar) {
		$entidadeHistorico_jogo = new Historico_jogo();
		$historico_jogoDAO = new historico_jogoDAO();
		

		$sequencia_historico_jogo = $_POST['sequencia_historico_jogo'] == '' ? 0 : $_POST['sequencia_historico_jogo'];
		$entidadeHistorico_jogo->set($sequencia_historico_jogo, 'sequencia_historico_jogo');

		$entidadeHistorico_jogo->set($_POST['placar_historico_jogo'], 'placar_historico_jogo');

		$jogos_id = $_POST['jogos_id'] == '' ? 0 : $_POST['jogos_id'];
		$entidadeHistorico_jogo->set($jogos_id, 'jogos_id');

		$entidadeHistorico_jogo->set($_POST['data_atualizacao_historico_jogo'], 'data_atualizacao_historico_jogo');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeHistorico_jogo->set($usuario_id, 'usuario_id');


		$bool_ativo_historico_jogo = $_POST['bool_ativo_historico_jogo'] == '' ? 0 : $_POST['bool_ativo_historico_jogo'];
		$entidadeHistorico_jogo->set($bool_ativo_historico_jogo, 'bool_ativo_historico_jogo');


		$retorno = $historico_jogoDAO->atualizaHistorico_jogo($entidadeHistorico_jogo, $_POST['id_historico_jogo']);
		echo $retorno;
	}
	else echo $saida;
?>
