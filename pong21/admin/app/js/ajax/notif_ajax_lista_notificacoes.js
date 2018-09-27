
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_notificacoes();
});

function buscar_notificacoes(){
	
	var id_notificacoes = "";
	var descricao_notificacoes = "";
	var usuario_atuador_notificacoes = "";
	var usuaio_requerente_notificacoes = "";
	var tipo_alteracao_notificacoes = "";
	var notificacoes_config_id = "";
	var bool_view_notificacoes = "";
	var data_atualizacao_notificacoes = "";
	var bool_ativo_notificacoes = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroNotificacoes = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoNotificacoes").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_notificacoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_notificacoes': true,
			'filtro': $("#pesquisa_notificacoes").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroNotificacoes += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroNotificacoes += "<br>";

			telaCadastroNotificacoes += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_notificacoes = subvetor[0];
				descricao_notificacoes = subvetor[1];
				usuario_atuador_notificacoes = subvetor[2];
				usuaio_requerente_notificacoes = subvetor[3];
				tipo_alteracao_notificacoes = subvetor[4];
				notificacoes_config_id = subvetor[5];
				bool_view_notificacoes = subvetor[6];
				data_atualizacao_notificacoes = subvetor[7];
				bool_ativo_notificacoes = subvetor[8];
				
				acumularFunctionId.push(id_notificacoes);
				acumularFunctionCampo.push(notificacoes_config_id+"+notificacoes_config");

				if (bool_ativo_notificacoes == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_notificacoes' style='color: #f0ad4e;' data-id='"+id_notificacoes+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_notificacoes+"'>";
				tabelaViewBody += 				"<a href='#!notificacoes' style='color: "+cor_ativo+"' data-id='"+id_notificacoes+"' onclick=\"excluir(this , 'notificacoes', "+bool_ativo_notificacoes+", 'notificacoes')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_notificacoes+"</td>";
				tabelaViewBody += 			"<td>"+usuario_atuador_notificacoes+"</td>";
				tabelaViewBody += 			"<td>"+usuaio_requerente_notificacoes+"</td>";
				tabelaViewBody += 			"<td>"+tipo_alteracao_notificacoes+"</td>";
				tabelaViewBody += 			"<td><div id='notificacoes_config_"+parseInt(id_notificacoes)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroNotificacoes += 	"<table class='table'>";
			telaCadastroNotificacoes += 		"<tr bgcolor='white'>";
			telaCadastroNotificacoes += 			"<td><b>Editar</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Ativo</b></td>";
			telaCadastroNotificacoes += 			"<td><b>N°</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Descrição</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Usuário Atuador</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Usuaio Requerente</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Tipo Alteracao</b></td>";
			telaCadastroNotificacoes += 			"<td><b>Notificações Config</b></td>";
			telaCadastroNotificacoes += 		"</tr>";
			telaCadastroNotificacoes +=		tabelaViewBody;
			telaCadastroNotificacoes += 	"</table>";
		}
		telaCadastroNotificacoes += "</div>";
		$("#conteudoNotificacoes").html(telaCadastroNotificacoes);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
