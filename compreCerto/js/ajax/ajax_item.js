var itensComposicaoArray = [];
var itensPreparoArray = [];
var itensAdicionalArray = [];

function montarViewAdicionaItem(mesa){
	subirPagina();
	var motarSubMenu = "";
	var complementoMotarSubMenu = "";
	var lancPedidoId = $("#documentoGeral").val();
	var controleDeLinha = -1;
	var controleDeLinhaContanti = 5;
	var contRegistro = 0;

	$.ajax({
		type: 'GET',
		url: urlWebService+"GrupoWs/listar/"+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		setStatus('pagina3');
		if (data.length == 0) {
			motarSubMenu += "<br>Não tem nenhum registro de Cliente no Servidor!";
		} else {
			botaoVoltarPedido(lancPedidoId);
			
			motarSubMenu += "<br>";
			motarSubMenu += "<h2>"+mesa+"</h2>";
			motarSubMenu += "<table class='table'><tr>";
			motarSubMenu += "<td align='left' style='padding-top:1px;padding-bottom:1px;'>";
			motarSubMenu += "</td></tr></table>";

			motarSubMenu += "<div class='col-md-12'>";
			motarSubMenu += "<div id='listaItensPorGrupo'></div>";
			motarSubMenu += "<br>";
			motarSubMenu += "<button class='btn btn-block btn-info' onclick='montarListaItensTodos()'>";
			motarSubMenu += "Todos Itens";
			motarSubMenu += "</button>";
			motarSubMenu += "<br>";
			// motarSubMenu += "</div>";
			// motarSubMenu += "<table>";

			for(i in data){
				if (controleDeLinha == -1) {
					// motarSubMenu += "<tr>";
					controleDeLinha++;
				} else if (controleDeLinha >= controleDeLinhaContanti) {
					// motarSubMenu += "</tr><tr>";
					controleDeLinha = 0;
				}
				motarSubMenu += "<div  class='col-xs-3 text-center'";
				motarSubMenu += 	"onclick='montarViewSubGrupo("+data[i].grupoItem+", \""+data[i].descricao+"\")' ";
				motarSubMenu += 	"data-toggle='modal' data-target='#modalViewSubGrupo' "
				// motarSubMenu += 	"align='center' height='auto' width='20%'";
				motarSubMenu += ">";
				motarSubMenu += 	"<img src='http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img/"+data[i].imagem+"' height='auto' width='100%'>";
				motarSubMenu += 	"<br><span class='text-center'>"+data[i].descricao+"</span>";
				motarSubMenu += "</div>";

				// complementoMotarSubMenu = "";
				complementoMotarSubMenu  = "<div class='col-xs-3 text-center' style='opacity: 0;width: 25%>";
				complementoMotarSubMenu += 	"<img src='http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img/"+data[i].imagem+"' height='auto' width='100%'>";
				complementoMotarSubMenu += 	"<br><span class='text-center' name='descricaoSubGrupoSpan'>"+data[i].descricao+"</span>";
				complementoMotarSubMenu += "</div>";
				// motarSubMenu += "<td>&nbsp;&nbsp;</td>";
				controleDeLinha++;
				contRegistro++;

				if (data.length == contRegistro) {
					// motarSubMenu += "</tr>";
				}
			}

			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			// motarSubMenu += "</table>";
			// motarSubMenu += "</div>";
		}
		if (window.innerWidth <= 450) {
			motarSubMenu += "<style>";
			motarSubMenu += "span { font-size: 65%; }";
			motarSubMenu += "</style>";
		}

		$("#cabecarioPrincipal").html(motarSubMenu);
		$("#listaPagina").html(""); //<br><br><br><br><br><br><br>
	});
}



function montarViewSubGrupo(idGrupoItem, descricaoGrupoItem){
	var motarSubMenu = "";
	var lancPedidoId = $("#documentoGeral").val();
	var controleDeLinha = -1;
	var controleDeLinhaContanti = 4;
	var contRegistro = 0;
	var complementoMotarSubMenu = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"SubGrupoWs/listar/"+idGrupoItem+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		setStatus('pagina3');
		if (data.length == 0) {
			motarSubMenu += "<br>Não tem nenhum registro de Cliente no Servidor!";
		} else {
			botaoVoltarPedido(lancPedidoId);
			// motarSubMenu += "<table>";

			for(i in data){
				complementoMotarSubMenu = "";
				if (controleDeLinha == -1) {
					// motarSubMenu += "<tr>";
					controleDeLinha++;
				} else if (controleDeLinha >= controleDeLinhaContanti) {
					// motarSubMenu += "</tr><tr>";
					controleDeLinha = 0;
				}
				if (window.innerWidth <= 450) {
					motarSubMenu += "<div class='col-xs-3 text-center' style='width: 33%' name='listaSubGrupoDivRespon'";//class='col-xs-3 text-center'
				} else {
					motarSubMenu += "<div class='col-xs-3 text-center' style='width: 25%' name='listaSubGrupoDivRespon'";//class='col-xs-3 text-center'
				}
				motarSubMenu += 	"onclick='montarListaItensGrup(";
				motarSubMenu += 		data[i].subGrupoItem+", ";
				motarSubMenu += 		data[i].grupoItem+", ";
				motarSubMenu += 		"\""+descricaoGrupoItem+" <i class=\\\"fa fa-arrow-right\\\" aria-hidden=\\\"true\\\"></i> "+data[i].descricao+"\"";
				motarSubMenu += 	")' ";
				motarSubMenu += 	"align='center' height='auto' width='20%'";
				motarSubMenu += ">";
				motarSubMenu += 	"<img src='http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img/"+data[i].imagem+"' height='auto' width='100%'>";
				motarSubMenu += 	"<br><span class='text-center'>"+data[i].descricao+"</span>";
				motarSubMenu += "</div>";

				if (window.innerWidth <= 450) {
					complementoMotarSubMenu += "<div class='col-xs-4 text-center' style='opacity: 0;width: 33%'>";
				} else {
					complementoMotarSubMenu += "<div class='col-xs-3 text-center' style='opacity: 0;width: 25%'>";
				}
				complementoMotarSubMenu += 	"<img src='http://"+hostServeImage+":"+portaImgService+"/panquecasCDI/img/"+data[i].imagem+"' height='auto' width='100%'>";
				complementoMotarSubMenu += 	"<br><span class='text-center' name='descricaoSubGrupoSpan'>"+data[i].descricao+"</span>";
				complementoMotarSubMenu += "</div>";
				// motarSubMenu += "<td>&nbsp;&nbsp;</td>";
				controleDeLinha++;
				contRegistro++;



				if (data.length == contRegistro) {
					// motarSubMenu += "</tr>";
				}
			}
			motarSubMenu += complementoMotarSubMenu;
			motarSubMenu += complementoMotarSubMenu;
			
			if (!window.innerWidth <= 450) {
				motarSubMenu += complementoMotarSubMenu;
			}

			// motarSubMenu += "</table>";
			motarSubMenu += "</div>";
		}
		$("#tabelaSubGrupoModal").html(motarSubMenu);
		$("#modalSubGrupoDescricao").html(descricaoGrupoItem);
		var arrayDivSubGrupos = document.getElementsByName('listaSubGrupoDivRespon');
		var arraySpanDescSubGrupos = document.getElementsByName('descricaoSubGrupoSpan');
		var descTempSubGrupo = "";
		// não deu certo, mas fque com medo de tira e da pau emtão deixa  ai kkkk!
		for (var i = 0; i < arrayDivSubGrupos.length; i++) {
			if (window.innerWidth <= 450) {
				arrayDivSubGrupos[i].className = "text-center col-xs-4";
				descTempSubGrupo = arraySpanDescSubGrupos[i].innerHTML;
				descTempSubGrupo = descTempSubGrupo.fontsize(1);
				arraySpanDescSubGrupos[i].innerHTML = descTempSubGrupo;
			} else {
				arrayDivSubGrupos[i].className = "text-center col-xs-3";
			}
		}
	});
}



function montarListaItensGrup(idSubGrupoItem, idGrupoItem, descricaoGrupoItem){
	var filial = $("#filial").val();
	document.getElementById("fecharModalSubGrupoItem").click();
	var motarSubMenu = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItem/"+idSubGrupoItem+"/"+idGrupoItem+"/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		if (data.length == 0) {
			motarSubMenu += "<h2 class='text-center' style='margin-top:-15px;'>Itens: "+descricaoGrupoItem+"</h2>";
			motarSubMenu += "<br>Não tem nenhum item nesse grupo!";
			$("#listaItensPorGrupo").html(motarSubMenu);
		} else {
			motarSubMenu += "<h2 class='text-center' style='margin-top:-15px;'>Itens: "+descricaoGrupoItem+"</h2>";

			motarSubMenu += "<div class='col-md-12'>";

			motarSubMenu += "<input type='text' ";
			motarSubMenu += "	id='itemInputList'";
			motarSubMenu += "	class='flexdatalist form-control'";
			motarSubMenu += "	data-min-length='0' ";
			motarSubMenu += "	data-visible-properties='[\"descricao\"]'";
			motarSubMenu += "	data-selection-required='true' ";
			motarSubMenu += "	data-value-property='*'";
			motarSubMenu += "	list='clienteDataList' ";
			motarSubMenu += "	onchange='setStatus(\"item\");selecionarItem()'";
			motarSubMenu += "required>";


			/*motarSubMenu += "<button class='btn btn-block btn-success'  style='margin-top:10px;'";
			motarSubMenu += "onclick='setStatus(\"item\");selecionarItem()'>";		

			motarSubMenu += "Selecionar Item &nbsp;";
			motarSubMenu += "<i class='fa fa-arrow-right' aria-hidden='true'></i>";

			motarSubMenu += "</button>";*/

			motarSubMenu += "<button class='hidden' ";
			motarSubMenu += "data-toggle='modal' data-target='#modalAdicinarItem' ";
			motarSubMenu += "id='abrirModalSelecionarPedido' >";
			motarSubMenu += "</button>";

			motarSubMenu += "</div><hr>";

			$("#listaItensPorGrupo").html(motarSubMenu);
			setarValorItemInputList(data);
			document.getElementById("itemInputList-flexdatalist").focus();
		}
	});
}

function montarListaItensTodos(){
	var filial = $("#filial").val();
	var motarSubMenu = "";

	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarTodosItem/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){

		if (data.length == 0) {
			motarSubMenu += "<h2 class='text-center' style='margin-top:-15px;'>Todos os Itens</h2>";
			motarSubMenu += "<br>Nenhum item encontrado!";
			$("#listaItensPorGrupo").html(motarSubMenu);
		} else {
			motarSubMenu += "<h2 class='text-center' style='margin-top:-15px;'>Todos os Itens</h2>";

			motarSubMenu += "<div class='col-md-12'>";

			motarSubMenu += "<input type='text' ";
			motarSubMenu += "	id='itemInputList'";
			motarSubMenu += "	class='flexdatalist form-control'";
			motarSubMenu += "	data-min-length='0' ";
			motarSubMenu += "	data-visible-properties='[\"descricao\"]'";
			motarSubMenu += "	data-selection-required='true' ";
			motarSubMenu += "	data-value-property='*'";
			motarSubMenu += "	list='clienteDataList' ";
			motarSubMenu += "	onchange='setStatus(\"item\");selecionarItem()'";
			motarSubMenu += "required>";

			motarSubMenu += "<button class='hidden' ";
			motarSubMenu += "data-toggle='modal' data-target='#modalAdicinarItem' ";
			motarSubMenu += "id='abrirModalSelecionarPedido' >";
			motarSubMenu += "</button>";

			motarSubMenu += "</div><hr>";
			

			$("#listaItensPorGrupo").html(motarSubMenu);
			setarValorItemInputList(data);
			document.getElementById("itemInputList-flexdatalist").focus();
		}
	});
}




function setarValorItemInputList(elJSON){
	$('#itemInputList').flexdatalist({
		selectionRequired: true,
		valueProperty: '*',
		searchIn: 'descricao',
		minLength: 1,
		data: elJSON
	});
}


// {"item":6,"grupoItem":1,"subGrupoItem":1,"unidade_medida":"UN+vlr","descricao":"ABACAXI"},
function selecionarItem(){
	var objetoItem = $('#itemInputList').val();
	var montarOparacoes = "";
	var subVetorUM = [];
	var valorUnitario = 0;

	if (objetoItem == '') {
		document.getElementById("fecharModalBottun").click();
	} else {
		objetoItem = objetoItem.replace("{", "");
		objetoItem = objetoItem.replace("}", "");
		objetoItem = objetoItem.replace("\"\"descricao\":", "");
		objetoItem = objetoItem.replace("\"subGrupoItem\":", "");
		objetoItem = objetoItem.replace("\"unidade_medida\":\"", "");
		objetoItem = objetoItem.replace("\"grupoItem\":", "");
		objetoItem = objetoItem.replace("\"item\":", "");

		objetoItem = objetoItem.split(",");

		var item = objetoItem[0];
		var grupo = objetoItem[1];
		var subGrupo = objetoItem[2];
		var unidadeMedida = objetoItem[3];
		unidadeMedida = unidadeMedida.replace("\"", "");
		subVetorUM = unidadeMedida.split("+");
		unidadeMedida = subVetorUM[0];
		valorUnitario = subVetorUM[1];

		var desc = objetoItem[4];
		desc = desc.replace("\"descricao\":", "");

		$("#modalIdItem").val(item);
		$("#modalNomeItem").html(desc);
		$("#modalUnidadeMedidaItem").val(unidadeMedida);
		$("#modalSubGrupoItem").val(subGrupo);
		$("#modalGrupoItem").val(grupo);


		montarOparacoes += "<table class='table'>";
		montarOparacoes += "<tr>";
		montarOparacoes += "<td>";

		montarOparacoes += "<button class='btn btn-primary btn-block' onclick='mostrarComposicaoDoItem(\"Composicao\")' >";
		montarOparacoes += "<i class='fa fa-list' aria-hidden='true'></i>";
		montarOparacoes += "&nbsp;&nbsp;Composição";
		montarOparacoes += "</button>";

		montarOparacoes += "</td><td>";

		montarOparacoes += "<button class='btn btn-warning btn-block' onclick='mostrarComposicaoDoItem(\"Preparo\")' >";
		montarOparacoes += "<i class='fa fa-sign-language' aria-hidden='true'></i>";
		montarOparacoes += "&nbsp;&nbsp;Preparo";
		montarOparacoes += "</button>";

		montarOparacoes += "</td><td>";

		montarOparacoes += "<button class='btn btn-success btn-block' onclick='mostrarComposicaoDoItem(\"Adicional\")' >";
		montarOparacoes += "<i class='fa fa-plus' aria-hidden='true'></i>";
		montarOparacoes += "&nbsp;&nbsp;Adicional";
		montarOparacoes += "</button>";

		montarOparacoes += "</td>";
		montarOparacoes += "</tr>";
		montarOparacoes += "</table>";

		document.getElementById("abrirModalSelecionarPedido").click();
		document.getElementById("modalQtdItem").focus();
		montarComposicaoItem(item);
		$("#operacoesItemModalAdicionar").html(montarOparacoes);
		$("#modalVlrUnitarioItem").val(formataValorParaImprimir(valorUnitario));
		$("#modalVlrUnitarioItemReal").val(formataValorParaImprimir(valorUnitario));
		calculaTotalItem();
	}
}



function montarComposicaoItem(item){
	itensComposicaoArray = [];
	itensPreparoArray = [];
	itensAdicionalArray = [];

	var tabelaComposicao = "";
	var tabelaPreparo = "";
	var tabelaAdicional = "";
	var quantidade = 0;
	var filial = $("#filial").val();
	var subVetorUM = [];
	var valorUnitarioAdicional = 0;

	// Composição do item
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensComposicao/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaComposicao = "<br>Nenhum item na composição desse item!";
		} else {
			tabelaComposicao += "<div class='text-center'><h2>Composição</h2></div>";
			tabelaComposicao += "<table class='table fontTable'>";
			tabelaComposicao += "<tr>";
			tabelaComposicao += "<td><b>Descrição</b></td>";
			tabelaComposicao += "<td align='center'><b>Quantidade</b></td>";
			tabelaComposicao += "<td align='center'><b>Condição</b></td>";
			tabelaComposicao += "</tr>";

			for(i in data){
				quantidade = formataValorParaQuantidade(data[i].unidade_medida);

				itensComposicaoArray.push(data[i].item);
				tabelaComposicao += "<tr onclick='mudarCondicaoItem("+data[i].item+", \"Composicao\")' id='linhaComposicao_"+data[i].item+"' bgcolor='#5cb85c'>";

				tabelaComposicao += "<td>";
				tabelaComposicao += 	data[i].descricao;
				tabelaComposicao += 	"<input class='hidden' type='checkbox' id='inputComposicao_"+data[i].item+"' checked>";
				tabelaComposicao += "</td>";
				tabelaComposicao += "<td align='right'>";
				tabelaComposicao += 	quantidade+"&nbsp;&nbsp;&nbsp;";
				tabelaComposicao += "</td>";
				tabelaComposicao += "<td align='center'>";
				tabelaComposicao += 	"<span id='spanComposicao_"+data[i].item+"'>";
				tabelaComposicao += 		"<i class='fa fa-check' aria-hidden='true'></i>";
				tabelaComposicao += 	"</span>";
				tabelaComposicao += "</td>";

				tabelaComposicao += "</tr>";
			}
		}
		$("#conteudoComposicaoModalAdicionarItem").html(tabelaComposicao);
	});



	// Prepraro do item
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensPreparo/"+item+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaPreparo = "<br>Nenhum item no preparo desse item!";
		} else {
			tabelaPreparo += "<div class='text-center'><h2>Preparo</h2></div>";
			tabelaPreparo += "<table class='table fontTable'>";
			tabelaPreparo += "<tr>";
			tabelaPreparo += "<td><b>Descrição</b></td>";
			tabelaPreparo += "<td align='center'><b>Condição</b></td>";
			tabelaPreparo += "</tr>";

			for(i in data){
				itensPreparoArray.push(data[i].item);
				tabelaPreparo += "<tr onclick='mudarCondicaoItem("+data[i].item+", \"Preparo\")' id='linhaPreparo_"+data[i].item+"' bgcolor='#f0ad4e'>";

				tabelaPreparo += "<td>";
				tabelaPreparo += 	"<span id='spanDescricaoPreparo_"+data[i].item+"'>"+data[i].descricao+"</span>";
				tabelaPreparo += 	"<input class='hidden' type='checkbox' id='inputPreparo_"+data[i].item+"'>";
				tabelaPreparo += "</td>";
				tabelaPreparo += "<td align='center'>";
				tabelaPreparo += 	"<span id='spanPreparo_"+data[i].item+"'>";
				tabelaPreparo += 		"<i class='fa fa-times' aria-hidden='true'></i>";
				tabelaPreparo += 	"</span>";
				tabelaPreparo += "</td>";

				tabelaPreparo += "</tr>";

				data[i].item++;
			}
		}
		$("#conteudoPreparoModalAdicionarItem").html(tabelaPreparo);
	});


	var descricaoItemParaMostrar = "";
	var QTD_NAO_COBRAR = "";
	var array_desc_atdN = [];

	// Adicional do item
	$.ajax({
		type: 'GET',
		url: urlWebService+"ItemWs/listarItensAdicional/"+item+"/"+filial+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		if (data.length == 0) {
			tabelaAdicional = "<br>Nenhum item adicional a esse item!";
		} else {
			tabelaAdicional += "<div class='text-center'><h2>Adicional</h2></div>";
			tabelaAdicional += "<table class='table fontTable'>";
			tabelaAdicional += "<tr>";
			tabelaAdicional += "<td><b>Descrição</b></td>";
			tabelaAdicional += "<td align='center'><b>Quantidade</b></td>";
			tabelaAdicional += "<td align='center'><b>Valor</b></td>";
			tabelaAdicional += "<td align='center'><b>Condição</b></td>";
			tabelaAdicional += "</tr>";

			for(i in data){
				array_desc_atdN = data[i].descricao.split("++");
				descricaoItemParaMostrar = array_desc_atdN[0];
				QTD_NAO_COBRAR = array_desc_atdN[1];
				$("#qtd_n_cobrar").val(QTD_NAO_COBRAR);
				subVetorUM = data[i].unidade_medida.split("+");
				quantidade = formataValorParaQuantidade(subVetorUM[0]);
				valorUnitarioAdicional = subVetorUM[1];

				itensAdicionalArray.push(data[i].item);
				tabelaAdicional += "<tr ";
				tabelaAdicional += 		"onclick='mudarCondicaoItem("+data[i].item+", \"Adicional\");calculaTotalItem();' ";
				tabelaAdicional += 		"id='linhaAdicional_"+data[i].item+"' ";
				tabelaAdicional += 		"bgcolor='#f0ad4e'";
				tabelaAdicional += ">";

				tabelaAdicional += "<td>";
				tabelaAdicional += 	descricaoItemParaMostrar;
				tabelaAdicional += 	"<input class='hidden' type='checkbox' id='inputAdicional_"+data[i].item+"'>";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='right'>";
				tabelaAdicional += 	quantidade+"&nbsp;&nbsp;&nbsp;";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='right'>";
				tabelaAdicional += 		"<span id='vlrUnitarioItemComplemento_"+data[i].item+"'>"
				tabelaAdicional += 			valorUnitarioAdicional
				tabelaAdicional += 		"</span>&nbsp;&nbsp;&nbsp;";
				tabelaAdicional += "</td>";
				tabelaAdicional += "<td align='center'>";
				tabelaAdicional += 	"<span id='spanAdicional_"+data[i].item+"'>";
				tabelaAdicional += 		"<i class='fa fa-times' aria-hidden='true'></i>";
				tabelaAdicional += 	"</span>";
				tabelaAdicional += "</td>";

				tabelaAdicional += "</tr>";
			}
		}
		$("#conteudoAdicionalModalAdicionarItem").html(tabelaAdicional);
	});
}



function mudarCondicaoItem(item, tipo){
	var check = document.getElementById("input"+tipo+"_"+item).checked;
	if (check) {
		document.getElementById("input"+tipo+"_"+item).checked = false;
		document.getElementById("linha"+tipo+"_"+item).style.backgroundColor = "#f0ad4e";
		document.getElementById("span"+tipo+"_"+item).innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
	} else {
		document.getElementById("input"+tipo+"_"+item).checked = true;
		document.getElementById("linha"+tipo+"_"+item).style.backgroundColor = "#5cb85c";
		document.getElementById("span"+tipo+"_"+item).innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
	}
}



function mostrarComposicaoDoItem(especificacao){
	var numOperadores = document.getElementsByName("operacoesItemModalAdicionar").length;
	for(var i = 0; i < numOperadores; i++){
		document.getElementsByName("operacoesItemModalAdicionar")[i].className = "hidden";
	}
	if (especificacao != "0") {
		document.getElementById("conteudo"+especificacao+"ModalAdicionarItem").className = "";	
	}
}



function limparCamposModalItem(){
	$("#modalQtdItem").val(1);
	$("#modalVlrUnitarioItem").val("");
	$("#modalVlrTotalItem").val("");
	$("#modalComplementoItem").val("");
	mostrarComposicaoDoItem("0");
}


function adicionaItemAoPedido(){
	var quantidade = $("#modalQtdItem").val();
	var valorUnitario = $("#modalVlrUnitarioItem").val();
	var valorUnitarioReal = $("#modalVlrUnitarioItemReal").val();
	var valorTotal = $("#modalVlrTotalItem").val();
	var item = $("#modalIdItem").val();
	var filial = $("#filial").val();
	var documento = $("#documentoGeral").val();
	var sequecia = $("#sequencia").val();
	var unidadeMedida = $("#modalUnidadeMedidaItem").val(unidadeMedida);
	var subGrupo = $("#modalSubGrupoItem").val(subGrupo);
	var grupo = $("#modalGrupoItem").val(grupo);
	var complemeto = $("#modalComplementoItem").val();
	var valorUnitarioComplemento = 0;
	var parametrosAdicional = "";

	quantidade = formataValorParaCalcular(quantidade);
	valorUnitario = formataValorParaCalcular2(valorUnitario);
	valorUnitarioReal = formataValorParaCalcular2(valorUnitarioReal);

	valorTotal = formataValorParaCalcular2(valorTotal);

	if (
		   quantidade != "" 
		&& valorUnitario != "" 
		&& valorTotal != ""  
		&& item != "" 
		&& sequecia != "" 
		&& quantidade != 0 
		&& valorTotal > 0 
		&& valorUnitario > 0 
		&& valorUnitarioReal > 0
	){

		var lancPedidoIdObject = { 
				"filial": filial, 
				"documento": documento, 
				"sequencia": sequecia,
				"item": item,
				"quantidade": quantidade, 
				"valorUnitario": valorUnitario, 
				"valorTotal": valorTotal,
				"grupoItem" : grupo,
				"subGrupoItem": subGrupo,
				"unidadeMedida": unidadeMedida,
				"adicionalProduto": complemeto
			};
		$.ajax({
			type: 'POST',
			cache: false,
			url: urlWebService+"ItemWs/inserir",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(lancPedidoIdObject)
		}).done( function(data){
			if (data != 0) {
				
				$.ajax({
					type: 'GET',
					url: urlWebService+"ItemWs/retornaSeguencia/"+filial+"/"+documento+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){
					var sequenciaReal = parseInt(data) + 1;
					$("#sequencia").val(sequenciaReal);
				});

				var filialItem = $("#filial").val();
				var documentoGeral = $("#documentoGeral").val();

				// gravar as exeções da grade
				var idAdicionado = data;
				for(var i = 0; i < itensComposicaoArray.length; i++){
					if (!document.getElementById("inputComposicao_"+itensComposicaoArray[i]).checked) {
						$.ajax({
							type: 'GET',
							url: urlWebService+"ItemWs/adicionarItemExecao/"+idAdicionado+"/"+itensComposicaoArray[i]+parametrosWebService,
							contentType: "application/json",
							jsonpCallback: "localJsonpCallback"
						}).done( function(data){
							if (data) {
								// console.log("Resultado: vdd\nExeção: "+item+"\nPedido Item: "+idAdicionado);
							} else {
								// console.log("Resultado: falso\nExeção: "+item+"\nPedido Item: "+idAdicionado);
							}
						});
					}
				}


				//  grava preparo da grade
				var descricaoPreparo = "";
				var vetor = [];
				for(var i = 0; i < itensPreparoArray.length; i++){
					if (document.getElementById("inputPreparo_"+itensPreparoArray[i]).checked) {
						descricaoPreparo = document.getElementById("spanDescricaoPreparo_"+itensPreparoArray[i]).innerHTML;
						descricaoPreparo = descricaoPreparo.replace(/ /g, "-");
						// console.log(urlWebService+"ItemWs/adicionarItemPreparo/"+idAdicionado+"/"+descricaoPreparo+"/"+filialItem+"/"+documentoGeral+parametrosWebService);
						$.ajax({
							type: 'GET',
							url: urlWebService+"ItemWs/adicionarItemPreparo/"+idAdicionado+"/"+descricaoPreparo+"/"+filialItem+"/"+documentoGeral+parametrosWebService,
							contentType: "application/json",
							jsonpCallback: "localJsonpCallback"
						}).done( function(data){
							if (data) {
								// console.log("Resultado: vdd\nExeção: "+item+"\nPedido Item: "+idAdicionado);
							} else {
								// console.log("Resultado: falso\nExeção: "+item+"\nPedido Item: "+idAdicionado);
							}
						});
					}
				}

				// gravar adicional
				for(var i = 0; i < itensAdicionalArray.length; i++){
					if (document.getElementById("inputAdicional_"+itensAdicionalArray[i]).checked) {
						valorUnitarioComplemento = $("#vlrUnitarioItemComplemento_"+itensAdicionalArray[i]).html();
						valorUnitarioComplemento = formataValorParaCalcular(valorUnitarioComplemento);

						parametrosAdicional = idAdicionado+"/"+itensAdicionalArray[i]+"/"+filialItem+"/"+documentoGeral+"/"+valorUnitarioComplemento+"/"+String(parseFloat($("#modalQtdItem").val()));
						$.ajax({
							type: 'GET',
							url: urlWebService+"ItemWs/adicionarItemAdicional/"+parametrosAdicional+parametrosWebService,
							contentType: "application/json",
							jsonpCallback: "localJsonpCallback"
						}).done( function(data){});
					}
				}
				toastGeral("success", "Item adicionado com sucesso!");

				document.getElementById("fecharModalBottun").click();
				document.getElementById("itemInputList-flexdatalist").value = "";
				setStatus("pagina3");
			} else {
				toastGeral("error", "Erro ao adicinar item ao pedido!");
			}
			limparCamposModalItem();
		});
	} else {
		toastGeral("error", "Verifique se todos os dados foram preenchidos e se o valor unitário não veio zeradao!");
	}
}

function calcQtdItem(op){
	if ($("#modalQtdItem").val() == "") $("#modalQtdItem").val(0);
	if (op == "+") {
		var result = parseInt($("#modalQtdItem").val()) + 1;
	} else {
		var result = parseInt($("#modalQtdItem").val()) - 1;
	}	
	if (result > 0) $("#modalQtdItem").val(result);
	else $("#modalQtdItem").val(1);
	calculaTotalItem();
}