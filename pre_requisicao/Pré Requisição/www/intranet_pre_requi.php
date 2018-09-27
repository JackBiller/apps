<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="shortcut icon" href="./favicon.ico" />
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE; charset=utf-8" />
	<title>Sanhidrel Engekit - Intranet</title>
	<!-- Estilos -->
	<link rel="stylesheet" type="text/css" href="lb/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lb/css/font-awesome/css/font-awesome.min.css">

	<!-- Jquery -->
	<!-- <script type="text/javascript" src="lb/jQuery.js"></script> -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="lb/bootstrap.js" type="text/javascript"></script>


	<!-- Combo de seleção -->
	<link href="lb/jquery-flexdatalist/jquery.flexdatalist.min.css" rel="stylesheet" type="text/css">
	<script src="lb/jquery-flexdatalist/jquery.flexdatalist.min.js"></script>


	<!-- Scripts -->
	<script type="text/javascript" src="lb/scripts.js"></script>
</head>

<script type='text/javascript' language='JavaScript'>
// <!--
/*
function popWindow(wName){
	features = 'width=1450,height=500,toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no';
	pop = window.open('',wName,features);
	if(pop.focus){ pop.focus(); }
	return true;
}
*/
// -->
</script>
<body>

<div class="container" style='background-color: white;padding: 0'>
	<div class="header">
		<a href="intranet_html.php">
			<img src="./imagens/nova2.png" alt="Inserir o logotipo aqui" name="Insert_logo" width="100%" id="Insert_logo" style="background-color: #C6D580; display:block;" /><!-- width="1109" height="158" -->
		</a>
		<a href="#"></a>
		<!-- end .header -->
	</div>
	
	<div class="content" style="padding-left: 20px; padding-right: 20px;"><br>
		 <?php  include('pre_requisicao.php');?>
		 <h2>Pré requisição de produto</h2> 
		 <div class='row'>
		 	<div class='col-xs-12'>
		 		<div class='col-xs-6' style='padding-left: 15px;border-right: 2.5px solid gray;'>
		 			<table width='100%' class='table'>
		 				<tr>
		 					<td width='25%'>
		 						Código:
		 						<input type='text' class='form-control' id='codigoProduto'>
		 					</td>
		 					<td width='75%'>
		 						Descrição:
		 						<input type='text' class='form-control' id='descricaoProduto'>
		 					</td>
		 				</tr>
		 			</table>
		 			<table width='100%' class='table'>
		 				<tr>
		 					<td width='50%'>
		 						Marca:
		 						<input type='text' class='form-control' id='marcaProduto'>
		 					</td>
		 					<td width='50%'>
		 						Cor: 
		 						<input type='text' class='form-control' id='corProduto'>
		 					</td>
		 				</tr>
		 			</table>
		 			<button class='btn btn-primary' onclick='filtrarProdutos()' title="Consultar produtos conforme filtros">
		 				<i class='fa fa-search'></i>&nbsp;&nbsp;&nbsp;Consultar
		 			</button>
		 			<button class="btn btn-info" onclick="novoPreRequi()" title="Incluir nova Pré Requisição">
		 				<i class="fa fa-file-o"></i>&nbsp;&nbsp;&nbsp;Novo
		 			</button>
		 			<br><br><br>
		 			<div id='resultado' class='text-center table-responsive'></div>
		 		</div>
		 		<div class='col-xs-6'>
		 			<ul class="nav nav-tabs">
		 				<li role="presentation" class="active" name='menuPre' id='preHead' onclick="buscaPreRequi();mudarPagina(this, 'listaPreRequi')">
		 			  		<a href="#">Pré Requisições</a>
		 			  	</li>
		 				<li role="presentation" name='menuPre' id='itemPreHead' onclick="mudarPagina(this, 'listaItemsPreReqi')">
		 					<a href="#">Itens da Pré-Requisição</a>
		 				</li>
		 			</ul>
		 			<div id="listaPreRequi" name='conteudoMenu'>
		 				<h3>Pré Requisições</h3>
	 				 	<!-- <div class='col-xs-12 text-right'> -->
 				 		<table width="100%" style="margin-top: -40px;margin-bottom: 10px;">
 				 			<tr>
 				 				<td width="50%"></td>
 				 				<td width="50%">
 									<input type="date" id="dataPreRequisicao" onchange="buscaPreRequi()" class="form-control">
 									<script type="text/javascript">
 										// document.getElementById("dataPreRequisicao").value = pegarData();
 									</script>
 				 				</td>
 				 			</tr>
 				 		</table>
	 					<!-- </div> -->
		 				<div id="divListaPreRequi"></div>
		 			</div>
		 			<div id="listaItemsPreReqi" name='conteudoMenu' class="hidden">
		 				<h3>Itens da Pré Requisição</h3>

		 				<!-- Obra: -->
		 				<div id="divOsIdCombo">
		 					<input type="text" id="obraPedido" class="form-control">
		 				</div>
		 				<br>
		 				Referência: 
		 				<input type="text" id="referenciaPedido" class="form-control">
		 				<br>
		 				Produtos:
		 				<div id="itensBuscados">
		 					<h3 style="text-align: center;">Nenhum Produto</h3>
			 				<!-- <table class="table" style="font-size:10px;margin:0;" border="1">
			 					<tr>
			 						<td width="40%"><b>Item</b></td>
			 						<td width="25%"><b>Requisitar</b></td>
			 						<td width="5%"><b>UN</b></td>
			 						<td width="20%"><b>Estoque</b></td>
			 						<td width="10%"></td>
			 					</tr>
			 				</table> -->
		 				</div>
		 				<br>

		 				Observação:
		 				<input type="text" id="observacaoPedido" class="form-control">
		 				<br>

		 				<div style="width: 100%" class="text-right">
		 					<button class="btn btn-success" onclick="confirmItem(false)" title="Salvar dados de Pré Requisição">
		 						<i class="fa fa-floppy-o"></i>&nbsp;&nbsp;Salvar
		 					</button>
		 					<!-- &nbsp;&nbsp; -->
		 					<button class="btn btn-primary" onclick="imprimirReuisicao()" title="Imprimir Pré Requisição">
		 						<i class="fa fa-print"></i>&nbsp;&nbsp;Imprimir
		 					</button>
		 					<!-- &nbsp;&nbsp; -->
		 					<button class="btn btn-warning" onclick="confirmRequisicao()" title="Enviar Pré Requisição para aprovação do gerente">
		 						<i class="fa fa-arrow-right"></i>&nbsp;&nbsp;Enviar p/ Aprovação
		 					</button>
		 					<!-- &nbsp;&nbsp; -->
		 					<button class="btn btn-danger" onclick="apagarPreRequisicao()" title="Cancelar Pré Requisição completa">
		 						<i class="fa fa-times"></i>&nbsp;&nbsp;Cancelar
		 					</button>
		 				</div>
		 			</div>
		 		</div>
		 		<br><br><br><br>
		 	</div>
		 </div>
	</div>
	<div class="footer">
		<p>Sanhidrel - Engekit. Todos os direitos reservados.</p>
	</div>
	<!-- end .footer -->
</div>
<!-- end .container -->




<!-- Modal para Adicionar Item -->
<div class="modal fade" id="modalAdicionaItem" role="dialog">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" id="fecharModalIpBottun" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Adicionar Produto: </h4>
			</div>
			<div class="modal-body">
				Descrição:
				<input type="text" class="form-control" id="descricaoItem" disabled>
				<br>
				Requisitar:
				<input type="text" class="form-control" id="requisitarItem">
				<br>
				<table width="100%">
					<tr>
						<td width="50%">
							Unidade de Medida:
							<input type="text" class="form-control" id="unidadeMedidaItem" disabled>
						</td>
						<td width="50%">
							Estoque:
							<input type="text" class="form-control" id="estoqueItem" disabled>
						</td>
					</tr>
					<tr>
						<td width="50%">
							Marca:
							<input type="text" class="form-control" id="marcaItem" disabled>
						</td>
						<td width="50%">
							Cor:
							<input type="text" class="form-control" id="corItem" disabled>
						</td>
					</tr>
				</table>
				<input type="hidden" id="codigoReferenciaItem">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" onclick="confirmItem(true)">
					Salvar
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Fechar
				</button>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	
	var carrega = "<img src='lb/carrega.gif' width='60%'>";
	var mostra = "show";
	var item_Global = "";
	var itenConfirmado = true;
	var idPreRequi = 0;
	var numItens = 0;

	$("#descricaoProduto").blur(function(){ filtrarProdutos() });
	// $("#marcaProduto").blur(function(){ filtrarProdutos() });
	// $("#corProduto").blur(function(){ filtrarProdutos() });

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
				url: "lb/controllerProduto.php",
				type: "POST",
				dataType: "text",
				data: {
					'descricao': descricao,
					'marca': marca,
					'cor': cor,
					'codigo': codigo
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
				url: "lb/controllerPreRequi.php",
				type: "POST",
				dataType: "text",
				data: {
					'msmProtudto': true,
					'codigo_referencia': codigoReferencia,
					'marca': sigla,
					'cor': cor,
					'idPreRequi': idPreRequi
				}
			}).done( function(data){
				console.log(data);
				try {
					if(Number(data) == 0){
						continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida);
					} else {
						alert("Produto já foi selecionada nesta Pré Requisição!");
					}
				} catch(error){
					alert("Falha ao tentar consultar repitividade do produto: " + error);
				}	
			});
		} else {
			continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida);
		}		
	}

	function continuaSelecionarItem(codigo, codigoReferencia, descricao, estoque, estoque_ext, sigla, cor, marca, unidadeMedida){
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
				"DS_DETALHE": cor
			}

			$("#descricaoItem").val(item_Global.DS_PRODUTO);
			$("#unidadeMedidaItem").val(item_Global.SIGLA_UNIDADE_MEDIDA);
			$("#estoqueItem").val( Number(item_Global.QTD_ESTOQUE) + " + " + Number(item_Global.QTD_ESTOQUE_EXT) );
			$("#codigoReferenciaItem").val(item_Global.CODIGO_REFERENCIA);
			$("#marcaItem").val(item_Global.SIGLA_MARCA);
			$("#corItem").val(item_Global.DS_DETALHE);
			$("#requisitarItem").val("");

			$("#modalAdicionaItem").modal("show");

		} else {
			alert("Você já um item selecionado");
		}
	}



	function confirmItem(boolModal){
		var valido = true;
		if (
			$("#osId").val() == 0			 			|| 
			$("#osId").val() == "0"		 				|| 
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
				url: "lb/controllerPreRequi.php",
				type: "POST",
				dataType: "text",
				data: {
					'adicionarPreRequi': true,
					'idPreRequi': idPreRequi,
					'id_os': $("#osId").val(),
					'dt_emissao': pegarData(),
					'dsreferencia': $("#referenciaPedido").val(),
					'observacao': $("#observacaoPedido").val(),
					
					'codigo_referencia': $("#codigoReferenciaItem").val(),
					'sigla_marca': $("#marcaItem").val(),
					'ds_detalhe': $("#corItem").val(),
					'qtd_item': $("#requisitarItem").val(),
					'qtd_estoqueAtual': estoque,
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
		$("#itemPreHead").click();
		$("#osIdEdit")[0].disabled = true;
		$("#osIdCombo")[0].disabled = true;
		$("#osIdCombo-flexdatalist")[0].disabled = true;

		$.ajax({
			url: "lb/controllerPreRequi.php",
			type: "POST",
			dataType: "text",
			data: {
				'pesquisaReuiId': true,
				'id': id
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
			url: "lb/controllerPreRequi.php",
			type: "POST",
			dataType: "text",
			data: {
				'listaItemRequi': true,
				'id': idPreRequi
			}
		}).done( function(data){
			console.log(data);
			limpaCamposItens();
			data = data.split("/,/,/,/,/");
			$("#itensBuscados").html(data[0])
			numItens = data[1];
		});
	}


	function removerItem(id){
		if (numItens > 1) {
			if(confirm("Deseja remover este item da Pré Requisição?")){
				$.ajax({
					url: "lb/controllerPreRequi.php",
					type: "POST",
					dataType: "text",
					data: {
						'removerItem': true,
						'id': id
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
					url: "lb/controllerPreRequi.php",
					type: "POST",
					dataType: "text",
					data: {
						'confirmarEnvio': true,
						'id': idPreRequi
					}
				}).done( function(data){
					console.log(data);
					try{
						ParseInt(data);
						if (Number(data) == 1) {
							alert("Enviado com sucesso!");
							novoPreRequi();
						} else {
							alert("Falha ao tentar enviar para aprovação: " + data);
						}
					} catch(erro){
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
					url: "lb/controllerPreRequi.php",
					type: "POST",
					dataType: "text",
					data: {
						'apagarPreRequisicao': true,
						'id': idPreRequi
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
			url: "lb/controllerOs.php",
			type: "POST",
			dataType: "text",
			data: {'buscaOs': true}
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
	buscarOs();


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
				url: "lb/controllerOs.php",
				type: "POST",
				dataType: "text",
				data: {
					'pesquisaIdOs': true,
					'id': id
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
			url: "lb/controllerPreRequi.php",
			type: "POST",
			dataType: "text",
			data: {
				'buscaPreRequi': true,
				'data': $("#dataPreRequisicao").val()
			}
		}).done( function(data){
			console.log(data);
			$("#divListaPreRequi").html(data);
		});
	}
	buscaPreRequi();


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
</script>
<style type="text/css">
	body{
		background-color: #42413C;
	}
	.footer {
		padding: 10px 0;
		background-color: #F2F2F2;
		position: relative;/* isso possibilita que o hasLayout do IE6 faça a limpeza corretamente. */
		clear: both; /* essa propriedade de limpeza força o contêiner a reconhecer o conteúdo das colunas e onde elas terminam. */
	}

	#buttonMini{
		position: absolute;
		right: 15px;
		font-size: 10px;
	}
</style>
</body>
</html>
