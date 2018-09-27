<?php

class Jogo_atual{

	private $id_jogo_atual;
	private $resultado_jogo_atual;
	private $data_atualizacao_jogo_atual;
	private $usuario_id;
	private $bool_ativo_jogo_atual;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>