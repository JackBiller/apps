<?php


Class Balanca{
	var $id_balanca;
	var $descricao_balanca;
	var $peso_balanca;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>