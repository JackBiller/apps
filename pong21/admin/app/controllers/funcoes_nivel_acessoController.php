
<?php

session_start();

require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_nivel_acesso'])) {
	$filtro = "";
	$minha_area_nivel_acesso = "";
	$area_nivel_acesso = "";
	$bool_pode_mostrar = false;
	$cont = 0;

	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$sql = "SELECT area_nivel_acesso
			FROM nivel_acesso
			WHERE id_nivel_acesso = (
				SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login']."
			);";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);


	$sql = "SELECT nivel_acesso.* 
			FROM nivel_acesso nivel_acesso  
			WHERE id_nivel_acesso != 1
			AND (descricao_nivel_acesso LIKE '%$filtro%'
				OR area_nivel_acesso LIKE '%$filtro%'
				OR data_atualizacao_nivel_acesso LIKE '%$filtro%'
				OR bool_ativo_nivel_acesso LIKE '%$filtro%'
			);";
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
			if ($cont == 0) {
				echo 	
						$dados["id_nivel_acesso"]."{,}".
						$dados["descricao_nivel_acesso"]."{,}".
						$dados["area_nivel_acesso"]."{,}".
						$dados["data_atualizacao_nivel_acesso"]."{,}".
						$dados["usuario_id"]."{,}".
						$dados["bool_ativo_nivel_acesso"];
			} else {
				echo    "[]".
						$dados["id_nivel_acesso"]."{,}".
						$dados["descricao_nivel_acesso"]."{,}".
						$dados["area_nivel_acesso"]."{,}".
						$dados["data_atualizacao_nivel_acesso"]."{,}".
						$dados["usuario_id"]."{,}".
						$dados["bool_ativo_nivel_acesso"];
			}
			$cont++;
		}
	}
}





if (!empty($_POST['pequisa_nivel_acesso_id'])) {
	if (!empty($_POST['id'])) 	$id = $_POST['id'];
	else 						$id = "(SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login'].")";


	$sql = "	SELECT nivel_acesso.* 
				FROM nivel_acesso nivel_acesso
				WHERE id_nivel_acesso = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_nivel_acesso"]."{,}".
					$dados["descricao_nivel_acesso"]."{,}".
					$dados["area_nivel_acesso"]."{,}".
					$dados["data_atualizacao_nivel_acesso"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_nivel_acesso"];
	}
}




if (!empty($_POST['pequisa_nivel_acesso_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT nivel_acesso.* 
				FROM nivel_acesso nivel_acesso 
				WHERE $coluna = $id 
				AND (
					   descricao_nivel_acesso LIKE '%$filtro%'
					OR area_nivel_acesso LIKE '%$filtro%'
					OR data_atualizacao_nivel_acesso LIKE '%$filtro%'
					OR bool_ativo_nivel_acesso LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_nivel_acesso"]."{,}".
					$dados["descricao_nivel_acesso"]."{,}".
					$dados["area_nivel_acesso"]."{,}".
					$dados["data_atualizacao_nivel_acesso"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_nivel_acesso"];
		} else {
			echo    "[]".
					$dados["id_nivel_acesso"]."{,}".
					$dados["descricao_nivel_acesso"]."{,}".
					$dados["area_nivel_acesso"]."{,}".
					$dados["data_atualizacao_nivel_acesso"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_nivel_acesso"];
		}
		$cont++;
	}
}





if (!empty($_POST['adicionar_nivel_acesso'])) {
	$descricao_nivel_acesso = $_POST['descricao_nivel_acesso'];
	$area_nivel_acesso = $_POST['area_nivel_acesso'];
	$usuario_id = $_POST['usuario_id'];
	
	$gravar = true;
	$saida = "";

	$sql = "SELECT COUNT(*) 
			FROM nivel_acesso 
			WHERE area_nivel_acesso = '".$_POST['area_nivel_acesso']."'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($dados[0] > 0): $gravar = false; $saida = "Já foi cadastrado um Nível de Acesso com essa configuração!"; endif;
	}

	if ($gravar) {
		$sql = "INSERT INTO nivel_acesso (descricao_nivel_acesso, area_nivel_acesso, usuario_id)
				VALUES ('$descricao_nivel_acesso', '$area_nivel_acesso', $usuario_id);";

		$stmt = $pdo->prepare($sql);
		echo $stmt->execute();
	}
	else echo $saida;
}





if (!empty($_POST['editar_nivel_acesso'])) {
	$gravar = true;
	$saida = "";

	$sql = "SELECT COUNT(*) FROM nivel_acesso 
			WHERE area_nivel_acesso = '".$_POST['area_nivel_acesso']."'
			OR id_nivel_acesso = ".$_POST['id_nivel_acesso'].";";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($dados[0] > 1): $gravar = false; $saida = "Já foi cadastrado um outro Nível de Acesso com essa configuração!"; endif;
	}

	if ($gravar) {
		$id = $_POST['id_nivel_acesso'];
		$descricao_nivel_acesso = $_POST['descricao_nivel_acesso'];
		$area_nivel_acesso = $_POST['area_nivel_acesso'];
		$usuario_id = $_POST['usuario_id'];


		$sql = "UPDATE nivel_acesso SET descricao_nivel_acesso = '$descricao_nivel_acesso', area_nivel_acesso = '$area_nivel_acesso', usuario_id = $usuario_id WHERE id_nivel_acesso = ".$id.";";

		$stmt = $pdo->prepare($sql);
		echo $stmt->execute();
	}
	else echo $saida;
}

?>
