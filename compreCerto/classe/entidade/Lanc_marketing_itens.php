<?php

class Lanc_marketing_itens{
	var $filial;
	var $documento;
	var $sequencia;
	var $sub_grupo;
	var $grupo;
	var $item;
	var $quantidade;
	var $valor_unitario;
	var $valor_total;
	var $valor_desconto;
	var $taxa_desc;
	var $unidade;
	var $quantidadeprincipal;
	var $valor_base;
	var $vlrcalc;
	var $armado;
	var $descricaoarmado;
	var $sequenciaarmado;
	var $adicionalproduto;
	var $valorinicial;
	var $servicoarmado;
	var $servicocortedobra;
	var $usoconsumo;
	var $abaixotabela;
	var $projeto;
	var $comissao;
	var $linha;
	var $alteracaosimilar;
	var $faixapeso;
	var $estoqueatual;
	var $taxaipi;
	var $baseipi;
	var $valoripi;
	var $soldado;
	var $custocomparativo2;
	var $vlrcalcbruto;
	var $custocomparativo4;

	/* Variaveis de configuração */
	// var $indiceLanc_marketing;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>