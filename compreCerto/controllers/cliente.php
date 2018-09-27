<?php
/* session_start(); */
require_once "../classe/conexao.php";
require_once "../classe/entidade/Cliefornec.php";
require_once "../classe/entidade/Cliefornec_entrega.php";
require_once "../classe/entidade/Cliefornec_telefone.php";


$conn = new Conexao();
$pdo = $conn->Connect();

if (!empty($_POST['listarClientes'])) {
	// Variaveis de Retorne
	$arrayResultado = [];
	$arrayEntrega = [];
	$cliefornec = new Cliefornec();
	$cliefornec_entrega = new Cliefornec_entrega();
	$oldCodigo = 0;

	$sql = "SELECT
				-- campos Cliente
				cliefornec.codigo,
				cliefornec.razaosocial,
				cliefornec.telefone,
				-- Campos Endereco
				cliefornec_entrega.endereco,
				cliefornec_entrega.bairro,
				cliefornec_entrega.cidade,
				cliefornec_entrega.estado,
				cliefornec_entrega.numero,
				cliefornec_entrega.cep,
				cliefornec_entrega.seq
		FROM cliefornec_entrega
		INNER JOIN cliefornec ON cliefornec_entrega.cliente = cliefornec.codigo
		ORDER BY cliefornec.codigo";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($oldCodigo != $dados['codigo'] && $cliefornec->get('codigo') != null) {
			$oldCodigo  = $dados['codigo'];
			$cliefornec->set($cliefornec_entrega, 'endereco');
			array_push($arrayResultado, $cliefornec);
			$cliefornec = new Cliefornec();
		}
		
		/* Variaveis Locais de Entrega */
		$cliefornec_entrega = new Cliefornec_entrega();
		$cliefornec_entrega->set($dados['endereco'], 'endereco');
		$cliefornec_entrega->set($dados['bairro'], 'bairro');
		$cliefornec_entrega->set($dados['cidade'], 'cidade');
		$cliefornec_entrega->set($dados['estado'], 'estado');
		$cliefornec_entrega->set($dados['numero'], 'numero');
		$cliefornec_entrega->set($dados['cep'], 'cep');
		$cliefornec_entrega->set($dados['seq'], 'seq');

		/* Variavies Cliente */
		$cliefornec->set($dados['codigo'], 'codigo');
		$cliefornec->set($dados['razaosocial'], 'razaosocial');
		$cliefornec->set($dados['telefone'], 'telefone');

		array_push($arrayEntrega, $cliefornec_entrega);
	}
	
	$cliefornec->set($cliefornec_entrega, 'endereco');
	array_push($arrayResultado, $cliefornec);
	
	echo arrayEmJson($arrayResultado);
}



if (!empty($_POST['listarSoCliente'])) {
	$resultado = "[";
	$auxVirgula = "";

	$sql = "SELECT
				cliefornec.codigo,
				cliefornec.razaosocial
		FROM cliefornec";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$auxVirgula = $resultado == "[" ? "" : ",";
		$resultado .= $auxVirgula."{\"codigo\":".$dados['codigo'].",\"razaosocial\":\"".tratarString($dados['razaosocial'])."\"}";
	}
	echo $resultado."]";
}


function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("	", "", $texto);
	// $texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}




if (!empty($_POST['listarClienteId'])) {
	/* Variveis de parametros */
	$id = $_POST['id'];

	// Variaveis de Retorno
	$arrayEntrega = [];
	$arrayTelefones = [];
	$cliefornec = new Cliefornec();
	$cliefornec_entrega = new Cliefornec_entrega();
	$cliefornec_telefone = new Cliefornec_telefone();


	/* CLIENTE GERAL */
	$sql = "SELECT
				-- campos Cliente
				cliefornec.codigo,
				cliefornec.razaosocial
		FROM cliefornec
		WHERE cliefornec.codigo = $id";

	// echo $sql;
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		/* Variavies Cliente */
		// $cliefornec = new Cliefornec();
		$cliefornec->set((int)$dados['codigo'], 'codigo');
		$cliefornec->set($dados['razaosocial'], 'razaosocial');
	}
	

	/* LOCAIS DE ENTREGA */
	$sql = "SELECT
				-- Campos Endereco
				cliefornec_entrega.endereco,
				cliefornec_entrega.bairro,
				cliefornec_entrega.cidade,
				cliefornec_entrega.estado,
				cliefornec_entrega.numero,
				cliefornec_entrega.cep,
				cliefornec_entrega.seq
		FROM cliefornec_entrega
		WHERE cliefornec_entrega.cliente = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$cliefornec_entrega = new Cliefornec_entrega();
		$cliefornec_entrega->set($dados['endereco'], 'endereco');
		$cliefornec_entrega->set($dados['bairro'], 'bairro');
		$cliefornec_entrega->set($dados['cidade'], 'cidade');
		$cliefornec_entrega->set($dados['estado'], 'estado');
		$cliefornec_entrega->set((int)$dados['numero'], 'numero');
		$cliefornec_entrega->set($dados['cep'], 'cep');
		$cliefornec_entrega->set((int)$dados['seq'], 'seq');

		array_push($arrayEntrega, $cliefornec_entrega);
	}
	$cliefornec->set($arrayEntrega, 'endereco');



	/* TELEFONES */
	$sql = "SELECT 
				cliefornec_telefone.sequencia, 
				cliefornec_telefone.telefone, 
				cliefornec_telefone.ramal, 
				cliefornec_telefone.tipo, 
				cliefornec_telefone.contato, 
				cliefornec_telefone.email, 
				cliefornec_telefone.envianfe
			FROM cliefornec_telefone
			WHERE cliefornec_telefone.cliente = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$cliefornec_telefone = new Cliefornec_telefone();
		$cliefornec_telefone->set((int)$dados['sequencia'], 	'sequencia');
		$cliefornec_telefone->set($dados['telefone'], 	'telefone');
		$cliefornec_telefone->set($dados['ramal'], 		'ramal');
		$cliefornec_telefone->set($dados['tipo'], 		'tipo');
		$cliefornec_telefone->set($dados['contato'], 	'contato');
		$cliefornec_telefone->set($dados['email'], 		'email');
		$cliefornec_telefone->set((int)$dados['envianfe'], 	'envianfe');

		array_push($arrayTelefones, $cliefornec_telefone);
	}
	$cliefornec->set($arrayTelefones, 'telefone');

	echo toJson($cliefornec);
}

?>