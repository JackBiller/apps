<?php

session_start();

require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_usuario'])) {
	$filtro = "";
	$minha_area_nivel_acesso = "";
	$area_nivel_acesso = "";
	$sqlComplemento = "";
	$bool_pode_mostrar = false;
	$cont = 1;
	$cont_nivel = 0;

	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}

	$sql = "SELECT area_nivel_acesso FROM nivel_acesso
			WHERE id_nivel_acesso = (
				SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login']."
			);";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);


	$sql = "SELECT id_nivel_acesso, area_nivel_acesso FROM nivel_acesso;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$bool_pode_mostrar = true;
		$area_nivel_acesso  = explode("+", $dados['area_nivel_acesso']);

		for ($i=0; $i < sizeof($area_nivel_acesso); $i++) { 
			if (!in_array($area_nivel_acesso[$i], $minha_area_nivel_acesso)){
				$bool_pode_mostrar = false;
				$i = sizeof($area_nivel_acesso);
			}
		}

		if ($bool_pode_mostrar) {
			if ($cont_nivel == 0) {
				$sqlComplemento = " AND ( nivel_acesso_id = ".$dados['id_nivel_acesso'];
			}
			else {
				$sqlComplemento .= " OR nivel_acesso_id = ".$dados['id_nivel_acesso'];
			}
			$cont_nivel++;
		}
	}

	$sqlComplemento = $sqlComplemento != "" ? $sqlComplemento . " )" : "";



	$sql = "	SELECT usuario.* 
				FROM usuario usuario  
				WHERE ( nome_usuario LIKE '%$filtro%'
					OR  login_usuario LIKE '%$filtro%'
				)
				$sqlComplemento
			";

	echo $sql;
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_usuario"]."{,}".
					$dados["nome_usuario"]."{,}".
					$dados["login_usuario"]."{,}".
					$dados["senha_usuario"]."{,}".
					$dados["nivel_acesso_id"]."{,}".
					$dados["bool_ativo_usuario"];
		} else {
			echo    "[]".
					$dados["id_usuario"]."{,}".
					$dados["nome_usuario"]."{,}".
					$dados["login_usuario"]."{,}".
					$dados["senha_usuario"]."{,}".
					$dados["nivel_acesso_id"]."{,}".
					$dados["bool_ativo_usuario"];
		}
		$cont++;
	}
}

if (!empty($_POST['pequisa_usuario_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT usuario.* 
				FROM usuario usuario
				WHERE id_usuario = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_usuario"]."{,}".
					$dados["nome_usuario"]."{,}".
					$dados["login_usuario"]."{,}".
					$dados["senha_usuario"]."{,}".
					$dados["nivel_acesso_id"]."{,}".
					$dados["bool_ativo_usuario"];
	}
}




if (!empty($_POST['pequisa_usuario_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT usuario.* 
				FROM usuario usuario 
				WHERE $coluna = $id 
				AND (
					   nome_usuario LIKE '%$filtro%'
					OR login_usuario LIKE '%$filtro%'
					OR senha_usuario LIKE '%$filtro%'
					OR bool_ativo_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_usuario"]."{,}".
					$dados["nome_usuario"]."{,}".
					$dados["login_usuario"]."{,}".
					$dados["senha_usuario"]."{,}".
					$dados["nivel_acesso_id"]."{,}".
					$dados["bool_ativo_usuario"];
		} else {
			echo    "[]".
					$dados["id_usuario"]."{,}".
					$dados["nome_usuario"]."{,}".
					$dados["login_usuario"]."{,}".
					$dados["senha_usuario"]."{,}".
					$dados["nivel_acesso_id"]."{,}".
					$dados["bool_ativo_usuario"];
		}
		$cont++;
	}
}




if (!empty($_POST['atualizar'])) {
	$gravar = true;
	$saida = "";

	$sql = "SELECT COUNT(*), login_usuario 
			FROM usuario 
			WHERE login_usuario = '".$_POST['login_usuario']."'
			OR id_usuario = ".$_POST['id_usuario'].";";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($dados[0] > 1): $gravar = false; $saida = "O Login não pode ser esse!"; endif;
	}

	if ($gravar) {
		
		$nome_usuario = $_POST['nome_usuario'];
		$login_usuario = $_POST['login_usuario'];
		$nivel_acesso_id = $_POST['nivel_acesso_id'];
		$bool_ativo_usuario = $_POST['bool_ativo_usuario'];
		$id = $_POST['id_usuario'];


		$sql = "UPDATE usuario SET nome_usuario = '$nome_usuario', login_usuario = '$login_usuario', nivel_acesso_id = $nivel_acesso_id, bool_ativo_usuario = $bool_ativo_usuario WHERE id_usuario = $id;";

		$stmt = $pdo->prepare($sql);
		echo $stmt->execute();
	}
	else echo $saida;
}




if (!empty($_POST['cadastrar'])) {
	$gravar = true;
	$saida = "";

	$sql = "SELECT COUNT(*) 
			FROM usuario 
			WHERE login_usuario = '".$_POST['login_usuario']."'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($dados[0] > 0): $gravar = false; $saida = "O Login não pode ser esse!"; endif;
	}

	if ($gravar) {		
		$nome_usuario = $_POST['nome_usuario'];
		$login_usuario = $_POST['login_usuario'];
		$senha_usuario = $_POST['senha_usuario'];
		$nivel_acesso_id = $_POST['nivel_acesso_id'];
		$bool_ativo_usuario = $_POST['bool_ativo_usuario'];

		$sql = "INSERT INTO usuario (nome_usuario, login_usuario, senha_usuario, nivel_acesso_id, bool_ativo_usuario) VALUES ('$nome_usuario', '$login_usuario', PASSWORD('$senha_usuario'), $nivel_acesso_id, $bool_ativo_usuario);";

		$stmt = $pdo->prepare($sql);
		echo $stmt->execute();
	}
	else echo $saida;
}

?>