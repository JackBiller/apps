<?php

class Cliefornec_telefone{

	var $cliente;
	var $sequencia;
	var $telefone;
	var $ramal;
	var $tipo;
	var $contato;
	var $email;
	var $envianfe;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>