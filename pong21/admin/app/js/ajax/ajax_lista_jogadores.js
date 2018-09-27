
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_jogadores();
});

function buscar_jogadores(){
	
	var id_jogadores = "";
	var nome_jogadores = "";
	var foto_jogadores = "";
	var telefone_jogadores = "";
	var data_atualizacao_jogadores = "";
	var usuario_id = "";
	var bool_ativo_jogadores = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroJogadores = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoJogadores").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_jogadoresController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogadores': true,
			'filtro': $("#pesquisa_jogadores").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroJogadores += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroJogadores += "<br>";

			telaCadastroJogadores += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_jogadores = subvetor[0];
				nome_jogadores = subvetor[1];
				foto_jogadores = subvetor[2];
				telefone_jogadores = subvetor[3];
				data_atualizacao_jogadores = subvetor[4];
				usuario_id = subvetor[5];
				bool_ativo_jogadores = subvetor[6];
				
				acumularFunctionId.push(id_jogadores);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_jogadores == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_jogadores' style='color: #f0ad4e;' data-id='"+id_jogadores+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_jogadores+"'>";
				tabelaViewBody += 				"<a href='#!jogadores' style='color: "+cor_ativo+"' data-id='"+id_jogadores+"' onclick=\"excluir(this , 'jogadores', "+bool_ativo_jogadores+", 'jogadores')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+nome_jogadores+"</td>";
				tabelaViewBody += 			"<td>"+foto_jogadores+"</td>";
				tabelaViewBody += 			"<td>"+telefone_jogadores+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_jogadores)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_jogadores)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroJogadores += 	"<table class='table'>";
			telaCadastroJogadores += 		"<tr bgcolor='white'>";
			telaCadastroJogadores += 			"<td><b>Editar</b></td>";
			telaCadastroJogadores += 			"<td><b>Ativo</b></td>";
			telaCadastroJogadores += 			"<td><b>N°</b></td>";
			telaCadastroJogadores += 			"<td><b>Nome</b></td>";
			telaCadastroJogadores += 			"<td><b>Foto</b></td>";
			telaCadastroJogadores += 			"<td><b>Telefone</b></td>";
			telaCadastroJogadores += 			"<td><b>Data Atualização</b></td>";
			telaCadastroJogadores += 			"<td><b>Usuário</b></td>";
			telaCadastroJogadores += 		"</tr>";
			telaCadastroJogadores +=		tabelaViewBody;
			telaCadastroJogadores += 	"</table>";
		}
		telaCadastroJogadores += "</div>";
		$("#conteudoJogadores").html(telaCadastroJogadores);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}
