
$(document).ready(function(){
	var id_jogo_atual = "";
	var resultado_jogo_atual = "";
	var data_atualizacao_jogo_atual = "";
	var usuario_id = "";
	var bool_ativo_jogo_atual = "";

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
		url:'app/controllers/funcoes_jogo_atualController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogo_atual_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_jogo_atual = vetor[0];
		
		resultado_jogo_atual = vetor[1];
		data_atualizacao_jogo_atual = vetor[2];
		usuario_id = vetor[3];
		bool_ativo_jogo_atual = vetor[4];
		
		$("#resultado_jogo_atual").val(resultado_jogo_atual);
		$("#data_atualizacao_jogo_atual").val(data_atualizacao_jogo_atual);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_jogo_atual").val(bool_ativo_jogo_atual);
		
		if(usuario_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_usuarioController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_usuario_id': true,
					'id': usuario_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_usuario(usuario_id, vetor[1]);
				// $("#usuario_id-flexdatalist").val(vetor[1]);
				// $("#usuario_id").val(parseInt(vetor[0]));
			});
			$("#usuario_id").val(usuario_id);
		}

		else combo_usuario_NV();
	});
});


function atualizarrRegistro(){
	var campoFocus = "";
		 if(validation($("#resultado_jogo_atual").val() == "")) campoFocus = "resultado_jogo_atual";
	else if(validation($("#data_atualizacao_jogo_atual").val() == "")) campoFocus = "data_atualizacao_jogo_atual";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogo_atual").val() == "")) campoFocus = "bool_ativo_jogo_atual";


	else {
		$.ajax({
			url:'app/controllers/atualiza_jogo_atualController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_jogo_atual': $("#editar").val(),
				'resultado_jogo_atual': $("#resultado_jogo_atual").val(),
				'data_atualizacao_jogo_atual': $("#data_atualizacao_jogo_atual").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_jogo_atual': $("#bool_ativo_jogo_atual").val()
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
