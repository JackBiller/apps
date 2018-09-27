
function jk_jogadoresDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Jogadores", "funcoes_jogadoresController", 
			{
				'pequisa_jogadores_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogadores_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "jogadoresDiv", "", 6
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogadores_id' disabled>";
		$("#jogadoresDiv").html(campo);
	}
}

function jk_jogadoresDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Jogadores", "funcoes_jogadoresController", 
			{
				'pequisa_jogadores_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogadores_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "jogadoresDiv", "", 6, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogadores_id' disabled>";
		$("#jogadoresDiv").html(campo);
	}
}