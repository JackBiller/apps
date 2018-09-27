
$(document).ready(function(){
	var id_jogos = "";
	var descricao_jogos = "";
	var jogador_1_jogos = "";
	var jogador_2_jogos = "";
	var resultado_jogos = "";
	var data_atualizacao_jogos = "";
	var usuario_id = "";
	var bool_ativo_jogos = "";

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
		url:'app/controllers/funcoes_jogosController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogos_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_jogos = vetor[0];
		
		descricao_jogos = vetor[1];
		jogador_1_jogos = vetor[2];
		jogador_2_jogos = vetor[3];
		resultado_jogos = vetor[4];
		data_atualizacao_jogos = vetor[5];
		usuario_id = vetor[6];
		bool_ativo_jogos = vetor[7];
		
		$("#descricao_jogos").val(descricao_jogos);
		$("#jogador_1_jogos").val(jogador_1_jogos);
		$("#jogador_2_jogos").val(jogador_2_jogos);
		$("#resultado_jogos").val(resultado_jogos);
		$("#data_atualizacao_jogos").val(data_atualizacao_jogos);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_jogos").val(bool_ativo_jogos);
		
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
		 if(validation($("#descricao_jogos").val() == "")) campoFocus = "descricao_jogos";
	else if(validation($("#jogador_1_jogos").val() == "")) campoFocus = "jogador_1_jogos";
	else if(validation($("#jogador_2_jogos").val() == "")) campoFocus = "jogador_2_jogos";
	else if(validation($("#resultado_jogos").val() == "")) campoFocus = "resultado_jogos";
	else if(validation($("#data_atualizacao_jogos").val() == "")) campoFocus = "data_atualizacao_jogos";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogos").val() == "")) campoFocus = "bool_ativo_jogos";


	else {
		$.ajax({
			url:'app/controllers/atualiza_jogosController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_jogos': $("#editar").val(),
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
