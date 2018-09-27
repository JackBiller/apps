

function retronaTelaPedido(){
	var conteudo = "";

	/* Dados Pedido */
	conteudo += 	"<div id='conteudoPedido' name='telaGeralAddPedido'>";
	conteudo += 		retornaCabecarioPedido();


	/* Dados Cliente */
	conteudo +=		"<table class='table' style='margin-top:-15px'>";
	conteudo += 		"<tr>";
	conteudo += 			"<td colspan='2' style='text-align:center;padding-bottom:0px;'>";
	conteudo += 				"<h4 style='margin-bottom:0px;'>Cliente</h4> <br>";
	conteudo += 			"</td>";
	conteudo += 		"</tr>";
	// conteudo += 		"<tr>";
	conteudo += 	"</table>";
	conteudo +=			"<div class='col-xs-12'>";
	// conteudo += 			"<div class='col-xs-6 col-sm-8'></div>";
	conteudo +=				"<div class='col-xs-12 col-sm-12'>";
	conteudo += 				"Codigo";
	conteudo += 				"<input class='form-control hidden' type='text' id='codigoCliente' onkeyup=\"mudarCliente(this.value)\">";
	conteudo += 				"<div id='clienteComboDatalist'></div>";
	conteudo += 			"</div>";
	conteudo += 		"</div>";
	conteudo += 		"<br><br>";
	// conteudo += 			"<div class='col-xs-11 col-sm-1'></div>";
	/*conteudo += 		"<div class='col-xs-12'>";
	conteudo += 			"Cliente sem cadastro (Nome)";
	conteudo += 		"</div>";*/
	conteudo += 		"<div class='col-xs-12'>";
	conteudo += 			"Nome";
	conteudo += 			"<input type='text' class='form-control' id='clienteSemRegistro' onkeyup='setarSemRegistro(this.value)'>";
	conteudo += 		"</div>";
	conteudo += 		"<div class='hidden col-xs-12'>";
	conteudo += 			"Cliente selecionado";
	conteudo += 			"<input type='text' class='form-control' id='clienteSelecionado' disabled>";
	conteudo += 		"</div>";
	conteudo += 		"<div class='col-sm-6'>";
	conteudo += 			"Telefone";
	conteudo += 			"<input class='form-control' type='tel' id='telefoneCliente'>";
	conteudo += 		"</div>";
	// conteudo += 		"</tr>";
	conteudo += 	"</div>";

	return conteudo;
}