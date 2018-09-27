
function jk_jogosDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Jogos", "funcoes_jogosController", 
			{
				'pequisa_jogos_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogos_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "jogosDiv", "", 7
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogos_id' disabled>";
		$("#jogosDiv").html(campo);
	}
}

function jk_jogosDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Jogos", "funcoes_jogosController", 
			{
				'pequisa_jogos_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogos_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "jogosDiv", "", 7, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogos_id' disabled>";
		$("#jogosDiv").html(campo);
	}
}