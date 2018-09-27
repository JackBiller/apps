
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_cards'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT cards.* 
				FROM cards cards 
				INNER JOIN configurar_site configurar_site ON cards.configurar_site_id = configurar_site.id_configurar_site 
				WHERE cards.titulo_cards LIKE '%$filtro%'
				   OR cards.descricao_cards LIKE '%$filtro%'
				   OR cards.imagem_cards LIKE '%$filtro%'
				   OR configurar_site.titulo_configurar_site LIKE '%$filtro%'
				   OR cards.data_atualizacao_cards LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_cards"]."{,}".
					$dados["titulo_cards"]."{,}".
					$dados["descricao_cards"]."{,}".
					$dados["imagem_cards"]."{,}".
					$dados["configurar_site_id"]."{,}".
					$dados["data_atualizacao_cards"]."{,}".
					$dados["bool_ativo_cards"];
		} else {
			echo    "[]".
					$dados["id_cards"]."{,}".
					$dados["titulo_cards"]."{,}".
					$dados["descricao_cards"]."{,}".
					$dados["imagem_cards"]."{,}".
					$dados["configurar_site_id"]."{,}".
					$dados["data_atualizacao_cards"]."{,}".
					$dados["bool_ativo_cards"];
		}
		$cont++;
	}
}




if (!empty($_POST['pequisa_cards_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT cards.* 
				FROM cards
				WHERE id_cards = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_cards"]."{,}".
					$dados["titulo_cards"]."{,}".
					$dados["descricao_cards"]."{,}".
					$dados["imagem_cards"]."{,}".
					$dados["configurar_site_id"]."{,}".
					$dados["data_atualizacao_cards"]."{,}".
					$dados["bool_ativo_cards"];
	}
}




if (!empty($_POST['pequisa_cards_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT cards.* 
				FROM cards cards 
				INNER JOIN configurar_site configurar_site ON cards.configurar_site_id = configurar_site.id_configurar_site
				WHERE $coluna = $id 
				AND (
					   cards.titulo_cards LIKE '%$filtro%'
					OR cards.descricao_cards LIKE '%$filtro%'
					OR cards.imagem_cards LIKE '%$filtro%'
					OR configurar_site.titulo_configurar_site LIKE '%$filtro%'
					OR cards.data_atualizacao_cards LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_cards"]."{,}".
					$dados["titulo_cards"]."{,}".
					$dados["descricao_cards"]."{,}".
					$dados["imagem_cards"]."{,}".
					$dados["configurar_site_id"]."{,}".
					$dados["data_atualizacao_cards"]."{,}".
					$dados["bool_ativo_cards"];
		} else {
			echo    "[]".
					$dados["id_cards"]."{,}".
					$dados["titulo_cards"]."{,}".
					$dados["descricao_cards"]."{,}".
					$dados["imagem_cards"]."{,}".
					$dados["configurar_site_id"]."{,}".
					$dados["data_atualizacao_cards"]."{,}".
					$dados["bool_ativo_cards"];
		}
		$cont++;
	}
}

?>
