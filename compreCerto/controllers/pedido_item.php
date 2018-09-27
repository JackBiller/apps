<?php
/* session_start(); */
require_once "../classe/conexao.php";
require_once "../classe/entidade/Lanc_marketing_itens.php";
require_once "../classe/entidade/Item.php";

$conn = new Conexao();
$pdo = $conn->Connect();

// Informações gerais de login
if (!empty($_POST['listaPedidoItem'])) {
	// Dados recebidos externamente
	$filial = $_POST['filial'];
	$documento = $_POST['documento'];

	// Objeto de Retorno
	$arrayPedidosItem = [];
	$lanc_marketing_itens = new Lanc_marketing_itens();
	$item = new Item();

	// Verificação interna
	$sql = "SELECT
				-- Campos lanc_marketing_itens
				lanc_marketing_itens.sequencia,
				lanc_marketing_itens.sub_grupo,
				lanc_marketing_itens.grupo,
				lanc_marketing_itens.item,
				lanc_marketing_itens.quantidade,
				lanc_marketing_itens.valor_unitario,
				lanc_marketing_itens.valor_total,
				lanc_marketing_itens.valor_desconto,
				lanc_marketing_itens.unidade,

				-- Campos Item
				item.descricao,
				item.unidade_medida,

				-- Campo item_filial
				item_filial.estoque

			FROM lanc_marketing_itens
			INNER JOIN item 
				ON  lanc_marketing_itens.grupo = item.grupo
				AND lanc_marketing_itens.sub_grupo = item.sub_grupo
				AND lanc_marketing_itens.item = item.item
			INNER JOIN item_filial
				ON lanc_marketing_itens.filial = item_filial.filial
				AND lanc_marketing_itens.grupo = item_filial.grupo
				AND lanc_marketing_itens.sub_grupo = item_filial.sub_grupo
				AND lanc_marketing_itens.item = item_filial.item
			WHERE lanc_marketing_itens.documento = '$documento'
			AND lanc_marketing_itens.filial = $filial";

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$item = new Item();
		$item->set((int)$dados['sub_grupo'], 			'sub_grupo');
		$item->set((int)$dados['grupo'], 				'grupo');
		$item->set((int)$dados['item'], 				'item');
		$item->set($dados['descricao'], 				'descricao');
		$item->set($dados['unidade_medida'], 			'unidade_medida');
		$item->set((double)$dados['estoque'], 			'estoque');


		$lanc_marketing_itens = new Lanc_marketing_itens();
		$lanc_marketing_itens->set($filial, 'filial');
		$lanc_marketing_itens->set($documento, 'documento');
		$lanc_marketing_itens->set((int)$dados['sequencia'], 			'sequencia');
		$lanc_marketing_itens->set((int)$dados['sub_grupo'], 			'sub_grupo');
		$lanc_marketing_itens->set((int)$dados['grupo'], 				'grupo');
		$lanc_marketing_itens->set($item, 								'item');
		$lanc_marketing_itens->set((double)$dados['quantidade'], 		'quantidade');
		$lanc_marketing_itens->set((double)$dados['valor_unitario'], 	'valor_unitario');
		$lanc_marketing_itens->set((double)$dados['valor_total'], 		'valor_total');
		$lanc_marketing_itens->set((double)$dados['valor_desconto'], 	'valor_desconto');
		$lanc_marketing_itens->set($dados['unidade'], 					'unidade');
		// $lanc_marketing_itens->set(0, 									'indiceLanc_marketing');

		array_push($arrayPedidosItem, $lanc_marketing_itens);
	}

	// Retorno	
	echo toJson($arrayPedidosItem);
}




if (!empty($_POST['deletarItemPedido'])) {
	$id = $_POST['id'];
	$filial = $_POST['filial'];
	$documento = $_POST['documento'];
	$valor = $_POST['valor'];

	/* Atualizar valor pedido */
	$sql = "UPDATE lanc_marketing 
			SET total = total - $valor
			WHERE documento = '$documento' 
			AND filial = $filial";

	$stmt = $pdo->prepare($sql);
	$stmt->execute();


	/* Apagar item */
	$sql = "DELETE FROM lanc_marketing_itens 
			WHERE sequencia = $id
			AND documento = '$documento' 
			AND filial = $filial";

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

















