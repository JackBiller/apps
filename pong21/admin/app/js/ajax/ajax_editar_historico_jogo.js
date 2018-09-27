
$(document).ready(function(){
	var id_historico_jogo = "";
	var sequencia_historico_jogo = "";
	var placar_historico_jogo = "";
	var jogos_id = "";
	var data_atualizacao_historico_jogo = "";
	var usuario_id = "";
	var bool_ativo_historico_jogo = "";

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
		url:'app/controllers/funcoes_historico_jogoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_historico_jogo_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_historico_jogo = vetor[0];
		
		sequencia_historico_jogo = vetor[1];
		placar_historico_jogo = vetor[2];
		jogos_id = vetor[3];
		data_atualizacao_historico_jogo = vetor[4];
		usuario_id = vetor[5];
		bool_ativo_historico_jogo = vetor[6];
		
		$("#sequencia_historico_jogo").val(sequencia_historico_jogo);
		$("#placar_historico_jogo").val(placar_historico_jogo);
		$("#jogos_id").val(jogos_id);
		$("#data_atualizacao_historico_jogo").val(data_atualizacao_historico_jogo);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_historico_jogo").val(bool_ativo_historico_jogo);
		
		if(jogos_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_jogosController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_jogos_id': true,
					'id': jogos_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_jogos(jogos_id, vetor[1]);
				// $("#jogos_id-flexdatalist").val(vetor[1]);
				// $("#jogos_id").val(parseInt(vetor[0]));
			});
			$("#jogos_id").val(jogos_id);
		}

		else combo_jogos_NV();
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
		 if(validation($("#sequencia_historico_jogo").val() == "")) campoFocus = "sequencia_historico_jogo";
	else if(validation($("#placar_historico_jogo").val() == "")) campoFocus = "placar_historico_jogo";
	else if(validation($("#jogos_id").val() == "")) campoFocus = "jogos_id";
	else if(validation($("#data_atualizacao_historico_jogo").val() == "")) campoFocus = "data_atualizacao_historico_jogo";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_historico_jogo").val() == "")) campoFocus = "bool_ativo_historico_jogo";


	else {
		$.ajax({
			url:'app/controllers/atualiza_historico_jogoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_historico_jogo': $("#editar").val(),
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
