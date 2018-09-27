
function gravarRegistro(){
	var campoFocus = "";


	if(true) {
		$.ajax({
			url:'app/controllers/funcoes_usuarioController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'cadastrar': true,
				'nome_usuario': $("#nome_usuario").val(),
				'login_usuario': $("#login_usuario").val(),
				'senha_usuario': $("#senha_usuario").val(),
				'nivel_acesso_id': $("#nivel_acesso_id").val(),
				'bool_ativo_usuario': $("#bool_ativo_usuario").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#nome_usuario").val("");
				$("#login_usuario").val("");
				$("#senha_usuario").val("");
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


jk_comboDataList(
	"Nivel_acesso", "funcoes_nivel_acessoController", 
	{
		'pequisa_nivel_acesso': true
	}, "nivel_acesso_id", 
	[ "1","2","3","4","5","6" ], 
	0, [1], "", "nivel_acessoDiv", "", 5
);


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