<?php

/** Tabela Notificações Salvas */
if (!empty($_POST['pequisa_notificacoes_salvas'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "SELECT * FROM notificacoes_salvas 
			WHERE descricao_notificacoes_salvas LIKE '%$filtro%' 
			OR usuario_atuador_notificacoes_salvas LIKE '%$filtro%' 
			OR usuaio_requerente_notificacoes_salvas LIKE '%$filtro%' 
			OR tipo_alteracao_notificacoes_salvas LIKE '%$filtro%' 
			OR data_atualizacao_notificacoes_salvas LIKE '%$filtro%'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes_salvas"]."{,}".
					$dados["descricao_notificacoes_salvas"]."{,}".
					$dados["usuario_atuador_notificacoes_salvas"]."{,}".
					$dados["usuaio_requerente_notificacoes_salvas"]."{,}".
					$dados["tipo_alteracao_notificacoes_salvas"]."{,}".
					$dados["notificacoes_salvas_config_id"]."{,}".
					$dados["bool_view_notificacoes_salvas"]."{,}".
					$dados["data_atualizacao_notificacoes_salvas"]."{,}".
					$dados["bool_ativo_notificacoes_salvas"];
		} else {
			echo    "[]".
					$dados["id_notificacoes_salvas"]."{,}".
					$dados["descricao_notificacoes_salvas"]."{,}".
					$dados["usuario_atuador_notificacoes_salvas"]."{,}".
					$dados["usuaio_requerente_notificacoes_salvas"]."{,}".
					$dados["tipo_alteracao_notificacoes_salvas"]."{,}".
					$dados["notificacoes_salvas_config_id"]."{,}".
					$dados["bool_view_notificacoes_salvas"]."{,}".
					$dados["data_atualizacao_notificacoes_salvas"]."{,}".
					$dados["bool_ativo_notificacoes_salvas"];
		} $cont++;
	}
}




if (!empty($_POST['pequisa_notificacoes_salvas_id'])) {
	$id = $_POST['id'];
	$sql = "SELECT * FROM notificacoes_salvas WHERE id_notificacoes_salvas = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_notificacoes_salvas"]."{,}".
					$dados["descricao_notificacoes_salvas"]."{,}".
					$dados["usuario_atuador_notificacoes_salvas"]."{,}".
					$dados["usuaio_requerente_notificacoes_salvas"]."{,}".
					$dados["tipo_alteracao_notificacoes_salvas"]."{,}".
					$dados["notificacoes_salvas_config_id"]."{,}".
					$dados["bool_view_notificacoes_salvas"]."{,}".
					$dados["data_atualizacao_notificacoes_salvas"]."{,}".
					$dados["bool_ativo_notificacoes_salvas"];
	}
}




if (!empty($_POST['pequisa_notificacoes_salvas_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT * FROM notificacoes_salvas WHERE $coluna = $id 
				AND (
					   descricao_notificacoes_salvas LIKE '%$filtro%'
					OR usuario_atuador_notificacoes_salvas LIKE '%$filtro%'
					OR usuaio_requerente_notificacoes_salvas LIKE '%$filtro%'
					OR tipo_alteracao_notificacoes_salvas LIKE '%$filtro%'
					OR data_atualizacao_notificacoes_salvas LIKE '%$filtro%'
				)";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes_salvas"]."{,}".
					$dados["descricao_notificacoes_salvas"]."{,}".
					$dados["usuario_atuador_notificacoes_salvas"]."{,}".
					$dados["usuaio_requerente_notificacoes_salvas"]."{,}".
					$dados["tipo_alteracao_notificacoes_salvas"]."{,}".
					$dados["notificacoes_salvas_config_id"]."{,}".
					$dados["bool_view_notificacoes_salvas"]."{,}".
					$dados["data_atualizacao_notificacoes_salvas"]."{,}".
					$dados["bool_ativo_notificacoes_salvas"];
		} else {
			echo    "[]".
					$dados["id_notificacoes_salvas"]."{,}".
					$dados["descricao_notificacoes_salvas"]."{,}".
					$dados["usuario_atuador_notificacoes_salvas"]."{,}".
					$dados["usuaio_requerente_notificacoes_salvas"]."{,}".
					$dados["tipo_alteracao_notificacoes_salvas"]."{,}".
					$dados["notificacoes_salvas_config_id"]."{,}".
					$dados["bool_view_notificacoes_salvas"]."{,}".
					$dados["data_atualizacao_notificacoes_salvas"]."{,}".
					$dados["bool_ativo_notificacoes_salvas"];
		} $cont++;
	}
}

?>