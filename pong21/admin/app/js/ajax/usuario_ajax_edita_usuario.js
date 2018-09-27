
$(document).ready(function(){
	var id_usuario = "";
	var nome_usuario = "";
	var login_usuario = "";
	var nivel_acesso_id = "";
	var bool_ativo_usuario = "";

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
		url:'app/controllers/funcoes_usuarioController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_usuario_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_usuario = vetor[0];
		
		nome_usuario = vetor[1];
		login_usuario = vetor[2];
		nivel_acesso_id = vetor[4];
		bool_ativo_usuario = vetor[5];
		
		$("#nome_usuario").val(nome_usuario);
		$("#login_usuario").val(login_usuario);
		$("#nivel_acesso_id").val(nivel_acesso_id);
		$("#bool_ativo_usuario").val(bool_ativo_usuario);
		
		if(nivel_acesso_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_nivel_acessoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_nivel_acesso_id': true,
					'id': nivel_acesso_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_nivel_acesso(nivel_acesso_id, vetor[1]);
				// $("#nivel_acesso_id-flexdatalist").val(vetor[1]);
				// $("#nivel_acesso_id").val(parseInt(vetor[0]));
			});
			$("#nivel_acesso_id").val(nivel_acesso_id);
		}

		else combo_nivel_acesso_NV();
	});
});


function atualizarrRegistro(){
	var campoFocus = "";


	if(true) {
		$.ajax({
			url:'app/controllers/funcoes_usuarioController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'atualizar': true,
				'id_usuario': $("#editar").val(),
				'nome_usuario': $("#nome_usuario").val(),
				'login_usuario': $("#login_usuario").val(),
				'nivel_acesso_id': $("#nivel_acesso_id").val(),
				'bool_ativo_usuario': $("#bool_ativo_usuario").val()
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




function combo_nivel_acesso(id, value){
	jk_comboVlrPreDataList(
		"Nivel_acesso", "funcoes_nivel_acessoController", 
		{
			'pequisa_nivel_acesso': true
		}, "nivel_acesso_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "nivel_acessoDiv", "", 5, id, value
	);
}

function combo_nivel_acesso_NV(){
	jk_comboDataList(
		"Nivel_acesso", "funcoes_nivel_acessoController", 
		{
			'pequisa_nivel_acesso': true
		}, "nivel_acesso_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "nivel_acessoDiv", "", 5
	);
}