<?php
session_start();


require_once "app/classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


$arquivo = $_FILES['arquivo']['name'];
// $pasta = $_POST['pasta'];
$tipo = $_POST['tipo'];
$_SESSION['statusUp'] = 0;
$gravar = false;

/***************************************************************************************************************/
/** UpLord de Imagem *******************************************************************************************/
/***************************************************************************************************************/

//Tamanho máximo do arquivo em Bytes
$_UP['tamanho'] = 1024*1024*40000; //200mb
//Pasta onde o arquivo vai ser salvo
// $_UP['pasta'] = "";
//Array com a extensões permitidas
// $_UP['extensoes'] = array();

// Verificação de tipos de arquivos
if ($tipo == "img") {
	$_UP['extensoes'] = array('png', 'jpg', 'jpeg', 'gif', 'ico');
	$_UP['pasta'] = "app/upload/img/";
	$tipo = "imagem";
} 
else if ($tipo == "video") {
	$_UP['extensoes'] = array('mp4', 'avi', 'rmbv', 'wmv', 'ogg');
	$_UP['pasta'] = "app/upload/video/";
	$tipo = "video";
} 
else if ($tipo == "audio") {
	$_UP['extensoes'] = array('mp3');
	$_UP['pasta'] = "app/upload/audio/";
	$tipo = "audio";
}
else if ($tipo == "text") {
	$_UP['extensoes'] = array('txt', 'pdf', 'doc', 'docx', 'xls', 'ppt');
	$_UP['pasta'] = "app/upload/text/";
	$tipo = "texto";
}
else {
	$_UP['extensoes'] = array();
	$_UP['pasta'] = "";
}



//Renomeiar
// $_UP['renomeia'] = false;
//Array com os tipos de erros de upload do PHP
$_UP['erros'][0] = 'Não houve erro';
$_UP['erros'][1] = 'O arquivo no upload é maior que o limite do PHP';
$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especificado no HTML';
$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
$_UP['erros'][4] = 'Não foi feito o upload do arquivo';
//Verifica se houve algum erro com o upload. Sem sim, exibe a mensagem do erro
if($_FILES['arquivo']['error'] != 0){
	$_SESSION['statusUp'] = 0;
	die("Não foi possivel fazer o upload, erro: <br />". $_UP['erros'][$_FILES['arquivo']['error']]);
	exit; //Para a execução do script
}
//Faz a verificação da extensao do arquivo
$extensao = explode('.', $_FILES['arquivo']['name']);
$extensao = strtolower(end($extensao));

if(array_search($extensao, $_UP['extensoes'])=== false){$_SESSION['statusUp'] = 0;}
//Faz a verificação do tamanho do arquivo
else if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {$_SESSION['statusUp'] = 0;}
//O arquivo passou em todas as verificações, hora de tentar move-lo para a pasta foto
else{
	$nome_final = $_FILES['arquivo']['name'];
	$nome_final = tratarString($nome_final);
	//Verificar se é possivel mover o arquivo para a pasta escolhida
	if(move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta'] . $nome_final)){
		$gravar = true;
		$_SESSION['statusUp'] = 1;
		chmod($_UP['pasta'] . $nome_final, 0777);
	} else {
		$_SESSION['statusUp'] = 0;
	}
}

if ($gravar) {
	$contRegistros = 0;
	$sql = "SELECT COUNT(*) AS TOTAL FROM upload_arq WHERE descricao_upload_arq = '$nome_final'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) $contRegistros = $dados['TOTAL'];

	if ($contRegistros == 0) {
		$sql = "INSERT INTO upload_arq 
						( descricao_upload_arq,  tipo_upload_arq) 
				VALUES 	('$nome_final', 		'$tipo'			);";
		$stmt = $pdo->prepare($sql);
		$stmt->execute();
	}
}


header("Location: principal.php#!upload_result");
// $_POST['paginaLogar']



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