<?php

session_start();

require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


$tabelaPadrao = "mapa+mov+pdf+notif";
$tabelaPadrao = explode("+", $tabelaPadrao);

if (!empty($_POST['listarAreas'])) {
	$filtro = "";
	// $usuario = $_POST['usuario'];
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$minha_area_nivel_acesso = "";
	$resultado = "";
	$sql = "SELECT area_nivel_acesso FROM nivel_acesso
			WHERE id_nivel_acesso = (
				SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login']."
			);";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);
	
	for ($i=0; $i < sizeof($minha_area_nivel_acesso); $i++) { 
		if (!in_array($minha_area_nivel_acesso[$i], $tabelaPadrao)) {
			$resultado .= "[]".$minha_area_nivel_acesso[$i];
		}
	}
	echo $resultado;
}







/**************************************************************************************************************************************/
/** Operações Basicas de Listagem Notificações e Notificações Config */
/**************************************************************************************************************************************/
include "operacoes_notificacoes.php";
include "operacoes_notificacoes_salvas.php";
include "operacoes_notificacoes_config.php";

?>