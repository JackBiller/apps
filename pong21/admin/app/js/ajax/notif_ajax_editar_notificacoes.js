
$(document).ready(function(){
	var id_notificacoes_config = "";
	var area_notificacoes_config = "";
	var tipo_alteracao_notificacoes_config = "";
	var array_tipo_alteracao_notificacoes_config = [];
	var data_atualizacao_notificacoes_config = "";
	var usuario_id = "";
	var bool_ativo_notificacoes_config = "";

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
		url:'app/controllers/funcoes_notificacoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_notificacoes_config_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_notificacoes_config = vetor[0];
		
		area_notificacoes_config = vetor[1];
		tipo_alteracao_notificacoes_config = vetor[2];
		data_atualizacao_notificacoes_config = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_notificacoes_config = vetor[5];
		
		jk_comboVlrPreDataListString(
			"Área", "funcoes_notificacoesController", 
			{
				'listarAreas': true,
				'usuario': $("#usuario").val()
			}, "area_notificacoes_config", 
			[ "1" ], 
			0, [0], "i", "areasListadasDiv", "", 0, area_notificacoes_config, area_notificacoes_config
		);
		// $("#area_notificacoes_config").val(area_notificacoes_config);

		console.log("tipo_alteracao_notificacoes_config: "+tipo_alteracao_notificacoes_config);
		array_tipo_alteracao_notificacoes_config = tipo_alteracao_notificacoes_config.split("+");
		tipo_alteracao_notificacoes_config = "";
		for (var i = 0; i < array_tipo_alteracao_notificacoes_config.length; i++) {
			document.getElementById("check_"+array_tipo_alteracao_notificacoes_config[i]).checked = true;
			document.getElementById("icone_"+array_tipo_alteracao_notificacoes_config[i]).innerHTML = "<i class='fa fa-check'></i>";
			document.getElementById("linha_"+array_tipo_alteracao_notificacoes_config[i]).style.backgroundColor = "#5cb85c";
		}
		$("#tipo_alteracao_notificacoes_config").val(tipo_alteracao_notificacoes_config);

	});
});




function atualizarrRegistro(){
	var atividade  = document.getElementsByName("atividade");
	var atividadeSelecionadas = "";
	var contColunas = 0;
	for (var i = 0; i < atividade.length; i++) {
		if (document.getElementById("check_"+atividade[i].value).checked) {
			atividadeSelecionadas += contColunas == 0 ? atividade[i].value : "+"+atividade[i].value;
			contColunas++;
		}
	}
	console.log("atividadeSelecionadas: "+atividadeSelecionadas);
	var campoFocus = "";
		 if($("#area_notificacoes_config").val() == "") campoFocus = "area_notificacoes_config";
	else if(atividadeSelecionadas == "") toast.danger("É preciso que tenho pelo menos uma tipo de atividade selecionada!");


	else {
		$.ajax({
			url:'app/controllers/funcoes_notificacoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'editarConfigNotif': true,
				'area_notificacoes_config': $("#area_notificacoes_config").val(),
				'tipo_alteracao_notificacoes_config': atividadeSelecionadas,
				'usuario_id': $("#usuario_id").val(),
				'id': $("#editar").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else 							toast.success("Cadastrado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		console.log(campoFocus);
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
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