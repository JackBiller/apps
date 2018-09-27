<?php

ini_set('max_execution_time', 300);

require_once "app/classe/conexao.php";


$id = $_GET['id'];

$dataI = "";
$dataF = "";
$coluna = "";

if (empty($_GET['todos'])) {
	$dataI = $_GET['dataI'];
	$dataF = $_GET['dataF'];
	$coluna = $_GET['coluna'];
}

$filtroAdicional = empty($_GET['adicional']) ? "" : $_GET['adicional'];



$conn = new Conexao();
$pdo = $conn->Connect();


$sql = "SELECT * FROM relatorios WHERE id_relatorios = $id;";
$verifica = $pdo->query($sql);
foreach ($verifica as $dados) {

	$descricao_relatorios = $dados['descricao_relatorios'];
	$tabela_relatorios = $dados['tabela_relatorios'];
	$colunas_relatorios = $dados['colunas_relatorios'];
	$colunas_estrangeiras_relatorios = $dados['colunas_estrangeiras_relatorios'];
	$colunas_filtro_relatorios = $dados['colunas_filtro_relatorios'];
	$bool_filtro_ativo_relatorios = $dados['bool_filtro_ativo_relatorios'];
	$data_atualizacao_relatorios = $dados['data_atualizacao_relatorios'];
	$usuario_id = $dados['usuario_id'];
	$bool_emitir_relatorios = $dados['bool_emitir_relatorios'];
	$bool_ativo_relatorios = $dados['bool_ativo_relatorios'];

}


if ($bool_emitir_relatorios == 1) {
	$sql = "UPDATE relatorios SET bool_emitir_relatorios = 0 WHERE id_relatorios = $id;";
	$verifica = $pdo->prepare($sql);
	$resultato = $verifica->execute();

	$colunaFormatada = "";


	if ($resultato == 1) {
		$colunas_relatorios = explode("+", $colunas_relatorios);
		$colunas_estrangeiras_relatorios = explode("+", $colunas_estrangeiras_relatorios);
		$array_config_coluna_estrangeira = array();
		$oldtable_coluna_estrangeira = "";
		$oldtable_coluna_estrangeira_old = "";
		$oldtable_coluna_estrangeira_coluna = "";
		$inner_join_coluna_estrangeira = "";

		$queryColunas = "";
		$queryColunasTipo = "";
		$conteudo = "
					<table border='1' width='100%' style='font-size: 12px;'>";
		$conteudo .= "
						<tr>";
		for ($i=0; $i < sizeof($colunas_relatorios); $i++) { 
			$conteudo .= "
							<td>
								<b>".$colunas_relatorios[$i]."</b>
							</td>";

			$queryColunas .= $i == 0 ? 
				$tabela_relatorios.".".$colunas_relatorios[$i] : 
				", ".$tabela_relatorios.".".$colunas_relatorios[$i];
			$queryColunasTipo .= $i == 0 ? 
				"WHERE FIELD = '".$colunas_relatorios[$i]."'" : 
				" OR FIELD = '".$colunas_relatorios[$i]."'";
		}


		$tipo_tabela_porDentro = array();

		$sql = "SHOW COLUMNS FROM $tabela_relatorios $queryColunasTipo;";
		$verifica = $pdo->query($sql);
		foreach ($verifica as $dados) {
			array_push($tipo_tabela_porDentro, $dados[1]);
		}



		if ($colunas_estrangeiras_relatorios[0] != "") {
			for ($i=0; $i < sizeof($colunas_estrangeiras_relatorios); $i++) { 
				$array_config_coluna_estrangeira = explode("_tr_", $colunas_estrangeiras_relatorios[$i]);
				

				if ($oldtable_coluna_estrangeira_old != $array_config_coluna_estrangeira[0]) {
					$oldtable_coluna_estrangeira_old = $array_config_coluna_estrangeira[0];
				}
				if ($i == 0 || $oldtable_coluna_estrangeira != $array_config_coluna_estrangeira[1]) {
					$oldtable_coluna_estrangeira = $array_config_coluna_estrangeira[1];
					$inner_join_coluna_estrangeira .= "
					INNER JOIN $oldtable_coluna_estrangeira $oldtable_coluna_estrangeira ON $oldtable_coluna_estrangeira_old.".$oldtable_coluna_estrangeira."_id = $oldtable_coluna_estrangeira.id_$oldtable_coluna_estrangeira ";
				}


				if ($oldtable_coluna_estrangeira_coluna != $array_config_coluna_estrangeira[2]) {
					$conteudo .= "
							<td>
								<b>".$array_config_coluna_estrangeira[2]."</b>
							</td>";
				}


				if ($queryColunas == "") {
					$queryColunas .= $i == 0 ? 
						$oldtable_coluna_estrangeira.".".$array_config_coluna_estrangeira[2] : 
						", ".$oldtable_coluna_estrangeira.".".$array_config_coluna_estrangeira[2];
					$queryColunasTipo .= $i == 0 ? 
					"WHERE FIELD = '".$array_config_coluna_estrangeira[2]."'" : 
					" OR FIELD = '".$array_config_coluna_estrangeira[2]."'";
				}
				else {
					$queryColunas .= ", ".$oldtable_coluna_estrangeira.".".$array_config_coluna_estrangeira[2];
					$queryColunasTipo .= " OR FIELD = '".$array_config_coluna_estrangeira[2]."'";
				}
			}
		}

		$conteudo .= "
						</tr>";



		

		if ($colunas_estrangeiras_relatorios[0] != "") {
			for ($i=0; $i < sizeof($colunas_estrangeiras_relatorios); $i++) { 
				$array_config_coluna_estrangeira = explode("_tr_", $colunas_estrangeiras_relatorios[$i]);

				if ($i == 0 || $oldtable_coluna_estrangeira != $array_config_coluna_estrangeira[1]) {
					$oldtable_coluna_estrangeira = $array_config_coluna_estrangeira[1];

					$sql = "SHOW COLUMNS FROM $oldtable_coluna_estrangeira $queryColunasTipo;";
					$verifica = $pdo->query($sql);
					foreach ($verifica as $dados) {
						array_push($tipo_tabela_porDentro, $dados[1]);
					}
				}
			}
		}


		if (empty($_GET['todos'])) {
			$bool_filtro_ativo_relatorios = $bool_filtro_ativo_relatorios == 1 ? 
				"AND $tabela_relatorios.bool_ativo_$tabela_relatorios = 1" : "";

			$sql = "SELECT $queryColunas 
					FROM $tabela_relatorios $tabela_relatorios $inner_join_coluna_estrangeira
					WHERE $tabela_relatorios.$coluna >= '$dataI' 
					AND $tabela_relatorios.$coluna <= '$dataF' 
					$colunas_filtro_relatorios
					$bool_filtro_ativo_relatorios;";
		}
		else {
			$bool_filtro_ativo_relatorios = $bool_filtro_ativo_relatorios == 1 ? 
				"WHERE $tabela_relatorios.bool_ativo_$tabela_relatorios = 1" : "";

			$sql = "SELECT $queryColunas 
					FROM $tabela_relatorios $tabela_relatorios $inner_join_coluna_estrangeira
					$bool_filtro_ativo_relatorios $colunas_filtro_relatorios";
		}
		echo $sql;

		$verifica = $pdo->query($sql);
		foreach ($verifica as $dados) {
			$conteudo .= "
						<tr>";
			for ($i=0; $i < sizeof($tipo_tabela_porDentro); $i++) { 
				if (
					$tipo_tabela_porDentro[$i] == 'datetime' ||
					$tipo_tabela_porDentro[$i] == 'date'
				) {
					$colunaFormatada = formatarData(substr($dados[$i], 0, 10)) . substr($dados[$i], 10, strlen($dados[$i]));
					$conteudo .= "
							<td>".$colunaFormatada."</td>";
				}
				else {
					$conteudo .= "
							<td>".$dados[$i]."</td>";
				}
			}
			$conteudo .= "
						</tr>";
		}
		$conteudo .= "
					</table>";


		date_default_timezone_set("America/Sao_Paulo");

		$hoje = date("d/m/Y");
		$hora = date("H:i:s");


		$emisao = '

		<!DOCTYPE html>
		<html>
		<head>
			<title>Relatório: '.$descricao_relatorios.'</title>
			<!-- link rel="stylesheet" type="text/css" href="app/css/bootstrap.css" -->
			<style>
				@page { margin: 70px 50px 50px 50px; }
	    #header { position: fixed; left: -15px; top: -70px; right: -15px; height: 180px; background-color: fff; text-align: center; }
	    #footer { position: fixed; left: 0px; bottom: -35px; right: 70px; height: 30px; background-color: #fff; text-align: right; }
	    #footer .page:after { content: counter(page, decimal); }
				/*
				decimal
				Decimal numbers, beginning with 1.
				decimal-leading-zero
				Decimal numbers padded by initial zeros (e.g., 01, 02, 03, ..., 98, 99).
				lower-roman
				Lowercase roman numerals (i, ii, iii, iv, v, etc.).
				upper-roman
				Uppercase roman numerals (I, II, III, IV, V, etc.).
				georgian
				Traditional Georgian numbering (an, ban, gan, ..., he, tan, in, in-an, ...).
				armenian
				Traditional uppercase Armenian numbering.
				Alphabetic systems are specified with:

				lower-latin or lower-alpha
				Lowercase ascii letters (a, b, c, ... z).
				upper-latin or upper-alpha
				Uppercase ascii letters (A, B, C, ... Z).
				lower-greek
				Lowercase classical Greek alpha, beta, gamma, ... (α, β, γ, ...)
				*/
			</style>
		</head>
		<body style="background-color: #fff;">
			<div id="header">
				<div style="font-size: 10px; text-align: right; margin-top: 5px;">
					<b>Emitido em: </b>'.$hoje.' '.$hora.'
				</div>
				<h2>'.$descricao_relatorios.'</h2>
				<br>
			</div>

			<div id="footer">
				<span class="page">Pág.: </span>
			</div>

			<center>
				<!-- div class="papel text-center" -->
				'.$conteudo.'
				<!-- /div -->
			</center>
		</body>
		</html>';
		/*
				<style type="text/css">
					.papel{
						margin-left: -25px;
						margin-top: -25px; 
						margin-right: -25px;
						margin-bottom: -30px;
						background-color: #fff;
					}
					.hrPadrao{
						margin-bottom: 1px;
						margin-top: 1px;
					}
					hr.style16 { 
						border-top: 2px dashed #333;
						margin-bottom: 22px;
						margin-top: 15px;
						margin-right: -20px;
						margin-left: -25px;
					}
				</style>

		*/

		$descricao_relatorios = tratarString($descricao_relatorios);
		$nomeArquivo = $descricao_relatorios.date('YmdHis');

		criarArquivo("./app/pdf/".$nomeArquivo.".html", $emisao);

		header("Location: emissao.php?arq=$nomeArquivo&relatorio=$descricao_relatorios");
	}
} else {
	?>

<!DOCTYPE html>
<html>
<head>
	<title>Acesso Bloqueado</title>
</head>
<body>
	<center>
		<br>
		<img src="app/img/acessoBloqueado.jpg" height="250px">
		<h1>Acesso Bloqueado</h1>
		<h3>Você não tem permissão para acessar este registro!</h3>
		<p>Para emitir relatórios é preciso ir por meio da aplicação, caso contrario o sistema bloqueará.</p>
		<p>Após o documento ser emitido o mesmo é excluido instantaneamente a fins de seguraça.</p>
		<p>Caso queira emiti-lo de novo não adiantará recarregar a tela, é preciso emiti-lo pelo sistema!</p>
	</center>
</body>
</html>

<?php }



function retornaMes($mes){
	switch ($mes) {
		case 1:  $mes = "Janeiro";		break;
		case 2:  $mes = "Fevereiro";	break;
		case 3:  $mes = "Março";		break;
		case 4:  $mes = "Abriu";		break;
		case 5:  $mes = "Maio";			break;
		case 6:  $mes = "Junho";		break;
		case 7:  $mes = "Julho";		break;
		case 8:  $mes = "Agosto";		break;
		case 9:  $mes = "Setembro";		break;
		case 10: $mes = "Outubro";		break;
		case 11: $mes = "Novembro";		break;
		case 12: $mes = "Dezembro";		break;
		default: $mes = $mes;			break;
	}
	return $mes;
}



function formatarData($data){
	$vetorData = explode("-",$data);
	return $vetorData[2]."/".$vetorData[1]."/".$vetorData[0];
}




function criarArquivo($nome, $conteudo){
	$myfile = fopen($nome, "w") or die("Unable to open file!");
	$txt = $conteudo;
	fwrite($myfile, $txt);
	fclose($myfile);
	return 1;
}


function tratarString($texto){
	$texto = str_replace(" ", "_", $texto);

	$texto = str_replace("â", "a", $texto);
	$texto = str_replace("á", "a", $texto);
	$texto = str_replace("à", "a", $texto);
	$texto = str_replace("ã", "a", $texto);
	$texto = str_replace("Â", "A", $texto);
	$texto = str_replace("Á", "A", $texto);
	$texto = str_replace("À", "A", $texto);
	$texto = str_replace("Ã", "A", $texto);

	$texto = str_replace("é", "e", $texto);
	$texto = str_replace("ê", "e", $texto);
	$texto = str_replace("è", "e", $texto);
	$texto = str_replace("É", "E", $texto);
	$texto = str_replace("Ê", "E", $texto);
	$texto = str_replace("È", "E", $texto);

	$texto = str_replace("î", "i", $texto);
	$texto = str_replace("ì", "i", $texto);
	$texto = str_replace("í", "i", $texto);
	$texto = str_replace("Î", "I", $texto);
	$texto = str_replace("Ì", "I", $texto);
	$texto = str_replace("Í", "I", $texto);

	$texto = str_replace("ô", "o", $texto);
	$texto = str_replace("ò", "o", $texto);
	$texto = str_replace("ó", "o", $texto);
	$texto = str_replace("õ", "o", $texto);
	$texto = str_replace("Ô", "O", $texto);
	$texto = str_replace("Ó", "O", $texto);
	$texto = str_replace("Ò", "O", $texto);
	$texto = str_replace("Õ", "O", $texto);

	$texto = str_replace("û", "u", $texto);
	$texto = str_replace("ú", "u", $texto);
	$texto = str_replace("ù", "u", $texto);
	$texto = str_replace("Û", "U", $texto);
	$texto = str_replace("Ú", "U", $texto);
	$texto = str_replace("Ù", "U", $texto);

	$texto = str_replace("ç", "c", $texto);
	$texto = str_replace("Ç", "C", $texto);

	$texto = str_replace("ñ", "n", $texto);
	$texto = str_replace("Ñ", "N", $texto);


	// Remove Caracteres Especiais
	$texto = str_replace("=", "", $texto);
	$texto = str_replace("+", "", $texto);
	$texto = str_replace("-", "", $texto);
	$texto = str_replace("/", "", $texto);
	$texto = str_replace("*", "", $texto);
	$texto = str_replace("@", "", $texto);
	$texto = str_replace("#", "", $texto);
	$texto = str_replace("'", "", $texto);
	$texto = str_replace("\"", "", $texto);
	$texto = str_replace("!", "", $texto);
	$texto = str_replace("%", "", $texto);
	$texto = str_replace("&", "", $texto);
	$texto = str_replace("(", "", $texto);
	$texto = str_replace(")", "", $texto);
	$texto = str_replace(",", "", $texto);

	return $texto;
}
?>