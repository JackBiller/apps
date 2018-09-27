


function retronaTelaEntrega(){
	var arrayCamposParametro = "['enderecoCliente','numeroCliente','bairroCliente','cidadeCliente','estadoCliente','cepCliente']";
	var conteudo = "";

	/* Local de Entrega */
	conteudo += 	"<div id='conteudoPedidoEntrega' name='telaGeralAddPedido' class='hidden'>";
	conteudo += 		retornaCabecarioPedido();


	conteudo +=			"<table class='table' style='margin-top:-15px'>";
	conteudo += 			"<tr>";
	conteudo += 				"<td colspan='2' style='text-align:center;padding-bottom:0px;'>";
	conteudo += 					"<div class='col-xs-12'>";
	conteudo += 						"<div class='text-left col-xs-4' style='font-size: 25px;' id='esquerdaEndereco'>";
	conteudo += 						"</div>";
	conteudo += 						"<div class='text-center col-xs-4'>";
	conteudo += 							"<h4 style='margin-bottom:0px;'>Local Entrega</h4> <br>";
	conteudo += 						"</div>";
	conteudo += 						"<div class='text-right col-xs-4' style='font-size: 25px;' id='diretaEndereco'>";
	conteudo += 						"</div>";
	conteudo +=							"<br><br>";
	conteudo += 						"<div class='text-center col-xs-12 hidden' style='font-size: 20px;' id='indicePagEndereco'>";
	conteudo += 						"</div>";
	conteudo += 					"</div>";
	conteudo += 				"</td>";
	conteudo += 			"</tr>";
	conteudo +=			"</table>";

	conteudo +=			"<div class='col-sm-6'></div>";
	conteudo +=			"<div class='col-sm-6'>";
	conteudo +=				"Cep";
	conteudo +=				"<input type='text' class='form-control'rel=cep id='cepCliente' onkeyup=\"buscarCep(this.value,"+arrayCamposParametro+")\">";
	conteudo +=			"</div>";

	conteudo +=			"<div class='col-sm-8'>";
	conteudo +=				"Endereço";
	conteudo +=				"<input type='text' class='form-control' id='enderecoCliente'>";
	conteudo +=			"</div>";

	conteudo +=			"<div class='col-sm-4'>";
	conteudo +=				"Número";
	conteudo +=				"<input type='tel' class='form-control' id='numeroCliente'>";
	conteudo +=			"</div>";

	conteudo += 		"<div class='col-sm-6'>";
	conteudo += 			"Bairro";
	conteudo +=				"<input type='text' class='form-control' id='bairroCliente'>";
	conteudo += 		"</div>";

	conteudo += 		"<div class='col-sm-6'>";
	conteudo += 			"Cidade";
	conteudo +=				"<input type='text' class='form-control' id='cidadeCliente'>";
	conteudo += 		"</div>";

	conteudo += 		"<div class='col-sm-9'></div>";
	conteudo += 		"<div class='col-sm-3'>";
	conteudo += 			"Estado";
	conteudo +=				"<input type='text' class='form-control' id='estadoCliente'>";
	conteudo += 		"</div>";

	conteudo += 	"</div>";

	return conteudo;
}