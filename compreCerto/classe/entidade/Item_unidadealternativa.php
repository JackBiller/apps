<?php

class Item_unidadealternativa{

	var $item;
	var $unidade_medida;
	var $quantidade;
	var $destacanf;
	var $descricao_unidade;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>