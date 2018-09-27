
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_historico_jogo'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "	SELECT historico_jogo.* 
				FROM historico_jogo historico_jogo  
				WHERE sequencia_historico_jogo LIKE '%$filtro%'
				OR placar_historico_jogo LIKE '%$filtro%'
				OR data_atualizacao_historico_jogo LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_historico_jogo"]."{,}".
					$dados["sequencia_historico_jogo"]."{,}".
					$dados["placar_historico_jogo"]."{,}".
					$dados["jogos_id"]."{,}".
					$dados["data_atualizacao_historico_jogo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_historico_jogo"];
		} else {
			echo    "[]".
					$dados["id_historico_jogo"]."{,}".
					$dados["sequencia_historico_jogo"]."{,}".
					$dados["placar_historico_jogo"]."{,}".
					$dados["jogos_id"]."{,}".
					$dados["data_atualizacao_historico_jogo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_historico_jogo"];
		}
		$cont++;
	}
}




if (!empty($_POST['pequisa_historico_jogo_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT historico_jogo.* 
				FROM historico_jogo historico_jogo
				WHERE id_historico_jogo = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_historico_jogo"]."{,}".
					$dados["sequencia_historico_jogo"]."{,}".
					$dados["placar_historico_jogo"]."{,}".
					$dados["jogos_id"]."{,}".
					$dados["data_atualizacao_historico_jogo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_historico_jogo"];
	}
}




if (!empty($_POST['pequisa_historico_jogo_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT historico_jogo.* 
				FROM historico_jogo historico_jogo 
				WHERE $coluna = $id 
				AND (
					   sequencia_historico_jogo LIKE '%$filtro%'
					OR placar_historico_jogo LIKE '%$filtro%'
					OR data_atualizacao_historico_jogo LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_historico_jogo"]."{,}".
					$dados["sequencia_historico_jogo"]."{,}".
					$dados["placar_historico_jogo"]."{,}".
					$dados["jogos_id"]."{,}".
					$dados["data_atualizacao_historico_jogo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_historico_jogo"];
		} else {
			echo    "[]".
					$dados["id_historico_jogo"]."{,}".
					$dados["sequencia_historico_jogo"]."{,}".
					$dados["placar_historico_jogo"]."{,}".
					$dados["jogos_id"]."{,}".
					$dados["data_atualizacao_historico_jogo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_historico_jogo"];
		}
		$cont++;
	}
}

?>
