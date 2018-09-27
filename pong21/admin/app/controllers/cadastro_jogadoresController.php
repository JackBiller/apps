
<?php 
	require_once "../classe/entidade/Jogadores.php";
	require_once "../classe/dao/jogadoresDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";


	


	if ($gravar) {
		$entidadeJogadores = new Jogadores();
		$jogadoresDAO = new jogadoresDAO();
		
		$entidadeJogadores->set($_POST['nome_jogadores'], 'nome_jogadores');
		$entidadeJogadores->set($_POST['foto_jogadores'], 'foto_jogadores');
		$entidadeJogadores->set($_POST['telefone_jogadores'], 'telefone_jogadores');
		$entidadeJogadores->set($_POST['data_atualizacao_jogadores'], 'data_atualizacao_jogadores');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeJogadores->set($usuario_id, 'usuario_id');


		$bool_ativo_jogadores = $_POST['bool_ativo_jogadores'] == '' ? 0 : $_POST['bool_ativo_jogadores'];
		$entidadeJogadores->set($bool_ativo_jogadores, 'bool_ativo_jogadores');


		$retorno = $jogadoresDAO->cadastraJogadores($entidadeJogadores);
		echo $retorno;
	}
	else echo $saida;
?>
