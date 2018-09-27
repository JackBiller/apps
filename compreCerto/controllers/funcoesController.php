<?php

session_start();

require_once "../classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();

if (!empty($_POST['excluir'])) {
	$id 	= $_POST['id'];
	$table 	= $_POST['table'];
	$situacao = $_POST['boolAtivo'];

	$sql = "UPDATE $table SET bool_ativo_$table = $situacao WHERE id_$table = $id;";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}


if (!empty($_POST['excluirDefinitivamente'])) {
	$id 	= $_POST['id'];
	$table 	= $_POST['table'];

	$sql = "DELETE FROM $table WHERE id_$table = $id;";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}


if (!empty($_POST['setarAreaDeAtuacao'])) {
	$_SESSION['areaDeAtuacao'] = $_POST['area'];
}



/************************************************************************************************************************/
/** Operações de Arquivos **/
/************************************************************************************************************************/
// Variave de Configuração de caminho
$preCaminho = "../upload/";
$caminhoUploadImagem = $preCaminho . "img";
$caminhoUploadVideo = $preCaminho . "video";
$caminhoUploadAudio = $preCaminho . "audio";
$caminhoUploadTexto = $preCaminho . "text";

$preCaminho_Site = "app/upload/";
$caminhoUploadImagem_Site = $preCaminho_Site . "img";
$caminhoUploadVideo_Site = $preCaminho_Site . "video";
$caminhoUploadAudio_Site = $preCaminho_Site . "audio";
$caminhoUploadTexto_Site = $preCaminho_Site . "text";


// Esta funçõe serve para listar imagens dentro de um modal. 
// Isso quer dizer que o usuario deseja selecionar uma imagem do servidor.
if (!empty($_POST['listarArquivo'])) {
	$resultado = "";
	$contRegistro = 0;
	$filtro = $_POST['filtro'];
	$tipo = $_POST['tipo'];
	$operacao = !empty($_POST['operacao']) ? true : false;
	$extencao = "";
	$funcaoOnClick = "";
	$exite = false;
	$btnDonw = "";
	$caminhoImagem = "";

	switch ($tipo) {
		case 'img': 	$tipo = "imagem";	break;
		case 'text': 	$tipo = 'texto';	break;
	}

	$filtro = $filtro == "" ? "" : "AND descricao_upload_arq LIKE '%".$filtro."%'";
	$sql = "SELECT * FROM upload_arq WHERE tipo_upload_arq = '$tipo' $filtro ORDER BY descricao_upload_arq";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$contRegistro++;
		$extencao = explode(".", $dados[1]);
		$extencao = end($extencao);
		$funcaoOnClick = $operacao ? " onclick='selecionarArquivo(\"".$dados[1]."\")'" : "";


		if ($tipo == "imagem") {
			if (file_exists($caminhoUploadImagem."/".$dados[1])) {
				$caminhoImagem = $caminhoUploadImagem_Site."/".$dados[1];
				$btnDonw = "
			<button class='btn' style='color: blue;' onclick='donwnloadFile(\"".$caminhoImagem."\");' title='Download'>
				<b><i class=\"fa fa-download\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Download -->
			</button>";
			}
			else {
				$caminhoImagem = "app/img/sem_imagem.gif";
				$btnDonw = "";
			}

			$resultado .= "
		<div class='col-md-3 col-xs-4 text-center divImg'>
			<img src='".$caminhoImagem."' width='100%'><br><!--  height=\"50px\"  -->
			<b>".$dados[1]."</b><br>
			<button class='btn' style='color: green;'".$funcaoOnClick.";' title='Selecionar'>
				<b><i class=\"fa fa-check\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Selecionar -->
			</button>$btnDonw
		</div>";
		}

		else if ($tipo == "video") {
			$resultado .= "
		<div class='text-center col-sm-6'".$funcaoOnClick.">
			<video width=\"400\" controls>
				<source src=\"".$caminhoUploadVideo_Site."/".$dados[1]."\" type=\"video/$extencao\">
			</video><br>
			<b>".$dados[1]."</b>
		</div>";
		}

		else if ($tipo == "audio") {
			$resultado .= "
		<div class='text-center col-sm-6'".$funcaoOnClick.">
			<audio controls>
				<source src=\"".$caminhoUploadAudio_Site."/".$dados[1]."\" type=\"audio/$extencao\">
			</audio><br>
			<b>".$dados[1]."</b>
		</div>";
		}

		else if ($tipo == "texto") {
			$resultado .= "
		<div class='text-center col-sm-4 col-xs-6 divImg'".$funcaoOnClick.">
			<b>Arquivo: ".$dados[1]."</b><br>";

			if (file_exists($caminhoUploadTexto."/".$dados[1])) {
				$resultado .= "
			<button class='btn' style='color: green;' onclick='viewFile(\"".$caminhoUploadTexto_Site."/".$dados[1]."\");' title='Visualizar'>
				<b><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Visualizar -->
			</button>
			<button class='btn' style='color: blue;' onclick='donwnloadFile(\"".$caminhoUploadTexto_Site."/".$dados[1]."\");' title='Download'>
				<b><i class=\"fa fa-download\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Download -->
			</button>";
			}

			$resultado .= "
		</div>";
		}
	}
	$resultado = $contRegistro == 0 ? "<h3>Nenhum registro encontrado</h3>" : $resultado;
	echo $resultado;
}





/******************************************/
/** Operações para movimentação de arquivo */
/******************************************/
// Lista imagens do servidor que estão salvas no banco de dados 
// Lista descrições que estão salvas no banco de dados sem ter o arquivo no servidor
// Serve para delete do banco de dados ou delete do banco de dados e excluir o arquivo
// E para apagar estas descrições que estão salvas sem arquivo
if (!empty($_POST['imgensServidoBd'])) {
	$resultado = "";
	$contRegistro = 0;
	$filtro = $_POST['filtro'];

	$filtro = $filtro == "" ? "" : "AND descricao_upload_arq LIKE '%".$filtro."%'";
	$sql = "SELECT * FROM upload_arq WHERE tipo_upload_arq = 'imagem' $filtro ORDER BY descricao_upload_arq";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$contRegistro++;
		if ( file_exists($caminhoUploadImagem."/".$dados[1]) ) {
			$resultado .= "
			<div class='col-md-4 col-sm-6 col-xs-12 text-center divImg'>
				<img src='".$caminhoUploadImagem_Site."/".$dados[1]."' width='100%'><br><!--  height=\"50px\"  -->
				<b>".$dados[1]."</b><br><br>
				<button class='btn' style='color: blue;' onclick='donwnloadFile(\"".$caminhoUploadImagem_Site."/".$dados[1]."\");' title='Download'>
					<b><i class=\"fa fa-download\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Download -->
				</button>
				
				<button class='btn' style='color: red;' onclick='excluirFile(\"".$caminhoUploadImagem."/".$dados[1]."\", ".$dados[0].");' title='Excluir'>
					<b><i class=\"fa fa-times\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Excluir -->
				</button>
				
				<button class='btn' style='color: green;' onclick='excluirFile(\"\", ".$dados[0].");' title='Mover'>
					<b><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></b>
				</button>
				<br>
			</div>";
		} else {
			$resultado .= "
			<div class='col-md-4 col-sm-6 col-xs-12 text-center divImg'>
				<img src='app/img/sem_imagem.gif' width='100%'><br><!--  height=\"50px\"  -->
				<b>".$dados[1]."</b><br><br>
				<button class='btn' style='color: red;' onclick='excluirFile(\"\", ".$dados[0].");' title='Excluir'>
					<b><i class=\"fa fa-times\" aria-hidden=\"true\"></i></b>
				</button>
				<br>
			</div>";
		}
	}
	$resultado = $contRegistro == 0 ? "<h3>Nenhum registro encontrado</h3>" : $resultado;
	echo $resultado;
}


// Lista imagens do servidor que não estão salvas no banco de dados
// Serve para excluir o arquivo ou inclui-lo no banco de dados
if (!empty($_POST['imgensServidoPasta'])) {
	$resultado = "";
	$filtro = $_POST['filtro'];
	$arrayImagem = array();
	$contRegistro = 0;

	$sql = "SELECT * FROM upload_arq WHERE tipo_upload_arq = 'imagem'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		array_push($arrayImagem, $dados[1]);
	}

	$files1 = scandir($caminhoUploadImagem);
	for ($i=0; $i < count($files1); $i++) { 
		if (
			!is_dir($files1[$i]) &&
			!in_array($files1[$i], $arrayImagem) &&
			substr($files1[$i], 0, strlen($filtro)) == $filtro
		) {
			$contRegistro++;
			$resultado .= "
			<div class='col-md-4 col-sm-6 col-xs-12 text-center divImg'>
				<img src='".$caminhoUploadImagem_Site."/".$files1[$i]."' width='100%'><br><!--  height=\"50px\"  -->
				<input type='hidden' name='imagemServerNBD' value='".$files1[$i]."'>
				<b>".$files1[$i]."</b><br><br>
				<button class='btn' style='color: green;' onclick='moverFile(\"".$files1[$i]."\");' title='Mover'>
					<b><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></b>
				</button>
				
				<button class='btn' style='color: red;' onclick='excluirFile(\"".$caminhoUploadImagem."/".$files1[$i]."\", \"\");' title='Excluir'>
					<b><i class=\"fa fa-times\" aria-hidden=\"true\"></i></b>
				</button>

				<button class='btn' style='color: blue;' onclick='donwnloadFile(\"".$caminhoUploadImagem_Site."/".$files1[$i]."\");' title='Download'>
					<b><i class=\"fa fa-download\" aria-hidden=\"true\"></i></b><!-- &nbsp;&nbsp;Download -->
				</button>
				<br>
			</div>";
		}
	}
	$resultado = $contRegistro == 0 ? "<h3>Nenhum registro encontrado</h3>" : $resultado;
	echo $resultado;
}


// Faz Parte da movimentação de arquivo
// Serve para excluir arquivo e/ou apagar descrição do banco
if (!empty($_POST['removerImagem'])) {
	if(!empty($_POST['diretorio'])) unlink($_POST['diretorio']);

	if(!empty($_POST['id'])){
		$id = $_POST['id'];
		$sql = "DELETE FROM upload_arq WHERE id_upload_arq = $id";
		$verifica = $pdo->prepare($sql);
		echo $verifica->execute();
	}
}


// Faz Parte da movimentação de arquivo
// Serve para salvar descrições das imagens que estão no servidor e não no banco de dados no banco de dados
if (!empty($_POST['salvarBD'])) {
	$nome = $_POST['nome'];
	$tipo = $_POST['tipo'];
	$sql = "INSERT INTO upload_arq 
					( descricao_upload_arq,  tipo_upload_arq) 
			VALUES 	('$nome', 				'$tipo'			);";
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
}
/************************************************************************************************************************/
/** Fim das Operações de Arquivos **/
/************************************************************************************************************************/





/************************************************************************************************************************/
/** Operações do Perfil de Usuario **/
/************************************************************************************************************************/
if (!empty($_POST['alterarPerfil'])) {
	$id = $_POST['id_usuario'];
	$table = $_POST['table'];
	$stringUpdata = "";

	if (!empty($_POST['nome'])){
		$stringUpdata .= $_POST['nome'] != "" ? "nome_".$table." = '".$_POST['nome']."' " : "";
		$_SESSION['nome'] = $_POST['nome'];
	}
	if (!empty($_POST['login'])) $stringUpdata .= $_POST['login'] != "" ? "login_".$table." = '".$_POST['login']."' " : "";

	if (!empty($_POST['password'])) {
		if (!empty($_POST['senha'])) $stringUpdata .= $_POST['senha'] != "" ? "senha_".$table." = PASSWORD('".$_POST['senha']."') ": "";
	}
	else {
		if (!empty($_POST['senha'])) $stringUpdata .= $_POST['senha'] != "" ? "senha_".$table." = '".$_POST['senha']."' ": "";
	}

	if(!empty($_POST['bool_ativo'])) $stringUpdata .= $_POST['bool_ativo'] != "" ? "bool_ativo_".$table." = '".$_POST['bool_ativo']."' " : "";



	if ($stringUpdata != "") {
		$sql = "UPDATE $table SET $stringUpdata WHERE id_$table = $id";
		$verifica = $pdo->prepare($sql);
		echo $verifica->execute();

	}
	else echo 0;
}

if (!empty($_POST['consultarSenha'])) {
	$id = $_POST['id_usuario'];
	$table = $_POST['table'];
	$resultao = "0";

	if (!empty($_POST['password'])) $senhaOld = "PASSWORD('".$_POST['senha']."')";
	else 							$senhaOld = 		" '".$_POST['senha']."' ";
	
	$sql = "SELECT * FROM $table WHERE senha_$table = $senhaOld AND id_$table = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados): $resultao = "1"; endforeach;
	echo $resultao;
}

if (!empty($_POST['acesso'])) {
	$minha_area_nivel_acesso = [];
	$idUsusario = $_POST['usuario'];

	$sql = "SELECT area_nivel_acesso
			FROM nivel_acesso
			WHERE id_nivel_acesso = (
				SELECT nivel_acesso_id FROM usuario WHERE id_usuario = $idUsusario
			);";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);

	if (in_array($_POST['area'] , $minha_area_nivel_acesso)) echo 1;
	else 													 echo 0;
}




/************************************************************************************************************************/
/** Operações do Editar **/
/************************************************************************************************************************/
if (!empty($_POST['editar']))   $_SESSION['editar'] = $_POST['id'];
if (!empty($_POST['n_editar'])) $_SESSION['editar'] = 0;






/************************************************************************************************************************/
/** Operações genericas com tabela do banco **/
/************************************************************************************************************************/
if (!empty($_POST['listarColunasTable'])) {
	$table = $_POST['tabela'];
	$cont = 0;
	$colunas = "";

	$sql = "SHOW COLUMNS FROM $table;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados){
		if ($dados[3] != "PRI") {
			$colunas = $cont == 0 ? $dados[0]."{,}".$dados[1] : $colunas."[,]".$dados[0]."{,}".$dados[1];
			$cont++;
		}
	}
	echo $colunas;
}

if (!empty($_POST['listarColunasTable_data'])) {
	$table = $_POST['tabela'];
	$cont = 0;
	$colunas = "";

	$sql = "SHOW COLUMNS FROM $table WHERE Type = 'datetime' OR Type = 'date';";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados){
		if ($dados[3] != "PRI") {
			$colunas = $cont == 0 ? $dados[0]."{,}".$dados[1] : $colunas."[,]".$dados[0]."{,}".$dados[1];
			$cont++;
		}
	}
	echo $colunas;
}

if (!empty($_POST['verificaSeHaValor'])) {
	$valor = $_POST['valor'];
	$tabela = $_POST['tabela'];
	$coluna = $_POST['coluna'];
	$resultado = 0;

	$sql = "SELECT COUNT(*) FROM $tabela WHERE $coluna = '$valor';";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados){
		$resultado = $dados[0];
	}

	echo $resultado;
}
?>