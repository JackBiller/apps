<?php

class Tabusuarios{
	var $identificacao;
	var $nome;
	var $senha;
	var $administracao;
	var $filial;
	var $alterafilial;
	var $alterafinanceiro;
	var $diretoria;
	var $perc_descontos;
	var $perc_juros;
	var $atendente;
	var $palm;
	var $vendedor;
	var $controlaop;
	var $master;
	var $consultapedidos;
	var $inativo;
	var $autorizacaoreabrepedido;
	var $controleautorizacaocompras;
	var $valormaxsolicitacao;
	var $valormaxcotacao;
	var $descontonf;
	var $limitepessoafisica;
	var $limitepessoajuridica;
	var $dataatualizacao;
	var $horaatualizacao;
	var $usuarioatualizacao;
	var $dataatualizacao_alteracao;
	var $horaatualizacao_alteracao;
	var $usuarioatualizacao_alteracao;
	var $autorizaatualizacoes;
	var $mostrarconsultacompras;
	var $naoalteradatapagto;
	var $distribuireclamacao;
	var $encerrareclamacao;
	var $incluifoto;
	var $excluifoto;
	var $valor_descontos;
	var $consultageracaocompras;
	var $controlalogistica;
	var $segundaautorizacaoprimeira;

	/* variavel de configura~ção */
	var $status = false;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>