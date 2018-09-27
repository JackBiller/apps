
function combo_historico_jogo(id, value){
	jk_comboVlrPreDataList(
		"Historico_jogo", "funcoes_historico_jogoController", 
		{
			'pequisa_historico_jogo': true
		}, "historico_jogo_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "historico_jogoDiv", "", 6, id, value
	);
}

function combo_historico_jogo_NV(){
	jk_comboDataList(
		"Historico_jogo", "funcoes_historico_jogoController", 
		{
			'pequisa_historico_jogo': true
		}, "historico_jogo_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "historico_jogoDiv", "", 6
	);
}