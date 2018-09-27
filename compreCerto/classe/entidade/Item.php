<?php

class Item{
	var $grupo;
	var $sub_grupo;
	var $item;
	var $descricao;
	var $descricaonf;
	var $referencia1;
	var $referencia2;
	var $unidade_medida;
	var $unidade_medida_venda;
	var $localizacao;
	var $atualiza_estoque;
	var $almoxarifado;
	var $peso_unitario;
	var $comissao;
	var $indice_preco1;
	var $indice_preco2;
	var $indice_preco3;
	var $indice_preco4;
	var $cod_tributacao;
	var $classif_fiscal;
	var $estoque;				// selecionei como estoque da tabela item_filial
	var $estoque_inicial;
	var $preco_medio;			// selecionei como Preço base da tabela item_filial
	var $preco_inicial;
	var $estoque_minimo;
	var $ultima_compra;
	var $receituario;
	var $dataatualizacao;
	var $horaatualizacao;
	var $usuarioatualizacao;
	var $movimenta_loja;
	var $bloqueado;
	var $vencimento;
	var $margemlucro;
	var $codigo_barras;
	var $observacaonota;
	var $percforaestado;
	var $sacas_troca;
	var $categoria;
	var $qtdeembalagem;
	var $medida;
	var $carga;
	var $topo;
	var $caracteristica;
	var $mov_almoxarif;
	var $tipoproduto;
	var $percentrada;
	var $qtdem3;
	var $imobilizado;
	var $producao;
	var $peso_aco;
	var $fatorprodutividade;
	var $observacaoproducao_barras;
	var $beneficiofiscal;
	var $reldiasvida;
	var $materiaprima;
	var $bloqueartransferencia;
	var $somentemultiplos;
	var $bloquearestoquenegativo;
	var $fabricante;
	var $pesoadicional;
	var $maximo;
	var $perccoluna001;
	var $perccoluna002;
	var $perccoluna003;
	var $perccoluna004;
	var $perccoluna005;
	var $codtipoitem;
	var $codgenero;
	var $codservico;
	var $idmercadoria;
	var $percpis;
	var $perccofins;
	var $sequenciatalao;
	var $codigoprodutonf;
	var $cst_pis_cofins;
	var $origem;
	var $pontosdesafio;
	var $cst_pis_cofins_entrada;
	var $numero;
	var $embalagem;
	var $marca;
	var $sabor;
	var $tipoconsumo;
	var $perccoluna001construtora;
	var $perccoluna002construtora;
	var $perccoluna003construtora;
	var $perccoluna004construtora;
	var $perccoluna005construtora;
	var $produtooferecer;
	var $controlaestoqueminimo;
	var $valormaxentrada;
	var $horasproducao;
	var $qtdecola;
	var $qtderebite;
	var $usuariohorasproducao;
	var $geraprojeto;
	var $codigoanp;
	var $perccoluna006;
	var $cliente;
	var $alertaestoqueminimo;
	var $especificacoes;
	var $descpercpis;
	var $descperccofins;
	var $diasvidatransferencia;
	var $incideipipiscofins;
	var $naoincideipipiscofins;
	var $naturezareceita;
	var $bccredito;
	var $tipocredito;
	var $conta_contabil;
	var $conta_contabil_destino;
	var $cubagemun;
	var $cubagemcaixa;
	var $produtoproducao;
	var $codigo_conversao;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>