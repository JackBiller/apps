<?php

class Cep{
	var $cep;
	var $endereco;
	var $bairro;
	var $cidade;
	var $estado;
	var $observacaoendereco;
	var $latitude;
	var $longitude;
	var $latitude_bairro;
	var $longitude_bairro;

	var $debug = 'OK';

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>