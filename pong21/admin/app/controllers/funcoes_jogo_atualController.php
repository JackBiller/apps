
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_jogo_atual'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "	SELECT jogo_atual.* 
				FROM jogo_atual jogo_atual  
				WHERE resultado_jogo_atual LIKE '%$filtro%'
				OR data_atualizacao_jogo_atual LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogo_atual"]."{,}".
					$dados["resultado_jogo_atual"]."{,}".
					$dados["data_atualizacao_jogo_atual"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogo_atual"];
		} else {
			echo    "[]".
					$dados["id_jogo_atual"]."{,}".
					$dados["resultado_jogo_atual"]."{,}".
					$dados["data_atualizacao_jogo_atual"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogo_atual"];
		}
		$cont++;
	}
}




if (!empty($_POST['pequisa_jogo_atual_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT jogo_atual.* 
				FROM jogo_atual jogo_atual
				WHERE id_jogo_atual = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_jogo_atual"]."{,}".
					$dados["resultado_jogo_atual"]."{,}".
					$dados["data_atualizacao_jogo_atual"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogo_atual"];
	}
}




if (!empty($_POST['pequisa_jogo_atual_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT jogo_atual.* 
				FROM jogo_atual jogo_atual 
				WHERE $coluna = $id 
				AND (
					   resultado_jogo_atual LIKE '%$filtro%'
					OR data_atualizacao_jogo_atual LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogo_atual"]."{,}".
					$dados["resultado_jogo_atual"]."{,}".
					$dados["data_atualizacao_jogo_atual"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogo_atual"];
		} else {
			echo    "[]".
					$dados["id_jogo_atual"]."{,}".
					$dados["resultado_jogo_atual"]."{,}".
					$dados["data_atualizacao_jogo_atual"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogo_atual"];
		}
		$cont++;
	}
}

?>
