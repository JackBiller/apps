<?php

/**
* Autor:Jack Biller
*/
class Resultado{
	var $resultado;
	var $status = false;
	var $query;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}


?>