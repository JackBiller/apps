
function mostrarPedidoItem(){
	document.getElementById("conteudoPedidoItem").className = "";
	document.getElementById("conteudoPedido").className = "hidden";

	document.getElementById("linkViewPedido").className = "";
	document.getElementById("linkViewPedidoItem").className = "active";
}


var arrayIdLancPedidosItens = [];

function montarViewAdicionaMesa(id, descricao){
	subirPagina();
	var motarSubMenu = "";
	var resultado = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ClienteWs/listar/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		botaVoltarMenuPrincipal();

		if (data.length == 0) {
			motarSubMenu += "<br>Não tem nenhum registro de Cliente no Servidor!";
		} else {
			resultado = data;

			motarSubMenu += "<br><br><form id='formAdicionaPedido'>";
			motarSubMenu += "<div class='col-md-12'>";
			motarSubMenu += "<table class='table' width='100%'>";

			motarSubMenu += "<tr><td colspan='3'  onclick='document.getElementById(\"checkboxConsumidor\").click();'>";

			motarSubMenu += "<input type='hidden' value='0' id='selectConsumidorBootBox'>";

			motarSubMenu += "<div id='divCheckConsumidor'>";
			
			// motarSubMenu += "<table><tr><td>";
			motarSubMenu += "<h4>Consumidor: <span id='situacaoConsumidor'></span>";
			// motarSubMenu += "</td><td>";
			motarSubMenu += "<input class='hidden' type='checkbox' style='font-size:100px;' id='checkboxConsumidor' onclick='confereCheckConsumidor();'>";
			// motarSubMenu += "</td></tr></table>";
			motarSubMenu += "</h4>";

			motarSubMenu += "</div>";


			motarSubMenu += "</td></tr>";

			motarSubMenu += "<tr><td colspan='3'>";

			motarSubMenu += "<h4>Cliente</h4>";

			motarSubMenu += "<div id='inputCampoClienteData'>";

			motarSubMenu += "<input type='text' id='clienteInputList'";
			motarSubMenu += "class='flexdatalist form-control'";
			motarSubMenu += "data-min-length='0' data-visible-properties='[\"razaoSocial\"]'";
			motarSubMenu += "data-selection-required='true' data-value-property='codigo'";
			motarSubMenu += "list='clienteDataList' required>";

			motarSubMenu += "</div>";

			motarSubMenu += "</td></tr>";


			// motarSubMenu += "<tr><td colspan='1'>";
			// if ($("#fichaPesquisa").val() == 0) {
			// 	motarSubMenu += "<h4>Mesa</h4>";
			// 	motarSubMenu += "<input type='number' id='mesa' maxlength='6' class='form-control'>";
			// } else {
				// var numeroPesquisadoFicha = $("#mesaPesquisa").val();
			
			// }

			// motarSubMenu += "<tr>";
			motarSubMenu += "<td>";
			// motarSubMenu += "<h4>Emissão</h4>";
			// var dataAtual = pegarData();
			// motarSubMenu += "<input type='date' id='emissao' value='"+dataAtual+"' class='form-control' disabled>";
			motarSubMenu += "<h4>Mesa</h4>";
			motarSubMenu += "<input type='text' value='"+descricao+"' id='mesa' maxlength='6' class='form-control' disabled>";

			motarSubMenu += "</td>";

			motarSubMenu += "<td>";
			motarSubMenu += "&nbsp;&nbsp;&nbsp;&nbsp;";
			motarSubMenu += "</td><td>";

			motarSubMenu += "<h4>Total</h4>";
			motarSubMenu += "<input type='text' style='text-align: right;' id='totalPedido' rel='dinheiro' value='R$ 0,00' class='form-control' disabled>";

			motarSubMenu += "</td></tr></table><br><br>";

			motarSubMenu += "</div>";
			motarSubMenu += "</form>";
			motarSubMenu += "<table class='table'><tr>";
			motarSubMenu += "<td align='left' style='padding-top:1px;padding-bottom:1px;'>";

			// motarSubMenu += "<button class='btn btn-warning btn-block' ";
			// motarSubMenu += "data-toggle='modal' data-target='#modalFichaPedido' onclick='setStatus(\"ficha1\")'>";
			// motarSubMenu += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
			// motarSubMenu += "Ficha";
			// motarSubMenu += "</button>";

			motarSubMenu += "</td></tr></table>";

			if ($("#editar").val() == 0) {

				var montarListaPedido = "<div id='botaoAdicionarPedidoUmaVez' class='text-center'>";
				montarListaPedido += "<button id='buttonAdicionaPedido' class='btn btn-success btn-block' onclick='adicionaPedido("+id+")'>";
				montarListaPedido += "<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;";
				montarListaPedido += "Ocupar Mesa";
				montarListaPedido += "</button>";
				montarListaPedido += "</div>";

			} else {
				var montarListaPedido = "";
				var lancPedidoId = $("#editar").val();
				montarListaItem(lancPedidoId);
			}
		}

		$("#cabecarioPrincipal").html(motarSubMenu);
		$("#listaPagina").html(montarListaPedido+"<br><br><br>");
		setarValorClienteInputList(resultado);
		document.getElementById("checkboxConsumidor").click();
	});
}

function confereCheckConsumidor(){
	var check = document.getElementById("checkboxConsumidor").checked;
	if (check) {
		document.getElementById("clienteInputList-flexdatalist").disabled = true;
		document.getElementById("clienteInputList-flexdatalist").value = "CONSUMIDOR";
		$("#situacaoConsumidor").html("Sim");
	} else {
		document.getElementById("clienteInputList-flexdatalist").value = "";
		document.getElementById("clienteInputList-flexdatalist").disabled = false;
		$("#clienteInputList-flexdatalist").focus();
		$("#situacaoConsumidor").html("Não");
	}
}


function setarValorClienteInputList(elJSON){
	$('#clienteInputList').flexdatalist({
		selectionRequired: true,
		valueProperty: 'codigo',
		searchIn: 'razaoSocial',
		minLength: 1,
		data: elJSON
	});
}




function adicionaPedido(id){
	var carregando = "<h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>";
	$("#botaoAdicionarPedidoUmaVez").html(carregando);

	var nome = $("#clienteInputList").val();
	var selectConsumidorBootBox = $("#selectConsumidorBootBox").val();
	var valido = false;
	var clienteId = "";

	if (selectConsumidorBootBox == 1) {
		clienteId = "10003";
	} else {
		var check = document.getElementById("checkboxConsumidor").checked;
		if (!check) {
			if (nome != "") {
				clienteId = nome;
				document.getElementById("clienteInputList-flexdatalist").disabled = true;
			} else {
				clienteId = "0";
			}
		} else {
			clienteId = "10003";
		}
	}

	var mesa = id;
	
	if (mesa != "") {
		valido = true;
	}

	if (valido && clienteId != "0") {
		var emissao = pegarData();

		var filial = $("#filial").val();
		var total = $("#totalPedido").val();
		var vendedor = $("#vendedor").val();

		total = total.replace("R$", "");
		total = total.replace(",", ".");
		total = parseFloat(total);

		vendedor = parseInt(vendedor);

		var identificacao = $("#identificador").val();
		var flagImpressao = 0;

		$.ajax({
			type: 'GET',
			url: urlWebService+"MesaWs/verificaMesa/"+mesa+"/"+filial+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			if (data == "1") {
			// Codigo para adicionar pedido
				var user = { 
						"filial": filial, 
						"codigo": mesa, 
						"emissao": emissao, 
						"total": total, 
						"cliente": clienteId, 
						"identificacao": identificacao, 
						"condPagamento": flagImpressao,
						"vendedor": vendedor
					};
				$.ajax({
					type: 'POST',
					cache: false,
					url: urlWebService+"MesaWs/inserir",
					dataType: "text",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(user)
				}).done( function(data){
					// console.log("data: "+data);
					if (data == "0") {
						toastGeral("error", "Erro ao ocupar mesa!");
					} else {
						editarId(data);
						montarListaItem(data);
						dataDaVezRodando = pegarData();
					}
				});
			} else {
				editarId(data);
				montarListaItem(data);
				dataDaVezRodando = pegarData();
			}
		});
	} else {
		toastGeral("error", "Verifique se todos os dados foram preenchidos!");
	}
}


function montarListaItem(documento){
	var filial = $("#filial").val();
	var motarSubMenu = "";
	var valorTotalPedido = 0;
	var documentoGeral = "";
	var emissaoItem = 0;
	var codigoMesa = 0;

	// Monta cabeçario do pedido
	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listarPedidoId/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		for(i in data){
			documentoGeral = documento;//data[i].documento;
			codigoMesa = data[i].codigo;

			valorTotalPedido = data[i].total;
			valorTotalPedido = formataValorParaImprimir(valorTotalPedido);

			botaVoltarMenuPrincipal();

			motarSubMenu += "<br><br><div class='col-md-12'>";
			motarSubMenu += "<table><tr>";				

			motarSubMenu += "<td colspan='1'>";

			motarSubMenu += "<h2><span id='descricaoMesaPedido'></span></h2>";

			// motarSubMenu += "<h4>Documento</h4>";
			// motarSubMenu += "<input type='text' id='documentoInputList' value='"+data[i].documento+"' class='form-control' disabled>";

			motarSubMenu += "</td><td colspan='1'>";

			motarSubMenu += "<button class='btn btn-block btn-primary' onclick='montarListaItem(\""+documento+"\")'>Atualizar</button>";

			motarSubMenu += "</td></tr><tr><td>";



			emissaoItem = data[i].emissao;
			emissaoItem = emissaoItem.replace(" 00:00:00.0", "");
			emissaoItem = formatarData(emissaoItem);
			motarSubMenu += "<h4>Emissão</h4>";
			motarSubMenu += "<input type='text' id='emissaoInputList' value='"+emissaoItem+"' class='form-control' disabled>";

			
			motarSubMenu += "</td><td>";
			// motarSubMenu += "&nbsp;&nbsp;&nbsp;&nbsp;";
			// motarSubMenu += "</td><td>";


			motarSubMenu += "<h4>Valor Total</h4>";
			motarSubMenu += "<input type='text' style='text-align: right;' id='valorTotalPedidoInputList' value='"+valorTotalPedido+"' class='form-control' disabled>";

			motarSubMenu += "</td></tr><tr>";

			motarSubMenu += "<td colspan='2'>";

			motarSubMenu += "<h4>Cliente</h4>";
			motarSubMenu += "<input type='text' id='clienteInputList' value='"+data[i].razaoSocial+"' class='form-control' disabled>";
			
			motarSubMenu += "</td>";
			// motarSubMenu += "<td>";
			// motarSubMenu += "&nbsp;&nbsp;&nbsp;&nbsp;";
			// motarSubMenu += "</td><td>";

			// motarSubMenu += "<h4>Ficha</h4>";
			// motarSubMenu += "<input type='text' id='fichaInputList' value='"+data[i].ficha+"' class='form-control' disabled>";

			// motarSubMenu += "</td>";

			motarSubMenu += "</tr><tr><td colspan='2'>";

			

			motarSubMenu += "</td></tr><tr>";

			motarSubMenu += "</tr></table><br>";
			motarSubMenu += "</div>";
			// motarSubMenu += "<br><hr>";
		}
		$("#cabecarioPrincipal").html(motarSubMenu);
		setarDescricaoMesa(codigoMesa);
		$("#documentoGeral").val(documentoGeral);
	});

	
	// Pega os itens que estão no pedido
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarLancPedidoItem/"+filial+"/"+documento+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		var idLancPedidoItem = 0;
		var valorTotalItem = 0;
		var valorQuantidade = 0;
		var valorTotalItemU = 0;
		var valorUnitarioItemU = 0;
		var numRegistrosItens = 0;
		var desabilita = "";
		var desabilitaExcluir = "";

		var montarListaItens = "<h2 class='text-center'>";
		montarListaItens += "<table class='table'><tr><td align='left'>";
		montarListaItens += "Itens";
		montarListaItens += "</td><td align='right'>";
		montarListaItens += "<button class='btn btn-info' onclick='imprimirTodos();'>";
		montarListaItens += "<i class='fa fa-print' aria-hidden='true'></i>&nbsp;";
		montarListaItens += "Imprimir Todos";
		montarListaItens += "</button>";
		montarListaItens += "&nbsp;&nbsp;";
		montarListaItens += "<button class='btn btn-success' onclick='setStatus(\"pagina3\");montarViewAdicionaItem(document.getElementById(\"descricaoMesaPedido\").innerHTML);'>";
		montarListaItens += "<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;";
		montarListaItens += "Adicionar Item";
		montarListaItens += "</button>";
		montarListaItens += "</td></tr></table>";
		montarListaItens += "</h2>";

		if (data.length == 0) {
			montarListaItens += "<br>";
			montarListaItens += "<div class='text-center'>";
			montarListaItens += 	"<h3>Nenhum item a este pedido foi encontrado!</h3><br>";
			montarListaItens += 	"<button class='btn btn-info ' onclick='desocuparMesa(\""+documento+"\");'>";
			montarListaItens += 		"<!--i class='fa fa-plus' aria-hidden='true'></i-->&nbsp;";
			montarListaItens += 		"Desocupar Mesa";
			montarListaItens += 	"</button>";
			montarListaItens += "</div>";

		} else {
			montarListaItens += "<table class='table'><tr>";

			montarListaItens += "<td align='left'></td>";
			montarListaItens += "<td align='left'>Item</td>";
			montarListaItens += "<td align='left'>Qtd</td>";
			montarListaItens += "<td align='left'>Valor</td>";
			montarListaItens += "<td align='left'>Total</td>";
			montarListaItens += "<td></td>";
			montarListaItens += "<td></td>";

			arrayIdLancPedidosItens = [];
			for(i in data){

				if (data[i].flagImpressao == 1) { desabilita = "style='background-color: #5cb85c;' disabled"; desabilitaExcluir = "disabled" }
				else { desabilita = "style='background-color: #d9534f;'"; desabilitaExcluir = "" }

				numRegistrosItens++;
				idLancPedidoItem = data[i].idLancPedido;
				arrayIdLancPedidosItens.push(idLancPedidoItem);

				valorTotalItemU = data[i].valorTotal;
				valorTotalItemU = formataValorParaImprimir(valorTotalItemU);

				valorUnitarioItemU = data[i].valorUnitario;
				valorUnitarioItemU = formataValorParaImprimir(valorUnitarioItemU);

				valorQuantidade = data[i].quantidade;
				valorQuantidade = formatarValorParaDecimal(valorQuantidade);

				// acumula valor total
				valorTotalItem += data[i].valorTotal;

				// monta linha com a informação do item
				montarListaItens += "<tr id='linhaItem"+documento+"_"+data[i].sequencia+"'>";

				montarListaItens += "<td align='left'>"+numRegistrosItens+"</td>"
				montarListaItens += "<td align='left'>";
				montarListaItens += 	"<span id='imprimirPedido_"+idLancPedidoItem+"'>" +data[i].itemNome+"</span>";
				montarListaItens += 	"<span style='color: red ' id='spanDescExcecao_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: blue' id='spanDescPreparo_"  +idLancPedidoItem+"'></span>";
				montarListaItens += 	"<span style='color: #2a2' id='spanDescAdicional_"+idLancPedidoItem+"'></span>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].item+"' id='codigoItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += 	"<input type='hidden' value='"+data[i].sequencia+"' id='sequenciaItemLanc_"+idLancPedidoItem+"'>";
				montarListaItens += "</td>";
				montarListaItens += "<td align='left'>"
				montarListaItens += 	"<div id='imprimirPedidoQtd_"+data[i].idLancPedido+"'>";
				montarListaItens += 		valorQuantidade
				montarListaItens += 	"</div>"
				montarListaItens += "</td>";

				montarListaItens += "<td align='left'>"+valorUnitarioItemU+"</td>";
				montarListaItens += "<td align='left'>"+valorTotalItemU+"</td>";
				
				montarListaItens += "<td>";
				montarListaItens += "<button class='btn' style='color:red;' id='excluirItemLanc_"+idLancPedidoItem+"' ";
				montarListaItens += "onclick='excluirItemPedido("+data[i].sequencia+",\""+documento+"\","+data[i].valorTotal+")' ";
				montarListaItens += desabilita+">";
				montarListaItens += "<i class='fa fa-times' aria-hidden='true'></i>";
				montarListaItens += "</button>";
				montarListaItens += "</td>";

				montarListaItens += "<td>";
				montarListaItens += "<button class='btn botoesTelaPedidoImprimir' id='imprimirItemLanc_"+idLancPedidoItem+"' ";
				montarListaItens += 	"onclick='imprimirPedido("+data[i].idLancPedido+")' ";
				montarListaItens += desabilita+">";
				montarListaItens += "<i class='fa fa-print' aria-hidden='true'></i>";
				montarListaItens += "</button>";
				montarListaItens += "</td>";

				/*montarListaItens += "</td>";montarListaItens += "<td>";
				montarListaItens += "<button class='btn' style='color:blue;' ";
				montarListaItens += 	"onclick='exibirItemPedido("+data[i].idLancPedido+","+data[i].item+",\""+data[i].itemNome+"\")' ";
				montarListaItens += 	"data-toggle='modal' data-target='#modalVisualizarExcao'";
				montarListaItens += ">";
				montarListaItens += "<i class='fa fa-eye' aria-hidden='true'></i>";
				montarListaItens += "</button>";
				montarListaItens += "</td>";*/
				montarListaItens += "</tr>";

			}

			valorTotalItem = formataValorParaImprimir(valorTotalItem);
			montarListaItens += "<tr><td colspan='4'></td>";
			montarListaItens += "<td align='left'>";
			montarListaItens += "<span id='valorTotalPedidoSpan'>"+valorTotalItem+"</span>";
			montarListaItens += "</td>";
			montarListaItens += "<td></td>";
			montarListaItens += "</tr>";

			montarListaItens += "</table>";
		}
		numRegistrosItens++;
		$("#listaPagina").html(montarListaItens+"<br><br><br>");

		if (arrayIdLancPedidosItens.length == data.length) {
			montarComplementoItem();
		}

		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/retornaSeguencia/"+filial+"/"+documento+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			var sequenciaReal = parseInt(data) + 1;
			$("#sequencia").val(sequenciaReal);
		});
	});
}


function imprimirTodos(){
	for(var i = 0; i < arrayIdLancPedidosItens.length; i++){
		if (!document.getElementById("imprimirItemLanc_"+arrayIdLancPedidosItens[i]).disabled) {
			imprimirPedido(arrayIdLancPedidosItens[i]);
		}
	}
}


function imprimirPedido(id){
	var qtd = document.getElementById("imprimirPedidoQtd_"+id).innerHTML;
	qtd = parseInt(qtd);
	var impressao = document.getElementById("imprimirPedido_"+id).innerHTML;
	impressao += document.getElementById("spanDescExcecao_"+id).innerHTML;
	impressao += document.getElementById("spanDescPreparo_"+id).innerHTML;
	impressao += document.getElementById("spanDescAdicional_"+id).innerHTML;

	var filial = $("#filial").val();
	var documento = $("#documentoGeral").val();
	var sequenciaItem = document.getElementById("sequenciaItemLanc_"+id).value
	var item = document.getElementById("codigoItemLanc_"+id).value;
	var user = $("#identificador").val();
	var ultima_atualizacao = new Date();

	var dataAtual = pegarData();
	var hora = ultima_atualizacao.getHours()+":"+ultima_atualizacao.getMinutes()+":"+ultima_atualizacao.getSeconds();

	var lancPedidoItemImpressaoObject = { 
			"idLancPedido": id,
			"filial": filial, 
			"documento": documento, 
			"sequencia": sequenciaItem,
			"item": item,
			"quantidade": qtd,
			"unidadeMedida": impressao,
			"adicionalProduto": user,
			"itemNome": dataAtual,
			"horaComplemento": hora
		};
	// console.log("lancPedidoItemImpressaoObject");
	// console.log(lancPedidoItemImpressaoObject);
	$.ajax({
		type: 'POST',
		cache: false,
		url: urlWebService+"ItemWs/inserirImpressao",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(lancPedidoItemImpressaoObject)
	}).done( function(data){
		// console.log(data);
		if (data != "0") {
			toastGeral("info", "Solicitação de Impressão mandada com sucesso!");

			document.getElementById("excluirItemLanc_"+id).disabled = true;
			document.getElementById("imprimirItemLanc_"+id).disabled = true;
			document.getElementById("imprimirItemLanc_"+id).style.backgroundColor = "#5cb85c";
		} else {
			toastGeral("error", "Erro ao solicitar Impressão!");
		}
	});


	/*$.ajax({
		url:'http://'+hostServeImage+'/panquecasCDI/dompdf_gerar/index.php',
		type: 'POST',
		dataType: 'html',
		data: {
			'id_lanc_item': id,
			'texto': 	  	impressao,
			'qtd':  		qtd
		}
	}).done( function(data){
		console.log(data);
		if (data == "1" || data == 1) {
			toastGeral("info", "Pdf gerado com sucesso!");
		} else {
			toastGeral("error", "Erro ao gerar PDF!");
		}
	});

	var pagina = document.body.innerHTML;
	
	// document.body.innerHTML = "http://"+hostServeImage+"/panquecasCDI/pedidos/"+id+".php";

	// document.body.innerHTML = pagina;*/
}


function exibirItemPedido(id, item, nomeItem){
	var tabelaOperacao = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensComposicao/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaOperacao = "<br>Nenhum item na composição desse item!";
		} else {
			tabelaOperacao += "<h2>Composição: "+nomeItem+"</h2>";
			tabelaOperacao += "<table class='table'>";
			tabelaOperacao += "<tr>";
			tabelaOperacao += "<td>Descricao</td>";
			tabelaOperacao += "<td>Condição</td>";
			tabelaOperacao += "</tr>";

			for(i in data){
				itensComposicaoArray.push(data[i].item);
				tabelaOperacao += "<tr id='linhaComposicaoV_"+data[i].item+"' bgcolor='#5cb85c'>";

				tabelaOperacao += "<td>";
				tabelaOperacao += 	data[i].descricao;
				tabelaOperacao += 	"<input class='hidden' type='checkbox' id='inputComposicaoV_"+data[i].item+"' checked>";
				tabelaOperacao += "</td>";
				tabelaOperacao += "<td>";
				tabelaOperacao += 	"<span id='spanComposicaoV_"+data[i].item+"'>";
				tabelaOperacao += 		"<i class='fa fa-check' aria-hidden='true'></i>";
				tabelaOperacao += 	"</span>";
				tabelaOperacao += "</td>";

				tabelaOperacao += "</tr>";
			}
		}
		$("#conteudoComposicaoModalVisualizarExcao").html(tabelaOperacao);

		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarItensComposicaoExcecao/"+id+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			for(i in data){
				document.getElementById("inputComposicaoV_"+data[i].item).checked = false;
				document.getElementById("linhaComposicaoV_"+data[i].item).style.backgroundColor = "#d9534f";
				document.getElementById("spanComposicaoV_"+data[i].item).innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
			}
		});
	});
}



function setarDescricaoMesa(codigoMesa){
	$.ajax({
		type: 'GET',
		url: urlWebService+"MesaWs/listarMesaId/"+codigoMesa+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		for(i in data){
			$("#descricaoMesaPedido").html(data[i].descricao);
		}
	});
}


function montarComplementoItem(){
	var spanDescExcecao_ = "";
	var spanDescPreparo_ = "";
	var spanDescAdicional_ = "";
	var idDaVez = 0;

	for(var i = 0; i < arrayIdLancPedidosItens.length; i++){
		idDaVez = arrayIdLancPedidosItens[i];
		// console.log("arrayIdLancPedidosItens["+i+"]: "+arrayIdLancPedidosItens[i]);
		// chamar composição
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemExecao/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			dataType: 'html',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data1){
			if (data1 != "") {
				data1 = data1.split("+");
				if (data1[0] != null && data1[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Exceção: "+data1[0], "Excecao", data1[1]);
				}
			}
		});

		// chamar preparo
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemPreparo/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			dataType: 'html',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data2){
			if (data2 != "") {
				data2 = data2.split("+");
				if (data2[0] != null && data2[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Preparo: "+data2[0], "Preparo", data2[1]);
				}
			}
		});

		// chamar adicional
		$.ajax({
			type: 'GET',
			url: urlWebService+"ItemWs/listarLancPedidoItemAdicional/"+arrayIdLancPedidosItens[i]+parametrosWebService,
			contentType: "application/json",
			dataType: 'text',
			jsonpCallback: "localJsonpCallback"
		}).done( function(data3){
			if (data3 != "") {
				data3 = data3.split("+");
				if (data3[0] != null && data3[0] != "null") {
					jogarValoresNoSpanComplementoItem("<br>Adicional: "+data3[0], "Adicional", data3[1]);
				}
			}
		});
	}
}

function jogarValoresNoSpanComplementoItem(texto, tipo, id){
	document.getElementById("spanDesc"+tipo+"_"+id).innerHTML = texto;
}


function desocuparMesa(documento){
	var filial = $("#filial").val();

	documento = "000000"+documento;
	documento = documento.substring(documento.length - 6, documento.length);
	// console.log("documento: "+documento);

	bootbox.confirm({
		title: "Tem certeza que deseja desocupar mesa?",
		message: "Ao aperta o botão \"Sim\" você irá remover o pedido atribuido a essa mesa!",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					type: 'GET',
					url: urlWebService+"MesaWs/remover/"+filial+"/"+documento+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ });

				// Voltar para Pagina Principal
				setStatus("inicial");
				n_editar();
				montarMenuPrincipal();

				// Mesagem de feedBack
				toastGeral("info", "A mesa foi desocupada com sucesso!");
			}
		}
	});
	
}


function excluirItemPedido(sequencia, documento, valor){
	// console.log("documento: "+documento);
	var filial = $("#filial").val();
	documento = "000000"+documento;
	documento = documento.substring(documento.length - 6, documento.length);
	// console.log("documento: "+documento);

	bootbox.confirm({
		title: "Tem certeza que deseja remover este item do pedido?",
		message: "Ao aperta o botão \"Sim\" você irá remover este item do pedido por completo do sistema",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				// console.log("url: "+urlWebService+"ItemWs/atualizaValorPedido/"+filial+"/"+documento+"/"+valor+parametrosWebService);
				// console.log("url: "+urlWebService+"ItemWs/remover/"+filial+"/"+documento+"/"+sequencia+parametrosWebService);
				$.ajax({
					type: 'GET',
					url: urlWebService+"ItemWs/atualizaValorPedido/"+filial+"/"+documento+"/"+valor+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				// remover item do pedido
				$.ajax({
					type: 'GET',
					url: urlWebService+"ItemWs/remover/"+filial+"/"+documento+"/"+sequencia+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				toastGeral("info", "Item removido com sucesso!");

				$("#linhaItem"+documento+"_"+sequencia).remove();
				var valorTotalAtualiza = $("#valorTotalPedidoInputList").val();
				valorTotalAtualiza = formataValorParaCalcular2(valorTotalAtualiza);
				valorTotalAtualiza = parseFloat(valorTotalAtualiza) - parseFloat(valor);
				valorTotalAtualiza = formataValorParaImprimir(valorTotalAtualiza);

				// console.log(valorTotalAtualiza+" - "+valor+" = "+valorTotalAtualiza)

				$("#valorTotalPedidoInputList").val(valorTotalAtualiza);
				$("#valorTotalPedidoSpan").html(valorTotalAtualiza);
			}
		}
	});
}




function finalizarPedido(id){
	var valorTotal = $("#valorTotalPedidoInputList").val();
	valorTotal = formataValorParaCalcular2(valorTotal);

	if (valorTotal <= 0) {
		toastGeral("error", "Pedido com valor zerado não pode ser finalizado!");
	} else {
		bootbox.confirm({
			title: "Tem certeza que deseja finalizar este pedido?",
			message: "Ao aperta o botão \"Sim\" você não poderá excluir e nem editar este pedido!",
			buttons: {
				confirm: {
					label: 'Sim',
					className: 'btn-success'
				},
				cancel: {
					label: 'Não',
					className: 'btn-danger'
				}
			},
			callback: function (result) {
				if (result) {
					n_editar();
					// finaliza pedido
					$.ajax({
						type: 'GET',
						url: urlWebService+"PedidoWS/finalizar/"+id+parametrosWebService,
						contentType: "application/json",
						jsonpCallback: "localJsonpCallback"
					}).done( function(data){ console.log("data:"+data); });

					toastGeral("success", "Pedido foi finalizado com sucesso!");
					var dataDoPedido = $("#emissaoInputList").val();
					montarMenuPrincipal();
				}
			}
		});
	}
}