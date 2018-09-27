<?php

class Condpagamento{

	var $codigo;
	var $descricao;
	var $percentual;
	var $tipopercentual;
	var $formapercentual;
	var $encargos;
	var $cliente;
	var $empregado;
	var $fornecedor;
	var $tipotitulo;
	var $categoriatitulo;
	var $tipovencimento;
	var $bancoreceber;
	var $departamento;
	var $financiamento;
	var $dataatualizacao;
	var $horaatualizacao;
	var $usuarioatualizacao;
	var $contacontabil;
	var $departamentoconta;
	var $situacaoconta;
	var $sequenciaconta;
	var $contacontabilcontra;
	var $departamentocontra;
	var $situacaocontra;
	var $sequenciacontra;
	var $tipojuros;
	var $geraboleto;
	var $gerarelcondicao;
	var $contacorrente;
	var $clienteespecial;
	var $taxacartao;
	var $diascartao;
	var $gerafluxocaixa;
	var $baixaautomatica;
	var $condvencimento;
	var $taxacartaoparc;
	var $diascarencia;
	var $controlavendacaixa;
	var $exigecadastros;
	var $taxa_boleto;
	var $diasvencimentoinicial;
	var $naoutilizaemvendas;
	var $diasfixovencimento;
	var $associado;
	var $verificarlimite;
	var $consumidor;
	var $naoverificacliente;
	var $juroscomposto;
	var $palm;
	var $grupo_conta;
	var $sub_grupo;
	var $seq_cta_custo;
	var $tiponf;
	var $inativo;
	var $valordespesasacessorias;
	var $acrescimoproduto;
	var $id_forma_pagamento;
	var $maximoparcelas;
	var $permiteboleto;
	var $percacrescimodia;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>