<?php


ini_set('max_execution_time', 300);


use Dompdf\Dompdf;
require_once "app/lb/dompdf_gerar/dompdf/autoload.inc.php";

$arquivo = $_GET['arq'];
$relatorio = $_GET['relatorio'];

if (file_exists("app/pdf/".$arquivo.".html")) {
	$myfile = fopen("app/pdf/".$arquivo.".html", "r") or die("Unable to open file!");
	$arquivoCopia = fread($myfile,filesize("app/pdf/".$arquivo.".html"));
	fclose($myfile);
	unlink("app/pdf/".$arquivo.".html");

	$dompdf = new DOMPDF();
	$dompdf->load_html($arquivoCopia);

	
	$dompdf->render();
	$dompdf->stream(
		$relatorio.".pdf",
		array(
			"Attachment" => false
		)
	);
} else { ?>

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

<?php } ?>