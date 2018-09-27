<?php

class Item_filial{

	var $filial;
	var $grupo;
	var $sub_grupo;
	var $item;
	var $preco_base;
	var $indice_preco1;
	var $indice_preco2;
	var $indice_preco3;
	var $indice_preco4;
	var $estoque;
	var $estoque_inicial;
	var $preco_medio;
	var $preco_inicial;
	var $preco_anterior;
	var $atualizacao_preco;
	var $ultima_compra;
	var $vlr_ultimacompra;
	var $qtde_inventario;
	var $medio_inventario;
	var $movimenta_loja;
	var $estorno_inicial;
	var $etiquetas;
	var $estoqueminimo;
	var $preco_minimo;
	var $localizacao;
	var $bloquearestoquenegativo;
	var $piso;
	var $prateleira;
	var $posicao;
	var $atacado;
	var $usuarioalteracao;
	var $precomediovenda;
	var $carteira;
	var $preco_maximo;
	var $carteiratransferencia;
	var $precocusto;
	var $preco_mediobruto;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>