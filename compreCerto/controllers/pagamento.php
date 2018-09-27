<?php
/* session_start(); */
require_once "../classe/conexao.php";
require_once "../classe/entidade/Condpagamento.php";

$conn = new Conexao();
$pdo = $conn->Connect();


if (!empty($_POST['listarCondPag'])) {
	$condpagamento = new Condpagamento();
	$arrayCondPagamento = [];

	$sql = "SELECT codigo, descricao FROM condpagamento";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$condpagamento = new Condpagamento();
		$condpagamento->set($dados['codigo'], 		'codigo');
		$condpagamento->set($dados['descricao'], 	'descricao');

		array_push($arrayCondPagamento, $condpagamento);
	}
	echo toJson($arrayCondPagamento);
}