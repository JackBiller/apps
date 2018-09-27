var numTotalAreas = 0;


$(document).ready(function(){
	listaAreasAcesso();

	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'editar': true,
			'id': $("#editar").val()
		}
	}).done( function(data){});
});


function atualizarrRegistro(){
	var areas  = document.getElementsByName("areas");
	var areasSelecionadas = "";
	var contColunas = 0;
	for (var i = 0; i < areas.length; i++) {
		if (document.getElementById("check_"+areas[i].value).checked) {
			areasSelecionadas += contColunas == 0 ? areas[i].value : "+"+areas[i].value;
			contColunas++;
		}
	}

	var campoFocus = "";
		 if($("#descricao_nivel_acesso").val() == "") campoFocus = "descricao_nivel_acesso";
	// else if(contColunas == numTotalAreas) toast.danger("Não pode cadastrar com todas as areas selecionadas!");
	else if(contColunas == 0) toast.danger("Não pode cadastrar com nenhuma area selecionada!");

	else {
		$.ajax({
			url:'app/controllers/funcoes_nivel_acessoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'editar_nivel_acesso': true,
				'id_nivel_acesso': $("#editar").val(),
				'descricao_nivel_acesso': $("#descricao_nivel_acesso").val(),
				'area_nivel_acesso': areasSelecionadas,
				'usuario_id': $("#usuario_id").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else 							toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}






function listaAreasAcesso(){
	$.ajax({
		url:'app/controllers/funcoes_nivel_acessoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 'pequisa_nivel_acesso_id': true }
	}).done( function(data){
		console.log(data);
		// var vetor = data.split("{,}");
		formatarAreasAcesso(data.split("{,}")[2]);
	});
}

function formatarAreasAcesso(area_nivel_acesso){
	numTotalAreas = 0;
	console.log(area_nivel_acesso);
	area_nivel_acesso = area_nivel_acesso.split("+");

	var tabelaColunas = "";//"<h2>Areas de Acesso</h2>";
	tabelaColunas += 	"<table class='table'>";
	tabelaColunas += 		"<tr>";
	tabelaColunas += 			"<td><b>Coluna</b></td>";
	tabelaColunas += 			"<td><b>Selecionar</b></td>";
	tabelaColunas += 		"</tr>";
	
	for (var i = 0; i < area_nivel_acesso.length; i++) {
		tabelaColunas += "<tr bgcolor='#f0ad4e' style='color: white' id='linha_"+area_nivel_acesso[i]+"' onclick='selecionarColuna(\""+area_nivel_acesso[i]+"\")'>";
		tabelaColunas += 	"<td>"+area_nivel_acesso[i]+"</td>";
		tabelaColunas += 	"<td align=\"right\">";
		tabelaColunas += 		"<span id='icone_"+area_nivel_acesso[i]+"'><i class='fa fa-times'></i></span>";
		tabelaColunas += 		"<input type='hidden' name='areas' value='"+area_nivel_acesso[i]+"'>";
		tabelaColunas += 		"<input class='hidden' type='checkbox' id='check_"+area_nivel_acesso[i]+"'>";
		tabelaColunas += 	"</td>";
		tabelaColunas += "</tr>";
		numTotalAreas++;
	}

	tabelaColunas += "</table>";
	tabelaColunas = numTotalAreas != 0 ? tabelaColunas : "Carregando Áreas...";

	$("#conteudoAreas_acesso").html(tabelaColunas);




	// document ready original
	var descricao_nivel_acesso = "";
	var area_nivel_acesso = "";

	var vetor = [];

	$.ajax({
		url:'app/controllers/funcoes_nivel_acessoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_nivel_acesso_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		descricao_nivel_acesso = vetor[1];
		area_nivel_acesso = vetor[2];
		area_nivel_acesso = area_nivel_acesso.split("+");
		
		$("#descricao_nivel_acesso").val(descricao_nivel_acesso);

		for (var i = 0; i < area_nivel_acesso.length; i++) {
			document.getElementById("check_"+area_nivel_acesso[i]).checked = true;
			document.getElementById("icone_"+area_nivel_acesso[i]).innerHTML = "<i class='fa fa-check'></i>";
			document.getElementById("linha_"+area_nivel_acesso[i]).style.backgroundColor = "#5cb85c";
		}
	});
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