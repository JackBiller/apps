
$(document).ready(function(){
	buscar_relatorios();
});

var colunasFiltroTotal = 0;


function buscar_relatorios(){
	var id_relatorios = "";
	var descricao_relatorios = "";
	var tabela_relatorios = "";
	var colunas_relatorios = "";
	var colunas_estrangeiras_relatorios = "";
	var bool_filtro_ativo_relatorios = "";
	var data_atualizacao_relatorios = "";
	var usuario_id = "";
	var bool_ativo_relatorios = "";


	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroRelatorios = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var simOUnao = "";
	var colunasFormatadas = "";
	var colunasEstrnageirasFormatadas = "";
	var vetorColunaEstrangeira = [];
	var oldtable = "";

	$("#conteudoCards").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_relatorios': true,
			'filtro': $("#pesquisa_relatorios").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroRelatorios += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroRelatorios += "<br>";

			telaCadastroRelatorios += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				id_relatorios = subvetor[0];
				descricao_relatorios = subvetor[1];
				tabela_relatorios = subvetor[2];

				colunas_relatorios = subvetor[3];
				colunas_relatorios = colunas_relatorios.split("+");
				for (var j = 0; j < colunas_relatorios.length; j++) {
					colunasFormatadas += colunas_relatorios[j]+"<br>";
				}

				colunas_estrangeiras_relatorios = subvetor[4];
				colunas_estrangeiras_relatorios = colunas_estrangeiras_relatorios.split("+");
				if (colunas_estrangeiras_relatorios[0] != "") {
					for (var k = 0; k < colunas_estrangeiras_relatorios.length; k++) {
						vetorColunaEstrangeira = colunas_estrangeiras_relatorios[k].split("_tr_");
						if (k == 0 || oldtable != vetorColunaEstrangeira[1]) {
							oldtable = vetorColunaEstrangeira[1];
							colunasEstrnageirasFormatadas += 
								"<u>"+vetorColunaEstrangeira[1]+":</u>"+
								"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
								vetorColunaEstrangeira[2]+"<br>";
						}
						else {
							oldtable = vetorColunaEstrangeira[1];
							colunasEstrnageirasFormatadas += 
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
								vetorColunaEstrangeira[2]+"<br>";
						}						
					}
				}



				bool_filtro_ativo_relatorios = subvetor[5];
				bool_filtro_ativo_relatorios = bool_filtro_ativo_relatorios == 1 ? "Sim" : "Não";

				data_atualizacao_relatorios = subvetor[6];
				usuario_id = subvetor[7];
				bool_ativo_relatorios = subvetor[8];
				
				acumularFunctionId.push(id_relatorios);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				// if (bool_ativo_relatorios == 1) { 
				// 	desabilitar = "";
				// 	icone_ativo = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
				// 	cor_ativo = "#0f0;";
				// 	valorAtivo = 0;
				// } else {
				// 	desabilitar = "disabled";
				// 	cor_ativo = "#f00;";
				// 	icone_ativo = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
				// 	valorAtivo = 1;
				// }

				tabelaViewBody += 		"<tr id='linha_ativo_"+id_relatorios+"'>";
				// tabelaViewBody +=			"<td align='center'>";
				// tabelaViewBody +=				"<a href='principal.php#!pdf_edita' style='color: #f0ad4e;' data-id='"+id_relatorios+"' onclick='editar(this);' title='Editar' "+desabilitar+">";
				// tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				// tabelaViewBody += 				"</a>";
				// tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='#!pdf_lista' style='color: blue;' onclick=\"chamarModalRelatorio("+id_relatorios+")\">";
				tabelaViewBody += 					"<i class=\"fa fa-print\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 			"<td>"+descricao_relatorios+"</td>";
				tabelaViewBody += 			"<td>"+tabela_relatorios+"</td>";
				tabelaViewBody += 			"<td>"+colunasFormatadas+"</td>";
				tabelaViewBody += 			"<td>"+colunasEstrnageirasFormatadas+"</td>";
				tabelaViewBody += 			"<td>"+bool_filtro_ativo_relatorios+"</td>";				
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_relatorios)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_relatorios)+"'></div></td>";
				tabelaViewBody += 			"<td align='center'>";
				// tabelaViewBody += 				"<div >";
				tabelaViewBody += 				"<a href='#!pdf_lista' style='color: #f00;' data-id='"+id_relatorios+"' onclick=\"excluirDefinitivamente(this , 'relatorios')\">";
				tabelaViewBody += 					"<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				// tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 		"</tr>";

				colunasFormatadas = "";
				colunasEstrnageirasFormatadas = "";
				colunas_relatorios = "";
			}
			telaCadastroRelatorios += 	"<table class='table'>";
			telaCadastroRelatorios += 		"<tr bgcolor='white'>";
			// telaCadastroRelatorios += 			"<td><b>Editar</b></td>";
			telaCadastroRelatorios += 			"<td><b>Emitir</b></td>";
			telaCadastroRelatorios += 			"<td><b>Descrição</b></td>";
			telaCadastroRelatorios += 			"<td><b>Tabela</b></td>";
			telaCadastroRelatorios += 			"<td><b>Colunas</b></td>";
			telaCadastroRelatorios += 			"<td><b>Estrangeiras<br>Tabela: Coluna</b></td>";
			telaCadastroRelatorios += 			"<td><b>Filtro Ativo</b></td>";
			telaCadastroRelatorios += 			"<td><b>Data Atualização</b></td>";
			telaCadastroRelatorios += 			"<td><b>Usuário</b></td>";
			telaCadastroRelatorios += 			"<td><b>Excluir</b></td>";
			telaCadastroRelatorios += 		"</tr>";
			telaCadastroRelatorios +=		tabelaViewBody;
			telaCadastroRelatorios += 	"</table>";
		}
		telaCadastroRelatorios += "</div>";
		$("#conteudoRelatorios").html(telaCadastroRelatorios);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}


function chamarModalRelatorio(id_relatorio){
	if (document.getElementById("in_filtro_modal_relatorio").checked) {
		document.getElementById("in_filtro_modal_relatorio").click();
	}

	$('#modalRelatorio').modal('show');
	$("#viewColunasDiv_data").html("Esperando coluna(s)...");
	var tabela_relatorios = "";
	var descricao_relatorios = "";
	var selectColunaData = "";

	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_relatorios_id': true,
			'id': id_relatorio
		}
	}).done( function(data){
		vetor = data.split("{,}");

		descricao_relatorios = vetor[1];
		tabela_relatorios = vetor[2];

		$.ajax({
			url:'app/controllers/funcoesController.php',
			type: 'POST',
			dataType: 'text',
			data: { 
				'listarColunasTable_data': true,
				'tabela': tabela_relatorios
			}
		}).done( function(data){
			console.log(data);
			$("#descricaoRelatorio").html(descricao_relatorios);
			$("#id_modal_relatorio").val(id_relatorio);

			var vetor = data.split("[,]");
			var subvetor = vetor[0].split("{,}");
			if (subvetor[1] == undefined) {
				selectColunaData += "<select id='coluna_data_modal_relatorio' class='form-control' disabled>";
				selectColunaData += 	"<option value=''>Sem Colunas de Data</option>";
				selectColunaData += "</select>";
			} else {
				selectColunaData += "<select id='coluna_data_modal_relatorio' class='form-control'>";
				for (var i = 0; i < vetor.length; i++) {
					subvetor = vetor[i].split("{,}");

					selectColunaData += "<option value='"+subvetor[0]+"'>"+subvetor[0]+"</option>";
				}
				selectColunaData += "</select>";
			}
			$("#viewColunasDiv_data").html(selectColunaData);
		});
	});
}




function emitirRelatorio(){
	var stringFiltro = setarFiltroBanco();
	var id =  $("#id_modal_relatorio").val();
	var data_inicial = $("#data_inicial_modal_relatorio").val();
	var data_final = $("#data_final_modal_relatorio").val();
	var coluna_data = $("#coluna_data_modal_relatorio").val();
	var link = "relatorio.php?id="+id+"&dataI="+data_inicial+"&dataF="+data_final+"&coluna="+coluna_data;

	if (
		id 				!= ""  &&
		data_inicial 	!= ""  &&
		data_final 		!= ""  &&
		coluna_data 	!= "" 
	) {
		$.ajax({
			url:'app/controllers/funcoes_relatoriosController.php',
			type: 'POST',
			dataType: 'text',
			data: { 
				'atualiarRelatorio': true,
				'bool_emitir_relatorios': 1,
				'colunas_filtro_relatorios': stringFiltro,
				'id': id
			}
		}).done( function(data){
			window.open(link, '_blank');
		});
	} else toast.danger('Preencha todos os campos!');
}


function emitirRelatorioTotos(){
	var stringFiltro = setarFiltroBanco();
	var id =  $("#id_modal_relatorio").val();
	var link = "relatorio.php?id="+id+"&todos=true&dadsfq34t34t25yhrt3yh4543y5ataF=";

	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'atualiarRelatorio': true,
			'bool_emitir_relatorios': 1,
			'colunas_filtro_relatorios': stringFiltro,
			'id': id
		}
	}).done( function(data){
		console.log(data);
		window.open(link, '_blank');
	});
}



function setarFiltroBanco(){
	var elemetosHtml = "";

	if (!document.getElementById("in_filtro_modal_relatorio").checked) elemetosHtml = "null";
	else {
		var table = [];
		var coluna = [];
		var colunasVerificacao = [];
		var valor = [];
		var valoresVerificacao = [];

		var arrayElemetosT = document.getElementsByName("campoFiltroTabela");
		var arrayElemetosC = document.getElementsByName("campoFiltroColuna");
		var arrayElemetosV = document.getElementsByName("campoFiltroValor");

		$("#elementosOcultos").html("");

		for (var i = 0; i < arrayElemetosT.length; i++) {
			if (coluna.indexOf(arrayElemetosC[i].value) == -1) {
				coluna.push(arrayElemetosC[i].value);
				elemetosHtml = "";
				elemetosHtml += "<div name='elementoOcultoFiltro' id='colunaFiltroDivOculto_"+arrayElemetosC[i].value+"'>";
				elemetosHtml += 	arrayElemetosT[i].value+"."+arrayElemetosC[i].value+" LIKE \\\'%"+arrayElemetosV[i].value+"%\\\'";
				elemetosHtml += "</div>";

				$("#elementosOcultos").html($("#elementosOcultos").html()+elemetosHtml);
			}
			else {
				elemetosHtml = "";
				elemetosHtml += " OR "+arrayElemetosT[i].value+"."+arrayElemetosC[i].value+" LIKE \\\'%"+arrayElemetosV[i].value+"%\\\'";
				document.getElementById("colunaFiltroDivOculto_"+arrayElemetosC[i].value).innerHTML += elemetosHtml;
			}
		}

		var arrayElemetosF = document.getElementsByName("elementoOcultoFiltro");
		elemetosHtml = "";
		for (var i = 0; i < arrayElemetosF.length; i++) {
			elemetosHtml += " AND ("+arrayElemetosF[i].innerHTML+")";
		}
	}
	return elemetosHtml;
}



/****************************************************************************************************************
/** Area de Filtros Para relatorio simples *
/****************************************************************************************************************/
function listarColunasFiltro(el){
	var campoColunas = "";
	var colunas_relatorios = "";
	var colunas_estrangeiras_relatorios = "";

	if (el.checked) {
		
		campoColunas += "";
		campoColunas += "<div class='col-xs-6'>";
		campoColunas += 	"<button class='btn btn-default btn-block' onclick='adicionarColunaFiltro()'>";
		campoColunas += 		"<i class='fa fa-plus'></i>&nbsp;&nbsp;Adicionar Filtro";
		campoColunas += 	"</button>";
		campoColunas += "</div>";
		campoColunas += "<div class='col-xs-6'>";
		campoColunas += 	"<button class='btn btn-default btn-block' onclick='removerColunaFiltro()'>";
		campoColunas += 		"<i class='fa fa-minus'></i>&nbsp;&nbsp;Remover Filtro";
		campoColunas += 	"</button>";
		campoColunas += "</div>";
		campoColunas += "<br>";
		campoColunas += "<table class='table'>";
		campoColunas += 	"<tr>";
		campoColunas += 		"<td align='center'>Tabela</td>";
		campoColunas += 		"<td align='center'>Coluna</td>";
		campoColunas += 		"<td align='center'>Valor</td>";
		campoColunas += 	"</tr>";
		campoColunas += "</table>";
		campoColunas += "<div id='colunasFiltroTable_"+colunasFiltroTotal+"'></div>";

		$("#viewColunasDiv_filtro").html(campoColunas);
		adicionarColunaFiltro();
	}
	else {
		$("#viewColunasDiv_filtro").html("");
		colunasFiltroTotal = 0;
	}
}



function adicionarColunaFiltro(){
	var codigoAnterior = colunasFiltroTotal;
	colunasFiltroTotal++;
	var oldTable = "";
	var campoColunas = "";
	var sub_colunas_estrangeiras_relatorios = "";

	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'listarColunasFiltro': true,
			'id': $("#id_modal_relatorio").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		tabela_relatorios = vetor[2];
		colunas_estrangeiras_relatorios = vetor[4];
		colunas_estrangeiras_relatorios = colunas_estrangeiras_relatorios.split("+");

		campoColunas += "<div class='col-xs-4' id='campoFiltroTabelaDiv_"+colunasFiltroTotal+"'>";
		campoColunas += "<select type='text' onchange='pesquisar_colunas_da_tabela("+colunasFiltroTotal+")' name='campoFiltroTabela' data-id='"+colunasFiltroTotal+"' class='form-control'>";

		campoColunas += "<option value='"+tabela_relatorios+"'>";
		campoColunas += 	tabela_relatorios;
		campoColunas += "</option>";

		for (var i = 0; i < colunas_estrangeiras_relatorios.length; i++) {
			sub_colunas_estrangeiras_relatorios = colunas_estrangeiras_relatorios[i].split("_tr_");
			if ( oldTable != sub_colunas_estrangeiras_relatorios[1]) {
				oldTable = sub_colunas_estrangeiras_relatorios[1];
				campoColunas += "<option value='"+oldTable+"'>";
				campoColunas += 	oldTable;
				campoColunas += "</option>";
			}
		}
		campoColunas += "</select>";
		campoColunas += "</div>";
		campoColunas += "<div class='col-xs-4' id='campoFiltroColunaDiv_"+colunasFiltroTotal+"'>";
		campoColunas += 	"<input type='text' class='form-control' disabled></div>";
		campoColunas += "</div>";
		campoColunas += "<div class='col-xs-4' id='campoFiltroValorDiv_"+colunasFiltroTotal+"'>";
		campoColunas += 	"<input type='text' class='form-control' disabled><br>";
		campoColunas += "</div>";
		campoColunas += "<div id='colunasFiltroTable_"+colunasFiltroTotal+"'></div>";

		document.getElementById("colunasFiltroTable_"+codigoAnterior).innerHTML = campoColunas;
		pesquisar_colunas_da_tabela(colunasFiltroTotal);
	});
}


function removerColunaFiltro(){
	if (colunasFiltroTotal > 1) {
		colunasFiltroTotal--;
		document.getElementById("colunasFiltroTable_"+colunasFiltroTotal).innerHTML = "";
	}
}


function pesquisar_colunas_da_tabela(codigo){
	var campoColunas = "";
	var sub_colunas_estrangeiras_relatorios = "";

	var tabelasArray = document.getElementsByName("campoFiltroTabela");
	var tabela = "";

	for (var i = 0; i < tabelasArray.length; i++) {
		if (codigo == $(tabelasArray[i]).data("id")) {
			tabela = tabelasArray[i].value;
			i = tabelasArray.length;
		}
	}
	console.log("tabela: "+tabela);

	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'listarColunasFiltro': true,
			'id': $("#id_modal_relatorio").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		tabela_relatorios = vetor[2];
		colunas_relatorios = vetor[3];
		colunas_relatorios = colunas_relatorios.split("+");
		colunas_estrangeiras_relatorios = vetor[4];
		colunas_estrangeiras_relatorios = colunas_estrangeiras_relatorios.split("+");

		campoColunas += "<select type='text' onchange='pesquisar_valores_da_tabela("+codigo+")' name='campoFiltroColuna' data-id='"+codigo+"' class='form-control'>";

		if (tabela_relatorios == tabela){
			for (var i = 0; i < colunas_relatorios.length; i++) {
				campoColunas += "<option value='"+colunas_relatorios[i]+"'>";
				campoColunas += 	colunas_relatorios[i];
				campoColunas += "</option>";
			}
		}
		else {
			for (var i = 0; i < colunas_estrangeiras_relatorios.length; i++) {
				sub_colunas_estrangeiras_relatorios = colunas_estrangeiras_relatorios[i].split("_tr_");
				if (sub_colunas_estrangeiras_relatorios[1] == tabela) {
					campoColunas += "<option value='"+sub_colunas_estrangeiras_relatorios[2]+"'>";
					campoColunas += 	sub_colunas_estrangeiras_relatorios[2];
					campoColunas += "</option>";
				}
			}
		}
		campoColunas += "</select>";
		document.getElementById("campoFiltroColunaDiv_"+codigo).innerHTML = campoColunas;
		pesquisar_valores_da_tabela(codigo);
	});
}




function pesquisar_valores_da_tabela(codigo){
	var campoColunas = "";
	var sub_colunas_estrangeiras_relatorios = "";

	var arrayElement = document.getElementsByName("campoFiltroTabela");
	var tabela = "";
	var valores = "";

	for (var i = 0; i < arrayElement.length; i++) {
		if (codigo == $(arrayElement[i]).data("id")) {
			tabela = arrayElement[i].value;
			i = arrayElement.length;
		}
	}

	arrayElement = document.getElementsByName("campoFiltroColuna");
	var coluna = "";

	for (var i = 0; i < arrayElement.length; i++) {
		if (codigo == $(arrayElement[i]).data("id")) {
			coluna = arrayElement[i].value;
			i = arrayElement.length;
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pesquisaValorTotal': true,
			'tabela': tabela,
			'coluna': coluna
		}
	}).done( function(data){
		vetor = data.split("{,}");

		valores += "<input type='text' list='valoresDaTabelaPeloCampo_"+codigo+"' name='campoFiltroValor' data-id='"+codigo+"' class='form-control'>";
		valores += "<datalist id='valoresDaTabelaPeloCampo_"+codigo+"'>";

		for (var i = 0; i < vetor.length; i++) {
			if (i == 0) 
			vetor[i] = vetor[i].substring(2, vetor[i].length);
			
			valores += "<option value='"+vetor[i]+"'>";
		}
		valores += "</datalist>";
		document.getElementById("campoFiltroValorDiv_"+codigo).innerHTML = valores;
	});
}
/****************************************************************************************************************
/** Fim da Area de Filtros Para relatorio simples *
/****************************************************************************************************************/