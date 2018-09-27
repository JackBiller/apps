
$(document).ready(function(){
	buscar_usuario();
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


function buscar_usuario(){
	var id_usuario = "";
	var nome_usuario = "";
	var login_usuario = "";
	var senha_usuario = "";
	var nivel_acesso_id = "";
	var bool_ativo_usuario = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroUsuario = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCards").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_usuarioController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_usuario': true,
			'filtro': $("#pesquisa_usuario").val()
		}
	}).done( function(data){
		console.log(data);

		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroUsuario += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroUsuario += "<br>";

			telaCadastroUsuario += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_usuario = subvetor[0];
				nome_usuario = subvetor[1];
				login_usuario = subvetor[2];
				senha_usuario = subvetor[3];
				nivel_acesso_id = subvetor[4];
				bool_ativo_usuario = subvetor[5];
				
				acumularFunctionId.push(id_usuario);
				acumularFunctionCampo.push(nivel_acesso_id+"+nivel_acesso");

				if (bool_ativo_usuario == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!usuario_edita' style='color: #f0ad4e;' data-id='"+id_usuario+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+nome_usuario+"</td>";
				tabelaViewBody += 			"<td>"+login_usuario+"</td>";
				tabelaViewBody += 			"<td><div id='nivel_acesso_"+parseInt(id_usuario)+"'></div></td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_usuario+"'>";
				tabelaViewBody += 				"<a href='#!usuario' style='color: "+cor_ativo+"' data-id='"+id_usuario+"' onclick=\"excluir(this , 'usuario', "+bool_ativo_usuario+", 'usuario')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 		"</tr>";

				accesskeyEditar = "";
			}
			telaCadastroUsuario += 	"<table class='table'>";
			telaCadastroUsuario += 		"<tr bgcolor='white'>";
			telaCadastroUsuario += 			"<td><b>Editar</b></td>";
			telaCadastroUsuario += 			"<td><b>Nome</b></td>";
			telaCadastroUsuario += 			"<td><b>Login</b></td>";
			telaCadastroUsuario += 			"<td><b>Nível Acesso</b></td>";
			telaCadastroUsuario += 			"<td><b>Ativo</b></td>";
			telaCadastroUsuario += 		"</tr>";
			telaCadastroUsuario +=		tabelaViewBody;
			telaCadastroUsuario += 	"</table>";
		}
		telaCadastroUsuario += "</div>";
		$("#conteudoUsuario").html(telaCadastroUsuario);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i]);
		}
	});
}