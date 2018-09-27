
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_jogadores'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "	SELECT jogadores.* 
				FROM jogadores jogadores  
				WHERE nome_jogadores LIKE '%$filtro%'
				OR foto_jogadores LIKE '%$filtro%'
				OR telefone_jogadores LIKE '%$filtro%'
				OR data_atualizacao_jogadores LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogadores"]."{,}".
					$dados["nome_jogadores"]."{,}".
					$dados["foto_jogadores"]."{,}".
					$dados["telefone_jogadores"]."{,}".
					$dados["data_atualizacao_jogadores"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogadores"];
		} else {
			echo    "[]".
					$dados["id_jogadores"]."{,}".
					$dados["nome_jogadores"]."{,}".
					$dados["foto_jogadores"]."{,}".
					$dados["telefone_jogadores"]."{,}".
					$dados["data_atualizacao_jogadores"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogadores"];
		}
		$cont++;
	}
}




if (!empty($_POST['pequisa_jogadores_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT jogadores.* 
				FROM jogadores jogadores
				WHERE id_jogadores = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_jogadores"]."{,}".
					$dados["nome_jogadores"]."{,}".
					$dados["foto_jogadores"]."{,}".
					$dados["telefone_jogadores"]."{,}".
					$dados["data_atualizacao_jogadores"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogadores"];
	}
}




if (!empty($_POST['pequisa_jogadores_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT jogadores.* 
				FROM jogadores jogadores 
				WHERE $coluna = $id 
				AND (
					   nome_jogadores LIKE '%$filtro%'
					OR foto_jogadores LIKE '%$filtro%'
					OR telefone_jogadores LIKE '%$filtro%'
					OR data_atualizacao_jogadores LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_jogadores"]."{,}".
					$dados["nome_jogadores"]."{,}".
					$dados["foto_jogadores"]."{,}".
					$dados["telefone_jogadores"]."{,}".
					$dados["data_atualizacao_jogadores"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogadores"];
		} else {
			echo    "[]".
					$dados["id_jogadores"]."{,}".
					$dados["nome_jogadores"]."{,}".
					$dados["foto_jogadores"]."{,}".
					$dados["telefone_jogadores"]."{,}".
					$dados["data_atualizacao_jogadores"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_jogadores"];
		}
		$cont++;
	}
}

?>
