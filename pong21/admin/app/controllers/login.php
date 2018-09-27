
<?php
session_start();
require_once "../classe/conexao.php";

$tabela = "usuario";
$login_campo = "login_usuario";
$senha_campo = "senha_usuario";

$telaLogada = "index";

if (!empty($_POST['login']) && !empty($_POST['senha'])) {
	$loginPost = tratarString($_POST['login']);
	$senhaPost = tratarString($_POST['senha']);
	echo $senhaPost . " - " . $loginPost;
	$contLogin = 0;
	
	$conn = new Conexao();
	$pdo = $conn->Connect();
	$sql = "SELECT *
			FROM $tabela 
			WHERE $login_campo = '$loginPost' 
			AND $senha_campo = PASSWORD('$senhaPost')
			AND bool_ativo_$tabela = 1;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		echo "logado";
		$_SESSION['login'] = $dados['id_usuario'];
		$_SESSION['nome'] = $dados['nome_usuario'];
		$logado = true;
		$classeUser = "w3-container text-right cdi-text-vermelho-brothers";
		$contLogin++;
	}

	if ($contLogin == 0) {
		$_SESSION['loginInvalido'] = true;
		header("Location: ../../index.php");
	} else {
		header("Location: ../../principal.php");
	}

	// if ($_POST['telaLogada'] == "loteamento") {
		// $_SESSION['id_lote'] = $_POST['id_lote'];
	// }
	// $telaLogada = $_POST['telaLogada'];
}

if (!empty($_POST['deslogar'])) {
	session_destroy();
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

