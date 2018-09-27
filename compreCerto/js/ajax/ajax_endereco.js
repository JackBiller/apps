
/***********************************************************************************************************/
/* BUSCAR POR CEP */
/***********************************************************************************************************/
function buscarCep(cep, arrayCampos){
	cep = cep.replace(/_/g, "");
	zerarCamposEndereco(false, $("cepCliente").val(), false);

	if (cep.length == 9) {
		$.ajax({
			url: "https://viacep.com.br/ws/"+cep+"/json/",
			type: 'GET',
			cache: false,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			error: function(){
				console.log("Erro ao buscar Cep verifique sua conexão com a Internet!");
				buscaCepLocal(cep, arrayCampos);
			}
		}).done( function(dataCepWeb){
			console.log(dataCepWeb.erro);
			if (dataCepWeb.erro) {
				buscaCepLocal(cep, arrayCampos);
				/* jk_toasth('error', "Erro ao tentar encontrar o CEP", 5000); */
			} else {
				zerarCamposEndereco(true, $("cepCliente").val(), false);
				// ['enderecoCliente','numeroCliente','bairroCliente','cidadeCliente','estadoCliente'];				
				$("#"+arrayCampos[0]).val(dataCepWeb.logradouro);
				$("#"+arrayCampos[2]).val(dataCepWeb.bairro);
				$("#"+arrayCampos[3]).val(dataCepWeb.localidade);
				$("#"+arrayCampos[4]).val(dataCepWeb.uf);
				$('#'+arrayCampos[1]).focus();

				$("#codigoCliente").val(cliente_Global.codigo);
				$("#clienteCombo_Global").val(cliente_Global.codigo);
				/* $("#clienteCombo_Global-flexdatalist").val(cliente_Global.razaosocial); */
				$("#clienteCombo_Global-flexdatalist").val(cliente_Global.codigo);
				$("#clienteSemRegistro").val(cliente_Global.razaosocial);

				gravarViaCep(cep, dataCepWeb);
			}
		});
	}
}



function buscaCepLocal(cep, arrayCampos){
	$.ajax({
		url: caminhoServer+"pedido.php",
		type: 'POST',
		dataType: 'text',
		data:{ 
			'buscaCep': true,
			'cep': cep
		},
		error: function(){
			jk_toasth("error", "Erro ao buscar Cep, verifique sua conexão com a Internet!", 5000);
			console.log("Erro consulta local");
		}
	}).done( function(dataCepLocal){
		dataCepLocal = JSON.parse(dataCepLocal);

		if (dataCepLocal.length == 0) {
			jk_toasth("error", "endereço invalido", 5000);
		} else {
			/* cep, endereco, bairro, cidade, estado, observacaoendereco, latitude, longitude, latitude_bairro, longitude_bairro */
			zerarCamposEndereco(true, $("cepCliente").val(), false);

			$("#"+arrayCampos[0]).val(dataCepLocal.endereco);
			$("#"+arrayCampos[2]).val(dataCepLocal.bairro);
			$("#"+arrayCampos[3]).val(dataCepLocal.cidade);
			$("#"+arrayCampos[4]).val(dataCepLocal.estado);
			$('#'+arrayCampos[1]).focus();

			$("#codigoCliente").val(cliente_Global.codigo);
			$("#clienteCombo_Global").val(cliente_Global.codigo);
			/* $("#clienteCombo_Global-flexdatalist").val(cliente_Global.razaosocial); */
			$("#clienteCombo_Global-flexdatalist").val(cliente_Global.codigo);
			$("#clienteSemRegistro").val(cliente_Global.razaosocial);
		}
	});
}




function gravarViaCep(cep, objetoRetorno){
	/* console.log("gravarViaCep"); */
	$.ajax({
		url: caminhoServer+"pedido.php",
		type: 'POST',
		dataType: 'text',
		data:{ 
			'gravarViaCep': true,
			'cep': cep,
			'logradouro': objetoRetorno.logradouro,
			'complemento': objetoRetorno.complemento,
			'bairro': objetoRetorno.bairro,
			'localidade': objetoRetorno.localidade,
			'uf': objetoRetorno.uf,
			'unidade': objetoRetorno.unidade,
			'ibge': objetoRetorno.ibge,
			'gia': objetoRetorno.gia
		}
	}).done( function(data){
		/* console.log(data); */
	});
}