
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_jogos();
});

function buscar_jogos(){
	
	var id_jogos = "";
	var descricao_jogos = "";
	var jogador_1_jogos = "";
	var jogador_2_jogos = "";
	var resultado_jogos = "";
	var data_atualizacao_jogos = "";
	var usuario_id = "";
	var bool_ativo_jogos = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroJogos = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoJogos").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_jogosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogos': true,
			'filtro': $("#pesquisa_jogos").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroJogos += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroJogos += "<br>";

			telaCadastroJogos += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_jogos = subvetor[0];
				descricao_jogos = subvetor[1];
				jogador_1_jogos = subvetor[2];
				jogador_2_jogos = subvetor[3];
				resultado_jogos = subvetor[4];
				data_atualizacao_jogos = subvetor[5];
				usuario_id = subvetor[6];
				bool_ativo_jogos = subvetor[7];
				

				if (bool_ativo_jogos == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_jogos' style='color: #f0ad4e;' data-id='"+id_jogos+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_jogos+"'>";
				tabelaViewBody += 				"<a href='#!jogos' style='color: "+cor_ativo+"' data-id='"+id_jogos+"' onclick=\"excluir(this , 'jogos', "+bool_ativo_jogos+", 'jogos')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_jogos+"</td>";
				tabelaViewBody += 			"<td>"+jogador_1_jogos+"</td>";
				tabelaViewBody += 			"<td>"+jogador_2_jogos+"</td>";
				tabelaViewBody += 			"<td>"+resultado_jogos+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_jogos)+"</td>";
				if($("#n_acs_historico_jogo_jogos").val() == 1 || $("#n_acs_historico_jogo_jogos").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_historico_jogo-jogos' style='color: green' data-id='"+id_jogos+"' onclick=\"grade(this , 'jogos', 'historico_jogo')\" title='Historico Jogo'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroJogos += 	"<table class='table'>";
			telaCadastroJogos += 		"<tr bgcolor='white'>";
			telaCadastroJogos += 			"<td><b>Editar</b></td>";
			telaCadastroJogos += 			"<td><b>Ativo</b></td>";
			telaCadastroJogos += 			"<td><b>N°</b></td>";
			telaCadastroJogos += 			"<td><b>Descrição</b></td>";
			telaCadastroJogos += 			"<td><b>Jogador 1</b></td>";
			telaCadastroJogos += 			"<td><b>Jogador 2</b></td>";
			telaCadastroJogos += 			"<td><b>Resultado</b></td>";
			telaCadastroJogos += 			"<td><b>Data Atualização</b></td>";
			if($("#n_acs_historico_jogo_jogos").val() == 1 || $("#n_acs_historico_jogo_jogos").val() == "1") {
			telaCadastroJogos += 			"<td><b>Historico Jogo</b></td>";
			}
			telaCadastroJogos += 		"</tr>";
			telaCadastroJogos +=		tabelaViewBody;
			telaCadastroJogos += 	"</table>";
		}
		telaCadastroJogos += "</div>";
		$("#conteudoJogos").html(telaCadastroJogos);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
