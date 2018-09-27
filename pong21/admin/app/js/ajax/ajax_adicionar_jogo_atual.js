
function gravarRegistro(){
	var campoFocus = "";
		 if(validation($("#resultado_jogo_atual").val() == "")) campoFocus = "resultado_jogo_atual";
	else if(validation($("#data_atualizacao_jogo_atual").val() == "")) campoFocus = "data_atualizacao_jogo_atual";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogo_atual").val() == "")) campoFocus = "bool_ativo_jogo_atual";


	else {
		$.ajax({
			url:'app/controllers/cadastro_jogo_atualController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'resultado_jogo_atual': $("#resultado_jogo_atual").val(),
				'data_atualizacao_jogo_atual': $("#data_atualizacao_jogo_atual").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_jogo_atual': $("#bool_ativo_jogo_atual").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#resultado_jogo_atual").val("");
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
