<?php

class Cliefornec_entrega{

	var $cliente;
	var $seq;
	var $cep;
	var $endereco;
	var $bairro;
	var $cidade;
	var $estado;
	var $paginaguia;
	var $letraguia;
	var $linhaguia;
	var $numero;
	var $telefone;
	var $observacaoguia;
	var $contato;
	var $fazenda;
	var $inscprodutorrural;
	var $tipoendereco;
	var $usuarioobservacaoguia;
	var $observacao;
	var $complemento;
	var $email;
	var $codcidade;
	var $cnpj;
	var $apelido;
	var $id_engenharia;
	var $inativo;
	var $latitude;
	var $longitude;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>