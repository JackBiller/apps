
function combo_jogos(id, value){
	jk_comboVlrPreDataList(
		"Jogos", "funcoes_jogosController", 
		{
			'pequisa_jogos': true
		}, "jogos_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "jogosDiv", "", 7, id, value
	);
}

function combo_jogos_NV(){
	jk_comboDataList(
		"Jogos", "funcoes_jogosController", 
		{
			'pequisa_jogos': true
		}, "jogos_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "jogosDiv", "", 7
	);
}