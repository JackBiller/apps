<?php
/* session_start(); */
require_once "../classe/conexao.php";
require_once "../classe/entidade/Tabusuarios.php";

// Informações gerais de login
$tabela = "tabusuarios";
$login_campo = "identificacao";
$senha_campo = "senha";

$telaLogada = "index";

if (!empty($_POST['logarSistema'])) {
	// Dados recebidos externamente
	$loginPost = tratarString($_POST['login']);
	$senhaPost = tratarString($_POST['senha']);

	// Objeto de Retorno
	$tabusuarios = new Tabusuarios();


	// Verificação interna
	$conn = new Conexao();
	$pdo = $conn->Connect();
	$sql = "SELECT *
			FROM $tabela 
			WHERE $login_campo = '$loginPost' 
			AND $senha_campo = '$senhaPost'";
			// AND $senha_campo = PASSWORD('$senhaPost')";
			// AND bool_ativo_$tabela = 1;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$tabusuarios->set($dados['identificacao'], 'identificacao');
		$tabusuarios->set($dados['nome'], 'nome');
		$tabusuarios->set($dados['filial'], 'filial');
		$tabusuarios->set($dados['vendedor'], 'vendedor');
		$tabusuarios->set(true, 'status');
	}

	// Retorno	
	echo objectEmJson($tabusuarios);
}

if (!empty($_POST['deslogar'])) {
	/*-session_destroy();*/
	// header("Location: ../../index.php");
}

function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}


?>

