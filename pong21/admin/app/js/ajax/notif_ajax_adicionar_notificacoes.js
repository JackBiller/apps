
function gravarRegistro(){
	var atividade  = document.getElementsByName("atividade");
	var atividadeSelecionadas = "";
	var contColunas = 0;
	for (var i = 0; i < atividade.length; i++) {
		if (document.getElementById("check_"+atividade[i].value).checked) {
			atividadeSelecionadas += contColunas == 0 ? atividade[i].value : "+"+atividade[i].value;
			contColunas++;
		}
	}
	console.log("atividadeSelecionadas: "+atividadeSelecionadas);
	var campoFocus = "";
		 if($("#area_notificacoes_config").val() == "") campoFocus = "area_notificacoes_config";
	else if(atividadeSelecionadas == "") toast.danger("É preciso que tenho pelo menos uma tipo de atividade selecionada!");


	else {
		$.ajax({
			url:'app/controllers/funcoes_notificacoesController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'adicionarConfigNotif': true,
				'area_notificacoes_config': $("#area_notificacoes_config").val(),
				'tipo_alteracao_notificacoes_config': atividadeSelecionadas,
				'usuario_id': $("#usuario_id").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else 							toast.success("Cadastrado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		console.log(campoFocus);
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}



jk_comboDataListString(
	"Área", "funcoes_notificacoesController", 
	{
		'listarAreas': true,
		'usuario': $("#usuario").val()
	}, "area_notificacoes_config", 
	[ "1" ], 
	0, [0], "i", "areasListadasDiv", "", 0
);




function selecionarColuna(coluna){
	if (document.getElementById("check_"+coluna).checked) {
		document.getElementById("check_"+coluna).checked = false;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-times'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#f0ad4e";
	} else {
		document.getElementById("check_"+coluna).checked = true;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-check'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#5cb85c";
	}
}