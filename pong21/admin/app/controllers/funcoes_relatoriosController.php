<?php


session_start();

require_once "../classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();



/************************************************************************************************************************/
/** Operaçõe de Relatório **/
/************************************************************************************************************************/

if (!empty($_POST['pequisa_relatorios'])) {
	$cont = 1;
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$sql = "	SELECT relatorios.* 
				FROM relatorios relatorios 
				WHERE descricao_relatorios LIKE '%$filtro%'
				OR tabela_relatorios LIKE '%$filtro%'
				OR colunas_relatorios LIKE '%$filtro%'
				OR bool_filtro_ativo_relatorios LIKE '%$filtro%'
				OR data_atualizacao_relatorios LIKE '%$filtro%'
				OR bool_ativo_relatorios LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_relatorios"]."{,}".
					$dados["descricao_relatorios"]."{,}".
					$dados["tabela_relatorios"]."{,}".
					$dados["colunas_relatorios"]."{,}".
					$dados["colunas_estrangeiras_relatorios"]."{,}".
					$dados["bool_filtro_ativo_relatorios"]."{,}".
					$dados["data_atualizacao_relatorios"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_relatorios"];
		} else {
			echo    "[]".
					$dados["id_relatorios"]."{,}".
					$dados["descricao_relatorios"]."{,}".
					$dados["tabela_relatorios"]."{,}".
					$dados["colunas_relatorios"]."{,}".
					$dados["colunas_estrangeiras_relatorios"]."{,}".
					$dados["bool_filtro_ativo_relatorios"]."{,}".
					$dados["data_atualizacao_relatorios"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_relatorios"];
		}
		$cont++;
	}
}



if (!empty($_POST['pequisa_relatorios_id'])) {
	$cont = 1;
	$id = $_POST['id'];
	$sql = "	SELECT relatorios.* 
				FROM relatorios
				WHERE id_relatorios = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		echo 	
				$dados["id_relatorios"]."{,}".
				$dados["descricao_relatorios"]."{,}".
				$dados["tabela_relatorios"]."{,}".
				$dados["colunas_relatorios"]."{,}".
				$dados["bool_filtro_ativo_relatorios"]."{,}".
				$dados["data_atualizacao_relatorios"]."{,}".
				$dados["usuario_id"]."{,}".
				$dados["bool_ativo_relatorios"];
	}
}



if (!empty($_POST['pequisa_relatorio_tabela'])) {
	$cont = 1;
	$sql = "	SELECT relatorio_tabela.* 
				FROM relatorio_tabela relatorio_tabela 
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	$dados["id_relatorio_tabela"]."{,}".
					$dados["descricao_relatorio_tabela"]."{,}".
					$dados["data_atualizacao_relatorio_tabela"]."{,}".
					$dados["bool_ativo_relatorio_tabela"];
		} else {
			echo    "[]".
					$dados["id_relatorio_tabela"]."{,}".
					$dados["descricao_relatorio_tabela"]."{,}".
					$dados["data_atualizacao_relatorio_tabela"]."{,}".
					$dados["bool_ativo_relatorio_tabela"];
		}
		$cont++;
	}
}



if (!empty($_POST['cadastroRelatorio'])) {
	$descricao_relatorios = $_POST['descricao_relatorios'];
	$tabela_relatorios = $_POST['tabela_relatorios'];
	$colunas_relatorios = $_POST['colunas_relatorios'];
	$colunas_estrangeiras_relatorios = $_POST['colunas_estrangeiras_relatorios'];
	$bool_filtro_ativo_relatorios = $_POST['bool_filtro_ativo_relatorios'];
	$usuario_id = $_POST['usuario_id'];

	$sql = "INSERT INTO relatorios 
			(descricao_relatorios, tabela_relatorios, colunas_relatorios, colunas_estrangeiras_relatorios, bool_filtro_ativo_relatorios, usuario_id) 
			VALUES 
			('$descricao_relatorios', '$tabela_relatorios', '$colunas_relatorios', '$colunas_estrangeiras_relatorios', $bool_filtro_ativo_relatorios, $usuario_id);";

	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}





if (!empty($_POST['atualiarRelatorio'])) {
	$querysql  = empty($_POST['descricao_relatorios'])? 
		"" : ", descricao_relatorios = '".$_POST['descricao_relatorios']."' ";

	$querysql .= empty($_POST['tabela_relatorios']) ? 
		"" : ", tabela_relatorios = '".$_POST['tabela_relatorios']."' ";

	$querysql .= empty($_POST['colunas_relatorios']) ? 
		"" : ", colunas_relatorios = '".$_POST['colunas_relatorios']."' ";

	$querysql .= empty($_POST['bool_filtro_ativo_relatorios']) ? 
		"" : ", bool_filtro_ativo_relatorios = ".$_POST['bool_filtro_ativo_relatorios']." ";

	$querysql .= empty($_POST['usuario_id']) ? 
		"" : ", usuario_id = ".$_POST['usuario_id']." ";



	$querysql .= empty($_POST['colunas_filtro_relatorios']) ?
		"" : ", colunas_filtro_relatorios = '".$_POST['colunas_filtro_relatorios']."' ";

	$querysql .= !empty($_POST['colunas_filtro_relatorios']) && $_POST['colunas_filtro_relatorios'] == "null" ?
		", colunas_filtro_relatorios = ''" : '';



	$querysql .= empty($_POST['bool_emitir_relatorios']) ?
		"" : ", bool_emitir_relatorios = ".$_POST['bool_emitir_relatorios']." ";


	$id = $_POST['id'];

	if ($querysql != "") {
		$querysql = substr($querysql, 1, strlen($querysql));
		$sql = "UPDATE relatorios 
				SET $querysql
				WHERE id_relatorios = $id;";

		echo $sql;

		$verifica = $pdo->prepare($sql);
		echo $verifica->execute();
	}
}



if (!empty($_POST['listarColunasFiltro'])) {
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT * FROM relatorios WHERE id_relatorios = $id;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		echo 
				$dados["id_relatorios"]."{,}".
				$dados["descricao_relatorios"]."{,}".
				$dados["tabela_relatorios"]."{,}".
				$dados["colunas_relatorios"]."{,}".
				$dados["colunas_estrangeiras_relatorios"]."{,}".
				$dados["bool_filtro_ativo_relatorios"]."{,}".
				$dados["data_atualizacao_relatorios"]."{,}".
				$dados["usuario_id"]."{,}".
				$dados["bool_ativo_relatorios"];
	}
}



if (!empty($_POST['pesquisaValorTotal'])) {
	$tabela = $_POST['tabela'];
	$coluna = $_POST['coluna'];
	$valores = "";
	$cont = 0;

	$sql = "SELECT $coluna FROM $tabela";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$valores .= $cont == 0 ? $dados[0] : "{,}".$dados[0];
		$cont++;
	}
	echo $valores;
}

?>