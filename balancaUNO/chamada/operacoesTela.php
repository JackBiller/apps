<?php 

include "conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect();

date_default_timezone_set("America/Sao_Paulo");
$data_atual = date('Y-m-d');


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


if (!empty($_POST["atualizaParaChamado"])) {
	$pedido = $_POST['pedido'];

	$sql = "SELECT status FROM chamada WHERE pedido = '$pedido'";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if($dados["status"] == 2){
			$sql = "UPDATE chamada SET status = 4 WHERE pedido = '$pedido'";
		} else {
			$sql = "UPDATE chamada SET status = 2 WHERE pedido = '$pedido'";
		}
	}

	
	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}


if (!empty($_POST["atualizaParaFinalizado"])) {
	$pedido = $_POST['pedido'];

	$sql = "UPDATE chamada SET status = 3 WHERE pedido = '$pedido'";
	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}



if (!empty($_POST['listarPedidosPendente'])) {
	$result = "";
	$corFundo = "";
	$descricaoStatus = "";
	$sql = "SELECT * FROM  chamada WHERE status = 1 OR status = 2 OR status = 4 ORDER BY horario DESC";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($data_atual == substr($dados['horario'], 0, 10)) {
			$corFundo = $dados['status'] == 1 ? "lightblue" : "lightgreen";
			$descricaoStatus = $dados['status'] == 1 ? "Preparando..." : "Pronto";

			$result .= "
			<div class='col-xs-3 text-center estiloCamposSenha' style='height: 20%;background-color: ".$corFundo.";'>
				<h1>Pedido: ".$dados['pedido']."</h1>";

			if (str_replace(" ", "", $dados['nome']) != "") {
				$result .= "
				<h2>Nome: ".$dados['nome']."</h2>";
			}
			
			$result .= "
				<h2 class='linhaStatus'>$descricaoStatus</h2>
			</div>";
		}
	}
	$result = $result == "" ? "<div class='text-center'><br><br><br><h3>Nenhum resultado encontrado!</h3></div>" : $result;
	echo $result;
}


if (!empty($_POST['listarPedidoChamado'])) {
	$result = "";
	$sql = "SELECT * FROM chamada WHERE status = 2 OR status = 4 ORDER BY horario DESC";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($data_atual == substr($dados['horario'], 0, 10)) {
			$result .= "
				<span style='display:none'>".$dados['status']."</span>
				<h2 style='margin-top:15px;'>
					Pedido: ".$dados['pedido'];

			if (str_replace(" ", "", $dados['nome']) != "") {
				$result .= " <br> Nome: ".$dados['nome'];
			}
			
			$result .= "
				</h2><hr>";
		}
	}
	$result = $result == "" ? "<div class='text-center'><br><h3>Nenhum resultado encontrado!</h3></div>" : $result;
	echo $result;
}


if (!empty($_POST['retornaIp'])) {
	$result = "["; $cont = 0; $virgula = "";
	$sql = "SELECT * FROM parametros ORDER BY id_parametros DESC LIMIT 1";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$virgula = $cont == 0 ?  "" : ",";
		$result .= $virgula."{\"ip\": \"".$dados['ip_parametros']."\", \"porta\": ".$dados['porta_paramentros']."}";
		$cont++;
	}
	echo str_replace("\n", "", $result)."]";
}


function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}

?>