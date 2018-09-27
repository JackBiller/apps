<?php

class Historico_jogo{

	private $id_historico_jogo;
	private $sequencia_historico_jogo;
	private $placar_historico_jogo;
	private $jogos_id;
	private $data_atualizacao_historico_jogo;
	private $usuario_id;
	private $bool_ativo_historico_jogo;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>