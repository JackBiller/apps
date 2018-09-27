<?php
/* session_start(); */
require_once "../classe/conexao.php";
/* require_once "../classe/conexaoGuiaCep.php"; */
require_once "../classe/entidade/Lanc_marketing.php";
require_once "../classe/entidade/Lanc_marketing_itens.php";
require_once "../classe/entidade/Cep.php";


$conn = new Conexao();
$pdo = $conn->Connect();

/* $connCep = new ConexaoGuiaCep();
$pdoCep = $connCep->Connect(); */
$pdoCep = $conn->Connect();



// Informações gerais de login
if (!empty($_POST['listaPedido'])) {
	// Dados recebidos externamente
	$data = !empty($_POST['data']) ? $_POST['data'] : "";
	$filial = $_POST['filial'];
	$vendedor = $_POST['vendedor'];

	// Objeto de Retorno
	$arrayPedidos = [];
	$lanc_marketing = new Lanc_marketing();

	// Verificação interna
	
	$sql = "SELECT
				lanc_marketing.filial,
				lanc_marketing.documento,
				COALESCE(lanc_marketing.cliente, 0) AS cliente,
				lanc_marketing.razaosocial,
				lanc_marketing.total,
				lanc_marketing.endereco,
				lanc_marketing.bairro,
				lanc_marketing.cidade,
				lanc_marketing.estado,
				lanc_marketing.cep,
				lanc_marketing.telefone,
				lanc_marketing.emissao,
				lanc_marketing.flagcancelada,
				lanc_marketing.dataatualizacao,
				lanc_marketing.horaatualizacao,
				lanc_marketing.usuarioatualizacao,
				lanc_marketing.pagamento,
				lanc_marketing.observacao,
				lanc_marketing.numero,
				lanc_marketing.dataatualizacao_alteracao,
				lanc_marketing.horaatualizacao_alteracao,
				lanc_marketing.usuarioatualizacao_alteracao
			FROM lanc_marketing
			WHERE lanc_marketing.emissao LIKE '%$data%'
			AND lanc_marketing.filial = $filial
			AND lanc_marketing.vendedor = $vendedor";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$lanc_marketing = new Lanc_marketing();
		$lanc_marketing->set((int)$dados['filial'], 					'filial');
		$lanc_marketing->set($dados['documento'], 						'documento');
		$lanc_marketing->set((int)$dados['cliente'], 					'cliente');
		$lanc_marketing->set($dados['razaosocial'], 					'razaosocial');
		$lanc_marketing->set((double)$dados['total'], 					'total');
		$lanc_marketing->set($dados['endereco'], 						'endereco');
		$lanc_marketing->set($dados['bairro'], 							'bairro');
		$lanc_marketing->set($dados['cidade'], 							'cidade');
		$lanc_marketing->set($dados['estado'], 							'estado');
		$lanc_marketing->set($dados['cep'], 							'cep');
		$lanc_marketing->set($dados['telefone'], 						'telefone');
		$lanc_marketing->set($dados['emissao'], 						'emissao');
		$lanc_marketing->set((int)$dados['flagcancelada'], 				'flagcancelada');
		$lanc_marketing->set($dados['dataatualizacao'], 				'dataatualizacao');
		$lanc_marketing->set($dados['horaatualizacao'], 				'horaatualizacao');
		$lanc_marketing->set($dados['usuarioatualizacao'], 				'usuarioatualizacao');
		$lanc_marketing->set($dados['pagamento'], 						'pagamento');
		$lanc_marketing->set($dados['observacao'], 						'observacao');
		$lanc_marketing->set($dados['numero'], 							'numero');
		$lanc_marketing->set($dados['dataatualizacao_alteracao'], 		'dataatualizacao_alteracao');
		$lanc_marketing->set($dados['horaatualizacao_alteracao'], 		'horaatualizacao_alteracao');
		$lanc_marketing->set($dados['usuarioatualizacao_alteracao'], 	'usuarioatualizacao_alteracao');

		array_push($arrayPedidos, $lanc_marketing);
	}

	// Retorno	
	echo arrayEmJson($arrayPedidos);
}

if (!empty($_POST['deslogar'])) {
	/*-session_destroy();*/
	// header("Location: ../../index.php");
}






if (!empty($_POST['buscaCep'])) {
	$cep = $_POST['cep'];
	$objectCep = new Cep();

	$sql = "SELECT 
				cep,
				endereco,
				bairro,
				cidade,
				estado,
				observacaoendereco,
				latitude,
				longitude,
				latitude_bairro,
				longitude_bairro
			FROM cep
			WHERE cep = '$cep'
			LIMIT 1";

	$verifica = $pdoCep->query($sql);
	foreach ($verifica as $dados) {
		$objectCep->set($dados['cep'], 'cep');
		$objectCep->set($dados['endereco'], 'endereco');
		$objectCep->set($dados['bairro'], 'bairro');
		$objectCep->set($dados['cidade'], 'cidade');
		$objectCep->set($dados['estado'], 'estado');
		$objectCep->set($dados['observacaoendereco'], 'observacaoendereco');
		$objectCep->set($dados['latitude'], 'latitude');
		$objectCep->set($dados['longitude'], 'longitude');
		$objectCep->set($dados['latitude_bairro'], 'latitude_bairro');
		$objectCep->set($dados['longitude_bairro'], 'longitude_bairro');
	}

	echo toJson($objectCep);
}



if (!empty($_POST['gravarViaCep'])) {
	$cep = $_POST['cep'];
	$logradouro = $_POST['logradouro'];
	$complemento = $_POST['complemento'];
	$bairro = $_POST['bairro'];
	$localidade = $_POST['localidade'];
	$uf = $_POST['uf'];
	$unidade = $_POST['unidade'];
	$ibge = $_POST['ibge'];
	$gia = $_POST['gia'];

	$numRegistro = 0;

	$sql = "SELECT count(*) FROM viacep WHERE cep = '$cep';";
	$verifica = $pdoCep->query($sql);
	foreach ($verifica as $dados) $numRegistro = $dados[0];

	if ($numRegistro == 0) {
		$sql = "INSERT INTO viacep (
			cep,
			logradouro,
			complemento,
			bairro,
			localidade,
			uf,
			unidade,
			ibge,
			gia
		) VALUES (
			'$cep',
			'$logradouro',
			'$complemento',
			'$bairro',
			'$localidade',
			'$uf',
			'$unidade',
			'$ibge',
			'$gia'
		);";
	} else {
		$sql = "UPDATE viacep SET 
				logradouro = '$logradouro',
				complemento = '$complemento',
				bairro = '$bairro',
				localidade = '$localidade',
				uf = '$uf',
				unidade = '$unidade',
				ibge = '$ibge',
				gia = '$gia'
			WHERE cep = '$cep';";
	}

	$stmt = $pdoCep->prepare($sql);
	echo $stmt->execute();
}




if (!empty($_POST['atualizaTotal'])) {
	$total = $_POST['total'];
	$filial = $_POST['filial'];
	$documento = $_POST['documento'];

	$sql = "UPDATE lanc_marketing
			SET total = $total
			WHERE filial = $filial
			AND documento = '$documento'";

	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}



if (!empty($_POST['cancelarPedido'])) {
	$filial = $_POST['filial'];
	$documento = $_POST['documento'];

	$sql = "UPDATE lanc_marketing
			SET flagcancelada = 1
			WHERE filial = $filial
			AND documento = '$documento'";

	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}






if (!empty($_POST['adicionarPedidoItem'])) {

	$lanc_marketing = new Lanc_marketing();
	$lanc_marketing_itens = new Lanc_marketing_itens();
	$arrayRetorno = [];


	$filial = $_POST['filial'];
	$documento = !empty($_POST['documento']) ? $_POST['documento'] : "0";
	
	$cliente = $_POST['cliente'];
	$razaosocial = $_POST['razaosocial'];
	$total = !empty($_POST['total']) ? $_POST['total'] : 0;

	$endereco 	= 	!empty($_POST['endereco']) 	? $_POST['endereco'] 	: "";
	$numero 	= 	!empty($_POST['numero']) 	? $_POST['numero'] 		: "";
	$bairro 	= 	!empty($_POST['bairro']) 	? $_POST['bairro'] 		: "";
	$cidade 	= 	!empty($_POST['cidade']) 	? $_POST['cidade'] 		: "";
	$estado 	= 	!empty($_POST['estado']) 	? $_POST['estado'] 		: "";
	$cep 		= 	!empty($_POST['cep']) 		? $_POST['cep'] 		: "";
	$telefone 	= 	!empty($_POST['telefone']) 	? $_POST['telefone'] 	: "";

	$emissao = $_POST['emissao'];
	$flagcancelada = !empty($_POST['flagcancelada']) ? $_POST['flagcancelada'] : 0;
	
	$usuarioatualizacao = $_POST['usuario'];
	$pagamento = !empty($_POST['pagamento']) ? $_POST['pagamento'] : 0;
	$vendedor = $_POST['vendedor'];
	$observacao = $_POST['observacao']; // cliente sem cadastro
	/* dataatualizacao = NOW() */
	/* $horaatualizacao = */
	/* dataatualizacao_alteracao = NOW() */
	/* horaatualizacao_alteracao = */
	$usuarioatualizacao_alteracao = $usuarioatualizacao;


	if($documento == "0"){
		$sql = "SELECT documento FROM lanc_marketing WHERE filial = $filial ORDER BY documento DESC LIMIT 1";
		$verifica = $pdo->query($sql);
		foreach ($verifica as $dados) $documento = ( (int) $dados['documento'] ) + 1;

		$documento = "000000".$documento;
		$documento = substr($documento, sizeof($documento) - 7);

		$sql = "INSERT INTO lanc_marketing
				(
				filial, documento, cliente, razaosocial, total, endereco, numero, bairro, cidade, estado, cep, telefone, emissao, flagcancelada, usuarioatualizacao, pagamento, observacao, usuarioatualizacao_alteracao, vendedor
				) VALUES (
				$filial, '$documento', $cliente, '$razaosocial', $total, '$endereco', '$numero', '$bairro', '$cidade', '$estado', '$cep', '$telefone', '$emissao', $flagcancelada, '$usuarioatualizacao', '$pagamento', '$observacao', '$usuarioatualizacao_alteracao', $vendedor
			)";
	} else {
		$sql = "UPDATE lanc_marketing 
				SET 
					cliente 		= $cliente,
					razaosocial 	= '$razaosocial',
					total 			= $total,
					endereco 		= '$endereco',
					numero 			= '$numero',
					bairro 			= '$bairro',
					cidade 			= '$cidade',
					estado 			= '$estado',
					cep 			= '$cep',
					telefone 		= '$telefone',
					flagcancelada 	= $flagcancelada,
					pagamento 		= '$pagamento',
					observacao 		= '$observacao'
				WHERE filial = $filial
				AND documento = '$documento'";
	}
	// echo $sql;

	$stmt = $pdo->prepare($sql);
	$stmt->execute();

	$lanc_marketing->set( (int)$filial, 		'filial'		 );
	$lanc_marketing->set( $documento,	 		'documento'		 );
	$lanc_marketing->set( $emissao,	 			'emissao'		 );
	$lanc_marketing->set( (int)$cliente, 		'cliente'		 );
	$lanc_marketing->set( $razaosocial, 		'razaosocial'	 );
	$lanc_marketing->set( (double)$total,		'total'			 );
	$lanc_marketing->set( $endereco, 			'endereco'		 );
	$lanc_marketing->set( $numero, 				'numero'		 );
	$lanc_marketing->set( $bairro, 				'bairro'		 );
	$lanc_marketing->set( $cidade, 				'cidade'		 );
	$lanc_marketing->set( $estado, 				'estado'		 );
	$lanc_marketing->set( $cep, 				'cep'			 );
	$lanc_marketing->set( $telefone, 			'telefone'		 );
	$lanc_marketing->set( $flagcancelada, 		'flagcancelada'	 );
	$lanc_marketing->set( $pagamento, 			'pagamento'		 );
	$lanc_marketing->set( $observacao, 			'observacao'	 );

	array_push($arrayRetorno, $lanc_marketing);

	if (
		!empty($_POST['grupo']) 				&&
		!empty($_POST['sub_grupo']) 			&&
		!empty($_POST['item']) 					&&
		!empty($_POST['quantidade']) 			&&
		!empty($_POST['valor_unitario']) 		&&
		!empty($_POST['unidade']) 				&&
		!empty($_POST['valor_venda']) 			&&
		!empty($_POST['quantidadeprincipal']) 	&&
		!empty($_POST['valor_total'])
	) {
		$grupo = $_POST['grupo'];
		$sub_grupo = $_POST['sub_grupo'];
		$item = $_POST['item'];
		$quantidade = $_POST['quantidade'];
		$valor_unitario = $_POST['valor_unitario'];
		$unidade = $_POST['unidade'];
		$valor_venda = $_POST['valor_venda'];
		$quantidadeprincipal = $_POST['quantidadeprincipal'];
		$valor_total = $_POST['valor_total'];
		$sequencia = 1;

		$sql = "SELECT sequencia 
				FROM lanc_marketing_itens 
				WHERE filial = $filial 
				AND documento = '$documento' 
				ORDER BY sequencia DESC LIMIT 1;";
		$verifica = $pdo->query($sql);
		foreach ($verifica as $dados) $sequencia = ( (int) $dados['sequencia'] ) + 1;

		$sql = "INSERT INTO lanc_marketing_itens
				(
					filial, documento, sequencia, grupo, sub_grupo, item, quantidade, valor_unitario, unidade, valor_base, quantidadeprincipal, valor_total
				) VALUES (
					$filial, '$documento', $sequencia, $grupo, $sub_grupo, $item, $quantidade, $valor_unitario, '$unidade', $valor_venda, $quantidadeprincipal, $valor_total
				)";
		$stmt = $pdo->prepare($sql);
		$stmt->execute();

		$lanc_marketing_itens->set( (int)$filial,			'filial'				 );
		$lanc_marketing_itens->set( $documento,				'documento'				 );
		$lanc_marketing_itens->set( $sequencia,				'sequencia'				 );
		$lanc_marketing_itens->set( $grupo,					'grupo'					 );
		$lanc_marketing_itens->set( $sub_grupo,				'sub_grupo'				 );
		$lanc_marketing_itens->set( $item,					'item'					 );
		$lanc_marketing_itens->set( $quantidade,			'quantidade'			 );
		$lanc_marketing_itens->set( $valor_unitario,		'valor_unitario'		 );
		$lanc_marketing_itens->set( $unidade,				'unidade'				 );
		$lanc_marketing_itens->set( $valor_venda,			'valor_venda'			 );
		$lanc_marketing_itens->set( $quantidadeprincipal,	'quantidadeprincipal'	 );
		$lanc_marketing_itens->set( $valor_total,			'valor_total'			 );

		array_push($arrayRetorno, $lanc_marketing_itens);
	}
	echo toJson($arrayRetorno);
}









function tratarString($texto){
	$texto = str_replace("\\", "\\\\", $texto);
	$texto = str_replace("\"", "\\\"", $texto);
	$texto = str_replace("'", "\\'", $texto);

	$texto = str_replace("=", "", $texto);

	return $texto;
}


?>