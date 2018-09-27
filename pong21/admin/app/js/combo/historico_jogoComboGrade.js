
function jk_historico_jogoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Historico_jogo", "funcoes_historico_jogoController", 
			{
				'pequisa_historico_jogo_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "historico_jogo_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "historico_jogoDiv", "", 6
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='historico_jogo_id' disabled>";
		$("#historico_jogoDiv").html(campo);
	}
}

function jk_historico_jogoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Historico_jogo", "funcoes_historico_jogoController", 
			{
				'pequisa_historico_jogo_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "historico_jogo_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "historico_jogoDiv", "", 6, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='historico_jogo_id' disabled>";
		$("#historico_jogoDiv").html(campo);
	}
}