
function gravarRegistro(){
	var campoFocus = "";
		 if(validation($("#nome_jogadores").val() == "")) campoFocus = "nome_jogadores";
	else if(validation($("#telefone_jogadores").val() == "")) campoFocus = "telefone_jogadores";
	else if(validation($("#data_atualizacao_jogadores").val() == "")) campoFocus = "data_atualizacao_jogadores";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogadores").val() == "")) campoFocus = "bool_ativo_jogadores";


	else {
		$.ajax({
			url:'app/controllers/cadastro_jogadoresController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'nome_jogadores': $("#nome_jogadores").val(),
				'foto_jogadores': $("#foto_jogadores").val(),
				'telefone_jogadores': $("#telefone_jogadores").val(),
				'data_atualizacao_jogadores': $("#data_atualizacao_jogadores").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_jogadores': $("#bool_ativo_jogadores").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#nome_jogadores").val("");
				$("#foto_jogadores").val("");
				$("#telefone_jogadores").val("");
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
