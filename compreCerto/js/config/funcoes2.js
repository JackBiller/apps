
function jk_comboDataListString(titulo, controller, dataParam, id, param, idValue, idDescricao, accessKey, IdDiv, onchange, idAtivo){
	$.ajax({
		url:'app/controllers/'+controller+'.php',
		type: 'POST',
		dataType: 'text',
		data: dataParam
	}).done( function(data){
		console.log("data do relatorio tabela: "+data);
		var valorParam = [];
		var valorReal = "";
		var contValorReal = 0;
		var montarInputList = "";
		var arrayJson = "";
		var cont = 0;

		if (data == "") {
			montarInputList += "<input type='text' class='form-control' placeholder='Sem registros ("+titulo+")' disabled>";
		} else {
			montarInputList += "<input type='text' id='"+id+"'";
			montarInputList += "class='flexdatalist form-control' placeholder='"+titulo+"'";
			montarInputList += "data-min-length='0' data-visible-properties='[\""+param[idDescricao[0]]+"\"]' ";
			montarInputList += "data-selection-required='true' data-value-property='"+param[idValue]+"' ";
			montarInputList += "onchange='"+onchange+"' onfocus='limparValorCombo(this.id)'";
			montarInputList += "required disabled>";

			var vetor = data.split("[]");
			var subvetor = [];
			
			arrayJson += "[";
			for (var i = 0; i < vetor.length; i++) {
				valorReal = "";
				subvetor = vetor[i].split("{,}");

				for (var j = param.length - 1; j >= 0; j--) {
					valorParam[j] = subvetor[j];
				}

				contValorReal = 0;
				for (var k = 0; k < idDescricao.length; k++) {
					if (contValorReal == 0) {
						valorReal += valorParam[idDescricao[k]];
					} else {
						valorReal += ", "+valorParam[idDescricao[k]];
					}
					contValorReal++;
				}

				if (valorParam[0].length > 2 && valorParam[0].length > "2") {
					if (idAtivo != 0) {
						if (valorParam[idAtivo] == 1) {
							if (cont  == 0) {
								arrayJson += "{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
							} else {
								arrayJson += ",{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
							}
							cont++;
						}
					} else {
						if (cont  == 0) {
							arrayJson += "{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						} else {
							arrayJson += ",{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						}
						cont++;
					}
				}
			}
			arrayJson += "]";
		}
		$("#"+IdDiv+"").html(montarInputList);

		arrayJson = JSON.parse(String(arrayJson));
		setarValorCombo(arrayJson, id, param[idValue], param[idDescricao[0]], accessKey, 0, "");
	});
}




function jk_comboVlrPreDataListString(titulo, controller, dataParam, id, param, idValue, idDescricao, accessKey, IdDiv, onchange, idAtivo, idValor, DescricaoValor){
	$.ajax({
		url:'app/controllers/'+controller+'.php',
		type: 'POST',
		dataType: 'text',
		data: dataParam
	}).done( function(data){
		var valorParam = [];
		var valorReal = "";
		var contValorReal = 0;
		var montarInputList = "";
		var arrayJson = "";
		var cont = 0;

		if (data == "") {
			montarInputList += "<input type='text' class='form-control' placeholder='Sem registros ("+titulo+")' disabled>";
		} else {
			montarInputList += "<input type='text' id='"+id+"'";
			montarInputList += "class='flexdatalist form-control' placeholder='"+titulo+"'";
			montarInputList += "data-min-length='0' data-visible-properties='[\""+param[idDescricao[0]]+"\"]' ";
			montarInputList += "data-selection-required='true' data-value-property='"+param[idValue]+"' ";
			montarInputList += "onchange='"+onchange+"' onfocus='limparValorCombo(this.id)'";
			montarInputList += "required disabled>";

			var vetor = data.split("[]");
			var subvetor = [];
			
			arrayJson += "[";
			for (var i = 0; i < vetor.length; i++) {
				valorReal = "";
				subvetor = vetor[i].split("{,}");

				for (var j = param.length - 1; j >= 0; j--) {
					valorParam[j] = subvetor[j];
				}

				contValorReal = 0;
				for (var k = 0; k < idDescricao.length; k++) {
					if (contValorReal == 0) {
						valorReal += valorParam[idDescricao[k]];
					} else {
						valorReal += ", "+valorParam[idDescricao[k]];
					}
					contValorReal++;
				}

				if (valorParam[0].length > 2 && valorParam[0].length > "2") {
					if (idAtivo != 0) {
						if (valorParam[idAtivo] == 1) {
							if (cont  == 0) {
								arrayJson += "{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
							} else {
								arrayJson += ",{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
							}
							cont++;
						}
					} else {
						if (cont  == 0) {
							arrayJson += "{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						} else {
							arrayJson += ",{\""+param[idValue]+"\": \""+valorParam[idValue]+"\", \""+param[idDescricao[0]]+"\": \""+valorReal+"\"}";
						}
						cont++;
					}
				}
			}
			arrayJson += "]";
		}
		$("#"+IdDiv+"").html(montarInputList);

		arrayJson = JSON.parse(String(arrayJson));
		setarValorCombo(arrayJson, id, param[idValue], param[idDescricao[0]], accessKey, idValor, DescricaoValor);
	});
}

