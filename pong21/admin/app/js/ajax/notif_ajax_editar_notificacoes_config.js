
$(document).ready(function(){
	var id_notificacoes_config = "";
	var area_notificacoes_config = "";
	var tipo_alteracao_notificacoes_config = "";
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
		
		$("#area_notificacoes_config").val(area_notificacoes_config);

		tipo_alteracao_notificacoes_config
		$("#tipo_alteracao_notificacoes_config").val(tipo_alteracao_notificacoes_config);

	});
});


function atualizarrRegistro(){
	var campoFocus = "";
		 if(validation($("#area_notificacoes_config").val() == "")) campoFocus = "area_notificacoes_config";
	else if(validation($("#tipo_alteracao_notificacoes_config").val() == "")) campoFocus = "tipo_alteracao_notificacoes_config";
	else if(validation($("#data_atualizacao_notificacoes_config").val() == "")) campoFocus = "data_atualizacao_notificacoes_config";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_notificacoes_config").val() == "")) campoFocus = "bool_ativo_notificacoes_config";


	else {
		$.ajax({
			url:'app/controllers/atualiza_notificacoes_configController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_notificacoes_config': $("#editar").val(),
				'area_notificacoes_config': $("#area_notificacoes_config").val(),
				'tipo_alteracao_notificacoes_config': $("#tipo_alteracao_notificacoes_config").val(),
				'data_atualizacao_notificacoes_config': $("#data_atualizacao_notificacoes_config").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_notificacoes_config': $("#bool_ativo_notificacoes_config").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else 								toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}


jk_comboDataListString(
	"Área", "funcoes_notificacoesController", 
	{
		'listarAreas': true,
		'usuario': $("#usuario").val()
	}, "area_notificacoes_config", 
	[ "1" ], 
	0, [0], "i", "areasListadasDiv", "", 0
);



$(document).ready(function(){
	var id_notificacoes = "";
	var descricao_notificacoes = "";
	var usuario_atuador_notificacoes = "";
	var usuaio_requerente_notificacoes = "";
	var tipo_alteracao_notificacoes = "";
	var notificacoes_config_id = "";
	var bool_view_notificacoes = "";
	var data_atualizacao_notificacoes = "";
	var bool_ativo_notificacoes = "";

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
			'pequisa_notificacoes_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_notificacoes = vetor[0];
		
		descricao_notificacoes = vetor[1];
		usuario_atuador_notificacoes = vetor[2];
		usuaio_requerente_notificacoes = vetor[3];
		tipo_alteracao_notificacoes = vetor[4];
		notificacoes_config_id = vetor[5];
		bool_view_notificacoes = vetor[6];
		data_atualizacao_notificacoes = vetor[7];
		bool_ativo_notificacoes = vetor[8];
		
		$("#descricao_notificacoes").val(descricao_notificacoes);
		$("#usuario_atuador_notificacoes").val(usuario_atuador_notificacoes);
		$("#usuaio_requerente_notificacoes").val(usuaio_requerente_notificacoes);
		$("#tipo_alteracao_notificacoes").val(tipo_alteracao_notificacoes);
		$("#notificacoes_config_id").val(notificacoes_config_id);
		$("#bool_view_notificacoes").val(bool_view_notificacoes);
		$("#data_atualizacao_notificacoes").val(data_atualizacao_notificacoes);
		$("#bool_ativo_notificacoes").val(bool_ativo_notificacoes);
		
		if(notificacoes_config_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_notificacoes_configController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_notificacoes_config_id': true,
					'id': notificacoes_config_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_notificacoes_config(notificacoes_config_id, vetor[1]);
				// $("#notificacoes_config_id-flexdatalist").val(vetor[1]);
				// $("#notificacoes_config_id").val(parseInt(vetor[0]));
			});
			$("#notificacoes_config_id").val(notificacoes_config_id);
		}

		else combo_notificacoes_config_NV();
	});
});


function atualizarrRegistro(){
	var campoFocus = "";
		 if(validation($("#descricao_notificacoes").val() == "")) campoFocus = "descricao_notificacoes";
	else if(validation($("#usuario_atuador_notificacoes").val() == "")) campoFocus = "usuario_atuador_notificacoes";
	else if(validation($("#usuaio_requerente_notificacoes").val() == "")) campoFocus = "usuaio_requerente_notificacoes";
	else if(validation($("#tipo_alteracao_notificacoes").val() == "")) campoFocus = "tipo_alteracao_notificacoes";
	else if(validation($("#notificacoes_config_id").val() == "")) campoFocus = "notificacoes_config_id";
	else if(validation($("#bool_view_notificacoes").val() == "")) campoFocus = "bool_view_notificacoes";
	else if(validation($("#data_atualizacao_notificacoes").val() == "")) campoFocus = "data_atualizacao_notificacoes";
	else if(validation($("#bool_ativo_notificacoes").val() == "")) campoFocus = "bool_ativo_notificacoes";


	else {
		$.ajax({
			url:'app/controllers/atualiza_notificacoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_notificacoes': $("#editar").val(),
				'descricao_notificacoes': $("#descricao_notificacoes").val(),
				'usuario_atuador_notificacoes': $("#usuario_atuador_notificacoes").val(),
				'usuaio_requerente_notificacoes': $("#usuaio_requerente_notificacoes").val(),
				'tipo_alteracao_notificacoes': $("#tipo_alteracao_notificacoes").val(),
				'notificacoes_config_id': $("#notificacoes_config_id").val(),
				'bool_view_notificacoes': $("#bool_view_notificacoes").val(),
				'data_atualizacao_notificacoes': $("#data_atualizacao_notificacoes").val(),
				'bool_ativo_notificacoes': $("#bool_ativo_notificacoes").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else 								toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}

function validation(valor){
	if (valor == "") 	return false;
	else 				return true;
}
