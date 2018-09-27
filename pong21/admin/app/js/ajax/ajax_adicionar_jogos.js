
function gravarRegistro(){
	var campoFocus = "";
		 if(validation($("#descricao_jogos").val() == "")) campoFocus = "descricao_jogos";
	else if(validation($("#jogador_1_jogos").val() == "")) campoFocus = "jogador_1_jogos";
	else if(validation($("#jogador_2_jogos").val() == "")) campoFocus = "jogador_2_jogos";
	else if(validation($("#resultado_jogos").val() == "")) campoFocus = "resultado_jogos";
	else if(validation($("#data_atualizacao_jogos").val() == "")) campoFocus = "data_atualizacao_jogos";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogos").val() == "")) campoFocus = "bool_ativo_jogos";


	else {
		$.ajax({
			url:'app/controllers/cadastro_jogosController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_jogos': $("#descricao_jogos").val(),
				'jogador_1_jogos': $("#jogador_1_jogos").val(),
				'jogador_2_jogos': $("#jogador_2_jogos").val(),
				'resultado_jogos': $("#resultado_jogos").val(),
				'data_atualizacao_jogos': $("#data_atualizacao_jogos").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_jogos': $("#bool_ativo_jogos").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_jogos").val("");
				$("#jogador_1_jogos").val("");
				$("#jogador_2_jogos").val("");
				$("#resultado_jogos").val("");
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
