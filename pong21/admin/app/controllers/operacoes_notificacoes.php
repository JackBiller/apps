<?php
/** Tabela notificações */
if (!empty($_POST['pequisa_notificacoes'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "SELECT * FROM notificacoes 
			WHERE descricao_notificacoes LIKE '%$filtro%' 
			OR usuario_atuador_notificacoes LIKE '%$filtro%' 
			OR usuaio_requerente_notificacoes LIKE '%$filtro%' 
			OR tipo_alteracao_notificacoes LIKE '%$filtro%' 
			OR data_atualizacao_notificacoes LIKE '%$filtro%'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} else {
			echo    "[]".
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} $cont++;
	}
}




if (!empty($_POST['pequisa_notificacoes_id'])) {
	$id = $_POST['id'];
	$sql = "SELECT * FROM notificacoes WHERE id_notificacoes = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
	}
}




if (!empty($_POST['pequisa_notificacoes_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT * FROM notificacoes 
				WHERE $coluna = $id 
				AND (
					   descricao_notificacoes LIKE '%$filtro%'
					OR usuario_atuador_notificacoes LIKE '%$filtro%'
					OR usuaio_requerente_notificacoes LIKE '%$filtro%'
					OR tipo_alteracao_notificacoes LIKE '%$filtro%'
					OR data_atualizacao_notificacoes LIKE '%$filtro%'
				)";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} else {
			echo    "[]".
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} $cont++;
	}
}
?>