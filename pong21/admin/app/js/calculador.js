
function calculador(op, campos, camposData, resultado, campoAtual, tipo){
	var resultadoLocal = "";
	switch(op){
		case 1:  resultadoLocal = soma_dois(campos, camposData, tipo); break;
		case 2:  resultadoLocal = subtrai_dois(campos, camposData, tipo); break;
		case 3:  resultadoLocal = multiplica_dois(campos, camposData, tipo); break;
		case 4:  resultadoLocal = divide_dois(campos, camposData, tipo); break;
		case 5:  resultadoLocal = pontencia_quadrada(campos, camposData, tipo); break;
		case 6:  resultadoLocal = raiz(campos, camposData, tipo); break;
		case 7:  resultadoLocal = media_tre_num(campos, camposData, tipo); break;
		case 8:  resultadoLocal = potenciacao_simples(campos, camposData, tipo); break;
		case 9:  resultadoLocal = desconto_loja(campos, camposData, tipo); break;
		case 10: resultadoLocal = data_entrega(campos, camposData, tipo); break;
		case 11: resultadoLocal = diferenca_datas(campos, camposData, tipo); break;
		default: resultadoLocal = "";
	}
	document.getElementById(resultado).value = resultadoLocal;
	document.getElementById(resultado).disabled = false;
	document.getElementById(resultado).click();
	document.getElementById(resultado).disabled = true;
	if (campoAtual != "") {
		document.getElementById(campoAtual).focus();
	}
}

function soma_dois(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  n0 + n1;
		}
	}
	return resultado;
}

function subtrai_dois(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  n0 - n1;
		}
	}
	return resultado;
}

function multiplica_dois(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  n0 * n1;
		}
	}
	return resultado;
}

function divide_dois(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  n0 / n1;
		}
	}
	return resultado;
}

function pontencia_quadrada(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	var n0 = document.getElementById(campos).value;

	if (n0 != "") {
		if (tipo == "i" || tipo == "s") n0 = parseInt(n0);
		else n0 = parseFloat(n0);

		if (validaData){
			resultado =  n0 * n0;
		}
	}
	return resultado;
}

function raiz(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  Math.exp(Math.log(n0) / n1);
		}
	}
	return resultado;
}

function media_tre_num(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;
	var n2 = document.getElementById(campos[2]).value;

	if (n0 != "" && n1 != "" && n2 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
			n2 = parseInt(n2);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
			n2 = parseFloat(n2);
		}

		if (validaData){
			resultado =  ( n0 + n1 + n2 ) / 3;
		}
	}
	return resultado;
}

function potenciacao_simples(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  Math.pow(n0, n1);
		}
	}
	return resultado;
}

function desconto_loja(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	campos = campos.split("+");
	var n0 = document.getElementById(campos[0]).value;
	var n1 = document.getElementById(campos[1]).value;

	if (n0 != "" && n1 != "") {
		if (tipo == "i" || tipo == "s") {
			n0 = parseInt(n0);
			n1 = parseInt(n1);
		}
		else {
			n0 = parseFloat(n0);
			n1 = parseFloat(n1);
		}

		if (validaData){
			resultado =  n0 - ( ( n0 * n1 ) / 100 );
		}
	}
	return resultado;
}

function data_entrega(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	var n0 = document.getElementById(campos).value;
	var d0 = document.getElementById(camposData).value;

	if (n0 != "" && moment(d0, 'YYYY-MM-DD').isValid()) {
		if (tipo == "i" || tipo == "s") n0 = parseInt(n0);
		else n0 = parseFloat(n0);

		var ano0 = d0.split("-")[0];
		ano0 = ""+parseInt(ano0);
		if (ano0.length != 4) validaData = false;
		d0 = moment(d0, 'YYYY-MM-DD');

		if (validaData){
			resultado =  d0.add(n0, 'days').format('YYYY-MM-DD');
		}
	}
	return resultado;
}

function diferenca_datas(campos, camposData, tipo) {
	var resultado = "";
	var validaData = true;
	camposData = camposData.split("+");
	var d0 = document.getElementById(camposData[0]).value;
	var d1 = document.getElementById(camposData[1]).value;

	if (moment(d0, 'YYYY-MM-DD').isValid() && moment(d1, 'YYYY-MM-DD').isValid()) {

		var ano0 = d0.split("-")[0];
		ano0 = ""+parseInt(ano0);
		if (ano0.length != 4) validaData = false;
		d0 = moment(d0, 'YYYY-MM-DD');

		var ano1 = d1.split("-")[0];
		ano1 = ""+parseInt(ano1);
		if (ano1.length != 4) validaData = false;
		d1 = moment(d1, 'YYYY-MM-DD');

		if (validaData){
			resultado =  d1.diff(d0, 'days');
		}
	}
	return resultado;
}