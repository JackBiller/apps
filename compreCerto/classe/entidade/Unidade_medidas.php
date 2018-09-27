<?php

class Unidade_medidas{

	private $unidade_medida;
	private $descricao;
	private $limite_inferior;
	private $limite_superior;
	private $multiplicador;
	private $transmissaodialup;
	private $dataatualizacao;
	private $horaatualizacao;
	private $usuarioatualizacao;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>