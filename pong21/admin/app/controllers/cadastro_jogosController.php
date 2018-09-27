
<?php 
	require_once "../classe/entidade/Jogos.php";
	require_once "../classe/dao/jogosDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";


	


	if ($gravar) {
		$entidadeJogos = new Jogos();
		$jogosDAO = new jogosDAO();
		
		$entidadeJogos->set($_POST['descricao_jogos'], 'descricao_jogos');

		$jogador_1_jogos = $_POST['jogador_1_jogos'] == '' ? 0 : $_POST['jogador_1_jogos'];
		$entidadeJogos->set($jogador_1_jogos, 'jogador_1_jogos');


		$jogador_2_jogos = $_POST['jogador_2_jogos'] == '' ? 0 : $_POST['jogador_2_jogos'];
		$entidadeJogos->set($jogador_2_jogos, 'jogador_2_jogos');

		$entidadeJogos->set($_POST['resultado_jogos'], 'resultado_jogos');
		$entidadeJogos->set($_POST['data_atualizacao_jogos'], 'data_atualizacao_jogos');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeJogos->set($usuario_id, 'usuario_id');


		$bool_ativo_jogos = $_POST['bool_ativo_jogos'] == '' ? 0 : $_POST['bool_ativo_jogos'];
		$entidadeJogos->set($bool_ativo_jogos, 'bool_ativo_jogos');


		$retorno = $jogosDAO->cadastraJogos($entidadeJogos);
		echo $retorno;
	}
	else echo $saida;
?>
