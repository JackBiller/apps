
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_jogo_atual();
});

function buscar_jogo_atual(){
	
	var id_jogo_atual = "";
	var resultado_jogo_atual = "";
	var data_atualizacao_jogo_atual = "";
	var usuario_id = "";
	var bool_ativo_jogo_atual = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroJogo_atual = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoJogo_atual").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_jogo_atualController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogo_atual': true,
			'filtro': $("#pesquisa_jogo_atual").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroJogo_atual += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroJogo_atual += "<br>";

			telaCadastroJogo_atual += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_jogo_atual = subvetor[0];
				resultado_jogo_atual = subvetor[1];
				data_atualizacao_jogo_atual = subvetor[2];
				usuario_id = subvetor[3];
				bool_ativo_jogo_atual = subvetor[4];
				
				acumularFunctionId.push(id_jogo_atual);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_jogo_atual == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_jogo_atual' style='color: #f0ad4e;' data-id='"+id_jogo_atual+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_jogo_atual+"'>";
				tabelaViewBody += 				"<a href='#!jogo_atual' style='color: "+cor_ativo+"' data-id='"+id_jogo_atual+"' onclick=\"excluir(this , 'jogo_atual', "+bool_ativo_jogo_atual+", 'jogo_atual')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+resultado_jogo_atual+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_jogo_atual)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_jogo_atual)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroJogo_atual += 	"<table class='table'>";
			telaCadastroJogo_atual += 		"<tr bgcolor='white'>";
			telaCadastroJogo_atual += 			"<td><b>Editar</b></td>";
			telaCadastroJogo_atual += 			"<td><b>Ativo</b></td>";
			telaCadastroJogo_atual += 			"<td><b>N°</b></td>";
			telaCadastroJogo_atual += 			"<td><b>Resultado</b></td>";
			telaCadastroJogo_atual += 			"<td><b>Data Atualização</b></td>";
			telaCadastroJogo_atual += 			"<td><b>Usuário</b></td>";
			telaCadastroJogo_atual += 		"</tr>";
			telaCadastroJogo_atual +=		tabelaViewBody;
			telaCadastroJogo_atual += 	"</table>";
		}
		telaCadastroJogo_atual += "</div>";
		$("#conteudoJogo_atual").html(telaCadastroJogo_atual);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
