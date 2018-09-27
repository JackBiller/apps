<?php

$arquivo = $_GET["arquivo"]; 

$extensao = strtolower(substr(strrchr(basename($arquivo),"."),1));
$bloqueados = array('php','htm','html'); 
// caso a extensão seja diferente das citadas acima ele 
// executa normalmente o script 

if(!in_array($extensao,$bloqueados)){ 
	if(isset($arquivo) && file_exists($arquivo)){ // faz o teste se a variavel não esta vazia e se o arquivo realmente existe
		switch($extensao){ // verifica a extensão do arquivo para pegar o tipo
			case "txt": $tipo = "text/plain"; break;

			case "pdf": $tipo = "application/pdf"; break;
			case "exe": $tipo = "application/octet-stream"; break;
			case "zip": $tipo = "application/zip"; break;
			case "doc": $tipo = "application/msword"; break;
			case "docx": $tipo = "application/msword"; break;
			case "xls": $tipo = "application/vnd.ms-excel"; break;
			case "ppt": $tipo = "application/vnd.ms-powerpoint"; break;

			case "gif": $tipo = "image/gif"; break;
			case "png": $tipo = "image/png"; break;
			case "jpg": $tipo = "image/jpg"; break;
			case "jpeg": $tipo = "image/jpeg"; break;
			case "gif": $tipo = "image/gif"; break;
			case "ico": $tipo = "image/ico"; break;

			case "mp3": $tipo = "audio/mpeg"; break;
			// case "php": // deixar vazio por seurança
			// case "htm": // deixar vazio por seurança
			// case "html": // deixar vazio por seurança
			default: $tipo = "invalido"; break;
		}
		if ($tipo != "invalido") {
			header("Content-Type: ".$tipo); // informa o tipo do arquivo ao navegador
			header("Content-Length: ".filesize($arquivo)); // informa o tamanho do arquivo ao navegador
			header("Content-Disposition: attachment; filename=".basename($arquivo)); // informa ao navegador que é tipo anexo e faz abrir a janela de download, tambem informa o nome do arquivo
			readfile($arquivo); // lê o arquivo
			exit; // aborta pós-ações
		} else {echo "Erro!"; exit;}
	} else {echo "Erro!"; exit;}
} else {echo "Erro!"; exit;}

?>