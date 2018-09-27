
function gravarRegistro(){
	var campoFocus = "";
		 if(validation($("#sequencia_historico_jogo").val() == "")) campoFocus = "sequencia_historico_jogo";
	else if(validation($("#placar_historico_jogo").val() == "")) campoFocus = "placar_historico_jogo";
	else if(validation($("#jogos_id").val() == "")) campoFocus = "jogos_id";
	else if(validation($("#data_atualizacao_historico_jogo").val() == "")) campoFocus = "data_atualizacao_historico_jogo";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_historico_jogo").val() == "")) campoFocus = "bool_ativo_historico_jogo";


	else {
		$.ajax({
			url:'app/controllers/cadastro_historico_jogoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'sequencia_historico_jogo': $("#sequencia_historico_jogo").val(),
				'placar_historico_jogo': $("#placar_historico_jogo").val(),
				'jogos_id': $("#jogos_id").val(),
				'data_atualizacao_historico_jogo': $("#data_atualizacao_historico_jogo").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_historico_jogo': $("#bool_ativo_historico_jogo").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#sequencia_historico_jogo").val("");
				$("#placar_historico_jogo").val("");
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
