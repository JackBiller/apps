
$(document).ready(function(){
	buscar_nivel_acesso();
});

// function setarValorEstrangeiroLista(id, tabelaEstrangeira){
// 	id = parseInt(id);
// 	tabelaEstrangeira = tabelaEstrangeira.split("+");
// 	var idTabelaEstrangeira = tabelaEstrangeira[0];
// 	tabelaEstrangeira = tabelaEstrangeira[1];
// 	var colunaParam = "pequisa_"+tabelaEstrangeira+"_id";

// 	var param = JSON.parse('{ "'+colunaParam+'":true, "id":'+idTabelaEstrangeira+' }');

// 	$.ajax({
// 		url:'app/controllers/funcoes_'+tabelaEstrangeira+'Controller.php',
// 		type: 'POST',
// 		dataType: 'text',
// 		data: param
// 	}).done( function(data){
// 		vetor = data.split("{,}");
// 		document.getElementById(tabelaEstrangeira+'_'+id).innerHTML = vetor[1];
// 	});
// }


function buscar_nivel_acesso(){
	
	var id_nivel_acesso = "";
	var descrcaio_nivel_acesso = "";
	var area_nivel_acesso = "";
	var data_atualizacao_nivel_acesso = "";
	var usuario_id = "";
	var bool_ativo_nivel_acesso = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroNivel_acesso = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var area_nivel_acessoForm = "";

	$("#conteudoNivel_acesso").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_nivel_acessoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_nivel_acesso': true,
			'filtro': $("#pesquisa_nivel_acesso").val()
		}
	}).done( function(data){
		console.log(data);
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroNivel_acesso += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroNivel_acesso += "<br>";

			telaCadastroNivel_acesso += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_nivel_acesso = subvetor[0];
				descrcaio_nivel_acesso = subvetor[1];

				area_nivel_acesso = subvetor[2];
				area_nivel_acesso = area_nivel_acesso.split("+");

				data_atualizacao_nivel_acesso = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_nivel_acesso = subvetor[5];
				
				acumularFunctionId.push(id_nivel_acesso);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_nivel_acesso == 1) { 
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

				for (var j = 0; j < area_nivel_acesso.length; j++) {
					area_nivel_acessoForm += area_nivel_acesso[j]+"<br>";
				}

				tabelaViewBody += 		"<tr>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				"<a href='principal.php#!usuario_nivel_acesso_editar' style='color: #f0ad4e;' data-id='"+id_nivel_acesso+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descrcaio_nivel_acesso+"</td>";
				tabelaViewBody += 			"<td>"+area_nivel_acessoForm+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_nivel_acesso)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_nivel_acesso)+"'></div></td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_nivel_acesso+"'>";
				tabelaViewBody += 				"<a href='#!nivel_acesso' style='color: "+cor_ativo+"' data-id='"+id_nivel_acesso+"' onclick=\"excluir(this , 'nivel_acesso', "+bool_ativo_nivel_acesso+", 'usuario_nivel_acesso')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 		"</tr>";

				accesskeyEditar = "";
				area_nivel_acessoForm = "";
			}
			telaCadastroNivel_acesso += 	"<table class='table'>";
			telaCadastroNivel_acesso += 		"<tr bgcolor='white'>";
			telaCadastroNivel_acesso += 			"<td><b>Editar</b></td>";
			telaCadastroNivel_acesso += 			"<td><b>Descrição</b></td>";
			telaCadastroNivel_acesso += 			"<td><b>Áreas</b></td>";
			telaCadastroNivel_acesso += 			"<td><b>Data Atualização</b></td>";
			telaCadastroNivel_acesso += 			"<td><b>Usuário</b></td>";
			telaCadastroNivel_acesso += 			"<td><b>Ativo</b></td>";
			telaCadastroNivel_acesso += 		"</tr>";
			telaCadastroNivel_acesso +=		tabelaViewBody;
			telaCadastroNivel_acesso += 	"</table>";
		}
		telaCadastroNivel_acesso += "</div>";
		$("#conteudoNivel_acesso").html(telaCadastroNivel_acesso);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
