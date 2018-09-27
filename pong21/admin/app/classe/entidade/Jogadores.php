<?php

class Jogadores{

	private $id_jogadores;
	private $nome_jogadores;
	private $foto_jogadores;
	private $telefone_jogadores;
	private $data_atualizacao_jogadores;
	private $usuario_id;
	private $bool_ativo_jogadores;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>