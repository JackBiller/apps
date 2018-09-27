/*********************************************************************************************************************/
/*-----------------------------------------//** Separado Codigo **//*------------------------------------------------*/
/*********************************************************************************************************************/

function excluirPedido(id){

	bootbox.confirm({
		title: "Tem certeza que deseja excluir este pedido?",
		message: "Ao aperta o botão \"Sim\" você irá excluir este pedido por completo do sistema",
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
				/* remover itens */
				$.ajax({
					type: 'GET',
					url: urlWebService+"PedidoWS/removerItens/"+id+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				/* remover pedido */
				$.ajax({
					type: 'GET',
					url: urlWebService+"PedidoWS/remover/"+id+parametrosWebService,
					contentType: "application/json",
					jsonpCallback: "localJsonpCallback"
				}).done( function(data){ console.log("data:"+data); });

				toastGeral("info", "Pedido removido com sucesso!");
				$("#linhaPedido"+id).remove();
			}
		}
	});
}


/* Funções Genericas Para Projetos */
function editar(el){
	var id_cliente_unid_cons = $(el).data("id");
	$("#editar").val(id_cliente_unid_cons);
}

function editarId(id){
	document.getElementById("btn_salvar_item_ao_pedido").disabled = false;
	$("#editar").val(id);
	$("#documentoGeral").val(id);
	verificarPedidoSelecionado();
}

function n_editar(){
	$("#editar").val(0);
	$("#fichaPesquisa").val(0);
	$("#documentoGeral").val("0");
}

function maius(obj){
	obj.value = obj.value.toUpperCase();
}

function subirPagina(){
	var html = document.documentElement;
	html.scrollLeft = 0;
	html.scrollTop = 0;
}


function pegarData(){
	var now = new Date;
	var diaCerto = now.getDate();
	var mesCerto = now.getMonth() + 1;

	if (diaCerto < 10) 	diaCerto = "0" + diaCerto;
	if (mesCerto < 10) 	mesCerto = "0" + mesCerto;

	var dataAtual = now.getFullYear() + "-" + mesCerto + "-" + diaCerto;
	return dataAtual;
}

function pegarDataHora(){
	var now = new Date;
	var diaCerto = now.getDate();
	var mesCerto = now.getMonth() + 1;
	var hora = now.getHours();
	var minuto = now.getMinutes();
	var segundo = now.getSeconds();


	if (diaCerto < 10) 	diaCerto 	= "0" + diaCerto;
	if (mesCerto < 10) 	mesCerto 	= "0" + mesCerto;
	if (hora 	 < 10) 	hora 		= "0" + hora;
	if (minuto 	 < 10) 	minuto 		= "0" + minuto;
	if (segundo  < 10) 	segundo 	= "0" + segundo;


	var dataAtual = now.getFullYear()+"-"+mesCerto+"-"+diaCerto+" "+hora+":"+minuto+":"+segundo;  
	return dataAtual;
}


function formatarData(dataUN){
	dataUN = dataUN.split("-");
	var anoCerto = dataUN[0].substring(2, 4);
	dataUN = dataUN[2]+"/"+dataUN[1]+"/"+anoCerto;
	return dataUN;
}


function formataData(data){
	data = data.split("/");
	return data[2] + "-" + data[1] + "-" + data[0];
}


function formatarDataUN(dataUN){
	dataUN = dataUN.split("-");
	var anoCerto = dataUN[0].substring(2, 4);
	dataUN = dataUN[2]+"/"+dataUN[1]+"/"+anoCerto;
	return dataUN;
}



function limitarValorNum(id, valor){
	var valorElemento = document.getElementById(id).value;
	if (valorElemento.length > valor) {
		document.getElementById(id).value = valorElemento.substring(0, valor);
	}
}


function calculaTotalItem(){
	var quantidade = $("#modalQtdItem").val();
	
	formataValorParaCalcular(quantidade);
	var vlrUnitario = $("#modalVlrUnitarioItemReal").val();
	vlrUnitario = formataValorParaCalcular2(String(vlrUnitario));
	
	var codDescota = $("#qtd_n_cobrar").val();
	codDescota = codDescota != "" ? codDescota : 0;
	var contSelecionado = 0;
	var valorDesconto = 0;
	var numItemsDesconto = 0;
	var valorUnitario = 0;
	var contDesconto = 0;

	var vlrUnitarioComplemto = [];
	for(var i = 0; i < itensAdicionalArray.length; i++){
		if (document.getElementById("inputAdicional_"+itensAdicionalArray[i]).checked) {
			valorUnitario = $("#vlrUnitarioItemComplemento_"+itensAdicionalArray[i]).html();
			/* console.log("valorUnitario: "+valorUnitario); */
			vlrUnitarioComplemto.push(parseFloat(valorUnitario));
			contSelecionado++;
		}
	}

	vlrUnitarioComplemto.sort();
	/* console.log("contSelecionado: "+contSelecionado+"\ncodDescota: "+codDescota); */
	numItemsDesconto = parseInt(contSelecionado) - parseInt(codDescota);
	if (numItemsDesconto > 0) {
		for (var i = vlrUnitarioComplemto.length - 1; i >= 0; i--) {
			valorDesconto = parseFloat(vlrUnitarioComplemto[i]) + parseFloat(valorDesconto);
			contDesconto++;
			i = numItemsDesconto == contDesconto ? -1 : i;
		}
	}
	/* console.log(valorDesconto); */

	vlrUnitario = parseFloat(valorDesconto) + parseFloat(vlrUnitario);

	if (quantidade != "" && vlrUnitario != "") {
		/* vlrUnitario = formataValorParaCalcular2(vlrUnitario);
		vlrAdicional = formataValorParaCalcular(vlrAdicional); */

		var total = quantidade * vlrUnitario;
		/* total = parseFloat(total) + parseFloat(vlrAdicional); */

		total = formataValorParaImprimir(total);
		vlrUnitario = formataValorParaImprimir(vlrUnitario);
		$("#modalVlrTotalItem").val(total);
		$("#modalVlrUnitarioItem").val(vlrUnitario);
	} else {
		$("#modalVlrTotalItem").val("");
	}
}

function formataValorParaCalcular(valor){
	valor = String(valor);
	valor = valor.replace("R$", "");
	/* valor = valor.replace(".", ""); */
	valor = valor.replace(" ", "");
	valor = valor.replace(",", "");
	valor = parseFloat(valor);
	valor = valor.toFixed(2);
	return valor;
}

function formataValorParaCalcular2(valor){
	/* console.log(valor); */
	if (valor != undefined) {
		valor = valor.replace("R$", "");
		valor = valor.replace(".", "");
		valor = valor.replace(" ", "");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		valor = valor.toFixed(2);
	}
	return valor;
}

function formataValorParaImprimir(valor){
	valor = parseFloat(valor);
	if (valor >= 0) {
		valor = valor.toFixed(2);
		valor = valor.replace(".", ",");
		valor = "R$"+valor;
	}else {
		valor = valor * (-1);
		valor = valor.toFixed(2);
		valor = valor.replace(".", ",");
		valor = "R$-"+valor;
	}
	/* valor = moeda(valor , 2 , "," , "."); */
	
	return valor;
}

function formatarValorParaDecimal(valor){	
	valor = parseFloat(valor);
	valor = valor.toFixed(2);
	valor = valor.replace(".", ",");
	/* valor = "R$ "+valor; */
	return valor;
}

function formataValorParaQuantidade(valor){
	valor = parseFloat(valor);
	valor = valor.toFixed(3);
	valor = valor.replace(".",",");
	return valor;
}


function botaVoltarMenuPrincipal(){
	var motarSubMenu = "<button onclick='setStatus(\"inicial\");n_editar();montarMenuPrincipal()' class='btn btn-info' title='Voltar'>";
	motarSubMenu += "<i class='fa fa-arrow-left' aria-hidden='true'></i>&nbsp;";
	motarSubMenu += "Voltar";
	motarSubMenu += "</button>";

	$("#botaoVoltarFixo").html(motarSubMenu);
}

function botaoVoltarPedido(id){
	var motarSubMenu = "	<button onclick='setStatus(\"pagina2\");montarListaItem(\""+id+"\")' class='btn btn-info' title='Voltar'>";
	motarSubMenu += "		<i class='fa fa-arrow-left' aria-hidden='true'></i>&nbsp;";
	motarSubMenu += "		Voltar ao pedido";
	motarSubMenu += "	</button>";

	$("#botaoVoltarFixo").html(motarSubMenu);
}

function moeda(valor, casas, separdor_decimal, separador_milhar){ 
 	var valor_total = parseInt(valor * (Math.pow(10,casas)));
	var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
	var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
	
	if(centavos%10 == 0 && centavos+"".length<2 ){
		centavos = centavos+"0";
	}else if(centavos<10){
		centavos = "0"+centavos;
	}
	 
	var milhares = parseInt(inteiros/1000);
	inteiros = inteiros % 1000; 
	
	var retorno = "";
	
	if(milhares>0){
		retorno = milhares+""+separador_milhar+""+retorno;
		if(inteiros == 0){
			inteiros = "000";
		} else if(inteiros < 10){
			inteiros = "00"+inteiros; 
		} else if(inteiros < 100){
			inteiros = "0"+inteiros; 
		}
	}
	retorno += inteiros+""+separdor_decimal+""+centavos;	
	return retorno;
}

function setasr_mask(){
	jQuery(function($){
		$('.cpf').mask("999.999.999-99");
		$('.rg').mask("aa-99.999.999");
		$('.cnpj').mask("99.999.999/9999-9");

		$('.telefone').mask("(99) 9999-9999");
		$('.celular').mask("(99) 9 9999-9999");

		$('.cep').mask("99.999-999");
	});

	/*$.mask.definitions['H'] = "[0-2]";
	$.mask.definitions['h'] = "[0-9]";
	$.mask.definitions['O'] = "[0-5]";
	$.mask.definitions['m'] = "[0-9]";*/

	$("input[rel=data], input[data-mask=data]").mask("99/99/9999");
	$("input[data-mask=ano]").mask("9999");
	$("input[rel=hora], input[data-mask=hora]").mask("Hh:Om");
	$("input[rel=minutos], input[data-mask=minutos]").mask("99?9M");
	$("input[rel=placa], input[data-mask=placa]").mask("aaa-9999");
	$("input[rel=cpf], input[data-mask=cpf]").mask("999.999.999-99");
	$("input[rel=cnpj], input[data-mask=cnpj]").mask("99.999.999/9999-99");
	$("input[rel=cei], input[data-mask=cei]").mask("99.9999999.99-99");
	$("input[rel=ncm], input[data-mask=ncm]").mask("9999.99.99");
	$("input[rel=cest], input[data-mask=cest]").mask("99.9999.99");
	$("input[rel=cnae], input[data-mask=cnae]").mask("9999-9.99");
	$("input[rel=planoDeContas], input[data-mask=planoDeContas]").mask("9.9.99.99.99");
	$("input[rel=cep], input[data-mask=cep]").mask("99999-999");
	$("input[rel=ean], input[data-mask=ean]").mask("9999999999999");

	$("input[rel=quantidade], input[data-mask=quantidade]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: ""});
	$("input[rel=porcento], input[data-mask=porcento]").maskMoney({showSymbol: true, symbol:"%" , decimal: ",", thousands: ""});
	$("input[rel=decimalGeral], input[data-mask=decimalGeral]").maskMoney({showSymbol: true, symbol:"" , decimal: ",", thousands: ""});
	$("input[rel=dinheiro], input[data-mask=dinheiro]").maskMoney({showSymbol: true, symbol: "R$", decimal: ",", thousands: ""});
	$("input[rel=peso4dec], input[data-mask=peso4dec]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: "."});

	$("input[data-mask=num1dec]").maskMoney({showSymbol: false, precision: 1, decimal: ",", thousands: "."});
	$("input[data-mask=num2dec]").maskMoney({showSymbol: false, precision: 2, decimal: ",", thousands: "."});
	$("input[data-mask=num3dec]").maskMoney({showSymbol: false, precision: 3, decimal: ",", thousands: "."});
	$("input[data-mask=num4dec]").maskMoney({showSymbol: false, precision: 4, decimal: ",", thousands: "."});

	$("input[rel=telefone], input[rel=celular], input[data-mask=telefone], input[data-mask=celular]").focusout(function () {
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if (phone.length > 10) {
			element.mask("(99) 99999-999?9");
		} else {
			element.mask("(99) 9999-9999?9");
		}
	}).trigger('focusout');

	$("input[rel=telefone_sem_ddd], input[rel=celular], input[data-mask=telefone_sem_ddd], input[data-mask=celular]").focusout(function () {
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if (phone.length > 10) {
			element.mask("99999-999?9");
		} else {
			element.mask("9999-9999?9");
		}
	}).trigger('focusout');
}

function maiuscula(z){
	return z.toUpperCase();
}

function ajaxGeral(type, pasta, caminho, param){
	/* NÃO FUNCIONA ESTA FUNÇÃO */
	var result = 0;
	if (type == "GET") {
		$.ajax({
			type: 'GET',
			url: urlWebService+pasta+"/"+caminho+"/"+param+parametrosWebService,
			contentType: "application/json",
			jsonpCallback: "localJsonpCallback"
		}).done( function(data){
			result = data;
		});
	}
	return result;
}

function toastGeral(icone, text){
	$.toast({
		text: text, 
		heading: 'Nota', 
		icon: icone, 
		showHideTransition: 'slide', 
		allowToastClose: true, 
		hideAfter: 2500, 
		stack: 5, 
		position: 'top-left',
		extAlign: 'right',
		loader: true,
		loaderBg: '#44f'
	});
}


function removerCaracter(valor){
	/* Letras do alfabento minusculas */
	valor = valor.replace(/a/gi, "");
	valor = valor.replace(/b/gi, "");
	valor = valor.replace(/c/gi, "");
	valor = valor.replace(/d/gi, "");
	valor = valor.replace(/e/gi, "");
	valor = valor.replace(/f/gi, "");
	valor = valor.replace(/g/gi, "");
	valor = valor.replace(/h/gi, "");
	valor = valor.replace(/i/gi, "");
	valor = valor.replace(/j/gi, "");
	valor = valor.replace(/k/gi, "");
	valor = valor.replace(/l/gi, "");
	valor = valor.replace(/m/gi, "");
	valor = valor.replace(/n/gi, "");
	valor = valor.replace(/o/gi, "");
	valor = valor.replace(/p/gi, "");
	valor = valor.replace(/q/gi, "");
	valor = valor.replace(/r/gi, "");
	valor = valor.replace(/s/gi, "");
	valor = valor.replace(/t/gi, "");
	valor = valor.replace(/u/gi, "");
	valor = valor.replace(/v/gi, "");
	valor = valor.replace(/w/gi, "");
	valor = valor.replace(/x/gi, "");
	valor = valor.replace(/y/gi, "");
	valor = valor.replace(/z/gi, "");


	/* Caracteres espacias */
	valor = valor.replace(/\*/g, "");
	valor = valor.replace(/\//g, "");
	valor = valor.replace(/\./g, "");
	valor = valor.replace(/\;/g, "");
	valor = valor.replace(/\:/g, "");
	valor = valor.replace(/\</g, "");
	valor = valor.replace(/\>/g, "");
	valor = valor.replace(/\+/g, "");
	valor = valor.replace(/\%/g, "");
	valor = valor.replace(/\+/g, "");
	valor = valor.replace(/\!/g, "");
	valor = valor.replace(/\@/g, "");
	valor = valor.replace(/\§/g, "");
	valor = valor.replace(/\{/g, "");
	valor = valor.replace(/\}/g, "");
	valor = valor.replace(/\[/g, "");
	valor = valor.replace(/\]/g, "");
	valor = valor.replace(/\º/g, "");
	valor = valor.replace(/\ª/g, "");
	valor = valor.replace(/\?/g, "");
	valor = valor.replace(/\°/g, "");
	valor = valor.replace(/\(/g, "");
	valor = valor.replace(/\)/g, "");
	valor = valor.replace(/\&/g, "");
	valor = valor.replace(/\$/g, "");
	valor = valor.replace(/\|/g, "");
	valor = valor.replace(/\#/g, "");
	valor = valor.replace(/\¬/g, "");
	valor = valor.replace(/\¢/g, "");
	valor = valor.replace(/\£/g, "");
	valor = valor.replace(/\-/g, "");
	valor = valor.replace(/\_/g, "");
	valor = valor.replace(/\=/g, "");
	valor = valor.replace(/\¹/g, "");
	valor = valor.replace(/\²/g, "");
	valor = valor.replace(/\³/g, "");
	valor = valor.replace(/\₢/g, "");
	valor = valor.replace(/\'/g, "");
	valor = valor.replace(/\"/g, "");
	valor = valor.replace(/\\/g, "");
	valor = valor.replace(/ /g, "");


	/* Caracteres de acentuação */
	valor = valor.replace(/\¨/g, "");
	valor = valor.replace(/\´/g, "");
	valor = valor.replace(/\`/g, "");
	valor = valor.replace(/\^/g, "");
	valor = valor.replace(/\~/g, "");


	/* Caracteres acentuados minusculo */
	valor = valor.replace(/ü/gi, "");
	valor = valor.replace(/ï/gi, "");
	valor = valor.replace(/ö/gi, "");
	valor = valor.replace(/ä/gi, "");
	valor = valor.replace(/ë/gi, "");
	valor = valor.replace(/ÿ/gi, "");

	valor = valor.replace(/á/gi, "");
	valor = valor.replace(/é/gi, "");
	valor = valor.replace(/ú/gi, "");
	valor = valor.replace(/í/gi, "");
	valor = valor.replace(/ó/gi, "");
	valor = valor.replace(/ý/gi, "");

	valor = valor.replace(/à/gi, "");
	valor = valor.replace(/è/gi, "");
	valor = valor.replace(/ì/gi, "");
	valor = valor.replace(/ù/gi, "");
	valor = valor.replace(/ò/gi, "");

	valor = valor.replace(/ã/gi, "");
	valor = valor.replace(/õ/gi, "");
	valor = valor.replace(/ñ/gi, "");

	valor = valor.replace(/â/gi, "");
	valor = valor.replace(/ê/gi, "");
	valor = valor.replace(/û/gi, "");
	valor = valor.replace(/ô/gi, "");
	valor = valor.replace(/î/gi, "");

	/* Ç */
	valor = valor.replace(/ç/gi, "");

	if (valor == "") valor = 0;
	else {
		var vetor = valor.split(",");
		if (vetor.length > 1) {
			var complemento = "";
			for (var i = 1; i < vetor.length; i++) {
				complemento += vetor[i];
			}
			valor = vetor[0]+","+complemento;
		}
	}

	return valor;
}


function objetoTradutorDataTable(){
	return {
				'paging'			: true,
				'lengthChange'		: true,
				'searching'			: true,
				'ordering'			: true,
				'info'				: true,
				"language": {
					"decimal"			: ",",
					"loadingRecords"	: "Carregando...",
					"processing"		: "Processando...",
					"search"			: "Buscar: &nbsp;&nbsp;&nbsp;&nbsp;",
					"lengthMenu"		: "Listar de _MENU_ registros",
					"zeroRecords"		: "Nenhum registro encontrado",
					"info"				: "Pagina: _PAGE_ de _PAGES_",
					"infoEmpty"			: "Nenhum registro",
					"infoFiltered"		: "( filtrado entre _MAX_ registro(s) )",
					"paginate": {
						"first"		: "Primeiro",
						"last"		: "Último",
						"next"		: "Proximo",
						"previous"	: "Anterior"
					}
				}
			}
}