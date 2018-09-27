<?php

class Lanc_marketing{
	var $filial;
	var $documento;
	var $cliente;
	var $total;
	var $pessoa;
	var $cpf_cgc;
	var $inscricaoestadual;
	var $razaosocial;
	var $endereco;
	var $bairro;
	var $cidade;
	var $estado;
	var $cep;
	var $telefone;
	var $fax;
	var $email;
	var $contato;
	var $emissao;
	var $validade;
	var $previsao;
	var $observacao;
	var $encerramento;
	var $flagcancelada;
	var $dataatualizacao;
	var $horaatualizacao;
	var $usuarioatualizacao;
	var $prazoentrega;
	var $localentrega;
	var $pagamento;
	var $observacaoretorno;
	var $encerrado;
	var $transportadora;
	var $vendedor;
	var $totalfrete;
	var $observacaofrete;
	var $celular;
	var $pedido;
	var $justificativa;
	var $deptocomercial;
	var $numero;
	var $margemlucro;
	var $observacaomaterialarmado;
	var $procedencia;
	var $desconto;
	var $mensagemdestaque;
	var $orcamentoreferente;
	var $motivojustificativa;
	var $osorcamento;
	var $oslote;
	var $historico;
	var $valordesconto;
	var $retira;
	var $categoria;
	var $cepentrega;
	var $numeroentrega;
	var $tabela;
	var $motivo;
	var $autorizadomargem;
	var $margemlucroproduto;
	var $margemlucroarmado;
	var $margemlucrocortedobra;
	var $declinado;
	var $diasentrega;
	var $pesoentrega;
	var $qtdefolhas;
	var $projarmado;
	var $projcortedobra;
	var $alteracaopreco;
	var $origem;
	var $armado;
	var $cortedobra;
	var $tamanhofont;
	var $dataencerradoprojeto;
	var $usuarioencerradoprojeto;
	var $geraprojeto;
	var $datainicioprojeto;
	var $usuariogeraprojeto;
	var $valoripi;
	var $consumidorfinal;
	var $baseipi;
	var $nomefantasia;
	var $prazoproducaoarmado;
	var $frete;
	var $diasencerradoprojeto;
	var $encerradovendas;
	var $contribuinte;
	var $naocontribuinte;
	var $industria;
	var $isencaoipi;
	var $dataatualizacao_alteracao;
	var $horaatualizacao_alteracao;
	var $usuarioatualizacao_alteracao;
	var $referenciaentrega;
	var $obsleiaatencao;
	var $despesasacessorias;
	var $margemlucrosoldado;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>