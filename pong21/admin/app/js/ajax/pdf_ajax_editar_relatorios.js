
$(document).ready(function(){
	var id_relatorios = "";
	var descricao_relatorios = "";
	var tabela_relatorios = "";
	var colunas_relatorios = "";
	var bool_filtro_ativo_relatorios = "";
	var data_atualizacao_relatorios = "";
	var usuario_id = "";
	var bool_ativo_relatorios = "";

	var contColunas = 0;



	var vetor = [];
	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'editar': true,
			'id': $("#editar").val()
		}
	}).done( function(data){});


	$.ajax({
		url:'app/controllers/funcoes_relatoriosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_relatorios_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_relatorios = vetor[0];
		descricao_relatorios = vetor[1];
		tabela_relatorios = vetor[2];

		colunas_relatorios = vetor[3];
		colunas_relatorios = colunas_relatorios.split("+");

		bool_filtro_ativo_relatorios = vetor[4]
		data_atualizacao_relatorios = vetor[5];
		usuario_id = vetor[6];
		bool_ativo_relatorios = vetor[7];

		var tabelaColunas = "<h2>Tabela: " + tabela_relatorios + "</h2>";
		tabelaColunas += 	"<table class='table'>";
		tabelaColunas += 		"<tr>";
		tabelaColunas += 			"<td><b>Coluna</b></td>";
		tabelaColunas += 			"<td><b>Selecionar</b></td>";
		tabelaColunas += 		"</tr>";
		
		$("#descricao_relatorios").val(descricao_relatorios);
		$("#bool_filtro_ativo_relatorios").val(bool_filtro_ativo_relatorios);
		
		combo_relatorios_tabela(tabela_relatorios);

		$.ajax({
			url:'app/controllers/funcoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'listarColunasTable': true,
				'tabela': tabela_relatorios
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

				if (colunas_relatorios.indexOf(colunaAtual) != -1) {
					tabelaColunas += "<tr bgcolor='#5cb85c' style='color: white' id='linha_"+colunaAtual+"' onclick='selecionarColuna(\""+colunaAtual+"\")'>";
					tabelaColunas += 	"<td>"+colunaAtual+"</td>";
					tabelaColunas += 	"<td>";
					tabelaColunas += 		"<span id='icone_"+colunaAtual+"'><i class='fa fa-check'></i></span>";
					tabelaColunas += 		"<input type='hidden' name='coluna' value='"+colunaAtual+"'>";
					tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+colunaAtual+"' checked>";
					tabelaColunas += 	"</td>";
					tabelaColunas += "</tr>";
				} else {
					tabelaColunas += "<tr bgcolor='#f0ad4e' style='color: white' id='linha_"+colunaAtual+"' onclick='selecionarColuna(\""+colunaAtual+"\")'>";
					tabelaColunas += 	"<td>"+colunaAtual+"</td>";
					tabelaColunas += 	"<td>";
					tabelaColunas += 		"<span id='icone_"+colunaAtual+"'><i class='fa fa-times'></i></span>";
					tabelaColunas += 		"<input type='hidden' name='coluna' value='"+colunaAtual+"'>";
					tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+colunaAtual+"'>";
					tabelaColunas += 	"</td>";
					tabelaColunas += "</tr>";
				}
			}
			tabelaColunas += "</table>";

			tabelaColunas = contColunas != 0 ? tabelaColunas : "Aquardando Tabela...";

			$("#conteudoColunas").html(tabelaColunas);
		});
	
	});
});






function atualizarrRegistro(){
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

		 if($("#tabela_relatorios").val() == "") campoFocus = "tabela_relatorios-flexdatalist";
	else if ($("#descricao_relatorios").val() == "") campoFocus = "descricao_relatorios";
	else if(colunasSelecionadas == "") toast.danger("Por Favor selecione uma Coluna da Tabela!");


	else {
		$.ajax({
			url:'app/controllers/funcoes_relatoriosController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'atualiarRelatorio': true,
				'id': $("#editar").val(),
				'descricao_relatorios': $("#descricao_relatorios").val(),
				'tabela_relatorios': $("#tabela_relatorios").val(),
				'colunas_relatorios': colunasSelecionadas,
				'bool_filtro_ativo_relatorios': $("#bool_filtro_ativo_relatorios").val(),
				'usuario_id': $("#usuario_id").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha ao Atualizar!");
			else 							toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}







function chamarColunas(tabela){
	$("#conteudoColunas").val("Carregando...");
	
	var contColunas = 0;
	var vetor = [];
	var subVetor = [];
	var colunaAtual = "";

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

				// console.log("test_"+colunaAtual);

				tabelaColunas += "<tr bgcolor='#5cb85c' style='color: white' id='linha_"+colunaAtual+"' onclick='selecionarColuna(\""+colunaAtual+"\")'>";
				tabelaColunas += 	"<td>"+colunaAtual+"</td>";
				tabelaColunas += 	"<td align=\"right\">";
				tabelaColunas += 		"<span id='icone_"+colunaAtual+"'><i class='fa fa-check'></i></span>";
				tabelaColunas += 		"<input type='hidden' name='coluna' value='"+colunaAtual+"'>";
				tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+colunaAtual+"' checked>";
				tabelaColunas += 	"</td>";
				tabelaColunas += "</tr>";
			}
			tabelaColunas += "</table>";

			tabelaColunas = contColunas != 0 ? tabelaColunas : "Aquardando Tabela...";

			$("#conteudoColunas").html(tabelaColunas);
		});
	} else $("#conteudoColunas").val("Aquardando Tabela...");
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


function combo_relatorios_tabela(value){
	jk_comboVlrPreDataListString(
		"Relatorio Tabela", "funcoes_relatoriosController", 
		{
			'pequisa_relatorio_tabela': true
		}, "tabela_relatorios", 
		[ "1","2","3","4" ], 
		1, [1], "i", "relatorio_tabelaDiv", "chamarColunas(this.value)", 3, value, value
	);
}
