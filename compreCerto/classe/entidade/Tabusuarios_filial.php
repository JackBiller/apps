<?php

class Tabusuarios_filial{

	private $filial;
	private $usuario;
	private $sequencia;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>