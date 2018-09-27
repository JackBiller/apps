<?php

/** tabela Notificações Config */
if (!empty($_POST['pequisa_notificacoes_config'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$usuario = $_POST['usuario'];
	$cont = 1;
	$sql = "SELECT * FROM notificacoes_config 
			WHERE usuario_id = $usuario
			AND (  
			area_notificacoes_config LIKE '%$filtro%' 
				OR tipo_alteracao_notificacoes_config LIKE '%$filtro%' 
				OR data_atualizacao_notificacoes_config LIKE '%$filtro%'
			);";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes_config"]."{,}".
					$dados["area_notificacoes_config"]."{,}".
					$dados["tipo_alteracao_notificacoes_config"]."{,}".
					$dados["data_atualizacao_notificacoes_config"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_notificacoes_config"];
		} else {
			echo    "[]".
					$dados["id_notificacoes_config"]."{,}".
					$dados["area_notificacoes_config"]."{,}".
					$dados["tipo_alteracao_notificacoes_config"]."{,}".
					$dados["data_atualizacao_notificacoes_config"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_notificacoes_config"];
		} $cont++;
	}
}




if (!empty($_POST['pequisa_notificacoes_config_id'])) {
	$id = $_POST['id'];
	$sql = "SELECT * FROM notificacoes_config WHERE id_notificacoes_config = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_notificacoes_config"]."{,}".
					$dados["area_notificacoes_config"]."{,}".
					$dados["tipo_alteracao_notificacoes_config"]."{,}".
					$dados["data_atualizacao_notificacoes_config"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_notificacoes_config"];
	}
}




if (!empty($_POST['pequisa_notificacoes_config_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT * FROM notificacoes_config WHERE $coluna = $id 
				AND (
					   area_notificacoes_config LIKE '%$filtro%'
					OR tipo_alteracao_notificacoes_config LIKE '%$filtro%'
					OR data_atualizacao_notificacoes_config LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes_config"]."{,}".
					$dados["area_notificacoes_config"]."{,}".
					$dados["tipo_alteracao_notificacoes_config"]."{,}".
					$dados["data_atualizacao_notificacoes_config"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_notificacoes_config"];
		} else {
			echo    "[]".
					$dados["id_notificacoes_config"]."{,}".
					$dados["area_notificacoes_config"]."{,}".
					$dados["tipo_alteracao_notificacoes_config"]."{,}".
					$dados["data_atualizacao_notificacoes_config"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_notificacoes_config"];
		} $cont++;
	}
}


if (!empty($_POST['adicionarConfigNotif'])) {
	$area_notificacoes_config = $_POST['area_notificacoes_config'];
	$tipo_alteracao_notificacoes_config = $_POST['tipo_alteracao_notificacoes_config'];
	$usuario_id = $_POST['usuario_id'];

	$sql = "INSERT INTO notificacoes_config 
			(area_notificacoes_config, tipo_alteracao_notificacoes_config, usuario_id)
			VALUES 
			('$area_notificacoes_config', '$tipo_alteracao_notificacoes_config', '$usuario_id');";

	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}

if (!empty($_POST['editarConfigNotif'])) {
	$area_notificacoes_config = $_POST['area_notificacoes_config'];
	$tipo_alteracao_notificacoes_config = $_POST['tipo_alteracao_notificacoes_config'];
	$usuario_id = $_POST['usuario_id'];
	$id = $_POST['id'];

	$sql = "UPDATE notificacoes_config 
			SET area_notificacoes_config = '$area_notificacoes_config', tipo_alteracao_notificacoes_config = '$tipo_alteracao_notificacoes_config', usuario_id = $usuario_id
			WHERE id_notificacoes_config = $id;";

	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}

?>