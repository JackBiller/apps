

function filtrarProdutos(){
	if(
		$("#descricaoProduto").val() 	!= ""	||
		$("#marcaProduto").val() 		!= ""	||
		$("#corProduto").val() 			!= ""	||
		$("#codigoProduto").val() 		!= ""
	) {
		$("#resultado").html(carrega);
		console.log("filtrarProdutos");
		var descricao = $("#descricaoProduto").val();
		var marca = $("#marcaProduto").val();
		var cor = $("#corProduto").val();
		var codigo = $("#codigoProduto").val();
		$.ajax({
			url: caminhoRequisicao + "lb/controllerProduto2.php",
			type: "POST",
			dataType: "text",
			data: {
				'descricao': descricao,
				'marca': marca,
				'cor': cor,
				'codigo': codigo,

				'usuarioID': usuario_Global.usuarioID,
				'usuarioNome': usuario_Global.usuarioNome,
				'usuarioLogin': usuario_Global.usuarioLogin,
				'usuarioSenha': usuario_Global.usuarioSenha
			}
		}).done( function(data){
			$("#resultado").html(data);
		});
	}
}


$("#modalAdicionaItem").on('shown.bs.modal', function(){
	$("#requisitarItem").focus();
});

$('#myModal').on('hidden.bs.modal', function () {
	limpaCamposItens();
});


function limpaCamposItens(){
	$("#descricaoItem").val("");
	$("#requisitarItem").val("");
	$("#unidadeMedidaItem").val("");
	$("#estoqueItem").val("");
	$("#marcaItem").val("");
	$("#corItem").val("");
}



function selecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida){
	if (idPreRequi != 0 && idPreRequi != "0" && idPreRequi != "") {
		$.ajax({
			url: caminhoRequisicao + "lb/controllerPreRequi.php",
			type: "POST",
			dataType: "text",
			data: {
				'msmProtudto': true,
				'codigo_referencia': codigoReferencia,
				'marca': sigla,
				'cor': cor,
				'idPreRequi': idPreRequi,

				'usuarioID': usuario_Global.usuarioID,
				'usuarioNome': usuario_Global.usuarioNome,
				'usuarioLogin': usuario_Global.usuarioLogin,
				'usuarioSenha': usuario_Global.usuarioSenha
			}
		}).done( function(data){
			console.log(data);
			try {
				if(Number(data) == 0){
					continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida, lead_time);
				} else {
					alert("Produto já foi selecionada nesta Pré Requisição!");
				}
			} catch(error){
				alert("Falha ao tentar consultar repitividade do produto: " + error);
			}	
		});
	} else {
		continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida, lead_time);
	}		
}

function continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida, lead_time){
	if (
		$("#osId").val() == 0			 			|| 
		$("#osId").val() == "0"		 				|| 
		$("#osId").val() == ""
	) {
		$("#itemPreHead")[0].click();
		$("#osIdEdit")[0].focus();
		alert("É preciso selecionar a obra para adicionar produto!");
	} else if(itenConfirmado){
		item_Global = {
			"ID_PRODUTO": codigo,
			"DS_MARCA": marca,
			"DS_PRODUTO": descricao,
			"SIGLA_UNIDADE_MEDIDA": unidadeMedida,
			"QTD_ESTOQUE": estoque,
			"QTD_ESTOQUE_EXT": estoque_ext,
			"CODIGO_REFERENCIA": codigoReferencia,
			"SIGLA_MARCA": sigla,
			"DS_DETALHE": cor,
			"MAIOR_LEAD_TIME": lead_time
		}

		$("#descricaoItem").val(item_Global.DS_PRODUTO);
		$("#unidadeMedidaItem").val(item_Global.SIGLA_UNIDADE_MEDIDA);
		$("#estoqueItem").val( Number(item_Global.QTD_ESTOQUE) + " + " + Number(item_Global.QTD_ESTOQUE_EXT) );
		$("#codigoReferenciaItem").val(item_Global.CODIGO_REFERENCIA);
		$("#marcaItem").val(item_Global.SIGLA_MARCA);
		$("#corItem").val(item_Global.DS_DETALHE);

		if (localStorage.lead_time) {
			if (parseInt(localStorage.getItem("lead_time")) < parseInt(item_Global.MAIOR_LEAD_TIME) ) {
				localStorage.setItem("lead_time", item_Global.MAIOR_LEAD_TIME);
			}
		} else  localStorage.setItem("lead_time", item_Global.MAIOR_LEAD_TIME);

		$("#requisitarItem").val("");

		$("#modalAdicionaItem").modal("show");

	} else {
		alert("Você já um item selecionado");
	}
}



function confirmItem(boolModal){
	var valido = true;

	var dataLimiteFormt = $("#dataLimite").val();
	var dataAtual = pegarData();
	var lead_time = parseInt(localStorage.getItem("lead_time"));
	var dataLimite = "";


	if( moment(dataLimiteFormt, 'YYYY-MM-DD').isValid() && moment(dataAtual, 'YYYY-MM-DD').isValid() ){
		dataLimiteFormt = 	moment(dataLimiteFormt, 'YYYY-MM-DD');
		dataAtual = 		moment(dataAtual, 		'YYYY-MM-DD');

		if ( lead_time <= dataLimiteFormt.diff(dataAtual, 'days') ) dataLimite = $("#dataLimite").val();
		else if($("#dataLimite").val() != ""){
			dataLimite = dataAtual.add(lead_time, 'days').format('YYYY-MM-DD');
			alert("Data limite informada inválida! Será gravado a data mínima da pré-requisição que é " + formataDataFullAno(dataLimite));
		}
	}


	if (
		$("#osId").val() == 0			 				|| 
		$("#osId").val() == "0"		 					|| 
		$("#osId").val() == ""
	) {
		valido = false;
		alert("Selecione a obra");
	}

	// if ($("#requisitarItem").val()) {}

	if (idPreRequi == 0 && valido) {
		if(
			isNaN($("#requisitarItem").val()) 	 		||
			Number($("#requisitarItem").val()) == 0		||
			$("#requisitarItem").val() == ""			||
			$("#requisitarItem").val() == "0" 			
		){
			valido = false;
			alert("Insira um produto");
		}
	}

	if (boolModal) {
		if(
			isNaN($("#requisitarItem").val()) 	 		||
			Number($("#requisitarItem").val()) == 0		||
			$("#requisitarItem").val() == ""			||
			$("#requisitarItem").val() == "0" 			
		){
			valido = false;
			alert("Preencha o campo \"Requisitar\", corretamente!");
		}
	}

	if (valido) {
		var estoque = $("#estoqueItem").val().split(" + ");
		estoque = Number(estoque[0]) + Number(estoque[1]);
		$.ajax({
			url: caminhoRequisicao + "lb/controllerPreRequi.php",
			type: "POST",
			dataType: "text",
			data: {
				'adicionarPreRequi': true,
				'idPreRequi': idPreRequi,
				'id_os': $("#osId").val(),
				'dt_emissao': pegarData(),
				'dsreferencia': $("#referenciaPedido").val(),
				'observacao': $("#observacaoPedido").val(),
				'dataLimite': dataLimite,
				
				'codigo_referencia': $("#codigoReferenciaItem").val(),
				'sigla_marca': $("#marcaItem").val(),
				'ds_detalhe': $("#corItem").val(),
				'qtd_item': $("#requisitarItem").val(),
				'qtd_estoqueAtual': estoque,

				'usuarioID': usuario_Global.usuarioID,
				'usuarioNome': usuario_Global.usuarioNome,
				'usuarioLogin': usuario_Global.usuarioLogin,
				'usuarioSenha': usuario_Global.usuarioSenha
			},
			error: function(){
				console.log("Erro ao tentar confirma item")
			}
			/*$("#unidadeMedidaItem").val(data.SIGLA_UNIDADE_MEDIDA);
			$("#estoqueItem").val( Number(data.QTD_ESTOQUE) + Number(data.QTD_ESTOQUE_EXT) );
			$("#descricaoItem").val(data.DS_PRODUTO);*/
		}).done( function(data){
			console.log(data);
			idPreRequi = data.split("/,/,/,/,/");
			idPreRequi = idPreRequi[idPreRequi.length - 1];
			// console.log("idPreRequi: " + idPreRequi);
			if(idPreRequi != "" && idPreRequi != "0" && idPreRequi != 0){
				editarItem(idPreRequi);
			} else {
				idPreRequi = 0;
				alert("Falha ao gravar item: " + data);
			}
			$("#modalAdicionaItem").modal("hide");
			limpaCamposItens();
		});
	}
}


function editarItem(id){
	localStorage.removeItem("lead_time");

	$("#itemPreHead").click();
	$("#osIdEdit")[0].disabled = true;
	$("#osIdCombo")[0].disabled = true;
	$("#osIdCombo-flexdatalist")[0].disabled = true;

	$.ajax({
		url: caminhoRequisicao + "lb/controllerPreRequi.php",
		type: "POST",
		dataType: "text",
		data: {
			'pesquisaReuiId': true,
			'id': id,

			'usuarioID': usuario_Global.usuarioID,
			'usuarioNome': usuario_Global.usuarioNome,
			'usuarioLogin': usuario_Global.usuarioLogin,
			'usuarioSenha': usuario_Global.usuarioSenha
		}
	}).done( function(data){
		console.log(data);
		try{
			data = JSON.parse(data);
			console.log(data);
			if (data.debug != "OK") {
				alert("Falha ao carregar Pré Requisição");
			} else {
				idPreRequi = data.ID_PRE_REQ;
				// DT_EMISSAO
				$("#osId").val(data.ID_OS);
				$("#referenciaPedido").val(data.DS_REFERENCIA);
				$("#observacaoPedido").val(data.OBSERVACAO);
				$("#osIdEdit").val(data.OS);
				$("#osIdCombo").val(data.OS);
				$("#osIdCombo-flexdatalist").val(data.DS_OS);
				carregarItensPrequi();
				limpaCamposItens();
			}
		} catch(error){
			console.error(error);
		}
	});
}




function carregarItensPrequi(){
	$("#itensBuscados").html(carrega);
	$.ajax({
		url: caminhoRequisicao + "lb/controllerPreRequi.php",
		type: "POST",
		dataType: "text",
		data: {
			'listaItemRequi': true,
			'id': idPreRequi,

			'usuarioID': usuario_Global.usuarioID,
			'usuarioNome': usuario_Global.usuarioNome,
			'usuarioLogin': usuario_Global.usuarioLogin,
			'usuarioSenha': usuario_Global.usuarioSenha
		}
	}).done( function(data){
		console.log(data);
		limpaCamposItens();
		data = data.split("/,/,/,/,/");
		$("#itensBuscados").html(data[0])
		numItens = data[1];
		localStorage.setItem("lead_time", data[2]);
	});
}


function removerItem(id){
	if (numItens > 1) {
		if(confirm("Deseja remover este item da Pré Requisição?")){
			$.ajax({
				url: caminhoRequisicao + "lb/controllerPreRequi.php",
				type: "POST",
				dataType: "text",
				data: {
					'removerItem': true,
					'id': id,

					'usuarioID': usuario_Global.usuarioID,
					'usuarioNome': usuario_Global.usuarioNome,
					'usuarioLogin': usuario_Global.usuarioLogin,
					'usuarioSenha': usuario_Global.usuarioSenha
				}
			}).done( function(data){
				console.log(data);
				alert(data);
				carregarItensPrequi();
			});
		}
	} else apagarPreRequisicao();
}



function confirmRequisicao(){
	if ( !idPreRequi == 0 && !idPreRequi == "0" && !idPreRequi == "" ) {
		if (confirm("Tem certeza que deseja Enviar p/ Aprovação?")) {
			$.ajax({
				url: caminhoRequisicao + "lb/controllerPreRequi.php",
				type: "POST",
				dataType: "text",
				data: {
					'confirmarEnvio': true,
					'id': idPreRequi,

					'usuarioID': usuario_Global.usuarioID,
					'usuarioNome': usuario_Global.usuarioNome,
					'usuarioLogin': usuario_Global.usuarioLogin,
					'usuarioSenha': usuario_Global.usuarioSenha
				}
			}).done( function(data){
				console.log(data);
				try{
					data = data.substring(data.length - 1, data.length);
					if (Number(data) == 1) {
						alert("Enviado com sucesso!");
						novoPreRequi();
					} else {
						alert("Falha ao tentar enviar para aprovação: " + data);
					}
				} catch(erro){
					console.error(erro);
					alert("Falha ao tentar enviar para aprovação: " + data);
				}
			});
		}
	} else {
		alert("Você não tem Pré Requisição selecionada");
	}
}


function apagarPreRequisicao(){
	if ( !idPreRequi == 0 && !idPreRequi == "0" && !idPreRequi == "" ) {
		if (confirm("Tem certeza que deseja Cancelar Pré Requisição?")) {
			$.ajax({
				url: caminhoRequisicao + "lb/controllerPreRequi.php",
				type: "POST",
				dataType: "text",
				data: {
					'apagarPreRequisicao': true,
					'id': idPreRequi,

					'usuarioID': usuario_Global.usuarioID,
					'usuarioNome': usuario_Global.usuarioNome,
					'usuarioLogin': usuario_Global.usuarioLogin,
					'usuarioSenha': usuario_Global.usuarioSenha
				}
			}).done( function(data){
				console.log(data);
				alert(data);
				novoPreRequi();
			});
		}
	} else {
		alert("Você não tem Pré Requisição selecionada");
	}	
}


function novoPreRequi(){
	localStorage.removeItem("lead_time");

	idPreRequi = 0;
	$("#osId").val("");
	$("#osIdEdit").val("");
	$("#referenciaPedido").val("");
	$("#osIdCombo").val("");
	$("#osIdCombo-flexdatalist").val("");
	$("#observacaoPedido").val("");

	$("#itensBuscados").html("<h3 style=\"text-align: center;\">Nenhum Produto</h3>");
	$("#itemPreHead").click();

	$("#osIdEdit")[0].disabled = false;
	$("#osIdCombo")[0].disabled = false;
	$("#osIdCombo-flexdatalist")[0].disabled = false;
}


function imprimirReuisicao(){
	if ( !idPreRequi == 0 && !idPreRequi == "0" && !idPreRequi == "" ) {
		localStorage.setItem("idPreRequi", idPreRequi);
		window.open("lb/impressao.php", "_blank"); /* ?idPreRequi=" + idPreRequi */
	} else {
		alert("Você não tem Pré Requisição selecionada");
	}
}


function buscarOs(){
	$.ajax({
		url: caminhoRequisicao + "lb/controllerOs.php",
		type: "POST",
		dataType: "text",
		data: {
			'buscaOs': true,

			'usuarioID': usuario_Global.usuarioID,
			'usuarioNome': usuario_Global.usuarioNome,
			'usuarioLogin': usuario_Global.usuarioLogin,
			'usuarioSenha': usuario_Global.usuarioSenha
		}
	}).done( function(data){
		console.log(data);
		try{
			data = JSON.parse(data);
			console.log(data);
			if(data[0].debug != "OK") console.error("Error: " + data.debug);
			else {
				var inputDataList = 
									"<table width='100%'>"	
								  + 	"<tr>"
								  + 		"<td width='25%'>"
								  + 			"OS: "
								  + 			"<input type='tel' id='osIdEdit' class='form-control' onkeyup='selecionaOs(this.value)'>"
								  + 			"<input type='hidden' id='osId' value='0'>"
								  + 		"</td>"
								  + 		"<td>"
								  + 			"Descrição: "
								  + 			"<input type='text' id='osIdCombo'"
								  +				" class='flexdatalist form-control' placeholder='Obra'"
								  +				" data-min-length='0' data-visible-properties='[\"DS_OS\"]' "
								  +				" data-selection-required='true' data-value-property='OS' "
								  +				" onchange='selecionaOs(this.value)' onblur='selecionaOs(this.value)'"
								  +				" required disabled>"
								  + 		"<td>"
								  + 	"</tr>"
								  + "</table>";

				$("#divOsIdCombo").html(inputDataList);
				setarValorCombo(data,'osIdCombo','ID_OS','DS_OS','',0,"", function(){ 
					// selecionaOs( $("#osIdEdit").val() );
					// try { $("#osIdCombo-flexdatalist-results")[0].style.display = "none"; }
					// catch(error){ console.error(error); }
				});
			}
		} catch(error){
			console.error(error);
		}
	});
}


function setarValorCombo(eljson, id, value, descricao, accessKey, idValor, DescricaoValor, onblur){
	$('#'+id+'').flexdatalist({
		selectionRequired: true,
		valueProperty: value,
		searchIn: descricao,
		minLength: 0,
		data: eljson
	});
	document.getElementById( id + "-flexdatalist").disabled = false;
	document.getElementById( id + "-flexdatalist").accessKey = accessKey;
	$("#" + id + "-flexdatalist").blur( onblur );

	if (idValor != 0 && DescricaoValor != "") {
		document.getElementById( id ).value = idValor;
		document.getElementById( id + "-flexdatalist" ).value = DescricaoValor;
	}
}



function selecionaOs(id){
	console.log(id);
	if (id != "" && id != "0" && id != 0) {
		$.ajax({
			url: caminhoRequisicao + "lb/controllerOs.php",
			type: "POST",
			dataType: "text",
			data: {
				'pesquisaIdOs': true,
				'id': id,

				'usuarioID': usuario_Global.usuarioID,
				'usuarioNome': usuario_Global.usuarioNome,
				'usuarioLogin': usuario_Global.usuarioLogin,
				'usuarioSenha': usuario_Global.usuarioSenha
			}
		}).done( function(data){
			// console.log(data);
			try{
				data = JSON.parse(data);
				// console.log(data);
				if(data.debug == "OK"){
					$("#osIdEdit").val(data.OS);
					$("#osIdCombo").val(data.OS);
					$("#osId").val(data.ID_OS);
					$("#osIdCombo-flexdatalist").val(data.DS_OS);
				}
			} catch(error){
				console.error(error);
			}
		});
	}
}


function buscaPreRequi(){
	$("#divListaPreRequi").html(carrega);
	$.ajax({
		url: caminhoRequisicao + "lb/controllerPreRequi.php",
		type: "POST",
		dataType: "text",
		data: {
			'buscaPreRequi': true,
			'data': $("#dataPreRequisicao").val(),

			'usuarioID': usuario_Global.usuarioID,
			'usuarioNome': usuario_Global.usuarioNome,
			'usuarioLogin': usuario_Global.usuarioLogin,
			'usuarioSenha': usuario_Global.usuarioSenha
		}
	}).done( function(data){
		console.log(data);
		$("#divListaPreRequi").html(data);
	});
}


function minimizarMax(){
	if (mostra == "show") {
		mostra = 'hide';
		$("#conteudoProduto").hide(1000);
		$("#buttonMini").html("<i class='fa fa-plus'></i>");
	} else {
		mostra = 'show';
		$("#conteudoProduto").show(1000);
		$("#buttonMini").html("<i class='fa fa-minus'></i>");
	}
}


function mudarPagina(el, divId){
	var elementoMenu = document.getElementsByName("menuPre");
	var elementoContMenu = document.getElementsByName("conteudoMenu");

	for (var i = 0; i < elementoMenu.length; i++) {
		elementoMenu[i].className = "";
		elementoContMenu[i].className = "hidden";
	}
	$(el)[0].className = "active";
	$("#" + divId)[0].className =  "";
}



/* Executar onloard */
buscarOs();
buscaPreRequi();