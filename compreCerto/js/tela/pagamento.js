
function retornaTelaPagamento(){
	var conteudo = "";

	conteudo += 	"<div id='conteudoPedidoPagamento' name='telaGeralAddPedido' class='hidden'>";
	conteudo += 		retornaCabecarioPedido();
	conteudo +=		"<table class='table' style='margin-top:-15px'>";
	conteudo += 		"<tr>";
	conteudo += 			"<td colspan='2' style='text-align:center;padding-bottom:0px;'>";
	conteudo += 				"<h4 style='margin-bottom:0px;'>Condições de Pagamento</h4> <br>";
	conteudo += 			"</td>";
	conteudo += 		"</tr>";
	// conteudo += 		"<tr>";
	conteudo += 	"</table>";

	conteudo += 		"<div class='col-xs-12'>";
	// conteudo += 			"Condições de Pagamento";
	conteudo += 			"<div id='condPagamaentoDiv'></div>";
	conteudo += 		"</div>";

	conteudo += 	"</div>";

	return conteudo;
}