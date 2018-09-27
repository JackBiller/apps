
var arrayTabEstrangeira = [];
var arrayTabEstrangeiraIncluidas = [];

function gravarRegistro(){
	var campoFocus = "";
	
	var colunas  = document.getElementsByName("coluna");
	var colunasSelecionadas = "";
	var contColunas = 0;
	for (var i = 0; i < colunas.length; i++) {
		if (document.getElementById("check_"+colunas[i].value).checked) {
			colunasSelecionadas += contColunas == 0 ? colunas[i].value : "+"+colunas[i].value;
			contColunas++;
		}
	}


	var colunasEstrangeira  = document.getElementsByName("colunaEstrangeira");
	var colunasEstrangeiraSelecionadas = "";
	contColunas = 0;
	for (var j = 0; j < colunasEstrangeira.length; j++) {
		if (document.getElementById("check_"+colunasEstrangeira[j].value).checked) {
			console.log("colunasEstrangeira[i].value: "+colunasEstrangeira[j].value);
			colunasEstrangeiraSelecionadas += contColunas == 0 ? colunasEstrangeira[j].value : "+"+colunasEstrangeira[j].value;
			contColunas++;
		}
	}

		 if ($("#tabela_relatorios").val() == "") campoFocus = "tabela_relatorios-flexdatalist";
	else if ($("#descricao_relatorios").val() == "") campoFocus = "descricao_relatorios";
	else if (colunasSelecionadas == "") toast.danger("Por Favor selecione uma Coluna da Tabela!");

	else {

		$.ajax({
			url:'app/controllers/funcoes_relatoriosController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'cadastroRelatorio': true,
				'descricao_relatorios': $("#descricao_relatorios").val(),
				'tabela_relatorios': $("#tabela_relatorios").val(),
				'colunas_relatorios': colunasSelecionadas,
				'colunas_estrangeiras_relatorios': colunasEstrangeiraSelecionadas,
				'bool_filtro_ativo_relatorios': $("#bool_filtro_ativo_relatorios").val(),
				'usuario_id': $("#usuario_id").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha ao Cadastrar!");
			else {
				toast.success("Cadastrado com sucesso!");
				$("#tabela_relatorios").val("");
				$("#tabela_relatorios-flexdatalist").val("");
				$("#conteudoColunas").val("Aquardando Tabela...");
			}
		});
		
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}

function validation(valor){
	if (valor == "") 	return false;
	else 				return true;
}

jk_comboDataListString(
	"Relatorio Tabela", "funcoes_relatoriosController", 
	{
		'pequisa_relatorio_tabela': true
	}, "tabela_relatorios", 
	[ "1","2","3","4" ], 
	1, [1], "i", "relatorio_tabelaDiv", "chamarColunas(this.value)", 3
);


function chamarColunas(tabela){
	$("#conteudoColunas").val("Carregando...");

	var contColunas = 0;
	var vetor = [];
	var subVetor = [];
	var colunaAtual = "";
	var contCamposTabela = 0;

	var camposEstrangeiros = "<h3>Campos Estrangeiros</h3>";
	var nomeTabelaEstrangeira = "";
	var contCamposEstrangeiros = 0;

	arrayTabEstrangeira = [];
	arrayTabEstrangeiraIncluidas = [];

	var tabelaColunas = "<h2>Tabela: " + tabela + "</h2>";
	tabelaColunas += 	"<table class='table'>";
	tabelaColunas += 		"<tr>";
	tabelaColunas += 			"<td><b>Coluna</b></td>";
	tabelaColunas += 			"<td><b></b></td>";
	tabelaColunas += 		"</tr>";

	if (tabela != "") {
		$.ajax({
			url:'app/controllers/funcoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'listarColunasTable': true,
				'tabela': tabela
			}
		}).done( function(data){
			console.log(data);

			vetor = data.split("[,]");
			for (var i = 0; i < vetor.length; i++) {
				contColunas++;
				subVetor = vetor[i].split("{,}");

				colunaAtual = subVetor[0].replace(" ", "");
				colunaAtual = colunaAtual.replace("\n", "");

				colunaAtual = contColunas == 1 ? colunaAtual.substring(1, colunaAtual.length) : subVetor[0];

				if (colunaAtual.split("_")[0] != "senha") {
					// console.log("test_"+colunaAtual);
					if (
						colunaAtual.substr(-3) == "_id" && 
						arrayTabEstrangeira.indexOf(colunaAtual.substr(0, colunaAtual.length - 3)) == -1
					) {
						nomeTabelaEstrangeira = colunaAtual.substr(0, colunaAtual.length - 3);
						arrayTabEstrangeira.push(nomeTabelaEstrangeira);

						camposEstrangeiros += 	"<div name='div_estrangeiro_"+tabela+"' data-id='"+nomeTabelaEstrangeira+"'>";
						camposEstrangeiros += 	"<br>"+nomeTabelaEstrangeira;
						camposEstrangeiros += 	"<select class=\"form-control\" id='selectTabEstrangeira_"+nomeTabelaEstrangeira+"'";
						camposEstrangeiros += 		" onchange='camposEstrangeiroLista(this.value, \""+nomeTabelaEstrangeira+"\", \""+tabela+"\")'>";
						camposEstrangeiros += 		"<option value=\"1\">Sim</option>";
						camposEstrangeiros += 		"<option value=\"0\" selected>Não</option>";
						camposEstrangeiros += 	"</select>";
						camposEstrangeiros += 	"<input type='hidden' value='0' id='numeroTotalCamposEstrangeiros_"+nomeTabelaEstrangeira+"'>";
						camposEstrangeiros += 	"</div>";
						contCamposEstrangeiros++;
					} else {
						tabelaColunas += "<tr bgcolor='#5cb85c' style='color: white' id='linha_"+colunaAtual+"' onclick='selecionarColuna(\""+colunaAtual+"\")'>";
						tabelaColunas += 	"<td>"+colunaAtual+"</td>";
						tabelaColunas += 	"<td align=\"right\">";
						tabelaColunas += 		"<span id='icone_"+colunaAtual+"'><i class='fa fa-check'></i></span>";
						tabelaColunas += 		"<input type='hidden' name='coluna' value='"+colunaAtual+"'>";
						tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+colunaAtual+"' checked>";
						tabelaColunas += 	"</td>";
						tabelaColunas += "</tr>";
						contCamposTabela++;
					}
				}
			}
			tabelaColunas += "</table>";

			tabelaColunas = contCamposTabela != 0 ? tabelaColunas : "Aquardando Tabela...";
			if (contCamposEstrangeiros == 0) camposEstrangeiros = "";

			$("#conteudoColunas").html(tabelaColunas);
			$("#camposEstrangeiros").html(camposEstrangeiros);
			checkedAll();
		});
	} else {
		$("#conteudoColunas").val("Aquardando Tabela...");
		checkedAll();
	}
}


function selecionarColuna(coluna){
	if (document.getElementById("check_"+coluna).checked) {
		document.getElementById("check_"+coluna).checked = false;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-times'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#f0ad4e";
	} else {
		document.getElementById("check_"+coluna).checked = true;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-check'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#5cb85c";
	}
}



function checkedAll(){
	console.log("checkedAll");
	var colunas  = document.getElementsByName("coluna");
	for (var i = 0; i < colunas.length; i++) {
		// console.log("colunas -> "+i+": "+colunas[i]);
		document.getElementById("check_"+colunas[i].value).checked = true;
		document.getElementById("icone_"+colunas[i].value).innerHTML = "<i class='fa fa-check'></i>";
		document.getElementById("linha_"+colunas[i].value).style.backgroundColor = "#5cb85c";
	}
	var colunasEstrangeira  = document.getElementsByName("colunaEstrangeira");
	for (var j = 0; j < colunasEstrangeira.length; j++) {
		document.getElementById("check_"+colunasEstrangeira[j].value).checked = true;
		document.getElementById("icone_"+colunasEstrangeira[j].value).innerHTML = "<i class='fa fa-check'></i>";
		document.getElementById("linha_"+colunasEstrangeira[j].value).style.backgroundColor = "#5cb85c";
	}
}




function camposEstrangeiroLista(valor, tabela, oldTable){
	console.log("camposEstrangeiroLista: "+valor);
	if (valor == 1) {
		var contColunas = 0;
		var vetor = [];
		var subVetor = [];
		var colunaAtual = "";
		var contCamposTabela = 0;
		var valorCompleto = "";

		var camposEstrangeiros = "";
		var nomeTabelaEstrangeira = "";
		var contCamposEstrangeiros = 0;

		var tabelaColunas = "<div id='divTabEstrangeira_"+tabela+"'><h2>Tabela Estrangeira: "+tabela+"</h2>";
		tabelaColunas += 	"<table class='table'>";
		tabelaColunas += 		"<tr>";
		tabelaColunas += 			"<td><b>Coluna</b></td>";
		tabelaColunas += 			"<td><b></b></td>";
		tabelaColunas += 		"</tr>";

		$.ajax({
			url:'app/controllers/funcoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'listarColunasTable': true,
				'tabela': tabela
			}
		}).done( function(data){
			if (arrayTabEstrangeiraIncluidas.indexOf(tabela) == -1) {
				arrayTabEstrangeiraIncluidas.push(tabela);

				vetor = data.split("[,]");
				for (var i = 0; i < vetor.length; i++) {
					contColunas++;
					subVetor = vetor[i].split("{,}");

					colunaAtual = subVetor[0].replace(" ", "");
					colunaAtual = colunaAtual.replace("\n", "");

					colunaAtual = contColunas == 1 ? colunaAtual.substring(1, colunaAtual.length) : subVetor[0];
					valorCompleto = oldTable+"_tr_"+tabela+"_tr_"+colunaAtual;

					if (colunaAtual.split("_")[0] != "senha") {
						// console.log("test_"+colunaAtual);
						if (colunaAtual.substr(-3) != "_id") {
							tabelaColunas += "<tr bgcolor='#5cb85c' style='color: white' id='linha_"+valorCompleto+"' onclick='selecionarColuna(\""+valorCompleto+"\")'>";
							tabelaColunas += 	"<td>"+colunaAtual+"</td>";
							tabelaColunas += 	"<td align=\"right\">";
							tabelaColunas += 		"<span id='icone_"+valorCompleto+"'><i class='fa fa-check'></i></span>";
							tabelaColunas += 		"<input type='hidden' name='colunaEstrangeira' value='"+valorCompleto+"'>";
							tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+valorCompleto+"' checked>";
							tabelaColunas += 	"</td>";
							tabelaColunas += "</tr>";
							contCamposTabela++;
						}
						else if (arrayTabEstrangeira.indexOf(colunaAtual.substr(0, colunaAtual.length - 3)) == -1) {
							nomeTabelaEstrangeira = colunaAtual.substr(0, colunaAtual.length - 3);
							arrayTabEstrangeira.push(nomeTabelaEstrangeira);

							camposEstrangeiros += 	"<div name='div_estrangeiro_"+tabela+"' data-id='"+nomeTabelaEstrangeira+"'>";
							camposEstrangeiros += 	"<br>"+nomeTabelaEstrangeira;
							camposEstrangeiros += 	"<select class=\"form-control\" id='selectTabEstrangeira_"+nomeTabelaEstrangeira+"'";
							camposEstrangeiros += 		" onchange='camposEstrangeiroLista(this.value, \""+nomeTabelaEstrangeira+"\", \""+tabela+"\")'>";
							camposEstrangeiros += 		"<option value=\"1\">Sim</option>";
							camposEstrangeiros += 		"<option value=\"0\" selected>Não</option>";
							camposEstrangeiros += 	"</select>";
							camposEstrangeiros += 	"<input type='hidden' value='0' id='numeroTotalCamposEstrangeiros_"+nomeTabelaEstrangeira+"'>";
							camposEstrangeiros += 	"</div>";
							contCamposEstrangeiros++;
						}
					}
				}

				tabelaColunas += "</table></div>";

				if (contCamposTabela == 0) tabelaColunas = "";
				tabelaColunas = $("#conteudoColunas").html()+tabelaColunas;
				
				if (contCamposEstrangeiros == 0) camposEstrangeiros = "";
				document.getElementById("camposEstrangeiros").innerHTML += camposEstrangeiros;
				document.getElementById("numeroTotalCamposEstrangeiros_"+tabela).value = contCamposEstrangeiros;


				$("#conteudoColunas").html(tabelaColunas);
				
				for (var i = 0; i < arrayTabEstrangeiraIncluidas.length; i++) {
					document.getElementById("selectTabEstrangeira_"+arrayTabEstrangeiraIncluidas[i]).value = "1";
				}
				checkedAll();
			}
		});
	} else {
		var elemento = document.getElementById("divTabEstrangeira_"+tabela);
		$(elemento).remove();
		var arrayTemp = [];
		for (var i = 0; i < arrayTabEstrangeiraIncluidas.length; i++) {
			if (i != arrayTabEstrangeiraIncluidas.indexOf(tabela)) {
				arrayTemp.push(arrayTabEstrangeiraIncluidas[i]);
			}
		}
		arrayTabEstrangeiraIncluidas = arrayTemp;


		var colunasEstrageirasDaTabelaEstrangeira = document.getElementById("numeroTotalCamposEstrangeiros_"+tabela).value;
		var descricaoTabEstrangeira_DaTabelaEstrangeira = "";

		if (colunasEstrageirasDaTabelaEstrangeira != 0) {
			var elementoSelect = document.getElementsByName("div_estrangeiro_"+tabela);
			
			for (var i = 0; i < elementoSelect.length; i++) {
				descricaoTabEstrangeira_DaTabelaEstrangeira = $(elementoSelect[i]).data("id");
				console.log("selectTabEstrangeira_"+descricaoTabEstrangeira_DaTabelaEstrangeira);
				if (document.getElementById("selectTabEstrangeira_"+descricaoTabEstrangeira_DaTabelaEstrangeira).value == "1") {
					camposEstrangeiroLista(0, descricaoTabEstrangeira_DaTabelaEstrangeira, tabela);
				}
				arrayTemp = [];
				for (var j = 0; j < arrayTabEstrangeira.length; j++) {
					if ( j != arrayTabEstrangeira.indexOf(descricaoTabEstrangeira_DaTabelaEstrangeira) ) {
						arrayTemp.push(arrayTabEstrangeira[j]);
					}
				}
				arrayTabEstrangeira = arrayTemp;

				$(elementoSelect[i]).remove();
			}

		}
	}
}

