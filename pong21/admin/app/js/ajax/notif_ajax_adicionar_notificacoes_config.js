
function gravarRegistro(){
	var campoFocus = "";
		 if(validation($("#area_notificacoes_config").val() == "")) campoFocus = "area_notificacoes_config";
	else if(validation($("#tipo_alteracao_notificacoes_config").val() == "")) campoFocus = "tipo_alteracao_notificacoes_config";
	else if(validation($("#data_atualizacao_notificacoes_config").val() == "")) campoFocus = "data_atualizacao_notificacoes_config";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_notificacoes_config").val() == "")) campoFocus = "bool_ativo_notificacoes_config";


	else {
		$.ajax({
			url:'app/controllers/cadastro_notificacoes_configController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'area_notificacoes_config': $("#area_notificacoes_config").val(),
				'tipo_alteracao_notificacoes_config': $("#tipo_alteracao_notificacoes_config").val(),
				'data_atualizacao_notificacoes_config': $("#data_atualizacao_notificacoes_config").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_notificacoes_config': $("#bool_ativo_notificacoes_config").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#area_notificacoes_config").val("");
				$("#tipo_alteracao_notificacoes_config").val("");
			}
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





function gravarRegistro(){
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
			url:'app/controllers/cadastro_notificacoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
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
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_notificacoes").val("");
				$("#usuario_atuador_notificacoes").val("");
				$("#usuaio_requerente_notificacoes").val("");
				$("#tipo_alteracao_notificacoes").val("");
			}
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

