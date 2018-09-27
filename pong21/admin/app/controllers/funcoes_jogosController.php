
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_jogos'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "	SELECT jogos.* 
				FROM jogos jogos  
				WHERE descricao_jogos LIKE '%$filtro%'
				OR jogador_1_jogos LIKE '%$filtro%'
				OR jogador_2_jogos LIKE '%$filtro%'
				OR resultado_jogos LIKE '%$filtro%'
				OR data_atualizacao_jogos LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogos"]."{,}".
					$dados["descricao_jogos"]."{,}".
					$dados["jogador_1_jogos"]."{,}".
					$dados["jogador_2_jogos"]."{,}".
					$dados["resultado_jogos"]."{,}".
					$dados["data_atualizacao_jogos"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogos"];
		} else {
			echo    "[]".
					$dados["id_jogos"]."{,}".
					$dados["descricao_jogos"]."{,}".
					$dados["jogador_1_jogos"]."{,}".
					$dados["jogador_2_jogos"]."{,}".
					$dados["resultado_jogos"]."{,}".
					$dados["data_atualizacao_jogos"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogos"];
		}
		$cont++;
	}
}




if (!empty($_POST['pequisa_jogos_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT jogos.* 
				FROM jogos jogos
				WHERE id_jogos = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_jogos"]."{,}".
					$dados["descricao_jogos"]."{,}".
					$dados["jogador_1_jogos"]."{,}".
					$dados["jogador_2_jogos"]."{,}".
					$dados["resultado_jogos"]."{,}".
					$dados["data_atualizacao_jogos"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogos"];
	}
}




if (!empty($_POST['pequisa_jogos_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT jogos.* 
				FROM jogos jogos 
				WHERE $coluna = $id 
				AND (
					   descricao_jogos LIKE '%$filtro%'
					OR jogador_1_jogos LIKE '%$filtro%'
					OR jogador_2_jogos LIKE '%$filtro%'
					OR resultado_jogos LIKE '%$filtro%'
					OR data_atualizacao_jogos LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogos"]."{,}".
					$dados["descricao_jogos"]."{,}".
					$dados["jogador_1_jogos"]."{,}".
					$dados["jogador_2_jogos"]."{,}".
					$dados["resultado_jogos"]."{,}".
					$dados["data_atualizacao_jogos"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogos"];
		} else {
			echo    "[]".
					$dados["id_jogos"]."{,}".
					$dados["descricao_jogos"]."{,}".
					$dados["jogador_1_jogos"]."{,}".
					$dados["jogador_2_jogos"]."{,}".
					$dados["resultado_jogos"]."{,}".
					$dados["data_atualizacao_jogos"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogos"];
		}
		$cont++;
	}
}

?>
