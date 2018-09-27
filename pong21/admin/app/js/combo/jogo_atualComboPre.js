
function combo_jogo_atual(id, value){
	jk_comboVlrPreDataList(
		"Jogo_atual", "funcoes_jogo_atualController", 
		{
			'pequisa_jogo_atual': true
		}, "jogo_atual_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "jogo_atualDiv", "", 4, id, value
	);
}

function combo_jogo_atual_NV(){
	jk_comboDataList(
		"Jogo_atual", "funcoes_jogo_atualController", 
		{
			'pequisa_jogo_atual': true
		}, "jogo_atual_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "jogo_atualDiv", "", 4
	);
}