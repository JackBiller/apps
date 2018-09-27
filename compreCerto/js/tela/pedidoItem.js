



function retornaTelaPedidoItem(){
	var conteudo = "";

	/* Dados Pedido Item */
	conteudo += 	"<div id='conteudoPedidoItem' name='telaGeralAddPedido' class='hidden'>";
	conteudo += 		retornaCabecarioPedido();
	conteudo +=		"<table class='table' style='margin-top:-15px'>";
	conteudo += 		"<tr>";
	conteudo += 			"<td colspan='2' style='text-align:center;padding-bottom:0px;'>";
	conteudo += 				"<h4 style='margin-bottom:0px;'>Produtos</h4> <br>";
	conteudo += 			"</td>";
	conteudo += 		"</tr>";
	// conteudo += 		"<tr>";
	conteudo += 	"</table>";
	conteudo += 		"<div id='conteudoItensPedidoExclusivo'>";
	conteudo += 			"<h3 class='text-center'>Nenhum Item no Pedido</h3>";
	conteudo += 		"</div>";
	conteudo += 	"</div>";

	return conteudo;
}