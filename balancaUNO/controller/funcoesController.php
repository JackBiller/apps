<?php 

include "../class/conexao.php";
include "../class/entidade/Balanca.php";

$conn = new Conexao();
$pdo = $conn->Connect();

date_default_timezone_set("America/Sao_Paulo");
$data_atual = date('Y-m-d');



if (!empty($_POST['buscarPesoBalanca'])) {
	$id = $_POST['id'];
	$balanca = new Balanca();
	$sql = "SELECT * FROM balanca WHERE id_balanca = $id;";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$balanca->set((int)$dados['id_balanca'], 'id_balanca');
		$balanca->set($dados['descricao_balanca'], 'descricao_balanca');
		$balanca->set((double)$dados['peso_balanca'], 'peso_balanca');
	}
	echo toJson($balanca);
}




if (!empty($_POST['listaBalanca'])) {
	$balanca = new Balanca();
	$arrayBalanca = [];

	$sql = "SELECT * FROM balanca";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$balanca = new Balanca();
		$balanca->set((int)$dados['id_balanca'], 'id_balanca');
		$balanca->set($dados['descricao_balanca'], 'descricao_balanca');
		$balanca->set((double)$dados['peso_balanca'], 'peso_balanca');

		array_push($arrayBalanca, $balanca);
	}
	echo toJson($arrayBalanca);
}



/* Exemplode executar */
if (!empty($_POST['adicionarPedido'])) {
	$pedido = $_POST['pedido'];
	$nome = $_POST['nome'];
	
	$pedido = tratarString($pedido);
	$nome = tratarString($nome);

	$sql = "INSERT INTO chamada 
			(pedido, nome)
			 VALUES 
			('$pedido', '$nome');";

	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}


function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}

?>