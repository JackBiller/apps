
function jk_jogo_atualDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Jogo_atual", "funcoes_jogo_atualController", 
			{
				'pequisa_jogo_atual_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogo_atual_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "jogo_atualDiv", "", 4
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogo_atual_id' disabled>";
		$("#jogo_atualDiv").html(campo);
	}
}

function jk_jogo_atualDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Jogo_atual", "funcoes_jogo_atualController", 
			{
				'pequisa_jogo_atual_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "jogo_atual_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "jogo_atualDiv", "", 4, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='jogo_atual_id' disabled>";
		$("#jogo_atualDiv").html(campo);
	}
}