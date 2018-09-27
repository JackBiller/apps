
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_notificacoes_config();
});


function buscar_notificacoes_config(){
	
	var id_notificacoes_config = "";
	var area_notificacoes_config = "";
	var tipo_alteracao_notificacoes_config = "";
	var data_atualizacao_notificacoes_config = "";
	var usuario_id = "";
	var bool_ativo_notificacoes_config = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var array_tipo_alteracao_notificacoes_config = [];
	var areasAraay = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroNotificacoes_config = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoNotificacoes_config").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_notificacoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_notificacoes_config': true,
			'filtro': $("#pesquisa_notificacoes_config").val(),
			'usuario': $("#usuario").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroNotificacoes_config += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroNotificacoes_config += "<br>";

			telaCadastroNotificacoes_config += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_notificacoes_config = subvetor[0];

				area_notificacoes_config = subvetor[1];
				// areasAraay = area_notificacoes_config.split("+");
				// area_notificacoes_config = "";
				// for (var i = 0; i < areasAraay.length; i++) {
				// 	area_notificacoes_config += areasAraay[i]+"<br>";
				// }

				tipo_alteracao_notificacoes_config = subvetor[2];
				array_tipo_alteracao_notificacoes_config = tipo_alteracao_notificacoes_config.split("+");
				tipo_alteracao_notificacoes_config = "";
				for (var i = 0; i < array_tipo_alteracao_notificacoes_config.length; i++) {
					if (tipo_alteracao_notificacoes_config != "") tipo_alteracao_notificacoes_config += "<br>";
					if(array_tipo_alteracao_notificacoes_config[i] == "I"){
						tipo_alteracao_notificacoes_config += "Inserção";
					}
					else if(array_tipo_alteracao_notificacoes_config[i] == "U"){
						tipo_alteracao_notificacoes_config += "Atualização";
					}
				}
				data_atualizacao_notificacoes_config = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_notificacoes_config = subvetor[5];
				



				if (bool_ativo_notificacoes_config == 1) { 
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
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!notif_editar_notificacoes' style='color: #f0ad4e;' data-id='"+id_notificacoes_config+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody += 				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody += 			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_notificacoes_config+"'>";
				tabelaViewBody += 				"<a href='#!notificacoes_config' style='color: "+cor_ativo+"' data-id='"+id_notificacoes_config+"' onclick=\"excluir(this , 'notificacoes_config', "+bool_ativo_notificacoes_config+", 'notificacoes_config')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody += 				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody += 			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				numeroRegAtual;
				tabelaViewBody += 			"</td>";
				tabelaViewBody += 			"<td>"+area_notificacoes_config+"</td>";
				tabelaViewBody += 			"<td>"+tipo_alteracao_notificacoes_config+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_notificacoes_config)+"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroNotificacoes_config += 	"<table class='table'>";
			telaCadastroNotificacoes_config += 		"<tr bgcolor='white'>";
			telaCadastroNotificacoes_config += 			"<td><b>Editar</b></td>";
			telaCadastroNotificacoes_config += 			"<td><b>Ativo</b></td>";
			telaCadastroNotificacoes_config += 			"<td><b>N°</b></td>";
			telaCadastroNotificacoes_config += 			"<td><b>Área</b></td>";
			telaCadastroNotificacoes_config += 			"<td><b>Tipo Atividade</b></td>";
			telaCadastroNotificacoes_config += 			"<td><b>Data Atualização</b></td>";
			telaCadastroNotificacoes_config += 		"</tr>";
			telaCadastroNotificacoes_config +=		tabelaViewBody;
			telaCadastroNotificacoes_config += 	"</table>";
		}
		telaCadastroNotificacoes_config += "</div>";
		$("#conteudoNotificacoes_config").html(telaCadastroNotificacoes_config);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
