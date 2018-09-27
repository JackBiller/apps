function logarSisatema(){
	var usuario = $("#textUsuario").val();
	var senha = $("#textSenha").val();

	$.ajax({
		url: caminhoServer+"login.php",
		type: 'POST',
		dataType: 'text',
		data:{
			'login': usuario,
			'senha': senha
		}
	}).done( function(data){
		console.log(data);
	});
}