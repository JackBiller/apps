<?php

class Jogos{

	private $id_jogos;
	private $descricao_jogos;
	private $jogador_1_jogos;
	private $jogador_2_jogos;
	private $resultado_jogos;
	private $data_atualizacao_jogos;
	private $usuario_id;
	private $bool_ativo_jogos;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>