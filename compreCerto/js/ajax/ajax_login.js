

function validarLogarSistema(){
	var msmErroLogin = "<span color:'red'>*</span>&nbsp;Se tiver demorando muito para logar verifique sua conecção com a rede,";
	msmErroLogin += " se o servidor está ligado e funcionado corretamente e se o endereço ip está correto!";
	 $("#msmErrorLogin").val(msmErroLogin); 
	/* e.preventDefault(); */
	var identificador = $("#login").val();
	var senha = $("#password").val();
	var dataLogada = pegarData();
	var conteudoArquivoTxt = identificador+","+senha+","+dataLogada;

	logarSistema(identificador , senha); 
	adicionarLogin(identificador , senha);
}


function logarSistema(identificador, senha){
	if (
		jk_validaCampo(identificador, "", "O campo usuario deve ser preenchido!") && 
		jk_validaCampo(senha, "", "O campo senha deve ser preenchido!")
	) {
		$.ajax({
			url: caminhoServer+"login.php",
			type: 'POST',
			dataType: 'text',
			data:{
				'logarSistema': true,
				'login': identificador,
				'senha': senha
			}
		}).done( function(data){
			usuario_Global = JSON.parse(data);
			console.log(usuario_Global);
			if (jk_validaCampo(usuario_Global.status, "Você está logado", "Falha ao tentar logar")) {
				montarTelaPrincipal(pegarData());
			}
		});
	}
}



/*function validarLogarSistema(){
	var msmErroLogin = "<span color:'red'>*</span>&nbsp;Se tiver demorando muito para logar verifique sua conecção com a rede,";
	msmErroLogin += " se o servidor está ligado e funcionado corretamente e se o endereço ip está correto!";
	$("#msmErrorLogin").val(msmErroLogin);
	var identificador = $("#login").val();
	var senha = $("#password").val();
	var dataLogada = pegarData();
	var conteudoArquivoTxt = identificador+","+senha+","+dataLogada;

	if (identificador != "" && senha != "") {
		logarSistema(tratarString(identificador) , tratarString(senha));
		adicionarLogin(tratarString(identificador) , tratarString(senha));
	} else {
		toastGeral("error", "Os campos 'Usuário' e 'Senha' devem ser preenchidos!");
	}
	/* $.ajax({
		type: 'GET',
		url: "http://"+hostWebService+"/VendasCDI/alteraArquivo.php?arquivo=json/"+arquivoTXT+".txt&conteudo="+conteudoArquivoTxt,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){  }); */
/*}*/




function desVisualizarSenha(){
	var btn = "<a href=\"#\" class=\"btn btn-block\" style=\"color:#000;\" onclick=\"visualizarSenha()\">";
		btn +=		"<i class=\"fa fa-eye\"></i>";
		btn += "</a>";
	$("#buttonViewSenha").html(btn);
	mudarTipo('textSenha', 'password');
}


function visualizarSenha(){
	var btn = "<a href=\"#\" class=\"btn btn-block\" style=\"color:#000;\" onclick=\"desVisualizarSenha()\">";
		btn +=		"<i class=\"fa fa-eye-slash\"></i>";
		btn += "</a>";
	$("#buttonViewSenha").html(btn);
	mudarTipo('textSenha', 'text');
}

function mudarTipo(id, tipo){
	document.getElementById(id).type = tipo;
}


















function selecionarPedido(indice, tipo){
	var conteudo = "";
	conteudo += "<div class=\"col-xs-12\">";
	indicePedido_Global = indice;

	$.ajax({
		url: caminhoServer+"pedido_item.php",
		type: 'POST',
		dataType: 'text',
		data:{
			'listaPedidoItem': true,
			'filial': usuario_Global.filial,
			'documento': pedido_Global[indice].documento
		}
	}).done( function(data){
		/* console.log(data); */
		pedido_item_Global = JSON.parse(data);
		console.log(pedido_item_Global);

		// setarIndiceLanc_marketing();

		if (tipo == 'e') {
			editarPedido();
		} else if (tipo == 'v') {
			visualizarPedido();
		}

		/* Validação dos dados de retorno */
		conteudo += "</div>";
	});
}






function editarPedido(){
	var conteudo = "";
	conteudo += "<h3>Pedido: "+pedido_Global[indicePedido_Global].documento+"</h3>";
	conteudo += "<table class='table'>";
	conteudo += 	"<tr>";
	// conteudo += 		"<td>";
	// conteudo += 			"Pedido";
	// conteudo += 			"<input ";
	// conteudo += 				/* Caracteristicas */"type=\"text\" class=\"form-control\" ";
	// conteudo += 				/* Valor */"value='"+pedido_Global[indice].documento+"' ";
	// conteudo += 			"disabled>";
	// conteudo += 		"</td>";
	conteudo += 		"<td>";
	conteudo += 			"Emissão";
	conteudo += 			"<input ";
	conteudo += 				/* Caracteristicas */"type=\"date\" class=\"form-control\" ";
	conteudo += 				/* Valor */"value='"+pedido_Global[indicePedido_Global].emissao.substring(0,10)+"' ";
	conteudo += 			"disabled>";
	conteudo += 		"</td>";
	conteudo += 		"<td>";
	conteudo += 			"Total";
	conteudo += 			"<input ";
	conteudo += 				/* Caracteristicas */"type=\"text\" class=\"form-control\" ";
	conteudo += 				/* Valor */"value='"+formataValorParaImprimir(pedido_Global[indicePedido_Global].total)+"' ";
	conteudo += 			"disabled>";
	conteudo += 		"</td>";
	conteudo += 	"</tr>";
	conteudo += 	"<tr>";
	conteudo += 		"<td colspan='2'>";
	conteudo += 			"Cliente";
	conteudo += 			"<input ";
	conteudo += 				/* Caracteristicas */"type=\"text\" class=\"form-control\" ";
	conteudo += 				/* Valor */"value='"+pedido_Global[indicePedido_Global].razaosocial+"' ";
	conteudo += 			"disabled>";
	conteudo += 		"</td>";
	conteudo += 	"</tr>";
	conteudo += 	"<tr>";
	conteudo += 	"</tr>";
	conteudo += "</table>";
	conteudo += "<br><br><br><br><br>";
	conteudo += montarTabelaItens(true);
	$("#conteudoView").html(conteudo);
	botaoFixoEsquerda("pedido");
	botaoFixoDireita("pedido");
}



function visualizarPedido(){
	$("#pedidoTituloModalVisuPedido").html(pedido_Global[indicePedido_Global].documento);
	$("#pedidoModalVisuPedido").html(pedido_Global[indicePedido_Global].documento);
	$("#totalModalVisuPedido").html(formataValorParaImprimir(pedido_Global[indicePedido_Global].total));
	$("#emissaoModalVisuPedido").html(formatarData(pedido_Global[indicePedido_Global].emissao.substring(0,10)));
	$("#clienteModalVisuPedido").html(pedido_Global[indicePedido_Global].razaosocial);
	$("#telefoneModalVisuPedido").html(pedido_Global[indicePedido_Global].telefone);

	var conteudo = "";
	conteudo += "<div class='col-md-12'>";
	conteudo += 	montarTabelaItens(false); /* Paramentro false para não dar permissão do botão excluir */
	conteudo += "</div>";
	$("#gradeItenModalVisuPedido").html(conteudo);
	$("#modalVisuPedido").modal("show");
}




function montarTabelaItens(editar){
	var conteudo = "";
	var valorTotal = 0;
	if (pedido_item_Global.length == 0) {
		conteudo += "<h3>Nenhum registro encontrado</h3>";
	} else {
		conteudo += "<table class='table fontTable2'>";
		conteudo += 	"<tr>";
		conteudo += 		"<td><b>Descrição</b></td>";
		// conteudo += 		"<td><b>U.M.</b></td>";
		conteudo += 		"<td align='center'><b>Qdt - U.M.</b></td>";
		conteudo += 		"<td align='right'><b>Vlr. Uni.</b></td>";
		/* conteudo += 		"<td align='right'><b>Valor Desconto</b></td>"; */
		conteudo += 		"<td align='right'><b>Vlr. Total</b></td>";
		conteudo += 		"<td></td>";
		conteudo += 	"</tr>";

		for (var i = pedido_item_Global.length - 1; i >= 0; i--) {
			/* pedido_item_Global[i] */
			conteudo += 	"<tr id='linhaPedidoItem"+i+"'>";
			conteudo += 		"<td>"+pedido_item_Global[i].item.descricao+"</td>";
			// conteudo += 		"<td>"+pedido_item_Global[i].unidade+"</td>";
			conteudo += 		"<td align='center'>"+pedido_item_Global[i].quantidade+" - "+pedido_item_Global[i].unidade+"</td>";
			conteudo += 		"<td align='right'>"+formataValorParaImprimir(pedido_item_Global[i].valor_unitario)+"</td>";
			/* conteudo += 		"<td align='right'>"+pedido_item_Global[i].valor_desconto+"</td>"; */
			conteudo += 		"<td align='right'>"+formataValorParaImprimir(pedido_item_Global[i].valor_total)+"</td>";

			valorTotal += parseFloat(pedido_item_Global[i].valor_total);

			if (editar) {
				conteudo += "<td align='center'>";
				conteudo += 	"<button class='btn' onclick='excluirItem("+i+")'>";
				conteudo += 		"<i class='fa fa-times' style='color: red'></i>";
				conteudo += 	"</button>";
				conteudo += "</td>";
			}
			conteudo += 	"</tr>";
		}
		conteudo += 	"<tr>";
		// conteudo += 		"<td></td>";
		conteudo += 		"<td align='right' colspan='3'><b>Total: </b></td>";
		conteudo += 		"<td align='right'>"+formataValorParaImprimir(valorTotal)+"</td>";
		conteudo += 	"</tr>";
		conteudo += "</table>";
	}
	return conteudo;
}



/* 
function setarIndiceLanc_marketing(){
	for (var i = 0; i < pedido_item_Global.length; i++) {
		for (var j = 0; j < pedido_Global.length; j++) {
			if (pedido_item_Global[i].documento == pedido_Global[j].documento) {
				pedido_item_Global[i].indiceLanc_marketing = j;
			}
		}
	}
}
*/




function excluirItem(indice){
	bootbox.confirm({
		title: "Tem certeza que deseja excluir este pedido?",
		message: "Ao aperta o botão \"Sim\" você irá excluir este pedido por completo do sistema",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url: caminhoServer+"pedido_item.php",
					type: 'POST',
					dataType: 'text',
					data:{
						'deletarItemPedido': true,
						'filial': pedido_item_Global[indice].filial,
						'id':pedido_item_Global[indice].sequencia,
						'documento':pedido_item_Global[indice].documento,
						'valor':pedido_item_Global[indice].valor_total
					}
				}).done( function(data){
					console.log("Apagou o item");
					console.log(data);
					if (jk_validaCampo(data, "Item excluido com sucesso!", "Falha ao excluir item")) {
						selecionarPedido(indicePedido_Global, 'e');
						$("#linhaPedidoItem"+indice).remove();
					}
				});
			}
		}
	});
}





function botaoFixoEsquerda(onde){
	var botao = "";

	if (onde == "principal") {
		botao += "<button class='btn btn-primary' onclick='logoff()'>";
		botao += 		"<i class='fa fa-sign-out'></i> Sair";
		botao += "</button>";
	}else if (onde == "pedido") {
		var dataPedido = pedido_Global[indicePedido_Global].emissao.substring(0,10);
		botao += "<button class='btn btn-primary' onclick='montarTelaPrincipal(\""+dataPedido+"\")'>";
		botao += 		"<i class='fa fa-arrow-left'></i> Voltar";
		botao += "</button>";
	}else if (onde == "addPedido") {
		var dataPedido = pegarData();
		botao += "<button class='btn btn-primary' onclick='montarTelaPrincipal(\""+dataPedido+"\")'>";
		botao += 		"<i class='fa fa-arrow-left'></i> Voltar";
		botao += "</button>";
	}

	$("#botaoFixoEsquerda").html(botao);
}


function botaoFixoDireita(onde){
	var botao = "";

	if (onde == "principal") {
		botao += "<button class='btn btn-success' onclick='adcionarPedido(-1)'>";
		botao += 		"<i class='fa fa-plus'></i> Adicionar Orçamento";
		botao += "</button>";
	} else if (onde == "pedido") {
		botao += "<button class='btn btn-success' onclick='mostrarPedido(\"conteudoAdicionaPedidoItem\", null)'>"; /*  data-id adicionarItemPedido(\""+indicePedido_Global+"\") */
		botao += 		"<i class='fa fa-plus'></i> Adicionar Item";
		botao += "</button>";
	}
	$("#botaoFixoDireita").html(botao);
}




function logoff(){
	bootbox.confirm({
		title: "Tem certeza que deseja sair da aplicação?",
		message: "Você será direcionado para tela de login!",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				removerLogin(true);
			}
		}
	});	
}

/*
$('#formLogin').submit(function(e){
	var msmErroLogin = "<span color:'red'>*</span>&nbsp;Se tiver demorando muito para logar verifique sua conecção com a rede,";
	msmErroLogin += " se o servidor está ligado e funcionado corretamente e se o endereço ip está correto!";
	$("#msmErrorLogin").val(msmErroLogin)
	e.preventDefault();
	var identificador = $("#login").val();
	var senha = $("#password").val();
	var dataLogada = pegarData();
	var conteudoArquivoTxt = identificador+","+senha+","+dataLogada;

	logarSistema(identificador , senha);
	adicionarLogin(identificador , senha);
	// $.ajax({
	// 	type: 'GET',
	// 	url: "http://"+hostWebService+"/VendasCDI/alteraArquivo.php?arquivo=json/"+arquivoTXT+".txt&conteudo="+conteudoArquivoTxt,
	// 	contentType: "application/json",
	// 	jsonpCallback: "localJsonpCallback"
	// }).done( function(data){  });
});

function logarSistema(identificador , senha){
	$.ajax({
		type: 'GET',
		url: urlWebService+"UsuarioWs/autencicar/"+identificador+"/"+senha+parametrosWebService,
		contentType: "application/json",
		jsonpCallback: "localJsonpCallback"
	}).done( function(data){
		var arrayJson = JSON.parse(data);
		if (arrayJson.length == 0) {
			toastGeral("error", "Login ou senha incorretos!");
		} else {
			for(i in arrayJson){
				var filial = arrayJson[i].filial;
				$("#filial").val(filial);

				var vendedor = arrayJson[i].vendedor;
				// var dataAtual = pegarData();

				// Montando o texto html a ser preenchido no cabaçario principal

				var nomeHiddenUsuario = "<input type='hidden' value='"+arrayJson[i].identificador+"' id='identificador' data-razaosocial='"+arrayJson[i].nome+"'>"

				// var cabecario_text_html = "<br><h2 class='text-center'>Página Principal</h2>";
				var cabecario_text_html = "<div class='col-md-12' style='margin-top:10px;'>";
				cabecario_text_html += "<table class='table' style='margin-bottom: -20px;'><tr><td>"

				cabecario_text_html += "<h4 style='margin-bottom:1px;margin-top:1px;'>";
				cabecario_text_html += 		arrayJson[i].identificador+":"+arrayJson[i].nome;
				cabecario_text_html += "</h4>";

				cabecario_text_html += "</td><td>";

				cabecario_text_html += "<button class='btn btn-block btn-primary' onclick='montarListaPedsito( $(\"#filial\").val() );'>Atualizar</button>";

				// cabecario_text_html += "<h4 style='margin-bottom:1px;margin-top:1px;'>"+arrayJson[i].identificador+":"+arrayJson[i].nome+"</h4>";
				// cabecario_text_html += "<input type='text' value='' class='form-control' disabled>";
				
				cabecario_text_html += "</td><tr></tr><td width='50%'>";
				
				// cabecario_text_html += "<h4>Data</h4>";
				// cabecario_text_html += "<input type='date' id='dataPedido' value='"+dataAtual+"' style='height: 50px;' class='form-control' onclick='montarListaPedsito()'>";
				
				// cabecario_text_html += "</td><td width='50%'>";
				
				// cabecario_text_html += "<button id='buttonAdicionaPedido' class='btn btn-primary btn-block' onclick='montarListaPedsito()'>";
				// cabecario_text_html += "Listar";
				// cabecario_text_html += "</button>";
				// cabecario_text_html += "</div>";

				cabecario_text_html += "</td></tr></table>";
				// cabecario_text_html += "<hr>";
				var botaoVoltarFixo = "<button class='btn btn-info' onclick='logoff();'>";
				botaoVoltarFixo += '<i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;';
				botaoVoltarFixo += "Sair";
				botaoVoltarFixo += "</button>";

				var botaoFichaFixo = "<button class='btn btn-warning' ";
				botaoFichaFixo += "data-toggle='modal' data-target='#modalMesaPedido'>";
				botaoFichaFixo += "<i class='fa fa-search' aria-hidden='true'></i>&nbsp;";
				botaoFichaFixo += "Mesa";
				botaoFichaFixo += "</button>";
			}

			// $("#filial").val(filial);
			$("#vendedor").val(vendedor);
			$("#hiddenUsuario").html(nomeHiddenUsuario);
			$("#cabecarioPrincipal").html(cabecario_text_html);
			$("#botaoVoltarFixo").html(botaoVoltarFixo);
			$("#botaoFixoDireita").html(botaoFichaFixo);
			montarListaPedsito( $("#filial").val() );

			// Mensagem de sucesso da autenticação
			toastGeral("info", "Você está logado!");
			subirPagina();
		}
	});
	return false;
}*/