
$(document).ready(function(){
	var id_jogadores = "";
	var nome_jogadores = "";
	var foto_jogadores = "";
	var telefone_jogadores = "";
	var data_atualizacao_jogadores = "";
	var usuario_id = "";
	var bool_ativo_jogadores = "";

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
		url:'app/controllers/funcoes_jogadoresController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_jogadores_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_jogadores = vetor[0];
		
		nome_jogadores = vetor[1];
		foto_jogadores = vetor[2];
		telefone_jogadores = vetor[3];
		data_atualizacao_jogadores = vetor[4];
		usuario_id = vetor[5];
		bool_ativo_jogadores = vetor[6];
		
		$("#nome_jogadores").val(nome_jogadores);
		$("#foto_jogadores").val(foto_jogadores);
		$("#telefone_jogadores").val(telefone_jogadores);
		$("#data_atualizacao_jogadores").val(data_atualizacao_jogadores);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_jogadores").val(bool_ativo_jogadores);
		
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
		 if(validation($("#nome_jogadores").val() == "")) campoFocus = "nome_jogadores";
	else if(validation($("#telefone_jogadores").val() == "")) campoFocus = "telefone_jogadores";
	else if(validation($("#data_atualizacao_jogadores").val() == "")) campoFocus = "data_atualizacao_jogadores";
	else if(validation($("#usuario_id").val() == "")) campoFocus = "usuario_id";
	else if(validation($("#bool_ativo_jogadores").val() == "")) campoFocus = "bool_ativo_jogadores";


	else {
		$.ajax({
			url:'app/controllers/atualiza_jogadoresController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_jogadores': $("#editar").val(),
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
