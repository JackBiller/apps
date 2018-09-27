
$(document).ready(function(){
	buscar_historico_jogo();
});

function setarValorEstrangeiroLista(id, tabelaEstrangeira){
	id = parseInt(id);
	tabelaEstrangeira = tabelaEstrangeira.split("+");
	var idTabelaEstrangeira = tabelaEstrangeira[0];
	tabelaEstrangeira = tabelaEstrangeira[1];
	var colunaParam = "pequisa_"+tabelaEstrangeira+"_id";

	var param = JSON.parse('{ "'+colunaParam+'":true, "id":'+idTabelaEstrangeira+' }');

	$.ajax({
		url:'app/controllers/funcoes_'+tabelaEstrangeira+'Controller.php',
		type: 'POST',
		dataType: 'text',
		data: param
	}).done( function(data){
		vetor = data.split("{,}");
		document.getElementById(tabelaEstrangeira+'_'+id).innerHTML = vetor[1];
	});
}



function buscar_historico_jogo(){
	
	var id_historico_jogo = "";
	var sequencia_historico_jogo = "";
	var placar_historico_jogo = "";
	var jogos_id = "";
	var data_atualizacao_historico_jogo = "";
	var usuario_id = "";
	var bool_ativo_historico_jogo = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroHistorico_jogo = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "jogos" && $(grades[i]).data("g") == "historico_jogo") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!jogos");
			else {
				$.ajax({
					url:'app/controllers/funcoes_jogosController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_jogos_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_jogosController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomeJogos').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_historico_jogoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_historico_jogo_grade': true,
			'filtro': $("#pesquisa_historico_jogo").val(),
			'tabela': "jogos",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroHistorico_jogo += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroHistorico_jogo += "<br>";

			telaCadastroHistorico_jogo += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_historico_jogo = subvetor[0];
				sequencia_historico_jogo = subvetor[1];
				placar_historico_jogo = subvetor[2];
				jogos_id = subvetor[3];
				data_atualizacao_historico_jogo = subvetor[4];
				usuario_id = subvetor[5];
				bool_ativo_historico_jogo = subvetor[6];
				
				acumularFunctionId.push(id_historico_jogo);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_historico_jogo == 1) { 
					desabilitar = "";
					icone_ativo = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
					cor_ativo = "#0f0;";
					valorAtivo = 0;
				} else {
					desabilitar = "disabled";
					cor_ativo = "#f00;";
					icone_ativo = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
					valorAtivo = 1;
				}

				tabelaViewBody += 		"<tr>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_historico_jogo-jogos' style='color: #f0ad4e;' data-id='"+id_historico_jogo+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_historico_jogo+"'>";
				tabelaViewBody += 				"<a href='#!grade_historico_jogo-jogos' style='color: "+cor_ativo+"' data-id='"+id_historico_jogo+"' onclick=\"excluir(this , 'historico_jogo', "+bool_ativo_historico_jogo+", 'grade_historico_jogo-jogos')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+sequencia_historico_jogo+"</td>";
				tabelaViewBody += 			"<td>"+placar_historico_jogo+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_historico_jogo)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_historico_jogo)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroHistorico_jogo += 	"<table class='table'>";
			telaCadastroHistorico_jogo += 		"<tr bgcolor='white'>";
			telaCadastroHistorico_jogo += 			"<td><b>Editar</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>Ativo</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>N°</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>Sequencia</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>Placar</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>Data Atualização</b></td>";
			telaCadastroHistorico_jogo += 			"<td><b>Usuário</b></td>";
			telaCadastroHistorico_jogo += 		"</tr>";
			telaCadastroHistorico_jogo +=		tabelaViewBody;
			telaCadastroHistorico_jogo += 	"</table>";
		}
		telaCadastroHistorico_jogo += "</div>";
		$("#conteudoHistorico_jogo").html(telaCadastroHistorico_jogo);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
		var botaoBoltarGrade = verificaGrade('jogos', 'historico_jogo', 'Jogos');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}

